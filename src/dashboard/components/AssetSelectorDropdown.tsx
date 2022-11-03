import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Team } from "common/types/Team";
import { useState } from "react";

interface AssetSelectorProps {
	assets: any;
	onChange: (
		asset: { base: String; url: string; name: string },
		event: SelectChangeEvent<any>
	) => void;
	label: string;
	variant?: "standard" | "outlined" | "filled";
	size?: "small" | "medium";
	defaultValue?: string;
	value?: string;
	style?: React.CSSProperties;
	showNoneOption?: boolean;
	noneOptionText?: string;
}

export default function AssetSelectorDropdown(props: AssetSelectorProps) {
	const {
		assets,
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
				<InputLabel id={`assetDropdown-${rand}-label`}>
					{label ?? "Select Asset"}
				</InputLabel>
				<Select
					labelId={`assetDropdown-${rand}-label`}
					id={`assetDropdown-${rand}`}
					label={label ?? "Select Asset"}
					variant={variant ?? "outlined"}
					onChange={(e) => {
						setValue(e.target.value);
						const team = assets.filter(
							(asset: any) =>
								(asset.url as any) == (e.target.value as any)
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
					{Object.values(assets as object).map(
						(icon: { base: String; url: string; name: string }) => {
							return (
								<MenuItem value={icon.url}>
									<img
										src={icon.url}
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
									{icon.name}
								</MenuItem>
							);
						}
					)}
				</Select>
			</FormControl>
		</>
	);
}
