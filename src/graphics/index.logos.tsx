import { Slide } from "@mui/material";
import { DataStorage } from "common/types/replicants/DataStorage";
import { ThemeConfig } from "common/types/ThemeConfig";
import { useOnlyReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";
import { createRoot } from "react-dom/client";

const LOGO_STYLE = {
	maxWidth: "128px",
	maxHeight: "128px",
	objectFit: "contain" as any,
};

function MatchScoreOverlay(props: { currentTheme?: ThemeConfig }) {
	const dataStorage = useOnlyReplicantValue<DataStorage>(
		"DataStorage",
		undefined,
		{
			defaultValue: {
				currentMatchId: 0,
				nextMatchId: 0,
				nextTeamId: 1,
			} as DataStorage,
		}
	) as DataStorage;

	if (!dataStorage) return <></>;

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					height: "1080px",
					width: "1620px",
					paddingLeft: "300px",
				}}
			>
				<Slide
					direction="up"
					in={true}
					timeout={2000}
					appear={true}
					mountOnEnter
					easing={"ease-in-out"}
				>
					<div
						style={{
							flexGrow: 1,
							flexShrink: 1,
							marginTop: "auto",
						}}
					>
						<img
							src={dataStorage.icons?.overwatchLogoUrl}
							alt=""
							style={LOGO_STYLE}
						/>
					</div>
				</Slide>
				<Slide
					direction="up"
					in={true}
					timeout={2000}
					appear={true}
					mountOnEnter
					easing={"ease-in-out"}
				>
					<div
						style={{
							flexGrow: 1,
							flexShrink: 1,
							marginTop: "auto",
						}}
					>
						<img
							src={dataStorage.icons?.tournamentLogoUrl}
							alt=""
							style={LOGO_STYLE}
						/>
					</div>
				</Slide>
			</div>
		</>
	);
}

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper>
		<MatchScoreOverlay />
	</Wrapper>
);
