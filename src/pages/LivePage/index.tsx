import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { ILivePage } from "./types";
import { TitleBar } from "components/Shared/TitleBar";
import { GameType } from "utils/Enums/gameType";
import { Col, Container, Row } from "react-bootstrap";
import { LiveGameItem } from "components/LiveGameItem";
// import "./styles.scss";

const LivePage: ILivePage = observer(() => {
	const { store } = useContext(pageContext);
	const { liveGames, loadGames, player } = store;

	useEffect(() => {
		if (player.currency) {
			loadGames.request(player.currency, "live");
		}
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
