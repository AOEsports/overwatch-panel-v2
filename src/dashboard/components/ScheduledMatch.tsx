import {
	Stack,
	Divider,
	TextField,
	Paper,
	Chip,
	Avatar,
	ButtonGroup,
	Button,
	IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { MatchData } from "common/types/MatchData";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

export interface ScheduledMatchProps {
	matchObject: MatchData;
	currentMatch: boolean;
	matchNote: String;
}
function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

export function ScheduledMatch({
	matchObject,
	currentMatch,
	matchNote,
}: ScheduledMatchProps) {
	if (!matchObject || !matchObject.team1 || !matchObject.team2) return <></>;
	return (
		<>
			<Stack
				direction="row"
				style={{ paddingTop: "16px", paddingBottom: "16px" }}
			>
				<Avatar
					variant="square"
					src={matchObject.team1.icons?.teamIcon || ""}
				>
					?
				</Avatar>
				<TextField
					id="team1"
					label="Team 1"
					variant="outlined"
					style={{ width: "50%" }}
					InputProps={{
						readOnly: true,
					}}
					size="small"
					value={`${matchObject.team1.name}`}
				></TextField>
				<Divider
					orientation="vertical"
					flexItem
					sx={{ paddingLeft: "8px", paddingRight: "8px" }}
				>
					VS
				</Divider>
				<TextField
					id="team2"
					label="Team 2"
					variant="outlined"
					style={{ width: "50%" }}
					size="small"
					InputProps={{
						readOnly: true,
					}}
					value={matchObject.team2.name}
				></TextField>
				<Avatar
					variant="square"
					src={matchObject.team2.icons?.teamIcon || ""}
				>
					?
				</Avatar>
				<Divider orientation="vertical" />
				<ButtonGroup sx={{ paddingLeft: "8px" }}>
					<Button color="error">
						<DeleteIcon />
					</Button>
					<Button color="warning">
						<SwapHorizIcon />
					</Button>
					<Button color="success" disabled={currentMatch}>
						<CheckIcon />
					</Button>
				</ButtonGroup>
			</Stack>
		</>
	);
}
