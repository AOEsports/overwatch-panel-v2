import {
	Stack,
	Divider,
	TextField,
	Avatar,
	ButtonGroup,
	Button,
	Skeleton,
	Typography,
	Box,
	Dialog,
	styled,
	Fab,
	Tooltip,
	tooltipClasses,
	TooltipProps,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { MatchData } from "common/types/MatchData";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddIcon from "@mui/icons-material/Add";
import { DataStorage } from "../../common/types/replicants/DataStorage";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Fragment, useState } from "react";
import { TextBar } from "common/types/TextBar";
import { TextBarEditable } from "./TextBarEditable";
import React from "react";
import TeamSelectorDropdown from "./TeamSelectorDropdown";

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 320,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid #dadde9",
	},
}));

export interface ScheduledMatchProps {
	matchData: MatchData;
	teams: TeamReplicant;
	dataStorageData: [DataStorage, Function];
}

export function ScheduledMatch({
	matchData,
	teams,
	dataStorageData,
}: ScheduledMatchProps) {
	const [dataStorage, setDataStorage] = dataStorageData;
	const [key, setKey] = useState(0) as [number, Function];
	const [confirmDelete, setConfirmDelete] = useState(false) as [
		boolean,
		Function
	];
	const [showSettings, setShowSettings] = useState(false) as [
		boolean,
		Function
	];
	const [currentAccordion, setCurrentAccordion] = useState("") as [
		string,
		Function
	];

	if (!matchData.textBars) matchData.textBars = [] as TextBar[];
	if (matchData.deleted) return <></>;
	if (!matchData || !dataStorageData || !teams)
		return (
			<>
				<Skeleton variant="rounded" width={"100%"} height={70} />
			</>
		);

	const currentMatch = dataStorage.currentMatchId == matchData.matchId;
	const team1 = matchData.team1id
		? teams.teams.filter((t) => t.teamId == matchData.team1id)[0]
		: null;
	const team2 = matchData.team2id
		? teams.teams.filter((t) => t.teamId == matchData.team2id)[0]
		: null;

	function getTeamSelect(team1: boolean) {
		return (
			<TeamSelectorDropdown
				label="Select Team"
				teams={teams.teams}
				style={{ width: "50%" }}
				showNoneOption={true}
				noneOptionText={"To Be Determined"}
				onChange={(team, e) => {
					if (!team) {
						if (team1) {
							if (!matchData.flipped)
								matchData.team1id = "Unknown" as any;
							else matchData.team2id = "Unknown" as any;
						} else {
							if (!matchData.flipped)
								matchData.team2id = "Unknown" as any;
							else matchData.team1id = "Unknown" as any;
						}
						setTimeout(() => setKey(Math.random()), 100);
						return;
					}
					if (team1) {
						if (!matchData.flipped) matchData.team1id = team.teamId;
						else matchData.team2id = team.teamId;
					} else {
						if (!matchData.flipped) matchData.team2id = team.teamId;
						else matchData.team1id = team.teamId;
					}
					setTimeout(() => setKey(Math.random()), 100);
				}}
				value={
					((!matchData.flipped
						? team1
							? matchData.team1id
							: matchData.team2id
						: team1
						? matchData.team2id
						: matchData.team1id) as any) || "Unknown"
				}
			/>
		);
	}

	return (
		<>
			<Divider role="presentation" flexItem key={key}>
				<ButtonGroup>
					<Tooltip title={"Delete"}>
						<Button
							color="error"
							onClick={() => {
								setConfirmDelete(true);
							}}
						>
							<DeleteIcon />
						</Button>
					</Tooltip>
					<Tooltip title={"Settings"}>
						<Button
							color="primary"
							onClick={() => {
								setShowSettings(true);
							}}
						>
							<SettingsIcon />
						</Button>
					</Tooltip>
					<Tooltip title={"Swap Sides"}>
						<Button
							color={matchData.flipped ? "info" : "warning"}
							onClick={() => {
								matchData.flipped = !matchData.flipped;
								setTimeout(() => setKey(Math.random()), 100);
							}}
						>
							<SwapHorizIcon
								sx={
									matchData.flipped
										? { transform: "scale(1, -1)" }
										: {}
								}
							/>
						</Button>
					</Tooltip>
					<Tooltip title={"Make Current"}>
						<Button
							color="success"
							disabled={currentMatch}
							onClick={() => {
								setDataStorage({
									...dataStorage,
									currentMatchId: matchData.matchId,
								});
							}}
						>
							<CheckIcon />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</Divider>
			<Stack
				direction="row"
				style={{ paddingTop: "16px", paddingBottom: "16px" }}
			>
				<Avatar
					variant="square"
					src={
						(!matchData.flipped
							? team1?.icons?.teamIcon
							: team2?.icons?.teamIcon) || ""
					}
					style={{ pointerEvents: "none", marginRight: "8px" }}
				>
					{(!matchData.flipped
						? team1?.name.substring(0, 1)
						: team2?.name.substring(0, 1)) || "?"}
				</Avatar>
				{getTeamSelect(true)}
				<Divider
					orientation="vertical"
					flexItem
					sx={{ paddingLeft: "8px", paddingRight: "8px" }}
				>
					VS
				</Divider>

				{getTeamSelect(false)}
				<Avatar
					variant="square"
					style={{ pointerEvents: "none", marginLeft: "8px" }}
					src={
						(!matchData.flipped
							? team2?.icons?.teamIcon
							: team1?.icons?.teamIcon) || ""
					}
				>
					{(!matchData.flipped
						? team2?.name.substring(0, 1)
						: team1?.name.substring(0, 1)) || "?"}
				</Avatar>
			</Stack>
			<>
				<Dialog
					open={confirmDelete}
					onClose={() => setConfirmDelete(false)}
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
							Are you sure you want to delete this match?
						</Typography>
					</Box>
					<ButtonGroup variant="contained">
						<Button
							color="error"
							variant="contained"
							onClick={() => setConfirmDelete(false)}
							style={{ width: "50%" }}
						>
							Cancel
						</Button>
						<Button
							color="success"
							variant="contained"
							onClick={() => {
								matchData.deleted = true;
								setConfirmDelete(false);
								setTimeout(() => setKey(Math.random()), 100);
							}}
							style={{ width: "50%" }}
						>
							Confirm
						</Button>
					</ButtonGroup>
				</Dialog>

				<Dialog
					open={showSettings}
					onClose={() => setShowSettings(false)}
					aria-labelledby="modal-modal-title"
					sx={{ overflow: "hidden" }}
				>
					<Box
						sx={{
							width: 600,
							padding: "16px",
							overflowX: "hidden",
						}}
					>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							paddingBottom={"8px"}
						>
							Match Settings
						</Typography>
						<Accordion
							expanded={currentAccordion === "matchTitle"}
							onChange={() => setCurrentAccordion("matchTitle")}
						>
							<AccordionSummary
								aria-controls="matchTitle-content"
								id="matchTitle-header"
							>
								<Typography>Match Title</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									id="matchInformation "
									label="Match Information"
									variant="outlined"
									size="small"
									sx={{ minWidth: "100%" }}
									onChange={(e) => {
										matchData.information = e.target.value;
									}}
									defaultValue={matchData.information || ""}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={currentAccordion === "matchTitle2"}
							onChange={() => setCurrentAccordion("matchTitle2")}
						>
							<AccordionSummary
								aria-controls="matchTitle-content"
								id="matchTitle-header"
							>
								<Typography>Information Bar</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									sx={{
										paddingLeft: "8px",
										paddingTop: "8px",
										paddingBottom: "8px",
									}}
								>
									<Stack
										sx={{
											paddingLeft: "8px",
											paddingTop: "8px",
											paddingBottom: "8px",
											overflowX: "hidden",
											maxHeight: "400px",
											overflowY: "scroll",
										}}
									>
										{matchData.textBars
											.filter((t) =>
												t.deleted ? false : true
											)
											.map((t) => (
												<TextBarEditable textBar={t} />
											))}
									</Stack>
									<Fab
										aria-label="add"
										color="secondary"
										size="small"
										onClick={() => {
											matchData.textBars.push({
												text: "New Textbar",
												liveTime: 1000,
												deleted: false,
											} as TextBar);
											setTimeout(
												() => setKey(Math.random()),
												100
											);
										}}
									>
										<AddIcon />
									</Fab>

									<HtmlTooltip
										title={
											<Fragment>
												<Typography color="inherit">
													Information Bar Variables
												</Typography>
												<pre>%teamLeft%</pre>
												<pre>%teamRight%</pre>
												<pre>%mapNumber%</pre>
												<pre>%mapFormat%</pre>
												<pre>%mapName%</pre>
												<pre>%mapType%</pre>
												<pre>%teamLeftScore%</pre>
												<pre>%teamRightScore%</pre>
											</Fragment>
										}
									>
										<Button>Variables</Button>
									</HtmlTooltip>
								</Box>
							</AccordionDetails>
						</Accordion>
					</Box>

					<ButtonGroup variant="contained">
						<Button
							color="error"
							variant="contained"
							onClick={() => setShowSettings(false)}
							sx={{
								width: "100%",
							}}
						>
							Close
						</Button>
					</ButtonGroup>
				</Dialog>
			</>
		</>
	);
}
