import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { ILivePage } from "./types";
// import "./styles.scss";

const LivePage: ILivePage = observer(() => {
	const { store } = useContext(pageContext);

	return <div style={{ color: "white" }}>Live Page</div>;
});

export default LivePage;
