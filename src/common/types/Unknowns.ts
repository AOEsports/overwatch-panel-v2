import { Team } from "./Team";
import { Player } from "./Player";
import { MatchData } from "./MatchData";
import { TextBar } from "./TextBar";

export const UnknownTeam: Team = {
	teamId: -1,
	name: "To Be Determined",
	colors: {},
	players: [] as Player[],
};
export const DrawnTeam: Team = {
	teamId: -1,
	name: "DRAW",
	colors: {
		primary: "red",
		textColor: "white",
		shadow: "black",
		player: "black",
	},
	players: [],
};

export const UnknownPlayer: Player = {
	name: "A Player",
	hero: "Genji",
	role: "dps",
};

export const UnknownMatch: MatchData = {
	matchId: -1,
	team1score: 0,
	team2score: 0,
	flipped: false,
	completed: false,
	textBars: [] as TextBar[],
};
