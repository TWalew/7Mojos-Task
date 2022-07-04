import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import pageContext from "./context";
import "./App.scss";
import { Header } from "./components/Layout/Header";

function App() {
	const { store } = useContext(pageContext);

	const { loadGames, loadPlayer, player, games } = store;

	useEffect(() => {
		console.log("render");
		loadPlayer.request().finally(() => {
			loadGames.request("USD", "slots");
		});
	}, []);

	return (
		<div className="App">
			<div className="App-container">
				<Header prop={""} />
			</div>
		</div>
	);
}

export default App;
