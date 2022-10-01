/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { Team } from "./Team";
import { MapLineup } from "./MapLineup";

/**
 * A match
 */
export interface MatchData {
	team1: Team;
	/**
	 * team 2
	 */
	team2: Team;
	/**
	 * match information
	 */
	information: string;
	/**
	 * team 1 score
	 */
	team1score: number;
	/**
	 * team 1 score
	 */
	team2score: number;
	/**
	 * do we flip the teams display?
	 */
	flipped: boolean;
	mapLineup?: MapLineup;
	[k: string]: unknown;
}
