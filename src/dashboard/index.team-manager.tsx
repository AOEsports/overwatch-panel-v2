import React from "react";
import ReactDOM from "react-dom";
import { useReplicantValue } from "common/useReplicant";
import { Team } from "common/types/Team";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import Grid from "@mui/material/Grid"; // Grid version 1
import { MuiColorInput } from "mui-color-input";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Wrapper } from "common/Wrapper";
import { style } from "@mui/system";
import internal from "stream";
import { RosteredPlayer } from "./components/RosteredPlayer";
import { Player } from "common/types/Player";
import { response } from "express";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function tabProps(index: number) {
	return {
		id: `control-tab-${index}`,
		"aria-controls": `control-tab-${index}`,
	};
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

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

	if (!teams) return <></>;
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

	return (
		<>
			<Collapse in={notificationData.open}>
				<Alert
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
					sx={{ mb: 2 }}
					severity={notificationData.type}
				>
					{notificationData.message}
				</Alert>
			</Collapse>
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
							setCurrentTeamOriginal(e.target.value);
							setCurrentTab(0);
						}}
						placeholder={"Select Team"}
						label={"Select Team"}
						style={{ minWidth: "40%" }}
					>
						{teams.teams.map((team) => {
							return (
								<MenuItem value={team}>{team.name}</MenuItem>
							);
						})}
					</Select>
				</Grid>
				<Grid xs={4}>
					<Button
						variant="contained"
						color="success"
						onClick={() => {
							setNewTeamName("");
							setNewTeamModalOpen(true);
						}}
					>
						Create New Team
					</Button>

					<Button
						color="info"
						variant="contained"
						onClick={() => {
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
						}}
						disabled={!currentTeam}
					>
						Save Current Team
					</Button>
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
										name: newTeamName,
										players: [],
										colors: {
											primary: "#ffffff",
											textColor: "#ffffff",
											player: "#828282",
											shadow: "#000000",
										},
									};
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
							Change the images for the team here
						</TabPanel>
					</Grid>{" "}
					{/* tabs */}
				</Grid>
			</div>
		</>
	);
}

ReactDOM.render(
	<Wrapper
		component={<TeamManager />}
		isDashboard={true}
		cssInject={{ padding: "16px" }}
	/>,
	document.getElementById("root")
);
