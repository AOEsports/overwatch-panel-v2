import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import TuneIcon from "@mui/icons-material/Tune";
import {
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Dialog,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { Player } from "common/types/Player";
import { DataStorage } from "common/types/replicants/DataStorage";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import { useOnlyReplicantValue, useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import { MuiColorInput } from "mui-color-input";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { RosteredPlayer } from "./components/RosteredPlayer";
import TabPanel, { tabProps } from "./components/TabPanel";

function pullHeroData(method: Function) {
	return fetch("../assets/data/heroes.json")
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			method(responseJson);
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
}

function TeamManager() {
	const [teams, setTeams] = useReplicantValue<TeamReplicant>(
		"TeamList",
		undefined,
		{ defaultValue: { teams: [] as Team[] } as TeamReplicant }
	) as [TeamReplicant, Function];
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

	const teamIcons = useOnlyReplicantValue<object>(
		"assets:teamlogos"
	) as object;

	const [currentTab, setCurrentTab] = useState(0) as [number, Function];
	const [currentTeam, setCurrentTeam] = useState() as [Team, Function];
	const [currentTeamOriginal, setCurrentTeamOriginal] = useState(
		{} as Team
	) as [Team, Function];

	const [newTeamModalOpen, setNewTeamModalOpen] = useState() as [
		boolean,
		Function
	];
	const [newTeamName, setNewTeamName] = useState("") as [string, Function];
	const [heroData, setHeroData] = useState() as [object, Function];
	if (!heroData) pullHeroData(setHeroData);

	const [notificationData, setNotificationData] = useState({
		type: "success",
		message: "No message",
		open: false,
	}) as [{ type: AlertColor; message: string; open: boolean }, Function];

	if (!teams || !teamIcons || !dataStorage)
		return (
			<>
				<CircularProgress color="inherit" />
			</>
		);
	const actions = [
		{
			icon: <AddIcon />,
			name: "New Team",
			disabled: false,
			onClick: (event: React.MouseEvent) => {
				setNewTeamName("");
				setNewTeamModalOpen(true);
			},
		},
		{
			icon: <SaveIcon />,
			name: "Save",
			disabled: !currentTeam,
			onClick: (event: React.MouseEvent) => {
				Object.keys(currentTeam).forEach((key) => {
					currentTeamOriginal[key] = currentTeam[key];
				});
				setTeams({
					teams: [...(teams.teams || [])],
				});

				setNotificationData({
					open: true,
					type: "success",
					message: `Team "${currentTeam.name}" has been successfully saved`,
				});
			},
		},
	];

	return (
		<>
			<Grid
				container
				spacing={2}
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid xs={8}>
					<InputLabel id="teamDropdown">
						Select Team or Create a new one
					</InputLabel>
					<Select
						labelId="teamDropdown"
						onChange={(e) => {
							console.log(`Loading team`, e.target.value);
							setCurrentTeam(
								JSON.parse(JSON.stringify(e.target.value))
							);
							setCurrentTeamOriginal(e.target.value as Team);
							setCurrentTab(0);
						}}
						placeholder={"Select Team"}
						label={"Select Team"}
						style={{ minWidth: "40%" }}
					>
						{teams.teams.map((team: Team) => {
							return (
								<MenuItem value={team as any}>
									{team.name}
								</MenuItem>
							);
						})}
					</Select>
				</Grid>
				<Grid xs={4}>
					<Box
						sx={{
							zIndex: 3,
						}}
					>
						<SpeedDial
							ariaLabel="SpeedDial openIcon example"
							icon={
								<SpeedDialIcon
									openIcon={<TuneIcon />}
									color="primary"
								/>
							}
							direction="left"
						>
							{actions
								.filter((a) => !a.disabled)
								.map((action) => (
									<SpeedDialAction
										key={action.name}
										icon={action.icon}
										tooltipTitle={action.name}
										onClick={(e) => action.onClick(e)}
									/>
								))}
						</SpeedDial>
					</Box>
					<Dialog
						open={newTeamModalOpen}
						onClose={() => setNewTeamModalOpen(false)}
						aria-labelledby="modal-modal-title"
					>
						<Box
							sx={{
								width: 600,
								padding: "32px",
							}}
						>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								paddingBottom={"8px"}
							>
								Create new team
							</Typography>
							<TextField
								id="newTeam"
								label="New Team Name"
								variant="standard"
								style={{ width: "100%" }}
								required={true}
								onChange={(e) => setNewTeamName(e.target.value)}
							></TextField>
						</Box>
						<ButtonGroup variant="contained">
							<Button
								color="error"
								variant="contained"
								onClick={() => setNewTeamModalOpen(false)}
								style={{ width: "50%" }}
							>
								Close
							</Button>
							<Button
								color="success"
								variant="contained"
								onClick={() => {
									const newTeam: Team = {
										teamId: dataStorage.nextTeamId,
										name: newTeamName,
										players: [],
										icons: {},
										colors: {
											primary: "#ffffff",
											textColor: "#ffffff",
											player: "#828282",
											shadow: "#000000",
										},
									};
									setDataStorage({
										...dataStorage,
										nextTeamId: dataStorage.nextTeamId + 1,
									});
									setTeams({
										teams: [
											...(teams.teams || []),
											newTeam,
										],
									});
									setNotificationData({
										open: true,
										type: "info",
										message: `Team "${newTeamName}" has been created successfully. Select it from the dropdown menu`,
									});
									setNewTeamModalOpen(false);
								}}
								style={{ width: "50%" }}
								disabled={
									!newTeamName || newTeamName.length == 0
								}
							>
								Confirm
							</Button>
						</ButtonGroup>
					</Dialog>
				</Grid>
			</Grid>
			<div style={currentTeam == undefined ? { display: "none" } : {}}>
				<Grid container spacing={2} direction="row">
					<Grid xs={4}>
						<Typography
							id="teamPreview"
							variant="h6"
							component="h2"
							paddingBottom={"8px"}
						>
							Team Preview
						</Typography>
					</Grid>{" "}
					{/* preview window */}
					<Grid xs={8}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs
								value={currentTab}
								onChange={(e, newValue) =>
									setCurrentTab(newValue)
								}
								aria-label="team tabs"
							>
								<Tab
									label="Basic Information"
									{...tabProps(0)}
								/>
								<Tab label="Roster" {...tabProps(1)} />
								<Tab label="Images" {...tabProps(2)} />
							</Tabs>
						</Box>

						<TabPanel value={currentTab} index={0}>
							Change the team name and colours here
							<TextField
								id="teamName"
								label="Team Name"
								variant="filled"
								style={{ width: "100%" }}
								onChange={(e) =>
									setCurrentTeam({
										...currentTeam,
										name: e.target.value,
									})
								}
								value={currentTeam ? currentTeam.name : ""}
							></TextField>
							<InputLabel
								id="primaryColor"
								style={{ paddingTop: "8px" }}
							>
								Primary Team Color
							</InputLabel>
							<MuiColorInput
								variant="outlined"
								value={
									currentTeam
										? currentTeam.colors.primary || "black"
										: "black"
								}
								isAlphaHidden={true}
								onChange={(e) =>
									setCurrentTeam({
										...currentTeam,
										colors: {
											...currentTeam.colors,
											primary: e,
										},
									})
								}
							/>
							<InputLabel
								id="playerColor"
								style={{ paddingTop: "8px" }}
							>
								Team Player Color
							</InputLabel>
							<MuiColorInput
								variant="outlined"
								value={
									currentTeam
										? currentTeam.colors.player || "black"
										: "black"
								}
								isAlphaHidden={true}
								onChange={(e) =>
									setCurrentTeam({
										...currentTeam,
										colors: {
											...currentTeam.colors,
											player: e,
										},
									})
								}
							/>
							<InputLabel
								id="playerColor"
								style={{ paddingTop: "8px" }}
							>
								Team Text Color
							</InputLabel>
							<MuiColorInput
								variant="outlined"
								value={
									currentTeam
										? currentTeam.colors.textColor ||
										  "black"
										: "black"
								}
								isAlphaHidden={true}
								onChange={(e) =>
									setCurrentTeam({
										...currentTeam,
										colors: {
											...currentTeam.colors,
											textColor: e,
										},
									})
								}
							/>
							<InputLabel
								id="playerColor"
								style={{ paddingTop: "8px" }}
							>
								Text Shadow Color
							</InputLabel>
							<MuiColorInput
								variant="outlined"
								value={
									currentTeam
										? currentTeam.colors.shadow || "black"
										: "black"
								}
								isAlphaHidden={true}
								onChange={(e) =>
									setCurrentTeam({
										...currentTeam,
										colors: {
											...currentTeam.colors,
											shadow: e,
										},
									})
								}
							/>
						</TabPanel>
						<TabPanel value={currentTab} index={1}>
							<Grid
								container
								spacing={4}
								direction="column"
								alignItems="left"
								minWidth={"100%"}
							>
								{Array.from(Array(5)).map((_, index) => {
									if (!currentTeam) return <></>;
									if (!currentTeam.players[index])
										currentTeam.players[index] =
											{} as Player;
									return (
										<Grid xs={2} minWidth={"100%"}>
											<RosteredPlayer
												playerData={
													currentTeam.players[
														index
													] as Player
												}
												heroData={heroData}
												playerId={index + 1}
											/>
										</Grid>
									);
								})}
							</Grid>
						</TabPanel>
						<TabPanel value={currentTab} index={2}>
							<Stack>
								<InputLabel
									id="teamIcon"
									style={{ paddingTop: "8px" }}
								>
									Primary Team Icon
								</InputLabel>
								<Select
									labelId="teamDropdown"
									onChange={(e) => {
										const test = {
											...currentTeam,
											icons: {
												teamIcon: e.target.value,
											},
										};
										setCurrentTeam(test);
										console.log(test);
									}}
									value={
										currentTeam && currentTeam.icons
											? currentTeam.icons.teamIcon
											: ""
									}
									placeholder={"Select Team Icon"}
									label={"Select Team Icon"}
									style={{ minWidth: "40%" }}
								>
									{Object.values(teamIcons).map(
										(icon: {
											base: String;
											url: string;
											name: string;
										}) => {
											return (
												<MenuItem value={icon.url}>
													<img
														src={icon.url}
														style={{
															minHeight: "24px",
															maxHeight: "24px",
															aspectRatio: "1/ 1",
															minWidth: "32px",
															objectFit:
																"scale-down",
															paddingRight: "8px",
															pointerEvents:
																"none",
														}}
													/>
													{icon.name}
												</MenuItem>
											);
										}
									)}
								</Select>
							</Stack>
						</TabPanel>
					</Grid>{" "}
					{/* tabs */}
				</Grid>
			</div>

			<Snackbar
				open={notificationData.open}
				autoHideDuration={6000}
				onClose={() =>
					setNotificationData({
						...notificationData,
						open: false,
					})
				}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setNotificationData({
								...notificationData,
								open: false,
							});
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				<Alert sx={{ mb: 2 }} severity={notificationData.type}>
					{notificationData.message}
				</Alert>
			</Snackbar>
		</>
	);
}

ReactDOM.render(
	<Wrapper isDashboard={true} cssInject={{ padding: "16px" }}>
		<TeamManager />
	</Wrapper>,
	document.getElementById("root")
);
