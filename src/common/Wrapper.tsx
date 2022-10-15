import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CSSProperties } from "react";

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
	component: JSX.Element;
	isDashboard?: Boolean;
	cssInject?: CSSProperties;
}

export function Wrapper({ component, isDashboard, cssInject }: WrapperProps) {
	return isDashboard ? (
		<>
			<div style={isDashboard ? { ...cssInject } : undefined}>
				<ThemeProvider theme={themeDashboard}>
					<CssBaseline />
					{component}
				</ThemeProvider>
			</div>
		</>
	) : (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{component}
			</ThemeProvider>
		</>
	);
}
