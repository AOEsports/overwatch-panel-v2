import { MatchData } from "common/types/MatchData";
import { ThemeConfig } from "../../common/types/ThemeConfig";
import { useState, useEffect } from "react";
import { TextBar } from "common/types/TextBar";
import { Team } from "common/types/Team";
import { MapSelection } from "common/types/MapSelection";
import { Slide } from "@mui/material";

/*

<pre>%teamLeft%</pre>
<pre>%teamRight%</pre>
<pre>%mapNumber%</pre>
<pre>%mapFormat%</pre>
<pre>%mapName%</pre>
<pre>%mapType%</pre>
<pre>%teamLeftScore%</pre>
<pre>%teamRightScore%</pre>

*/

const VARIABLE_PARSING: { [key: string]: Function } = {
	"%teamLeft%": (matchData: MatchData, team1: Team, team2: Team) =>
		matchData.flipped ? team2.name : team1.name,
	"%teamRight%": (matchData: MatchData, team1: Team, team2: Team) =>
		matchData.flipped ? team1.name : team2.name,
	"%teamLeftScore%": (matchData: MatchData, team1: Team, team2: Team) =>
		matchData.flipped ? matchData.team2score : matchData.team1score,
	"%teamRightScore%": (matchData: MatchData, team1: Team, team2: Team) =>
		matchData.flipped ? matchData.team1score : matchData.team2score,
	"%mapNumber%": (matchData: MatchData, team1: Team, team2: Team) =>
		!matchData.mapLineup
			? 1
			: matchData.mapLineup?.maps.filter(
					(map: MapSelection) => map.completed
			  ).length + 1,
	"%mapFormat%": (matchData: MatchData, team1: Team, team2: Team) =>
		!matchData.mapLineup
			? "First to"
			: matchData.mapLineup?.scoringType == "ft"
			? "First to"
			: "Best of",
	"%mapScoreTarget%": (matchData: MatchData, team1: Team, team2: Team) =>
		!matchData.mapLineup ? 3 : matchData.mapLineup.scoreaim,
	"%mapName%": (matchData: MatchData, team1: Team, team2: Team) =>
		!matchData.mapLineup
			? "Unknown"
			: matchData.mapLineup?.maps.filter(
					(map: MapSelection) => !map.completed
			  )[0].mapName,
	"%mapType%": (matchData: MatchData, team1: Team, team2: Team) =>
		!matchData.mapLineup
			? "Unknown"
			: matchData.mapLineup?.maps.filter(
					(map: MapSelection) => !map.completed
			  )[0].mapGamemode,
};

function parseVariable(
	text: String,
	matchData: MatchData,
	team1: Team,
	team2: Team
) {
	let transformed = text;
	Object.keys(VARIABLE_PARSING).forEach((key: string) => {
		if (transformed.includes(key)) {
			transformed = transformed.replaceAll(
				key,
				VARIABLE_PARSING[key](matchData, team1, team2)
			);
		}
	});
	return transformed;
}

export function InformationOverlay(props: {
	theme?: ThemeConfig;
	matchData: MatchData;
	team1: Team;
	team2: Team;
	displayed: boolean;
}) {
	const textbars = props.matchData.textBars.filter(
		(textbar: TextBar) => !textbar.deleted
	);
	if (textbars.length == 0) return <></>;
	const [textBarPosition, setTextBarPosition] = useState(0);
	useEffect(() => {
		const currentTextbar = textbars[textBarPosition];
		const timeoutId = setTimeout(() => {
			if (textBarPosition + 1 > textbars.length - 1)
				setTextBarPosition(0);
			else setTextBarPosition(textBarPosition + 1);
		}, currentTextbar.liveTime);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [textBarPosition, setTextBarPosition]);
	return (
		<Slide
			direction="up"
			in={props.displayed}
			mountOnEnter
			timeout={1200}
			easing="ease-in-out"
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					paddingTop: "990px",
				}}
			>
				<span
					style={{
						textAlign: "center",
						fontSize: "2.5rem",
						marginLeft: "50px",
						marginRight: "50px",
						minWidth: "400px",
						maxWidth: "700px",
						backgroundColor:
							props.theme?.Colors?.Score.Background || "#333333",
						color: props.theme?.Colors?.Score.Text || "white",
						textShadow: "2px 2px black",
						width: "auto",
						transition: "width 600ms ease-in-out 0ms",
						borderRadius: "2px 2px 0px 0px",
					}}
				>
					{parseVariable(
						textbars[textBarPosition].text,
						props.matchData,
						props.team1,
						props.team2
					)}
				</span>
			</div>
		</Slide>
	);
}
