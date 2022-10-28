import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";

function TeamTransition(props: { currentTheme?: ThemeConfig }) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const amount = parseInt(urlParams.get("amount") || "1") || 1;
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
				<CameraBox name={"Greg"} id={ind} icon={"twitter"} />
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
