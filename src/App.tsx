import React, { useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import pageContext from "./context";
import { Layout } from "components/Layout";
import "./App.scss";

const LivePage = React.lazy(() => import("pages/LivePage"));
const SlotsPage = React.lazy(() => import("pages/SlotsPage"));

function App() {
	const { store } = useContext(pageContext);

	const { loadGames, loadPlayer, player, games } = store;

	useEffect(() => {
		loadPlayer.request();
	}, []);

	return (
		<div className="App">
			<div className="App-container">
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<React.Suspense fallback={<>...</>}>
									<SlotsPage />
								</React.Suspense>
							}
						/>
						<Route
							path="live"
							element={
								<React.Suspense fallback={<>...</>}>
									<LivePage />
								</React.Suspense>
							}
						/>
						<Route path="*" element={<h3>404</h3>} />
					</Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
