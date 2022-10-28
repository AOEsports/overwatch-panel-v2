import { useCallback, useEffect, useState } from "react";
import { MatchData } from "./types/MatchData";
import { CurrentMatchCache } from "./types/replicants/CurrentMatchCache";
import { DataStorage } from "./types/replicants/DataStorage";
import { MatchReplicant } from "./types/replicants/MatchReplicant";
import { TeamReplicant } from "./types/replicants/TeamReplicant";
import { Team } from "./types/Team";
import { UnknownMatch, UnknownTeam } from "./types/Unknowns";

type CurrentMatchData = {
	team1: Team;
	team2: Team;
	currentMatch: MatchData;
};

export function getCurrentMatchWithTeamsAsState(): [
	CurrentMatchData,
	(val: CurrentMatchData) => any
] {
	const [value, setValue] = useState({
		team1: UnknownTeam,
		team2: UnknownTeam,
		currentMatch: UnknownMatch,
	}) as [CurrentMatchCache, Function];

	const matches = nodecg.Replicant("MatchList", {
		defaultValue: { matches: [] as MatchData[] } as MatchReplicant,
	});
	const dataStorage = nodecg.Replicant("DataStorage", {
		defaultValue: {
			currentMatchId: 0,
			nextMatchId: 0,
			nextTeamId: 0,
			randomisationKey: 0,
		} as DataStorage,
	});
	const teams = nodecg.Replicant("TeamList", {
		defaultValue: { teams: [] as Team[] } as TeamReplicant,
	});

	const updateState = (
		matchReplicant: MatchReplicant | undefined,
		dataReplicant: DataStorage | undefined,
		teamReplicant: TeamReplicant | undefined
	) => {
		if (!matchReplicant || !dataReplicant || !teamReplicant) return;

		console.log(`yeet`);
		const currentMatch =
			matchReplicant.matches.filter(
				(match) => match.matchId == dataReplicant.currentMatchId
			)[0] || null;
		if (!currentMatch) return () => {};

		if (!currentMatch.mapLineup)
			currentMatch.mapLineup = {
				scoreaim: 3,
				scoringType: "ft",
				maps: [],
			};
		const team1: Team =
			teamReplicant.teams.filter(
				(team) => team.teamId == currentMatch.team1id
			)[0] || UnknownTeam;
		const team2: Team =
			teamReplicant.teams.filter(
				(team) => team.teamId == currentMatch.team2id
			)[0] || UnknownTeam;
		const state = { team1, team2, currentMatch };

		setValue(state);
	};

	useEffect(() => {
		matches.on("change", (old: MatchReplicant, newO: MatchReplicant) =>
			updateState(newO, dataStorage.value, teams.value)
		);
		dataStorage.on("change", (old: DataStorage, newO: DataStorage) =>
			updateState(matches.value, newO, teams.value)
		);
		teams.on("change", (old: TeamReplicant, newO: TeamReplicant) =>
			updateState(matches.value, dataStorage.value, newO)
		);

		NodeCG.waitForReplicants(matches, dataStorage, teams).then(() =>
			updateState(matches.value, dataStorage.value, teams.value)
		);

		return () => {
			matches.removeListener("change", updateState);
			dataStorage.removeListener("change", updateState);
			teams.removeListener("change", updateState);
		};
	}, [dataStorage, teams, matches]);
	const setter = useCallback((newValue: CurrentMatchData) => {
		console.log(`setter has been fired`);
		if (!matches || !dataStorage || !teams) return;
		const currentMatchIndex = matches.value!.matches.findIndex(
			(match) => match.matchId == newValue.currentMatch.matchId
		);
		const updatedMatches = [...matches.value!.matches];
		updatedMatches[currentMatchIndex] = newValue.currentMatch;
		matches.value!.matches = updatedMatches;
		console.log(
			`updated match ${newValue.currentMatch.matchId} ${currentMatchIndex}`,
			newValue.currentMatch
		);
		updateState(matches.value, dataStorage.value, teams.value);
	}, []);
	return [value, setter];
}
