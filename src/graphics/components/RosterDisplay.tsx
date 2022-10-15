import { Slide, Stack } from "@mui/material";
import { Team } from "common/types/Team";

export interface RosterDisplayProps {
	size: "small" | "tall";
	playerName: string;
	role: "dps" | "tank" | "support" | "flex";
	hero: string;
	originalTeam?: Team;
	index: number;
	direction?: "left" | "right";
	displayed: boolean;
}

const PlayerDisplay = {
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
		maxWidth: "250px",
		maxHeight: "250px",
		minWidth: "250px",
		minHeight: "250px",
		backgroundPosition: "center top",
		backgroundRepeat: "no-repeat",
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
							backgroundImage:
								props.size == "small"
									? `url(../assets/headportraits/${props.hero}.png)`
									: `url(../assets/portraits/${props.hero}.png)`,
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
						{/* fuck role icons for the time being
						<span
							style={{
								...RoleIcon,
								backgroundImage: `url(../assets/icons/${props.role}.png)`,
							}}
						></span> */}
					</div>
				</Stack>
			</Slide>
		</>
	);
}
