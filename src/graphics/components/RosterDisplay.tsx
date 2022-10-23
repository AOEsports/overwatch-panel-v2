import { Slide, Stack } from "@mui/material";
import { Team } from "common/types/Team";

export interface RosterDisplayProps {
	size: "small" | "tall" | "wide";
	playerName: string;
	role: "dps" | "tank" | "support" | "flex";
	hero: string;
	originalTeam?: Team;
	index: number;
	direction?: "left" | "right";
	displayed: boolean;
}

const PlayerDisplay = {
	wide: {
		maxWidth: "350px",
		minWidth: "350px",
		marginLeft: "10px",
		marginRight: "10px",
	},
	tall: {
		maxWidth: "350px",
		minWidth: "350px",
		marginLeft: "10px",
		marginRight: "10px",
	},
	small: {
		maxWidth: "250px",
		minWidth: "250px",
		marginLeft: "10px",
		marginRight: "10px",
	},
};

const HeroDisplay = {
	wide: {
		display: "inline-flex",
		maxWidth: "350px",
		maxHeight: "750px",
		minWidth: "350px",
		minHeight: "750px",
		backgroundPosition: "center top",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	},
	tall: {
		display: "inline-flex",
		maxWidth: "350px",
		maxHeight: "750px",
		minWidth: "350px",
		minHeight: "750px",
		backgroundPosition: "center top",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	},
	small: {
		display: "inline-flex",
		minWidth: "250px",
		minHeight: "300px",
		backgroundPosition: "center bottom",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
	},
};

const NamePlate = {
	marginTop: "0px",
	width: "100%",
	color: "white",
	alignSelf: "center",
	zIndex: 10,
	textAlign: "center" as const,
	verticalAlign: "middle",
	fontSize: "2.5rem",
};

function getImage(hero: string, size: string) {
	if (size == "small") return `../assets/herotaller/${hero}.webp`;
	if (size == "wide") return `../assets/wideportraits/${hero}.webp`;
	return `../assets/portraits/${hero}.png`;
}

export function RosterDisplay(props: RosterDisplayProps) {
	console.log(`displayed; `, props.displayed);
	return (
		<>
			<Slide
				direction={props.direction || "right"}
				in={props.displayed}
				mountOnEnter
				timeout={700 + props.index * 250}
				easing="ease-in-out"
			>
				<Stack direction="column" style={PlayerDisplay[props.size]}>
					<div
						style={{
							...HeroDisplay[props.size],
							backgroundImage: `url("${getImage(
								props.hero,
								props.size
							)}")`,
						}}
					></div>
					<div>
						<h1
							style={{
								...NamePlate,
								borderLeft: `6px solid ${
									props.originalTeam?.colors.player ||
									"#999fff"
								}`,
								borderRight: `6px solid  ${
									props.originalTeam?.colors.player ||
									"#999fff"
								}`,
							}}
						>
							{props.playerName.toUpperCase()}
						</h1>
					</div>
				</Stack>
			</Slide>
		</>
	);
}
