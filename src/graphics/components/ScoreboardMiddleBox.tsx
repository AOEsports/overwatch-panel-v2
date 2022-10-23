import { Slide } from "@mui/material";
import { MatchData } from "common/types/MatchData";
import { useState, useEffect } from "react";
import { ThemeConfig } from "../../common/types/ThemeConfig";
export function ScoreboardMiddleBox(props: {
	theme?: ThemeConfig;
	matchData: MatchData;
	displayed: boolean;
}) {
	if (!props.matchData.mapLineup) return <></>;
	let currentMap = 1;
	props.matchData.mapLineup?.maps.forEach((map) => {
		if (map.completed) currentMap++;
	});

	return (
		<Slide
			direction="down"
			in={props.displayed}
			mountOnEnter
			timeout={1000}
			easing="ease-in-out"
		>
			<div
				style={{
					width: "100%",
					height: "0px",
					verticalAlign: "middle",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					paddingTop: "0px",
				}}
			>
				<span
					style={{
						textAlign: "center",
						transform: "translate(0%, -50%)",
						fontSize: "1.5rem",
						paddingLeft: "100px",
						paddingRight: "100px",
						backgroundColor:
							props.theme?.Colors?.Score.Background || "#333333",
						color: props.theme?.Colors?.Score.Text || "white",
						borderRadius: "0px 0px 2px 2px",
					}}
				>
					{props.matchData.mapLineup?.scoringType == "bo" ? (
						<>
							Map {currentMap} of{" "}
							{props.matchData.mapLineup.scoreaim}
						</>
					) : (
						<>First to {props.matchData.mapLineup.scoreaim}</>
					)}
				</span>
			</div>
		</Slide>
	);
}
