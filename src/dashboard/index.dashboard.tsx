import { useReplicantValue } from "common/useReplicant";
import ReactDOM from "react-dom";

function Dashboard() {
	const [name, setName] = useReplicantValue("name", undefined, {
		defaultValue: "",
	});
	return (
		<>
			<label>
				Name
				<input
					type="text"
					value={name || ""}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
		</>
	);
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
