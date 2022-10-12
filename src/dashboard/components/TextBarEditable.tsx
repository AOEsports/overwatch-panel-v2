import { Stack, Divider, TextField, Button } from "@mui/material";
import { TextBar } from "common/types/TextBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export interface TextBarProps {
	textBar: TextBar;
}

export function TextBarEditable({ textBar }: TextBarProps) {
	const [deleted, setDeleted] = useState(false) as [boolean, Function];
	if (textBar.deleted || deleted) return <></>;
	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				style={{
					paddingTop: "8px",
					paddingBottom: "8px",
					marginRight: "8px",
				}}
				divider={<Divider orientation="vertical" flexItem />}
			>
				<TextField
					id="text"
					label="Text to Display"
					variant="outlined"
					style={{ width: "65%" }}
					onChange={(e) => (textBar.text = e.target.value)}
					defaultValue={textBar.text}
				/>
				<TextField
					id="time"
					label="MS to display"
					variant="outlined"
					style={{ width: "25%" }}
					type="number"
					onChange={(e) =>
						(textBar.liveTime = Number.parseInt(e.target.value))
					}
					defaultValue={textBar.liveTime}
				/>
				<Button
					color="error"
					variant="contained"
					onClick={() => {
						textBar.deleted = true;
						setDeleted(true);
					}}
					size="small"
					sx={{
						width: "5%",
					}}
				>
					<DeleteIcon />
				</Button>
			</Stack>
		</>
	);
}
