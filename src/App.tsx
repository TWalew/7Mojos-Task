import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "components/Layout";
import pageContext from "./context";
import "./App.scss";

const LivePage = React.lazy(() => import("pages/LivePage"));
const SlotsPage = React.lazy(() => import("pages/SlotsPage"));

function App() {
	const { store } = useContext(pageContext);

	const { loadPlayer } = store;

	const seconds = 60;

	const req = () => {
		loadPlayer.request();
	};

	useEffect(() => {
		req();
		const interval = setInterval(() => {
			req();
		}, seconds * 1000);

		return () => clearInterval(interval);
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
