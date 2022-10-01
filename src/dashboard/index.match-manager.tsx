import React from "react";
import ReactDOM from "react-dom";
import { useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import { CircularProgress, Divider, Grid, Stack } from "@mui/material";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { Team } from "common/types/Team";
import { ScheduledMatch } from "./components/ScheduledMatch";
import { MatchData } from "common/types/MatchData";

function MatchManager() {
	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;
	const [matches, setMatches] = useReplicantValue<MatchReplicant>(
		"MatchList",
		undefined,
		{ defaultValue: { matches: [] as MatchData[] } as MatchReplicant }
	) as [MatchReplicant, Function];

	if (!teams || !matches)
		return (
			<>
				<CircularProgress color="inherit" />
			</>
		);
	return (
		<>
			<Stack
				spacing={4}
				direction="column"
				divider={<Divider flexItem />}
			>
				<ScheduledMatch
					matchObject={
						{
							team1: teams.teams[0],
							team2: teams.teams[1],
							information: "",
							team1score: 0,
							team2score: 0,
							flipped: false,
						} as MatchData
					}
					currentMatch={true}
					matchNote={""}
				/>
				<ScheduledMatch
					matchObject={
						{
							team1: teams.teams[0],
							team2: teams.teams[1],
							information: "",
							team1score: 0,
							team2score: 0,
							flipped: false,
						} as MatchData
					}
					currentMatch={false}
					matchNote={""}
				/>
			</Stack>
		</>
	);
}

ReactDOM.render(
	<Wrapper
		component={<MatchManager />}
		isDashboard={true}
		cssInject={{ padding: "16px" }}
	/>,
	document.getElementById("root")
);
