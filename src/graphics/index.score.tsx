import { Stack } from "@mui/system";
import { getCurrentMatchWithTeamsAsState } from "common/Helper";
import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import ReactDOM from "react-dom";

function MatchList(props: { currentTheme?: ThemeConfig }) {
	const { state, updateState } = getCurrentMatchWithTeamsAsState();
	if (!state) return <></>;
	const { team1, team2, currentMatch } = state;
	return (
		<>
			<Stack
				direction={"row"}
				spacing={2}
				sx={{ alignItems: "center", paddingTop: "32px" }}
			>
				{team1.name} {currentMatch.team1score}
				<br />
				{team2.name} {currentMatch.team2score}
				<br />
				{currentMatch.mapLineup?.scoringType}
				{currentMatch.mapLineup?.scoreaim}
			</Stack>
		</>
	);
}

ReactDOM.render(
	<Wrapper>
		<MatchList />
	</Wrapper>,
	document.getElementById("root")
);
