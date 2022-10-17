import { Theme } from "../ThemeConfig";
export interface ThemeStorage {
	currentThemeId: number;
	nextThemeId: number;
	themes: Theme[];
}
