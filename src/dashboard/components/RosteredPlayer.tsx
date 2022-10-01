import {
	Select,
	MenuItem,
	Box,
	SvgIcon,
	Stack,
	Divider,
	TextField,
} from "@mui/material";
import { Player } from "common/types/Player";
import React from "react";

export interface RosteredPlayerProps {
	playerData: Player;
	playerId: number;
	heroData: {
		heroes?: Array<{ name: string; file: string; classOverride?: string }>;
		allheroes?: Array<String>;
	};
}

export function RosteredPlayer({
	playerData,
	playerId,
	heroData,
}: RosteredPlayerProps) {
	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				style={{ paddingTop: "16px" }}
				divider={<Divider orientation="vertical" flexItem />}
			>
				<TextField
					id="playerName"
					label="Player ID"
					variant="outlined"
					style={{ width: "90px" }}
					disabled={true}
					value={`Player ${playerId}`}
				></TextField>
				<Select
					labelId="teamDropdown"
					onChange={(e) => {
						console.log(
							`Setting role`,
							e.target.value.toLowerCase()
						);
						playerData.role = e.target.value.toLowerCase() as
							| "dps"
							| "tank"
							| "support";
					}}
					placeholder={"Select role"}
					label={"Select Role"}
					defaultValue={playerData.role}
					style={{ minWidth: "64px" }}
					size="small"
					displayEmpty
				>
					<MenuItem value={"tank"}>
						<img
							src={`../assets/icons/Tank.png`}
							style={{
								maxHeight: "24px",
								paddingRight: "8px",
								pointerEvents: "none",
							}}
						/>
					</MenuItem>
					<MenuItem value={"dps"}>
						<img
							src={`../assets/icons/DPS.png`}
							style={{
								maxHeight: "24px",
								paddingRight: "8px",
								pointerEvents: "none",
							}}
						/>
					</MenuItem>
					<MenuItem value={"support"}>
						<img
							src={`../assets/icons/Support.png`}
							style={{
								maxHeight: "24px",
								paddingRight: "8px",
								pointerEvents: "none",
							}}
						/>
					</MenuItem>
				</Select>
				<TextField
					id="playerName"
					label="Player Name"
					variant="outlined"
					style={{ width: "50%" }}
					onChange={(e) => (playerData.name = e.target.value)}
					defaultValue={playerData.name}
				></TextField>
				<Select
					labelId="heroDropdown"
					onChange={(e) => {
						console.log(`Setting hero`, e.target.value);
						playerData.hero = e.target.value;
					}}
					placeholder={"Select hero"}
					label={"Select hero"}
					defaultValue={playerData.hero}
					style={{ minWidth: "30%" }}
					size="small"
					displayEmpty
				>
					{heroData.heroes?.map((hero) => {
						return (
							<MenuItem value={hero.name}>
								<img
									src={`../assets/headportraits/${hero.file}`}
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
								{hero.name}
							</MenuItem>
						);
					})}
				</Select>
			</Stack>
		</>
	);
}
