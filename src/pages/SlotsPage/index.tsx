import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container, Row } from "react-bootstrap";

import { TitleBar } from "components/Shared/TitleBar";
import { GameItem } from "components/GameItem";
import { FeaturedGames } from "components/FeaturedGames";
import { SlotFilters } from "components/Filters/SlotFilters";
import pageContext from "context";
import { ISlotsPage } from "./types";

const SlotsPage: ISlotsPage = observer(() => {
	const { store } = useContext(pageContext);
	const { filteredGames, loadGames, player } = store;

	const req = () => {
		if (player.currency) {
			loadGames.request(player.currency, "slots");
		}
	};

	useEffect(() => {
		req();
		const interval = setInterval(() => {
			req();
		}, 60 * 1000);

		return () => clearInterval(interval);
	}, [player.currency]);

	return (
		<div>
			<FeaturedGames />
			<TitleBar
				classNames="mb-4"
				filters={
					<>
						<SlotFilters />
					</>
				}>
				<h3>Slots</h3>
			</TitleBar>
			<Container>
				<Row>
					{filteredGames.map((game) => (
						<div key={game.name} className="col-md-3">
							<GameItem game={game} />
						</div>
					))}
				</Row>
			</Container>
		</div>
	);
});

export default SlotsPage;
