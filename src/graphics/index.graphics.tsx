import ReactDOM from "react-dom";
import React from "react";
import { useOnlyReplicantValue } from "common/useReplicant";
import { Name } from "./Name";
import { Wrapper } from "common/Wrapper";
function Graphics() {
	const name = useOnlyReplicantValue("name", undefined, { defaultValue: "" });
	return (
		<>
			<h1>This is the graphics, but React.</h1>
			<Name name={name || ""} />
		</>
	);
}

ReactDOM.render(
	<Wrapper component={<Graphics />} />,
	document.getElementById("root")
);
