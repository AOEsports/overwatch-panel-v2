import { Player } from "./Player";

export interface Team {
	/**
	 * team id, unique
	 */
	teamId: number;
	/**
	 * team name
	 */
	name: string;
	/**
	 * players on the team
	 */
	players: Player[];
	/**
	 * icons related to the team
	 */
	icons?: {
		/**
		 * url of the teams icon
		 */
		teamIcon?: string;
		[k: string]: unknown;
	};
	/**
	 * colours related to the team
	 */
	colors: {
		/**
		 * primary team color
		 */
		primary?: string;
		/**
		 * text color
		 */
		textColor?: string;
		/**
		 * team player color
		 */
		player?: string;
		/**
		 * team shadow color
		 */
		shadow?: string;
		[k: string]: unknown;
	};
	[k: string]: unknown;
}
