import React from "react";
import ReactDOM from "react-dom";
import { useReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import {
	Button,
	ButtonGroup,
	CircularProgress,
	Grid,
	MenuItem,
	Select,
	Stack,
	StepLabel,
	TextField,
} from "@mui/material";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import TeamSelectorDropdown from "./components/TeamSelectorDropdown";

function Dashboard() {
	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;

	if (!teams)
		return (
			<>
				<CircularProgress color="inherit" />
			</>
		);
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
				<Grid item lg={2}>
					<h3 style={{ minWidth: "100%" }}>Team Roster Display</h3>

					<Stack direction="row" spacing={2}>
						<TeamSelectorDropdown
							teams={teams.teams}
							label="Select Team"
							style={{ minWidth: "60%", maxWidth: "60%" }}
							onChange={(team, e) => {
								console.log(
									`Loading team`,
									e.target.value,
									team
								);
							}}
							defaultValue={"Unknown"}
							showNoneOption={true}
							noneOptionText={"None"}
						/>

						<ButtonGroup
							style={{ minWidth: "40%", maxWidth: "40%" }}
						>
							<Button
								color="success"
								variant="contained"
								style={{ width: "50%" }}
								size="small"
							>
								Show
							</Button>
							<Button
								color="error"
								variant="contained"
								style={{ width: "50%" }}
								size="small"
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
