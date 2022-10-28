import { Stack } from "@mui/system";
import { getCurrentMatchWithTeamsAsState } from "common/Helper";
import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import { useEffect, useState } from "react";
import { InformationOverlay } from "./components/InformationOverlay";
import { ScoreboardMiddleBox } from "./components/ScoreboardMiddleBox";
import { TeamScore } from "./components/TeamScore";
import { createRoot } from "react-dom/client";

function MatchScoreOverlay(props: { currentTheme?: ThemeConfig }) {
	const { state, updateState } = getCurrentMatchWithTeamsAsState();
	const [displayed, setDisplayedState] = useState(true);

	useEffect(() => {
		nodecg.listenFor("displayScores", (data: { displayed: boolean }) => {
			setDisplayedState(data.displayed);
		});
		return nodecg.unlisten("displayScores", () => {});
	}, [displayed]);

	if (!state) return <></>;
	const { team1, team2, currentMatch } = state;
	return (
		<>
			<Stack
				direction={"row"}
				spacing={2}
				sx={{ alignItems: "center", paddingTop: "32px" }}
			>
				<TeamScore
					team={!currentMatch.flipped ? team1 : team2}
					teamScore={
						!currentMatch.flipped
							? currentMatch.team1score
							: currentMatch.team2score
					}
					matchData={currentMatch}
					theme={props.currentTheme}
					side="left"
					displayed={displayed}
				/>
				<TeamScore
					team={!currentMatch.flipped ? team2 : team1}
					teamScore={
						!currentMatch.flipped
							? currentMatch.team2score
							: currentMatch.team1score
					}
					matchData={currentMatch}
					theme={props.currentTheme}
					displayed={displayed}
					side="right"
				/>
			</Stack>
			<ScoreboardMiddleBox
				theme={props.currentTheme}
				matchData={currentMatch}
				displayed={displayed}
			/>

			<InformationOverlay
				theme={props.currentTheme}
				matchData={currentMatch}
				team1={team1}
				team2={team2}
				displayed={displayed}
			/>
		</>
	);
}

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper>
		<MatchScoreOverlay />
	</Wrapper>
);
