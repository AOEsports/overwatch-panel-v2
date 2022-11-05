import { Slide, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { MatchData } from "common/types/MatchData";
import { DataStorage } from "common/types/replicants/DataStorage";
import { MatchReplicant } from "common/types/replicants/MatchReplicant";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";
import { Team } from "common/types/Team";
import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import { createRoot } from "react-dom/client";
import { useOnlyReplicantValue } from "../common/useReplicant";
import { UpcomingMatch } from "./components/UpcomingMatch";

function MatchList(props: { currentTheme?: ThemeConfig }) {
	const matchList = useOnlyReplicantValue<MatchReplicant>(
		"MatchList",
		undefined,
		{ defaultValue: { matches: [] as MatchData[] } as MatchReplicant }
	) as MatchReplicant;

	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;

	const dataStorage = useOnlyReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 1,
			} as DataStorage,
		}
	) as DataStorage;

	if (!teams || !matchList || !dataStorage) return <></>;
	let shownMatches = matchList.matches.filter((match) =>
		match.deleted ? false : true
	);
	if (shownMatches.length > 4) shownMatches = shownMatches.splice(0, 4);
	return (
		<>
			<Stack
				direction={"column"}
				spacing={2}
				sx={{ alignItems: "center", paddingTop: "32px" }}
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
						timeout={{ enter: 3000, exit: 2000 }}
						easing="ease-in-out"
					>
						<Typography
							variant="h1"
							sx={{
								fontWeight: "800",
								color:
									props.currentTheme?.Colors?.Match
										.InformationText || "white",
								textShadow: "4px 4px black",
							}}
						>
							{dataStorage.streamTitle ||
								"AAOL Season 15 - Week 1"}
						</Typography>
					</Slide>
				</div>
				<div
					style={{
						display: "flex",
						height: "820px",
						alignItems: "center",
					}}
				>
					{shownMatches.map((match: MatchData, index: number) => (
						<UpcomingMatch
							index={index}
							displayed={true}
							currentMatch={
								dataStorage.currentMatchId == match.matchId
							}
							matchData={match}
							teams={teams}
							theme={props.currentTheme}
						/>
					))}
				</div>
			</Stack>
		</>
	);
}

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper>
		<MatchList />
	</Wrapper>
);
