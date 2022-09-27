/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A Team
 */
export interface Team {
  /**
   * team name
   */
  name: string;
  /**
   * players on the team
   */
  players: Player[];
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