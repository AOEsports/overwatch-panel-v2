import React from "react";
import ReactDOM from "react-dom";
import { useReplicantValue } from "common/useReplicant";
import { Team } from "common/types/Team";
import { TeamReplicant } from "common/types/replicants/TeamReplicant";

function TeamManager() {
	const [teams, setTeams] = useReplicantValue<TeamReplicant>(
		"TeamList",
		undefined,
		{ defaultValue: { teams: [] as Team[] } as TeamReplicant }
	) as [TeamReplicant, Function];

	if (!teams) return <></>;
	console.log(teams, setTeams);
	return <></>;
}

ReactDOM.render(<TeamManager />, document.getElementById("root"));
