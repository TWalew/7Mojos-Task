import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row } from "react-bootstrap";

import { GameType } from "utils/Enums/gameType";
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
			{liveGames?.map((liveGame, index) => (
				<React.Fragment key={liveGame.name}>
					<TitleBar classNames="mb-5">
						<h3>{GameType[liveGame?.gameType]}</h3>
					</TitleBar>
					<Container>
						<Row>
							<Col md={3}>
								<LiveGameItem game={liveGame} />
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			))}
		</div>
	);
});

export default LivePage;
