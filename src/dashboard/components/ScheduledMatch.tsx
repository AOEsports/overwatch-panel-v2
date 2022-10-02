import {
	Stack,
	Divider,
	TextField,
	Avatar,
	ButtonGroup,
	Button,
	Skeleton,
	Typography,
	MenuItem,
	Select,
	InputLabel,
} from "@mui/material";
import { MatchData } from "common/types/MatchData";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { DataStorage } from "../../common/types/replicants/DataStorage";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { useState } from "react";

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
		const rand = Math.random();
		return (
			<>
				<Select
					labelId={`teamDropdown-${rand}`}
					label={`Select`}
					variant="outlined"
					onChange={(e) => {
						console.log(`Loading team`, e.target.value);
						if (team1) {
							if (!matchData.flipped)
								matchData.team1id = e.target.value as any;
							else matchData.team2id = e.target.value as any;
						} else {
							if (!matchData.flipped)
								matchData.team2id = e.target.value as any;
							else matchData.team1id = e.target.value as any;
						}
						setTimeout(() => setKey(Math.random()), 100);
					}}
					style={{ width: "50%" }}
					size="small"
					defaultValue={
						((!matchData.flipped
							? team1
								? matchData.team1id
								: matchData.team2id
							: team1
							? matchData.team2id
							: matchData.team1id) as any) || "TBD"
					}
					value={
						((!matchData.flipped
							? team1
								? matchData.team1id
								: matchData.team2id
							: team1
							? matchData.team2id
							: matchData.team1id) as any) || "TBD"
					}
				>
					<MenuItem value={"TBD"}>To Be Determined</MenuItem>
					{teams.teams.map((team) => {
						return team.icons?.teamIcon ? (
							<MenuItem value={team.teamId}>
								<img
									src={team.icons?.teamIcon}
									style={{
										minHeight: "24px",
										maxHeight: "24px",
										aspectRatio: "1/ 1",
										minWidth: "32px",
										objectFit: "scale-down",
										paddingRight: "8px",
										pointerEvents: "none",
									}}
								/>
								{team.name}
							</MenuItem>
						) : (
							<MenuItem value={team.teamId as any}>
								{team.name}
							</MenuItem>
						);
					})}
				</Select>
			</>
		);
	}

	return (
		<>
			<Divider role="presentation" flexItem key={key}>
				<ButtonGroup>
					<TextField
						id="matchInformation "
						label="Match Information"
						variant="outlined"
						size="small"
						sx={{ minWidth: "200px" }}
						onChange={(e) => {
							matchData.information = e.target.value;
						}}
						defaultValue={matchData.information || ""}
					/>
					<Button color="error">
						<DeleteIcon />
					</Button>
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
		</>
	);
}
