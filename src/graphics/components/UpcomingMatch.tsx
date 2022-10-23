import { Fade, Slide, Stack } from "@mui/material";
import { MatchData } from "common/types/MatchData";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import { ThemeConfig } from "common/types/ThemeConfig";
import { UnknownTeam } from "common/types/Unknowns";
import { CSSProperties } from "react";

export interface UpcomingMatchProps {
	matchData: MatchData;
	teams: TeamReplicant;
	displayed: boolean;
	index: number;
	currentMatch: boolean;
	theme?: ThemeConfig;
}

const CLIPPATH = {
	primaryDiv: {
		left: "polygon(-200% 0%, 100% 0%, 100% 100%, -200% 100%)",
		right: "polygon(0% 0%, 5000% 0%, 500% 100%, 0% 100%)",
	},
	scoreBox: {
		left: "polygon(0 0, 100% 0%, 100% 100%, 25% 100%)",
		right: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
	},
};

const OPPOSITE = {
	left: "right",
	right: "left",
};

function teamSlider(
	team: Team,
	side: "left" | "right",
	index: number,
	matchData: MatchData,
	teamScore: number,
	isCurrent: boolean,
	theme?: ThemeConfig
) {
	const imgSize = "100px";
	const topLevelDivStyle = {
		paddingBottom: "0px",
		marginBottom: "0px",
		marginTop: "0px",
		float: side,
		display: "inline-block",
		width: "800px",
		height: "100px",
		backgroundColor: theme?.Colors?.Match.Background || "#333333",
	} as CSSProperties;

	const logoStyle = {
		...(side == "left"
			? { paddingRight: "30px", marginLeft: "10px" }
			: { paddingLeft: "30px", marginRight: "10px" }),
		maxWidth: imgSize,
		minHeight: imgSize,
		objectFit: "contain",
		display: "inline-block",
		float: side,
	};
	const teamNameStyle = {
		color: theme?.Colors?.Match.Primary || "white",
		fontSize: "4.2rem",
		verticalAlign: "center",
		display: "inline-block",
		marginTop: "0px",
		marginBottom: "0px",
		float: side,
		textShadow: "4px 4px black",
	};
	const scoreStyle = {
		fontSize: "4rem",
		verticalAlign: "top",
		position: "relative",
		bottom: "0px",
		marginTop: "0px",
		paddingBottom: "8px",
		marginBottom: "0px",
		float: OPPOSITE[side] as any,
		width: "90px",
		height: "108px",
		backgroundColor: theme?.Colors?.Match.ScoreboxBackground || "gray",
		color: theme?.Colors?.Match.ScoreboxText || "#ED6516",
		textAlign: "center",
		overflow: "hidden",
		textShadow: "4px 4px black",
		clipPath: CLIPPATH.scoreBox[side],
	};
	if (matchData.completed) {
	}
	if (isCurrent) {
		return (
			<div
				style={{
					clipPath: CLIPPATH.primaryDiv[side],
					marginTop: "0px",
					marginBottom: "0px",
					paddingTop: "0px",
				}}
			>
				<Slide
					direction={side}
					in={true}
					mountOnEnter
					timeout={1700 + index * 250}
					easing="ease-in-out"
				>
					<div
						style={{
							...topLevelDivStyle,
							...(side == "left"
								? {
										borderLeft: `8px solid ${
											theme?.Colors?.Match
												.CurrentMatchBorder || "#ED6516"
										}`,
								  }
								: {
										borderRight: `8px solid ${
											theme?.Colors?.Match
												.CurrentMatchBorder || "#ED6516"
										}`,
								  }),
						}}
					>
						<img
							src={team.icons?.teamIcon}
							alt=""
							style={logoStyle as CSSProperties}
						/>
						<h1 style={teamNameStyle as CSSProperties}>
							{team.name}
						</h1>
						<h1 style={scoreStyle as CSSProperties}>{teamScore}</h1>
					</div>
				</Slide>
			</div>
		);
	}
	return (
		<div
			style={{
				clipPath: CLIPPATH.primaryDiv[side],
				marginTop: "0px",
				marginBottom: "0px",
				paddingTop: "0px",
			}}
		>
			<Slide
				direction={side}
				in={true}
				mountOnEnter
				timeout={1700 + index * 250}
				easing="ease-in-out"
			>
				<div
					style={{
						...topLevelDivStyle,
						...(side == "left"
							? {
									borderLeft: `8px solid ${
										theme?.Colors?.Match
											.DefaultMatchBorder || "#ED6516"
									}`,
							  }
							: {
									borderRight: `8px solid ${
										theme?.Colors?.Match
											.DefaultMatchBorder || "#ED6516"
									}`,
							  }),
					}}
				>
					<img
						src={team.icons?.teamIcon}
						alt=""
						style={logoStyle as CSSProperties}
					/>
					<h1 style={teamNameStyle as CSSProperties}>{team.name}</h1>
				</div>
			</Slide>
		</div>
	);
}

export function UpcomingMatch(props: UpcomingMatchProps) {
	const team1 =
		(props.matchData.team1id as any) != "Unknown"
			? props.teams.teams.filter(
					(t: Team) => t.teamId == props.matchData.team1id
			  )[0]
			: UnknownTeam;
	const team2 =
		(props.matchData.team2id as any) != "Unknown"
			? props.teams.teams.filter(
					(t: Team) => t.teamId == props.matchData.team2id
			  )[0]
			: UnknownTeam;
	if (!team1 || !team2) return <></>;
	return (
		<>
			<div
				style={{
					marginTop: "0px",
					marginBottom: "0px",
					paddingTop: "0px",
				}}
			>
				<div
					style={{
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
					}}
				>
					<Slide
						direction={"up"}
						in={true}
						mountOnEnter
						timeout={700 + props.index * 250}
						easing="ease-in-out"
					>
						<h3
							style={{
								textAlign: "center",
								fontSize: "2rem",
								paddingBottom: "0px",
								marginBottom: "0px",

								color:
									props.theme?.Colors?.Match
										.InformationText || "white",
							}}
						>
							{props.matchData.information}
						</h3>
					</Slide>
				</div>
				<Stack
					direction="row"
					sx={{ alignItems: "center", verticalAlign: "middle" }}
				>
					{teamSlider(
						team1,
						"left",
						props.index,
						props.matchData,
						props.matchData.team1score,
						props.currentMatch,
						props.theme
					)}
					<Fade
						in={true}
						mountOnEnter
						timeout={700 + props.index * 250}
						easing="ease-in-out"
					>
						<h1
							style={{
								paddingLeft: "48px",
								paddingRight: "48px",
								fontSize: "4.5rem",
								display: "inline-block",
								marginTop: "0px",
								marginBottom: "0px",
								height: "110px",
								backgroundColor:
									props.theme?.Colors?.Match.VSBlock ||
									"#333E48",
								color:
									props.theme?.Colors?.Match.VSBlockText ||
									"white",
							}}
						>
							VS
						</h1>
					</Fade>

					{teamSlider(
						team2,
						"right",
						props.index,
						props.matchData,
						props.matchData.team2score,
						props.currentMatch,
						props.theme
					)}
				</Stack>
			</div>
		</>
	);
}
