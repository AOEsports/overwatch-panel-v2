import {
	Button,
	ButtonGroup,
	CircularProgress,
	Grid,
	Stack,
} from "@mui/material";
import { MatchData } from "common/types/MatchData";
import { DataStorage } from "common/types/replicants/DataStorage";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import { Wrapper } from "common/Wrapper";
import { useOnlyReplicantValue } from "../common/useReplicant";
import TeamSelectorDropdown from "./components/TeamSelectorDropdown";

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
	let teamToDoTransition: { team?: Team } | null = null;
	return (
		<>
			<Grid container spacing={2} direction="column" alignItems="left">
				<Grid item lg={4}>
					<h3 style={{ minWidth: "100%" }}>Scoreboard Overlay</h3>
					<ButtonGroup disableElevation>
						<Button
							color="success"
							variant="contained"
							onClick={() =>
								nodecg.sendMessage("displayScores", {
									displayed: true,
								})
							}
							style={{ width: "50%" }}
						>
							Show
						</Button>
						<Button
							color="error"
							variant="contained"
							onClick={() =>
								nodecg.sendMessage("displayScores", {
									displayed: false,
								})
							}
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
				<Grid item lg={1}>
					<h3 style={{ minWidth: "100%" }}>Team Transition</h3>
					<Stack direction="row" spacing={2}>
						<TeamSelectorDropdown
							teams={teams.teams}
							label="Select Team"
							onChange={(team, e) => {
								console.log(
									`Loading team`,
									e.target.value,
									team
								);
								teamToDoTransition = { team: team };
							}}
							defaultValue={"Unknown"}
							showNoneOption={false}
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
									if (teamToDoTransition?.team) {
										nodecg.sendMessage("doTransition", {
											shown: true,
											team:
												teamToDoTransition?.team ||
												null,
										});
									}
								}}
							>
								Transition
							</Button>
						</ButtonGroup>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}

import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper isDashboard={true} cssInject={{ padding: "16px" }}>
		<Dashboard />
	</Wrapper>
);
