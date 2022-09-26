import { ThemeProvider, createTheme, withStyles } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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

export interface WrapperProps {
	component: JSX.Element;
}

export function Wrapper({ component }: WrapperProps) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{component}
			</ThemeProvider>
		</>
	);
}
