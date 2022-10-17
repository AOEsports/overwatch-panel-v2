import { Color } from "./Color";
export interface ThemeConfig {
	themeId: number;
	themeName: string;

	Colors?: {
		Match: {
			Primary: Color;
			Background: Color;
			VSBlock: Color;
			VSBlockText: Color;
			TeamName: Color;
			DefaultMatchBorder: Color;
			CurrentMatchBorder: Color;
			CompletedMatchBorder: Color;
			InformationText: Color;
			ScoreboxBackground: Color;
			ScoreboxText: Color;
			CompletedMatchScoreboxBackground: Color;
			CompletedMatchScoreboxText: Color;
		};
	};
}
