import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Team } from "common/types/Team";
import { useState } from "react";

interface TabPanelProps {
	teams: Team[];
	onChange: (team: Team, event: SelectChangeEvent<any>) => void;
	label: string;
	variant?: "standard" | "outlined" | "filled";
	size?: "small" | "medium";
	defaultValue?: string;
	value?: string;
	style?: React.CSSProperties;
	showNoneOption?: boolean;
	noneOptionText?: string;
}

export default function TeamSelectorDropdown(props: TabPanelProps) {
	const {
		teams,
		onChange,
		label,
		variant,
		value,
		size,
		defaultValue,
		style,
		showNoneOption,
		noneOptionText,
	} = props;

	const rand = Math.random();
	const [internalValue, setValue] = useState() as [Team, Function];

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id={`teamDropdown-${rand}-label`}>
					{label ?? "Select Team"}
				</InputLabel>
				<Select
					labelId={`teamDropdown-${rand}-label`}
					id={`teamDropdown-${rand}`}
					label={label ?? "Select Team"}
					variant={variant ?? "outlined"}
					onChange={(e) => {
						setValue(e.target.value);
						const team = teams.filter(
							(team) =>
								(team.teamId as any) == (e.target.value as any)
						)[0];
						onChange(team, e);
					}}
					style={style}
					size={size ?? "small"}
					defaultValue={defaultValue}
					value={value}
				>
					{showNoneOption ? (
						<MenuItem value={"Unknown"}>
							{noneOptionText ?? "Unknown"}
						</MenuItem>
					) : (
						<></>
					)}
					{teams.map((team) => {
						return team.icons?.teamIcon ? (
							<MenuItem value={team.teamId} key={team.teamId}>
								<img
									src={team.icons?.teamIcon}
									style={{
										minHeight: "24px",
										maxHeight: "24px",
										aspectRatio: "1/ 1",
										minWidth: "32px",
										objectFit: "scale-down",
										paddingRight: "8px",
										pointerEvents: "none",
									}}
								/>
								{team.name}
							</MenuItem>
						) : (
							<MenuItem
								value={team.teamId as any}
								key={team.teamId}
							>
								{team.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</>
	);
}
