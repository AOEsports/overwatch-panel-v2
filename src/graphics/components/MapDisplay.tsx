import { Slide, Stack } from "@mui/material";
import { MapSelection } from "common/types/MapSelection";
import { MatchData } from "common/types/MatchData";
import { Team } from "common/types/Team";

export interface MapDisplayProps {
	index: number;
	displayed: boolean;
	mapSelection: MapSelection;
	currentMatch: MatchData;
	grey: boolean;
	team1: Team;
	team2: Team;
}

const MapDisplayStyle = {
	minHeight: "50px",
	width: "1520px",
	flexShrink: 1,
	flexGrow: 1,
	paddingTop: "4px",
};

const MapImageDisplay = {
	display: "inline-flex",
	width: "100%",
	height: "100%",
	backgroundPosition: "center center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	textAlign: "center" as const,
	fontSize: "4rem",
	flexGrow: 1,
};

const MapNamePlate = {
	marginTop: "0px",
	color: "white",
	alignSelf: "center",
	zIndex: 10,
	textAlign: "center" as const,
	verticalAlign: "middle",
	fontSize: "2.5rem",
	margin: "0px",
	width: "400px",
	padding: "4px",
	minHeight: "50px",
	flexGrow: 1,
};

export function MapDisplay(props: MapDisplayProps) {
	console.log(`displayed; `, props.displayed);
	let winner: { draw: boolean; team: Team | null } = {
		draw: false,
		team: null,
	};
	if (props.mapSelection.completed) {
		if (
			(props.mapSelection.team1score || 0) ==
			(props.mapSelection.team2score || 0)
		)
			winner.draw = true;
		if (
			props.mapSelection.team1score ||
			0 > (props.mapSelection.team2score || 0)
		)
			winner.team = props.team1;
		else winner.team = props.team2;
	}
	return (
		<>
			<Slide
				direction={"up"}
				in={props.displayed}
				mountOnEnter
				timeout={1000 + props.index * 250}
				easing="ease-in-out"
			>
				<Stack direction="row" style={MapDisplayStyle}>
					<div
						style={{
							margin: "0px",
							borderLeft: `6px solid ${
								winner.team
									? winner.team.colors.primary
									: "grey"
							}`,
							borderRight: `6px solid ${
								winner.team
									? winner.team.colors.primary
									: "grey"
							}`,
							marginRight: "12px",
						}}
					>
						<h1 style={MapNamePlate}>
							{(
								props.mapSelection.mapName || "Unknown"
							).toUpperCase()}
						</h1>
					</div>

					<div
						style={{
							clipPath:
								"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",

							width: "100%",
							height: "100%",
						}}
					>
						<Slide
							direction={"right"}
							in={props.displayed}
							mountOnEnter
							timeout={1500 + props.index * 250}
							easing="ease-in-out"
						>
							<div
								style={{
									...MapImageDisplay,
									backgroundImage: `url("../assets/maps/${props.mapSelection.mapImage}")`,
									filter: props.grey
										? "grayscale(100%)"
										: "none",
								}}
							>
								{winner.draw ? (
									<span>
										DRAW {props.mapSelection.team1score} -{" "}
										{props.mapSelection.team2score}
									</span>
								) : (
									<></>
								)}

								{winner.team ? (
									<>
										<span
											style={{
												width: "inherit",
												height: "inherit",
												backgroundColor:
													winner.team.colors.primary,
												mixBlendMode: "hue",
											}}
										></span>
										<span
											style={{
												width: "inherit",
												height: "inherit",
												position: "absolute",
												textAlign: "left",
												paddingLeft: "50px",
												color:
													winner.team.colors
														.textColor || "white",
												textShadow: `2px 2px ${
													winner.team.colors.shadow ||
													"black"
												}`,
											}}
										>
											<img
												src={
													winner.team.icons?.teamIcon
												}
												style={{
													width: "80px",
													maxHeight: "60px",
													filter: `drop-shadow(0px 0px 15px black)`,
													marginRight: "25px",
													objectFit: "contain",
													display: "inline-block",
												}}
											/>
											<span
												style={{
													paddingLeft: "24px",
													paddingRight: "64px",
													display: "inline-block",
													minWidth: "180px",
													transform:
														"translateY(-10px)",
												}}
											>
												{props.mapSelection
													.team1score || 0}{" "}
												-{" "}
												{props.mapSelection
													.team2score || 0}
											</span>
											<span
												style={{
													display: "inline-block",
													transform:
														"translateY(-10px)",
												}}
											>
												{winner.team.name}
											</span>
										</span>
									</>
								) : (
									<></>
								)}
							</div>
						</Slide>
					</div>
				</Stack>
			</Slide>
		</>
	);
}
