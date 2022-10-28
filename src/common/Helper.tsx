import { useEffect, useState } from "react";
import { MapSelection } from "./types/MapSelection";
import { MatchData } from "./types/MatchData";
import { CurrentMatchCache } from "./types/replicants/CurrentMatchCache";
import { DataStorage } from "./types/replicants/DataStorage";
import { MatchReplicant } from "./types/replicants/MatchReplicant";
import { TeamReplicant } from "./types/replicants/TeamReplicant";
import { Team } from "./types/Team";
import { UnknownMatch, UnknownTeam } from "./types/Unknowns";
import { useOnlyReplicantValue, useReplicantValue } from "./useReplicant";

type CurrentMatchData = {
	state: { team1: Team; team2: Team; currentMatch: MatchData };
	updateState: Function;
};

export function getCurrentMatchWithTeamsAsState(): CurrentMatchData {
	const [value, setValue] = useState({
		team1: UnknownTeam,
		team2: UnknownTeam,
		currentMatch: UnknownMatch,
	}) as [CurrentMatchCache, Function];
	const matches = useOnlyReplicantValue<MatchReplicant>(
		"MatchList",
		undefined,
		{ defaultValue: { matches: [] as MatchData[] } as MatchReplicant }
	) as MatchReplicant;

	const [dataStorage, setDataStorage] = useReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 0,
				randomisationKey: 0,
			} as DataStorage,
		}
	) as [DataStorage, Function];

	const teams = useOnlyReplicantValue<TeamReplicant>("TeamList", undefined, {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	}) as TeamReplicant;
	if (!matches || !dataStorage || !teams)
		return { state: value, updateState: setValue };
	useEffect(() => {
		const currentMatch =
			matches.matches.filter(
				(match) => match.matchId == dataStorage.currentMatchId
			)[0] || null;
		if (!currentMatch) return () => {};

		if (!currentMatch.mapLineup || !currentMatch.mapLineup.maps)
			currentMatch.mapLineup = {
				scoreaim: 3,
				scoringType: "ft",
				maps: [],
			};
		const team1: Team =
			teams.teams.filter(
				(team) => team.teamId == currentMatch.team1id
			)[0] || UnknownTeam;
		const team2: Team =
			teams.teams.filter(
				(team) => team.teamId == currentMatch.team2id
			)[0] || UnknownTeam;

		let newTeam1Score = 0;
		let newTeam2Score = 0;
		currentMatch.mapLineup?.maps.forEach((map: MapSelection) => {
			if (map.completed) {
				if ((map.team1score || 0) > (map.team2score || 0))
					newTeam1Score++;
				if ((map.team2score || 0) > (map.team1score || 0))
					newTeam2Score++;
			}
		});
		let update = false;
		if (
			currentMatch.team1score != newTeam1Score ||
			currentMatch.team2score != newTeam2Score
		) {
			currentMatch.team1score = newTeam1Score;
			currentMatch.team2score = newTeam2Score;
			update = true;
		}
		const state = { team1, team2, currentMatch };

		setValue(state);
		if (update) {
			setDataStorage({
				...dataStorage,
				randomisationKey: Math.random(),
			});
		}
		return () => {};
	}, [matches, dataStorage, teams]);
	return {
		state: value,
		updateState: (updated: CurrentMatchCache, doUpdate?: boolean) => {
			setValue(updated);
			if (doUpdate)
				setDataStorage({
					...dataStorage,
					randomisationKey: Math.random(),
				});
		},
	};
}
