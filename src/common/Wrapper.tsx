import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Component, CSSProperties } from "react";
import { ThemeStorage } from "./types/replicants/ThemeStorage";
import { ThemeConfig } from "./types/ThemeConfig";
import { useOnlyReplicantValue } from "./useReplicant";

const theme = createTheme({
	palette: {
		mode: "light",
	},
	typography: {
		fontFamily: "Koverwatch",
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
});

const themeDashboard = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#2F3A4F",
		},
		text: {
			primary: "#ffffff",
			secondary: "#ffffff",
		},
	},
	spacing: 0,
});

export interface WrapperProps {
	children: JSX.Element;
	isDashboard?: Boolean;
	cssInject?: CSSProperties;
}

export function Wrapper({ children, isDashboard, cssInject }: WrapperProps) {
	if (!isDashboard) {
		const themes = useOnlyReplicantValue<ThemeStorage>(
			"ThemeData",
			undefined,
			{
				defaultValue: {
					currentThemeId: 0,
					nextThemeId: 0,
					themes: [] as Theme[],
				} as ThemeStorage,
			}
		) as ThemeStorage;
		const currentTheme =
			themes.themes.filter(
				(theme) => theme.themeId == themes.currentThemeId
			)[0] ||
			({ themeName: "Unknown Theme", themeId: -1 } as ThemeConfig);
		return (
			<>
				<div
					style={{
						maxWidth: "1920px",
						maxHeight: "1080px",
						overflow: "hidden",
					}}
				>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{React.cloneElement(children, {
							currentTheme: currentTheme,
						})}
					</ThemeProvider>
				</div>
			</>
		);
	}
	return (
		<>
			<div style={isDashboard ? { ...cssInject } : undefined}>
				<ThemeProvider theme={themeDashboard}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</div>
		</>
	);
}
