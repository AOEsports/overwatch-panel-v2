import ReactDOM from "react-dom";
import { Wrapper } from "common/Wrapper";
import { useState, useEffect, ReactElement } from "react";
import { RosterDisplay } from "./components/RosterDisplay";
import { Grid, Slide } from "@mui/material";
import { Player } from "common/types/Player";
import { Team } from "common/types/Team";
function Graphics() {
	const [displayData, setDisplayData] = useState({
		shown: false,
		team: { team1: null, team2: null },
	}) as [any, Function];
	const [listenerLoaded, setIsListenerLoaded] = useState(false) as [
		boolean,
		Function
	];
	const [isDisplayed, setDisplayedState] = useState(true) as [
		boolean,
		Function
	];
	const [topTeamDisplay, setTopTeamDisplay] = useState(<></>) as [
		ReactElement,
		Function
	];
	const [bottomTeamDisplay, setBottomTeamDisplay] = useState(<></>) as [
		ReactElement,
		Function
	];

	useEffect(() => {
		nodecg.listenFor("displayRoster", (data) => {
			setDisplayedState(false);
			if (data.shown) {
				setTimeout(() => {
					setDisplayData(data);
					setDisplayedState(true);
				}, 2000);
			}
		});
		setIsListenerLoaded(true);
		return nodecg.unlisten("displayRoster", () => {});
	}, [isDisplayed]);

	return (
		<>
			{displayData?.team.team1 ? (
				<>
					{!displayData?.team.team2 ? (
						<Slide
							in={isDisplayed}
							direction="right"
							timeout={1500}
							mountOnEnter
							easing="ease-in-out"
						>
							<h1
								style={{
									color: "white",
									paddingLeft: "50px",
									fontSize: "4.5rem",
									paddingBottom: "0px",
									marginBottom: "0px",
									paddingTop: "10px",
									marginTop: "0px",
								}}
							>
								<img
									src={
										(displayData.team.team1 as Team).icons
											?.teamIcon
									}
									alt=""
									style={{
										width: "128px",
										paddingRight: "32px",
									}}
								/>
								{(displayData.team.team1 as Team).name}
							</h1>
						</Slide>
					) : (
						<></>
					)}
					<Grid
						container
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						style={
							displayData?.team.team2
								? { paddingTop: "100px" }
								: {}
						}
					>
						{displayData.team.team1.players.map(
							(player: Player, index: number) => (
								<RosterDisplay
									size={
										displayData?.team.team2
											? "small"
											: "tall"
									}
									playerName={player.name || "Player"}
									hero={player.hero || "Genji"}
									role={player.role || "DPS"}
									index={5 - index}
									originalTeam={displayData.team.team1}
									displayed={isDisplayed}
								/>
							)
						)}
					</Grid>
				</>
			) : (
				<></>
			)}
			{displayData?.team.team2 ? (
				<>
					<span
						style={{
							color: "white",
							fontSize: "10rem",
							position: "fixed",
							top: "400px",
							left: "900px",
							textAlign: "center",
						}}
					>
						VS
					</span>
				</>
			) : (
				<></>
			)}
			{displayData?.team.team2 ? (
				<>
					<Slide
						in={isDisplayed}
						direction="right"
						timeout={1500}
						mountOnEnter
						easing="ease-in-out"
					>
						<h1
							style={{
								color: "white",
								paddingLeft: "50px",
								fontSize: "4.5rem",
								paddingBottom: "0px",
								marginBottom: "0px",
								paddingTop: "10px",
								marginTop: "0px",
								display: "inline",
							}}
						>
							<img
								src={
									(displayData.team.team1 as Team).icons
										?.teamIcon
								}
								alt=""
								style={{
									width: "128px",
									paddingRight: "32px",
								}}
							/>
							{(displayData.team.team1 as Team).name}
						</h1>
					</Slide>
					<Slide
						in={isDisplayed}
						direction="left"
						timeout={1500}
						mountOnEnter
						easing="ease-in-out"
					>
						<h1
							style={{
								color: "white",
								paddingLeft: "50px",
								fontSize: "4.5rem",
								paddingBottom: "0px",
								marginBottom: "0px",
								paddingTop: "10px",
								marginTop: "0px",
								textAlign: "right",
								display: "inline-block",
								float: "right",
							}}
						>
							{(displayData.team.team2 as Team).name}
							<img
								src={
									(displayData.team.team2 as Team).icons
										?.teamIcon
								}
								alt=""
								style={{
									width: "128px",
									paddingLeft: "32px",
									paddingRight: "32px",
								}}
							/>
						</h1>
					</Slide>
					<Grid
						container
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						sx={{
							paddingTop: "50px",
						}}
					>
						{displayData.team.team2.players.map(
							(player: Player, index: number) => (
								<RosterDisplay
									size="small"
									playerName={player.name || "Player"}
									hero={player.hero || "Genji"}
									role={player.role || "DPS"}
									index={0 + index}
									originalTeam={displayData.team.team2}
									displayed={isDisplayed}
									direction={"left"}
								/>
							)
						)}
					</Grid>
				</>
			) : (
				<></>
			)}
		</>
	);
}

ReactDOM.render(
	<Wrapper component={<Graphics />} />,
	document.getElementById("root")
);
