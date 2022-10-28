import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";

function TeamTransition(props: { currentTheme?: ThemeConfig }) {
	return <div>team transition scene or something idk??</div>;
}

import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<Wrapper>
		<TeamTransition />
	</Wrapper>
);
