import { ThemeConfig } from "common/types/ThemeConfig";
import { Wrapper } from "common/Wrapper";
import ReactDOM from "react-dom";

function MatchList(props: { currentTheme?: ThemeConfig }) {
	return <div>team transition scene or something idk??</div>;
}

ReactDOM.render(
	<Wrapper>
		<MatchList />
	</Wrapper>,
	document.getElementById("root")
);
