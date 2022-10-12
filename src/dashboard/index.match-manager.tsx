import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import {
	BottomNavigation,
	BottomNavigationAction,
	CircularProgress,
	Stack,
} from "@mui/material";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { Team } from "common/types/Team";
import { ScheduledMatch } from "./components/ScheduledMatch";
import { MatchData } from "common/types/MatchData";
import { DataStorage } from "common/types/replicants/DataStorage";
import AddIcon from "@mui/icons-material/Add";
import HideSourceIcon from "@mui/icons-material/HideSource";
import { TextBar } from "common/types/TextBar";

function MatchManager() {
	const [matches, setMatches] = useReplicantValue<MatchReplicant>(
		"MatchList",
		undefined,
		{ defaultValue: { matches: [] as MatchData[] } as MatchReplicant }
	) as [MatchReplicant, Function];

	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;

	const [dataStorage, setDataStorage] = useReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 0,
			} as DataStorage,
		}
	) as [DataStorage, Function];

	const [hideCompleted, setHideCompleted] = useState(false) as [
		boolean,
		Function
	];
	if (!teams || !matches)
		return (
			<>
				<CircularProgress color="inherit" />
			</>
		);
	let shownMatches = matches.matches.filter((match) =>
		match.deleted ? false : true
	);
	if (hideCompleted)
		shownMatches = shownMatches.filter((match) => !match.completed);
	return (
		<>
			<div
				style={{
					minHeight: "600px",
					maxHeight: "600px",
					overflow: "hidden",
				}}
			>
				<Stack
					spacing={4}
					direction="column"
					key={`${matches.matches.length || -1}-matches`}
					style={{
						minHeight: "570px",
						maxHeight: "570px",
						overflowY: "auto",
					}}
				>
					{shownMatches.map((match: MatchData, index: number) => {
						return (
							<>
								<ScheduledMatch
									key={match.matchId}
									matchData={match}
									dataStorageData={[
										dataStorage,
										setDataStorage,
									]}
									teams={teams}
								/>
							</>
						);
					})}
				</Stack>
				<BottomNavigation
					showLabels
					sx={{
						position: "fixed",
						bottom: "0px",
						left: "0px",
						width: "100%",
						zIndex: "2",
					}}
				>
					<BottomNavigationAction
						onClick={() => {
							const newMatch = {
								matchId: dataStorage.nextMatchId || 0,
								team1score: 0,
								team2score: 0,
								flipped: false,
								completed: false,
								deleted: false,
								textBars: [] as TextBar[],
							} as MatchData;
							setDataStorage({
								...dataStorage,
								nextMatchId: dataStorage.nextMatchId + 1,
							});
							setMatches({
								matches: [...(matches.matches || []), newMatch],
							});
						}}
						label="New Match"
						icon={<AddIcon />}
					/>
					<BottomNavigationAction
						onClick={() => {
							setHideCompleted(!hideCompleted);
						}}
						label={
							hideCompleted ? "Show Completed" : "Hide Completed"
						}
						icon={<HideSourceIcon />}
					/>
				</BottomNavigation>
			</div>
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
