import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HideSourceIcon from "@mui/icons-material/HideSource";
import SaveIcon from "@mui/icons-material/Save";
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Dialog,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { MatchData } from "common/types/MatchData";
import { DataStorage } from "common/types/replicants/DataStorage";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import { TextBar } from "common/types/TextBar";
import { useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import { useState } from "react";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { ScheduledMatch } from "./components/ScheduledMatch";

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
				nextTeamId: 1,
			} as DataStorage,
		}
	) as [DataStorage, Function];
	if (!dataStorage.icons)
		dataStorage.icons = { overwatchLogoUrl: "", tournamentLogoUrl: "" };

	const [hideCompleted, setHideCompleted] = useState(false) as [
		boolean,
		Function
	];
	const [editingMatchInformation, setEditingMatchInformation] =
		useState(false);

	const themeIcons = useOnlyReplicantValue<object>("assets:theme") as object;
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
					<BottomNavigationAction
						onClick={() => {
							setMatches({ ...matches });
						}}
						label={"Send Changes to Overlay"}
						icon={<SaveIcon />}
					/>
					<BottomNavigationAction
						onClick={() => {
							setEditingMatchInformation(true);
						}}
						label={"Edit Match Information"}
						icon={<EditIcon />}
					/>
				</BottomNavigation>
			</div>
			<Dialog
				open={editingMatchInformation}
				onClose={() => setEditingMatchInformation(false)}
				aria-labelledby="modal-modal-title"
			>
				<Box
					sx={{
						width: 600,
						padding: "32px",
						overflowX: "hidden",
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						paddingBottom={"8px"}
					>
						Match Information
					</Typography>
					<Stack spacing={8}>
						<div style={{ paddingBottom: "16px" }}>
							<TextField
								id="text"
								label="Stream Title"
								variant="outlined"
								style={{ width: "100%" }}
								onChange={(e) =>
									(dataStorage.streamTitle = e.target.value)
								}
								defaultValue={
									dataStorage.streamTitle ||
									"AAOL Season 15 - Week 1"
								}
							/>
						</div>
						<div style={{ paddingBottom: "16px" }}>
							<AssetSelectorDropdown
								assets={themeIcons}
								size="medium"
								onChange={(icon, url) => {
									dataStorage.icons!.overwatchLogoUrl =
										icon.url;
								}}
								label={"Select Overwatch Logo"}
								defaultValue={
									dataStorage.icons.overwatchLogoUrl
								}
							/>
						</div>
						<div>
							<AssetSelectorDropdown
								assets={themeIcons}
								size="medium"
								onChange={(icon, url) => {
									dataStorage.icons!.tournamentLogoUrl =
										icon.url;
								}}
								label={"Select Tournament Logo"}
								defaultValue={
									dataStorage.icons.tournamentLogoUrl
								}
							/>
						</div>
					</Stack>
				</Box>
				<ButtonGroup variant="contained">
					<Button
						color="secondary"
						variant="contained"
						onClick={() => setEditingMatchInformation(false)}
						style={{ width: "100%" }}
					>
						Close
					</Button>
				</ButtonGroup>
			</Dialog>
		</>
	);
}

import { createRoot } from "react-dom/client";
import AssetSelectorDropdown from "./components/AssetSelectorDropdown";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper isDashboard={true} cssInject={{ padding: "16px" }}>
		<MatchManager />
	</Wrapper>
);
