import { Fade, Grid, Slide } from "@mui/material";
import { Player } from "common/types/Player";
import { Team } from "common/types/Team";
import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RosterDisplay } from "./components/RosterDisplay";
function Graphics(props: { currentTheme?: ThemeConfig }) {
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
					<Fade
						in={isDisplayed}
						timeout={1500}
						mountOnEnter
						easing="ease-in-out"
					>
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
					</Fade>
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
						<div
							style={{
								paddingLeft: "50px",
								paddingBottom: "0px",
								marginBottom: "0px",
								marginTop: "0px",
								display: "inline-block",
								verticalAlign: "center",
								float: "left",
							}}
						>
							<img
								src={
									(displayData.team.team1 as Team).icons
										?.teamIcon
								}
								alt=""
								style={{
									maxWidth: "98px",
									maxHeight: "98px",
									display: "inline-block",
									paddingRight: "30px",
									alignSelf: "center",
								}}
							/>
							<h1
								style={{
									color: "white",
									fontSize: "5rem",
									paddingBottom: "0px",
									marginBottom: "0px",
									marginTop: "0px",
									verticalAlign: "center",
									display: "inline-block",
								}}
							>
								{(displayData.team.team1 as Team).name}
							</h1>
						</div>
					</Slide>
					<Slide
						in={isDisplayed}
						direction="left"
						timeout={1500}
						mountOnEnter
						easing="ease-in-out"
					>
						<div
							style={{
								paddingRight: "50px",
								paddingBottom: "0px",
								marginBottom: "0px",
								marginTop: "0px",
								display: "inline-block",
								verticalAlign: "center",
								float: "right",
							}}
						>
							<h1
								style={{
									color: "white",
									fontSize: "5rem",
									paddingBottom: "0px",
									marginBottom: "0px",
									marginTop: "0px",
									textAlign: "right",
									verticalAlign: "center",
									display: "inline-block",
								}}
							>
								{(displayData.team.team2 as Team).name}
							</h1>
							<img
								src={
									(displayData.team.team2 as Team).icons
										?.teamIcon
								}
								alt=""
								style={{
									maxWidth: "98px",
									maxHeight: "98px",
									display: "inline-block",
									paddingLeft: "30px",
									alignSelf: "center",
								}}
							/>
						</div>
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
	<Wrapper>
		<Graphics />
	</Wrapper>,
	document.getElementById("root")
);
