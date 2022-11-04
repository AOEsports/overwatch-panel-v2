import { Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface CameraBoxProps {
	name: String;
	id: number;
	icon: "twitter" | "discord" | "instagram" | "twitch";
	pronouns: string;
}

function iconToSvg(icon: "twitter" | "discord" | "instagram" | "twitch") {
	if (icon == "twitter") {
		return (
			<Icon icon="simple-icons:twitter" style={{ color: "#1DA1F2" }} />
		);
	}
	if (icon == "discord") {
		return (
			<Icon icon="simple-icons:discord" style={{ color: "#5865F2" }} />
		);
	}
	if (icon == "twitch") {
		return <Icon icon="simple-icons:twitch" style={{ color: "#9146FF" }} />;
	}
	if (icon == "instagram") {
		return (
			<Icon icon="simple-icons:instagram" style={{ color: "#E4405F" }} />
		);
	}
}

export default function CameraBox(props: CameraBoxProps) {
	const { name, id, icon, pronouns } = props;

	const curtainDiv = (
		<div
			style={{
				flex: "1 1 0",
				height: "100%",
				backgroundColor: "purple",
				width: "100%",
				display: "inline-flex",
			}}
		></div>
	);
	const [control, setControl] = useState({ in: true, timeout: 0 });
	useEffect(() => {
		if (control.in)
			setTimeout(() => {
				setControl({ in: false, timeout: 1500 });
			}, 1000);
		return () => {};
	}, [control]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				borderStyle: "solid",
				borderWidth: "0px 6px 0px 6px",
				borderColor: "purple",
				margin: "10px",
			}}
		>
			<div
				style={{
					width: "800px",
					height: "450px",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div
					style={{
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
						height: "100%",
						width: "100%",
					}}
				>
					<Slide
						direction="up"
						in={control.in}
						timeout={control.timeout}
						appear={true}
						mountOnEnter
						unmountOnExit
						easing={"ease-in-out"}
					>
						{curtainDiv}
					</Slide>
				</div>
			</div>
			<div
				style={{
					backgroundColor: "purple",
					width: "100%",
					height: "50px",
					color: "white",
					fontSize: "2.5rem",
				}}
			>
				<span
					style={{
						color: "white",
						fontSize: "2.5rem",
						paddingRight: "8px",
					}}
				>
					{iconToSvg(icon)}
				</span>

				{name}

				<span
					style={{
						color: "white",
						fontSize: "2.5rem",
						fontStyle: "italic",
						zIndex: 1,
						display: "inline-block",
						paddingLeft: "64px",
					}}
				>
					{pronouns}
				</span>
			</div>
		</div>
	);
}
