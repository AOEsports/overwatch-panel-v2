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
					value={playerData.role}
					style={{ minWidth: "11%" }}
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
					variant="filled"
					style={{ width: "50%" }}
					onChange={(e) => (playerData.name = e.target.value)}
				></TextField>
				<Select
					labelId="heroDropdown"
					onChange={(e) => {
						console.log(`Setting hero`, e.target.value);
						playerData.hero = e.target.value;
					}}
					placeholder={"Select hero"}
					label={"Select hero"}
					value={playerData.hero}
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
										maxHeight: "24px",
										paddingRight: "8px",
										pointerEvents: "none",
										float: "left",
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
