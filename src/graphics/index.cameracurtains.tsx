import { DataStorage } from "common/types/replicants/DataStorage";
import { ThemeConfig } from "common/types/ThemeConfig";
import { useOnlyReplicantValue } from "common/useReplicant";
import { Wrapper } from "common/Wrapper";

function TeamTransition(props: { currentTheme?: ThemeConfig }) {
	const dataStorage = useOnlyReplicantValue<DataStorage>(
		"DataStorage"
	) as DataStorage;
	if (!dataStorage) return <></>;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let amount = parseInt(urlParams.get("amount") || "1") || 1;
	const indexOverride = parseInt(urlParams.get("index") || "-1") || -1;
	if (indexOverride > -1) amount = 1;
	console.log(dataStorage);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				alignContent: "center",
				justifyContent: "center",
				textAlign: "center",
				verticalAlign: "middle",
				height: "1080px",
			}}
		>
			{Array.from(Array(amount)).map((i: any, ind: number) => (
				<CameraBox
					name={
						dataStorage.casterInformation[
							indexOverride > -1 ? ind : indexOverride
						].name
					}
					id={indexOverride > -1 ? ind : indexOverride}
					icon={
						dataStorage.casterInformation[
							indexOverride > -1 ? ind : indexOverride
						].icon
					}
					pronouns={
						dataStorage.casterInformation[
							indexOverride > -1 ? ind : indexOverride
						].pronouns
					}
				/>
			))}
		</div>
	);
}

import { createRoot } from "react-dom/client";
import CameraBox from "./components/CameraBox";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper>
		<TeamTransition />
	</Wrapper>
);
