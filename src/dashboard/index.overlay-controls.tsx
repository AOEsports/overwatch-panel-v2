import React from "react";
import ReactDOM from "react-dom";
import { useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import {
	Button,
	ButtonGroup,
	CircularProgress,
	Grid,
	Stack,
} from "@mui/material";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { DataStorage } from "common/types/replicants/DataStorage";
import { Team } from "common/types/Team";
import TeamSelectorDropdown from "./components/TeamSelectorDropdown";
import { MatchData } from "common/types/MatchData";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";

function Dashboard() {
	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;
	const matches = useOnlyReplicantValue<MatchReplicant>(
		"MatchList",
		undefined,
		{ defaultValue: { matches: [] as MatchData[] } as MatchReplicant }
	) as MatchReplicant;
	const dataStorage = useOnlyReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 0,
			} as DataStorage,
		}
	) as DataStorage;

	if (!teams)
		return (
			<>
				<CircularProgress color="inherit" />
			</>
		);
	const currentMatch: MatchData = matches.matches.filter(
		(m) => m.matchId == dataStorage.currentMatchId
	)[0];

	let teamToDisplay: { team1?: Team; team2?: Team; poll?: boolean } | null =
		null;
	return (
		<>
			<Grid container spacing={2} direction="column" alignItems="left">
				<Grid item lg={4}>
					<h3 style={{ minWidth: "100%" }}>Scoreboard Overlay</h3>
					<ButtonGroup disableElevation>
						<Button
							color="success"
							variant="contained"
							style={{ width: "50%" }}
						>
							Show
						</Button>
						<Button
							color="error"
							variant="contained"
							style={{ width: "50%" }}
						>
							Hide
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item lg={2}>
					<h3 style={{ minWidth: "100%" }}>Lower Third</h3>
					<ButtonGroup disableElevation>
						<Button
							color="success"
							variant="contained"
							style={{ width: "50%" }}
						>
							Show
						</Button>
						<Button
							color="error"
							variant="contained"
							style={{ width: "50%" }}
						>
							Hide
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item lg={1}>
					<h3 style={{ minWidth: "100%" }}>Team Roster Display</h3>
					<Stack direction="row" spacing={2}>
						<TeamSelectorDropdown
							teams={teams.teams}
							label="Select Team"
							style={{ minWidth: "60%", maxWidth: "60%" }}
							onChange={(team, e) => {
								if (e.target.value == "Unknown") {
									console.log(`Sending both teams`);
									teamToDisplay = { poll: true };
									return;
								}
								console.log(
									`Loading team`,
									e.target.value,
									team
								);
								teamToDisplay = { team1: team };
							}}
							defaultValue={"Unknown"}
							showNoneOption={true}
							noneOptionText={"Both teams from current match"}
						/>

						<ButtonGroup
							style={{ minWidth: "40%", maxWidth: "40%" }}
						>
							<Button
								color="success"
								variant="contained"
								style={{ width: "50%" }}
								size="small"
								onClick={() => {
									if (teamToDisplay?.team1) {
										nodecg.sendMessage("displayRoster", {
											shown: true,
											team: teamToDisplay || null,
										});
									} else {
										const team1 = teams.teams.filter(
											(team) =>
												(team.teamId as any) ==
												(!currentMatch.flipped
													? (currentMatch.team1id as any)
													: (currentMatch.team2id as any))
										)[0];
										const team2 = teams.teams.filter(
											(team) =>
												(team.teamId as any) ==
												(!currentMatch.flipped
													? (currentMatch.team2id as any)
													: (currentMatch.team1id as any))
										)[0];
										console.log(
											currentMatch.team2id,
											currentMatch.team1id
										);
										const sendDisplay = {
											team1: team1,
											team2: team2,
										};
										nodecg.sendMessage("displayRoster", {
											shown: true,
											team: sendDisplay || null,
										});
									}
								}}
							>
								Show
							</Button>
							<Button
								color="error"
								variant="contained"
								style={{ width: "50%" }}
								size="small"
								onClick={() =>
									nodecg.sendMessage(`displayRoster`, {
										shown: false,
										team: null,
									})
								}
							>
								Hide
							</Button>
						</ButtonGroup>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}

ReactDOM.render(
	<Wrapper
		component={<Dashboard />}
		isDashboard={true}
		cssInject={{ padding: "16px" }}
	/>,
	document.getElementById("root")
);
