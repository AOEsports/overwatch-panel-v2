import { Divider, Fade, Slide, Stack } from "@mui/material";
import { MatchData } from "common/types/MatchData";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";

export interface UpcomingMatchProps {
	matchData: MatchData;
	teams: TeamReplicant;
	displayed: boolean;
	index: number;
	currentMatch: boolean;
}

const CLIPPATH = {
	left: "polygon(-200% 0%, 100% 0%, 100% 100%, -200% 100%)",
	right: "polygon(0% 0%, 5000% 0%, 500% 100%, 0% 100%)",
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
	isCurrent: boolean
) {
	const padding =
		side == "left" ? { paddingRight: "30px" } : { paddingLeft: "30px" };
	const imgSize = "78px";
	if (matchData.completed) {
	}
	if (isCurrent) {
		return (
			<div
				style={{
					clipPath: CLIPPATH[side],
				}}
			>
				<Slide
					direction={side}
					in={true}
					mountOnEnter
					timeout={700 + index * 250}
					easing="ease-in-out"
				>
					<div
						style={{
							paddingBottom: "0px",
							marginBottom: "0px",
							marginTop: "0px",
							float: side,
							display: "inline-block",
							width: "400px",
						}}
					>
						<img
							src={team.icons?.teamIcon}
							alt=""
							style={{
								...padding,
								maxWidth: imgSize,
								minHeight: imgSize,
								objectFit: "contain",
								display: "inline-block",
								float: side,
							}}
						/>
						<h1
							style={{
								color: "black",
								fontSize: "3rem",
								verticalAlign: "center",
								display: "inline-block",
								marginTop: "0px",
								marginBottom: "0px",
								float: side,
							}}
						>
							{team.name}
						</h1>
						<h1
							style={{
								color: "black",
								fontSize: "3rem",
								verticalAlign: "center",
								display: "inline-block",
								marginTop: "0px",
								marginBottom: "0px",
								float: OPPOSITE[side] as any,
							}}
						>
							{teamScore}
						</h1>
					</div>
				</Slide>
			</div>
		);
	}
	return (
		<div
			style={{
				clipPath: CLIPPATH[side],
			}}
		>
			<Slide
				direction={side}
				in={true}
				mountOnEnter
				timeout={700 + index * 250}
				easing="ease-in-out"
			>
				<div
					style={{
						paddingBottom: "0px",
						marginBottom: "0px",
						marginTop: "0px",
						float: side,
						display: "inline-block",
						width: "400px",
					}}
				>
					<img
						src={team.icons?.teamIcon}
						alt=""
						style={{
							...padding,
							maxWidth: imgSize,
							minHeight: imgSize,
							objectFit: "contain",
							display: "inline-block",
							float: side,
						}}
					/>
					<h1
						style={{
							color: "black",
							fontSize: "3rem",
							verticalAlign: "center",
							display: "inline-block",
							marginTop: "0px",
							marginBottom: "0px",
							float: side,
						}}
					>
						{team.name}
					</h1>
				</div>
			</Slide>
		</div>
	);
}

export function UpcomingMatch(props: UpcomingMatchProps) {
	const team1 = props.teams.teams.filter(
		(t: Team) => t.teamId == props.matchData.team1id
	)[0];
	const team2 = props.teams.teams.filter(
		(t: Team) => t.teamId == props.matchData.team2id
	)[0];
	if (!team1 || !team2) return <></>;
	return (
		<>
			<div>
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
								fontSize: "2.5rem",
								paddingBottom: "0px",
								marginBottom: "0px",
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
						props.currentMatch
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
								fontSize: "4rem",
								display: "inline-block",
								marginTop: "0px",
								marginBottom: "0px",
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
						props.currentMatch
					)}
				</Stack>
			</div>
		</>
	);
}
