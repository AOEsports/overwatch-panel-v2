import { Box, Typography } from "@mui/material";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function tabProps(index: number) {
	return {
		id: `control-tab-${index}`,
		"aria-controls": `control-tab-${index}`,
	};
}
export default function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
