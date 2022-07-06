import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row } from "react-bootstrap";

import { GameType, GameTypeLiveOrder } from "utils/Enums/gameType";
import { TitleBar } from "components/Shared/TitleBar";
import { LiveGameItem } from "components/LiveGameItem";
import pageContext from "context";
import { ILivePage } from "./types";

const LivePage: ILivePage = observer(() => {
	const { store } = useContext(pageContext);
	const { liveGames, loadGames, player } = store;

	const req = () => {
		if (player.currency) {
			loadGames.request(player.currency, "live");
		}
	};

	useEffect(() => {
		req();
		const interval = setInterval(() => {
			req();
		}, 60 * 100);

		return () => clearInterval(interval);
	}, [player.currency]);

	return (
		<div>
			{Object.keys(GameTypeLiveOrder)
				.filter((k) => isNaN(Number(k)))
				.map((k) => (
					<React.Fragment key={k}>
						<TitleBar classNames="my-5">
							<h3>
								{GameType[GameTypeLiveOrder[k as any] as any]
									.replace(/([A-Z])/g, " $1")
									.trim()}
							</h3>
						</TitleBar>
						{liveGames
							?.filter(
								(lg) =>
									lg.gameType ===
									(GameTypeLiveOrder[k as any] as any)
							)
							.map((liveGame) => (
								<React.Fragment key={liveGame.name}>
									<Container>
										<Row>
											<Col md={3}>
												<LiveGameItem game={liveGame} />
											</Col>
										</Row>
									</Container>
								</React.Fragment>
							))}
						{!liveGames?.filter(
							(lg) =>
								lg.gameType ===
								(GameTypeLiveOrder[k as any] as any)
						).length && (
							<div style={{ color: "white" }}>
								No games at the moment
							</div>
						)}
					</React.Fragment>
				))}
		</div>
	);
});

export default LivePage;
