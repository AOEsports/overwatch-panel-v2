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
	paddingTop: "4px",
	flexShrink: 1,
	flexGrow: 1,
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
							...(winner.team
								? {
										backgroundImage: `url(${winner.team.icons?.teamIcon})`,
										backgroundSize: "cover",
										backgroundPosition: "center center",
										backgroundRepeat: "no-repeat",
										textShadow: `2px 2px ${winner.team.colors.shadow}`,
								  }
								: {}),
							margin: "0px",
							borderLeft: `6px solid ${
								winner.team
									? winner.team.colors.primary
									: "#DE6F2B"
							}`,
							borderRight: `6px solid ${
								winner.team
									? winner.team.colors.primary
									: "#DE6F2B"
							}`,
							marginRight: "12px",
							display: "flex",
							flexGrow: 1,
							height: "100%",
							backgroundColor: "#353E46",
						}}
					>
						<h1
							style={
								winner.team
									? {
											...MapNamePlate,
											color: `${winner.team.colors.textColor}`,
									  }
									: MapNamePlate
							}
						>
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
							timeout={3250 + props.index * 500}
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
												opacity: "75%",
												mixBlendMode: "color",
											}}
										></span>
										<span
											style={{
												position: "absolute",
												textAlign: "left",
												paddingLeft: "50px",
												color:
													winner.team.colors
														.textColor || "white",
												textShadow: `4px 4px ${
													winner.team.colors.shadow ||
													"black"
												}`,
												fontFamily:
													"BigNoodleTooOblique",
												alignSelf: "center",
											}}
										>
											<span
												style={{
													paddingLeft: "24px",
													paddingRight: "64px",
													display: "inline-block",
													minWidth: "180px",
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
