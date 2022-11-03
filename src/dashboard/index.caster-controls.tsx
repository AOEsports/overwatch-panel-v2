import { Icon } from "@iconify/react";
import {
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from "@mui/material";
import { DataStorage } from "common/types/replicants/DataStorage";
import { Wrapper } from "common/Wrapper";
import { useReplicantValue } from "../common/useReplicant";

function Dashboard() {
	const [dataStorage, setDataStorage] = useReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 1,
				textDataStorage: [],
				casterInformation: [],
			} as DataStorage,
		}
	) as [DataStorage, Function];

	if (!dataStorage.casterInformation) {
		dataStorage.casterInformation = [
			{ name: "Caster 1", icon: "twitter", pronouns: "he/him" },
			{ name: "Caster 2", icon: "twitch", pronouns: "she/her" },
			{ name: "Caster 3", icon: "discord", pronouns: "they/them" },
			{ name: "Caster 4", icon: "instagram", pronouns: "xey/xem" },
		];
		return <>Loading, please hold</>;
	}
	return (
		<>
			<Stack divider={<Divider />}>
				{dataStorage.casterInformation.map(
					(caster: any, index: number) => {
						return (
							<div key={`caster-${index}`}>
								<ButtonGroup>
									<FormControl sx={{ width: "15%" }}>
										<InputLabel id={`caster-${index}-icon`}>
											Icon
										</InputLabel>
										<Select
											labelId={`caster-${index}-icon`}
											label={`Icon`}
											defaultValue={caster.icon}
											onChange={(e) => {
												caster.icon = e.target.value;
											}}
										>
											<MenuItem value={"discord"}>
												<Icon
													icon="simple-icons:discord"
													style={{ color: "#5865F2" }}
												/>
											</MenuItem>
											<MenuItem value={"twitch"}>
												<Icon
													icon="simple-icons:twitch"
													style={{ color: "#9146FF" }}
												/>
											</MenuItem>
											<MenuItem value={"twitter"}>
												<Icon
													icon="simple-icons:twitter"
													style={{ color: "#1DA1F2" }}
												/>
											</MenuItem>
											<MenuItem value={"instagram"}>
												<Icon
													icon="simple-icons:instagram"
													style={{ color: "#E4405F" }}
												/>
											</MenuItem>
										</Select>
									</FormControl>
									<TextField
										id={`caster-${index}-name`}
										label={`Caster ${index + 1} Name`}
										variant="filled"
										style={{ width: "50%" }}
										onChange={(e) => {
											caster.name = e.target.value;
										}}
										defaultValue={caster.name}
									></TextField>
									<TextField
										id={`caster-${index}-pronouns`}
										label="Caster Pronouns"
										variant="filled"
										style={{ width: "35%" }}
										onChange={(e) => {
											caster.pronouns = e.target.value;
										}}
										defaultValue={caster.pronouns}
									></TextField>
								</ButtonGroup>
							</div>
						);
					}
				)}
			</Stack>
		</>
	);
}

import { ButtonGroup, TextField } from "@mui/material";
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper isDashboard={true} cssInject={{ padding: "16px" }}>
		<Dashboard />
	</Wrapper>
);
