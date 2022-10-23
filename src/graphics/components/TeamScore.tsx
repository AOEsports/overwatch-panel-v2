import { Slide, Stack } from "@mui/material";
import { fontSize } from "@mui/system";
import { MatchData } from "common/types/MatchData";
import { Team } from "common/types/Team";
import { ThemeConfig } from "common/types/ThemeConfig";

export interface TeamScoreProps {
	matchData: MatchData;
	team: Team;
	teamScore: number;
	side: "left" | "right";
	theme?: ThemeConfig;
	displayed: boolean;
}
const OPPOSITE = {
	left: "right",
	right: "left",
};

const PARENTDIV = {
	shared: {
		width: "685px",
		height: "46px",
		verticalAlign: "middle",
	},
	left: {
		position: "fixed",
		top: "13px",
		left: "-7px",
	},
	right: {
		position: "fixed",
		top: "13px",
		right: "-7px",
	},
};

export function TeamScore(props: TeamScoreProps) {
	if (!props.team || !props.matchData) return <></>;
	return (
		<>
			<div
				style={{
					...(PARENTDIV.shared as any),
					...(PARENTDIV[props.side] as any),
					fontSize: "2.35rem",
				}}
			>
				<div
				// style={{
				// 	clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
				// }}
				>
					<Slide
						direction={OPPOSITE[props.side] as any}
						in={props.displayed}
						mountOnEnter
						timeout={1500}
						easing="ease-in-out"
					>
						{props.side == "left" ? (
							<div>
								<Stack
									direction="row"
									style={{
										width: "574px",
										height: "46px",
										verticalAlign: "middle",
										backgroundColor:
											props.theme?.Colors?.Score
												.Background || "#333333",
										borderRight: `6px solid #27aae1`,
										borderRadius: "0px 2px 2px 0px",
									}}
								>
									<span
										style={{
											color:
												props.theme?.Colors?.Score
													.Text || "white",
											verticalAlign: "center",
											textShadow: `2px 2px ${
												props.team.colors.shadow ||
												"black"
											}`,
											textAlign: "right",
											width: "70%",
											position: "relative",
											top: "-5px",
										}}
									>
										{props.team.name}
									</span>
									<span
										style={{
											backgroundColor:
												props.team.colors.primary ||
												"#27aae1",
											backgroundImage: `url("${props.team.icons?.teamIcon}")`,
											backgroundPosition: "center",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											width: "80px",
											height: "46px",
											zIndex: 1,
											opacity: 1,
											marginRight: "5%",
											marginLeft: "5%",
										}}
									></span>
									<span
										style={{
											color:
												props.theme?.Colors?.Score
													.Text || "white",
											verticalAlign: "center",
											textShadow: `2px 2px ${
												props.team.colors.shadow ||
												"black"
											}`,
											textAlign: "right",
											fontSize: "3rem",
											position: "relative",
											top: "-13px",
											paddingRight: "30px",
										}}
									>
										{props.teamScore}
									</span>
								</Stack>
							</div>
						) : (
							<div>
								<Stack
									direction="row"
									style={{
										width: "574px",
										height: "46px",
										verticalAlign: "middle",
										transform: "translateX(110px)",
										backgroundColor:
											props.theme?.Colors?.Score
												.Background || "#333333",
										borderLeft: `6px solid #c80013`,
										borderRadius: "2px 0px 0px 2px",
									}}
								>
									<span
										style={{
											color:
												props.theme?.Colors?.Score
													.Text || "white",
											verticalAlign: "center",
											textShadow: `2px 2px  ${
												props.team.colors.shadow ||
												"black"
											}`,
											textAlign: "right",
											fontSize: "3rem",
											position: "relative",
											top: "-13px",
											paddingLeft: "30px",
										}}
									>
										{props.teamScore}
									</span>
									<span
										style={{
											backgroundColor:
												props.team.colors.primary ||
												"#c80013",
											backgroundImage: `url("${props.team.icons?.teamIcon}")`,
											backgroundPosition: "center",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											width: "80px",
											height: "46px",
											zIndex: 1,
											opacity: 1,
											marginRight: "5%",
											marginLeft: "5%",
										}}
									></span>
									<span
										style={{
											color:
												props.theme?.Colors?.Score
													.Text || "white",
											verticalAlign: "center",
											textShadow: `2px 2px ${
												props.team.colors.shadow ||
												"black"
											}`,
											textAlign: "left",
											width: "70%",
											position: "relative",
											top: "-5px",
										}}
									>
										{props.team.name}
									</span>
								</Stack>
							</div>
						)}
					</Slide>
				</div>
			</div>
		</>
	);
}
