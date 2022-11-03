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
	const amount = parseInt(urlParams.get("amount") || "1") || 1;
	console.log(dataStorage);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
			}}
		>
			{Array.from(Array(amount)).map((i: any, ind: number) => (
				<CameraBox
					name={dataStorage.casterInformation[ind].name}
					id={ind}
					icon={dataStorage.casterInformation[ind].icon}
					pronouns={dataStorage.casterInformation[ind].pronouns}
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
