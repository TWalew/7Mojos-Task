import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { ISlotsPage } from "./types";
import { TitleBar } from "components/Shared/TitleBar";
import { Container, Row } from "react-bootstrap";
import { GameItem } from "components/Shared/GameItem";
import { FeaturedGames } from "components/FeaturedGames";
import { SlotFilters } from "components/Filters/SlotFilters";
// import "./styles.scss";

const SlotsPage: ISlotsPage = observer(() => {
	const { store } = useContext(pageContext);
	const { games, loadGames, player } = store;

	useEffect(() => {
		if (player) {
			loadGames.request("USD", "slots");
		}
	}, []);

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
					{games.map((game) => (
						<div className="col-md-3">
							<GameItem game={game} />
						</div>
					))}
				</Row>
			</Container>
		</div>
	);
});

export default SlotsPage;
