import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";
import {
	BottomNavigation,
	BottomNavigationAction,
	Button,
	ButtonGroup,
	Chip,
	Divider,
	Input,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { getCurrentMatchWithTeamsAsState } from "common/Helper";
import { MapSelection } from "common/types/MapSelection";
import { Team } from "common/types/Team";
import { Wrapper } from "common/Wrapper";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function pullMapData(method: Function) {
	return fetch("../assets/data/maps.json")
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

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function mapSelector(
	mapInformation: MapSelection,
	mapIndex: number,
	windowDimensions: { width: number; height: number },
	selectedMap: { index: number; setSelectedMap: Function }
) {
	return (
		<div
			style={{
				paddingTop: "4px",
				paddingBottom: "4px",
				cursor: "pointer",
				userSelect: "none",
				borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
				display: "flex",
				alignItems: "center",
				backgroundColor:
					selectedMap.index == mapIndex ? "rgba(0,0,0,0.5)" : "",
			}}
			key={`map-${mapIndex}`}
			onClick={() => selectedMap.setSelectedMap(mapIndex)}
		>
			{windowDimensions.width > 550 ? (
				<>
					<img
						src={`../assets/icons/${mapInformation.mapIcon}`}
						style={{
							maxWidth: "24px",
							maxHeight: "24px",
							paddingRight: "8px",
							objectFit: "contain",
							display: "inline",
						}}
					/>
					<span
						style={{
							paddingTop: "4px",
							display: "inline",
							userSelect: "none",
							fontSize: ".9rem",
							textDecoration: mapInformation.completed
								? "line-through"
								: "",
						}}
					>
						{mapInformation.mapName}
					</span>
				</>
			) : (
				<img
					src={`../assets/icons/${mapInformation.mapIcon}`}
					style={{
						maxWidth: "24px",
						maxHeight: "24px",
						objectFit: "contain",
						paddingRight: "8px",
						display: "inline",
					}}
				/>
			)}
		</div>
	);
}

function getGamemode(gamemode: string, mapData: any) {
	return Object.values(mapData.gamemodes).filter(
		(gm: any) => gm.name == gamemode
	)[0];
}

function getMapsForGamemode(gamemode: string, mapData: any) {
	return Object.values(mapData.allmaps).filter(
		(map: any) => map.gamemode == gamemode
	);
}

function mapEditor(
	mapInformation: MapSelection,
	mapIndex: number,
	selectedMap: { index: number; setSelectedMap: Function },
	updateMap: Function,
	mapData: any,
	teams: { team1: Team; team2: Team }
) {
	if (selectedMap.index != mapIndex) return <></>;
	return (
		<>
			<div
				key={`mapEditor-${mapIndex}`}
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					paddingLeft: "8px",
					paddingRight: "8px",
				}}
			>
				<FormControl fullWidth>
					<InputLabel id="mapSelect-label">Select Map</InputLabel>
					<Select
						labelId="mapSelect-label"
						label="mapSelect-label"
						id="mapSelect"
						value={JSON.stringify({
							mapName: mapInformation.mapName,
							mapGamemode: mapInformation.mapGamemode,
							mapImage: mapInformation.mapImage,
							mapIcon: mapInformation.mapIcon,
						})}
						size="small"
						onChange={(e) => {
							const parsed = JSON.parse(
								e.target.value as string
							) as MapSelection;
							mapInformation.mapGamemode = parsed.mapGamemode;
							mapInformation.mapName = parsed.mapName;
							mapInformation.mapImage = parsed.mapImage;
							mapInformation.mapIcon = parsed.mapIcon;
							updateMap();
						}}
					>
						{mapData.gamemodes.map(
							(
								gamemode: {
									file: string;
									name: string;
								},
								_index: number
							) => {
								const maps = getMapsForGamemode(
									gamemode.name,
									mapData
								) as [];
								if (maps.length == 0) return <></>;
								const returns = [
									<ListSubheader
										style={{
											backgroundImage: `url("../assets/icons/${gamemode.file}")`,
											backgroundSize: "15%",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "100% 50%",
										}}
										key={`gamemode-${gamemode.name}`}
									>
										{gamemode.name}
									</ListSubheader>,
								];
								maps.forEach(
									(
										map: {
											file: string;
											gamemode: string;
											name: string;
										},
										_index: number
									) => {
										returns.push(
											<MenuItem
												key={`map-${map.name}`}
												value={JSON.stringify({
													mapName: map.name,
													mapGamemode: map.gamemode,
													mapImage: map.file,
													mapIcon: gamemode.file,
												})}
												style={{
													backgroundImage: `url("../assets/maps/${map.file}")`,
													backgroundSize: "50%",
													backgroundRepeat:
														"no-repeat",
													backgroundPosition:
														"120% 50%",
													maskImage:
														"linear-gradient(to right, rgb(255, 255, 255) 59%, transparent 60%, rgb(255, 255, 255))",
												}}
											>
												<span
													style={{
														maskImage: "none",
													}}
												>
													{map.name}
												</span>
											</MenuItem>
										);
									}
								);
								return returns;
							}
						)}
					</Select>
				</FormControl>
			</div>
			<Divider>
				<Chip label="Map Scores" />
			</Divider>
			<div
				key={`mapScores-${mapIndex}`}
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					paddingLeft: "8px",
					paddingRight: "8px",
				}}
			>
				<div
					style={{
						paddingLeft: "8px",
						paddingRight: "8px",
					}}
				>
					<InputLabel
						id="mapteam1scorelabel"
						style={{
							paddingTop: "8px",
							paddingRight: "16px",
							display: "inline-block",
							width: "80%",
						}}
					>
						{teams.team1.name}
					</InputLabel>
					<Input
						value={mapInformation.team1score || 0}
						size="small"
						id="mapteam1Score"
						onChange={(e) => {
							mapInformation.team1score = parseInt(
								e.target.value
							);
							updateMap();
						}}
						disableUnderline={true}
						style={{
							display: "inline-block",
							paddingTop: "8px",
							width: "20%",
							backgroundColor: "rgba(0, 0, 0, 0.2)",
						}}
						inputProps={{
							step: 1,
							min: 0,
							max: 100,
							type: "number",
							"aria-labelledby": "team1scorelabel",
						}}
					/>
					<Divider />
					<InputLabel
						id="mapteam2scorelabel"
						style={{
							paddingTop: "8px",
							paddingRight: "16px",
							display: "inline-block",
							width: "80%",
						}}
					>
						{teams.team2.name}
					</InputLabel>
					<Input
						value={mapInformation.team2score || 0}
						size="small"
						id="mapteam2Score"
						key="mapteam2Score"
						onChange={(e) => {
							mapInformation.team2score = parseInt(
								e.target.value
							);
							updateMap();
						}}
						disableUnderline={true}
						style={{
							display: "inline-block",
							paddingTop: "8px",
							width: "20%",
							backgroundColor: "rgba(0, 0, 0, 0.2)",
						}}
						inputProps={{
							step: 1,
							min: 0,
							max: 100,
							type: "number",
							"aria-labelledby": "team2scorelabel",
						}}
					/>
					<Divider />

					<InputLabel
						id="mapcompletedlabel"
						key="mapcompleted"
						style={{
							paddingTop: "8px",
							paddingRight: "16px",
							display: "inline-block",
							width: "80%",
						}}
					>
						Map Completed?
					</InputLabel>
					<Checkbox
						id="mapcompleted"
						checked={mapInformation.completed || false}
						style={{
							display: "inline-block",
						}}
						onChange={(e) => {
							console.log(`changed`, e.target.checked);
							mapInformation.completed = e.target.checked;
							updateMap();
						}}
					/>
				</div>
			</div>
		</>
	);
}

