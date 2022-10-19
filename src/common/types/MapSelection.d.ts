export interface MapSelection {
	mapName?: string;
	mapGamemode?: string;
	mapIcon?: string;
	mapImage?: string;

	team1score?: number;
	team2score?: number;
	completed?: boolean;

	[k: string]: unknown;
}
