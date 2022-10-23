import { Grid } from "@mui/material";
import { getCurrentMatchWithTeamsAsState } from "common/Helper";
import { MapSelection } from "common/types/MapSelection";
import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MapDisplay } from "./components/MapDisplay";

function pullMapData(method: Function) {
	return fetch("../assets/data/maps.json")
		.then((response) => response.json())
		.then((responseJson) => {
			method(responseJson);
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
}

function MatchList(props: { currentTheme?: ThemeConfig }) {
	const { state, updateState } = getCurrentMatchWithTeamsAsState();

	const [imagesCached, setImagesCached] = useState(false);
	const [mapData, setMapData] = useState() as [any, Function];
	if (!mapData) pullMapData(setMapData);
	if (!state) return <></>;
	const { team1, team2, currentMatch } = state;

	useEffect(() => {
		if (!imagesCached && mapData) {
			console.log(`maps`, mapData.allmaps);
			mapData.allmaps.forEach((map: any) => {
				console.log(map);
				const imgTaller = new Image();
				imgTaller.src = `../assets/maps/${map.file}`;
				imgTaller.onload = () => {
					console.log(`cached `, imgTaller.src);
				};
			});
			setImagesCached(true);
		}
	}, [imagesCached, mapData]);
	if (!imagesCached) return <></>;

	return (
		<div>
			<Grid
				container
				direction="column"
				justifyContent="space-evenly"
				spacing={0.5}
				alignItems="center"
				style={{ paddingTop: "150px", height: "850px" }}
			>
				{currentMatch.mapLineup?.maps.map(
					(map: MapSelection, index: number) => {
						let grey = true;
						if (index == 0) grey = false;
						if (map.completed) grey = false;
						if (
							index > 0 &&
							currentMatch.mapLineup?.maps[index - 1].completed
						)
							grey = false;
						return (
							<MapDisplay
								key={`${currentMatch.matchId}-${index}`}
								mapSelection={map}
								index={index}
								displayed={imagesCached}
								currentMatch={currentMatch}
								team1={team1}
								team2={team2}
								grey={grey}
							/>
						);
					}
				)}
			</Grid>
		</div>
	);
}

ReactDOM.render(
	<Wrapper>
		<MatchList />
	</Wrapper>,
	document.getElementById("root")
);