function MapManager() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	const { state, updateState } = getCurrentMatchWithTeamsAsState();
	const [mapData, setMapData] = useState() as [any, Function];
	const { team1, team2, currentMatch } = state;
	const [selectedMapIndex, setSelectedMapIndex] = useState(-1) as [
		number,
		Function
	];
	const [key, setKey] = useState(-100);
	const [autoUpdate, setAutoUpdate] = useState(false);
	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!state) return <></>;
	if (!mapData) pullMapData(setMapData);
	function updateMap(force?: boolean) {
		let newTeam1Score = 0;
		let newTeam2Score = 0;
		currentMatch.mapLineup?.maps.forEach((map: MapSelection) => {
			if (map.completed) {
				if ((map.team1score || 0) > (map.team2score || 0))
					newTeam1Score++;
				if ((map.team2score || 0) > (map.team1score || 0))
					newTeam2Score++;
			}
		});
		setTimeout(() => {
			currentMatch.team1score = newTeam1Score;
			currentMatch.team2score = newTeam2Score;
			updateState(
				{
					...state,
					currentMatch,
				},
				force || autoUpdate
			);
			setKey(Math.random());
		}, 100);
	}

	return (
		<>
			<div
				style={{
					minHeight: "560px",
					maxHeight: "560px",
					overflow: "hidden",
				}}
			>
				<Typography
					variant={windowDimensions.width <= 550 ? "subtitle1" : "h4"}
				>
					{team1.name} vs {team2.name}
				</Typography>
				<Stack
					spacing={4}
					direction="row"
					divider={<Divider variant="middle" />}
				>
					<Stack
						spacing={4}
						direction="column"
						key={`${
							currentMatch.mapLineup?.maps.length || -1
						}-matches`}
						style={{
							width:
								windowDimensions.width > 550 ? "10em" : "4em",
						}}
					>
						<div
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.2)",
								height: "430px",
								paddingLeft: "8px",
								paddingRight: "8px",
								paddingTop: "4px",
								paddingBottom: "4px",
							}}
						>
							{currentMatch.mapLineup ? (
								currentMatch.mapLineup!.maps.map(
									(map: MapSelection, index: number) => {
										return mapSelector(
											map,
											index,
											windowDimensions,
											{
												index: selectedMapIndex,
												setSelectedMap:
													setSelectedMapIndex,
											}
										);
									}
								)
							) : (
								<></>
							)}
						</div>
						<ButtonGroup>
							<Button
								variant="contained"
								style={{ width: "50%" }}
								onClick={() => {
									const newDefaultMap: MapSelection = {
										mapName: "Upcoming",
										mapGamemode: "Upcoming",
										mapIcon: "Upcoming.png",
										mapImage: "Control.png",
									};
									if (!currentMatch.mapLineup!.maps)
										currentMatch.mapLineup!.maps =
											[] as MapSelection[];
									currentMatch.mapLineup!.maps.push(
										newDefaultMap
									);
									setSelectedMapIndex(
										currentMatch.mapLineup!.maps.length - 1
									);

									setTimeout(
										() => setKey(Math.random()),
										100
									);
								}}
							>
								<AddIcon />
							</Button>
							<Button
								variant="contained"
								color="error"
								style={{ width: "50%" }}
								disabled={selectedMapIndex == -1}
								onClick={() => {
									setTimeout(
										() => setKey(Math.random()),
										100
									);
								}}
							>
								<DeleteIcon />
							</Button>
						</ButtonGroup>
					</Stack>
					<div>
						<Stack
							spacing={4}
							direction="column"
							sx={{
								minWidth: "400px",
								paddingLeft: "8px",
							}}
						>
							<Divider>
								<Chip label="Overall Match Score" />
							</Divider>
							<div
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.2)",
									paddingLeft: "8px",
									paddingRight: "8px",
								}}
							>
								<InputLabel
									id="team1scorelabel"
									style={{
										paddingTop: "8px",
										paddingRight: "16px",
										display: "inline-block",
										width: "80%",
									}}
								>
									{team1.name}
								</InputLabel>
								<Input
									value={currentMatch.team1score || 0}
									size="small"
									id="team1Score"
									readOnly={true}
									onChange={(e) => {
										currentMatch.team1score = parseInt(
											e.target.value
										);

										updateMap();
									}}
									disableUnderline={true}
									style={{
										display: "inline-block",
										paddingTop: "8px",
										width: "20%",
										backgroundColor: "rgba(0, 0, 0, 0.2)",
									}}
								/>
								<Divider />
								<InputLabel
									id="team2scorelabel"
									style={{
										paddingTop: "8px",
										paddingRight: "16px",
										display: "inline-block",
										width: "80%",
									}}
								>
									{team2.name}
								</InputLabel>
								<Input
									value={currentMatch.team2score || 0}
									size="small"
									id="team2Score"
									readOnly={true}
									onChange={(e) => {
										currentMatch.team2score = parseInt(
											e.target.value
										);
										updateMap();
									}}
									disableUnderline={true}
									style={{
										display: "inline-block",
										paddingTop: "8px",
										width: "20%",
										backgroundColor: "rgba(0, 0, 0, 0.2)",
									}}
								/>
								<Divider />
								<InputLabel
									id="matchcompletedlabel"
									style={{
										paddingTop: "8px",
										paddingRight: "16px",
										display: "inline-block",
										width: "80%",
									}}
								>
									Match Completed?
								</InputLabel>
								<Checkbox
									id="matchcompleted"
									checked={currentMatch.completed || false}
									style={{
										display: "inline-block",
									}}
									onChange={(e) => {
										currentMatch.completed =
											e.target.checked;
										updateMap();
									}}
								/>
							</div>
							<Divider>
								<Chip label="Scoring Format" />
							</Divider>
							<div>
								<FormControl sx={{ m: 4 }}>
									<Select
										id="scoringFormat"
										size="small"
										value={
											currentMatch.mapLineup
												?.scoringType || "ft"
										}
										onChange={(e) => {
											currentMatch.mapLineup!.scoringType =
												e.target.value as "ft" | "bo";
											updateMap();
										}}
									>
										<MenuItem value={"ft"}>
											First to (FT)
										</MenuItem>
										<MenuItem value={"bo"}>
											Best Of (BO)
										</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ m: 2 }}>
									<Select
										id="scoringFormat"
										value={
											currentMatch.mapLineup?.scoreaim ||
											3
										}
										size="small"
										onChange={(e) => {
											currentMatch.mapLineup!.scoreaim =
												parseInt(e.target.value as any);
											updateMap();
										}}
									>
										{Array.from(Array(20)).map(
											(_, index) => (
												<MenuItem value={index + 1}>
													{index + 1}
												</MenuItem>
											)
										)}
									</Select>
								</FormControl>
							</div>
							<Divider>
								<Chip label="Map Select" />
							</Divider>
							{currentMatch.mapLineup && selectedMapIndex > -1 ? (
								currentMatch.mapLineup!.maps.map(
									(map: MapSelection, index: number) => {
										return mapEditor(
											map,
											index,
											{
												index: selectedMapIndex,
												setSelectedMap:
													setSelectedMapIndex,
											},
											updateMap,
											mapData,
											{ team1, team2 }
										);
									}
								)
							) : (
								<>
									Select a map from the side bar or add a new
									map
								</>
							)}
						</Stack>
					</div>
				</Stack>
				<BottomNavigation
					showLabels
					sx={{
						position: "fixed",
						bottom: "0px",
						left: "0px",
						width: "100%",
						zIndex: "2",
					}}
				>
					<BottomNavigationAction
						onClick={() => {
							setAutoUpdate(!autoUpdate);
						}}
						label={autoUpdate ? "Stop Auto Sync" : "Auto Sync"}
						icon={autoUpdate ? <SyncIcon /> : <SyncDisabledIcon />}
					/>
					<BottomNavigationAction
						onClick={() => {
							updateMap(true);
						}}
						label={"Send Changes to Overlay"}
						icon={<SaveIcon />}
					/>
				</BottomNavigation>
			</div>
		</>
	);
}

ReactDOM.render(
	<Wrapper isDashboard={true} cssInject={{ padding: "16px" }}>
		<MapManager />
	</Wrapper>,
	document.getElementById("root")
);
