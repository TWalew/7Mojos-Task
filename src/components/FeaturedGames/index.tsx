import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { IFeaturedGames } from "./types";
import { TitleBar } from "components/Shared/TitleBar";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import { GameItem } from "components/GameItem";

export const FeaturedGames: IFeaturedGames = observer(() => {
	const { store } = useContext(pageContext);
	const { games, player } = store;
	const featuredGames = games.filter((g) => g.isFeatured);
	console.log(featuredGames);

	return (
		<>
			<TitleBar classNames="mb-4">
				<h3>Featured games</h3>
			</TitleBar>
			<Container>
				<Row style={{ padding: "0 2rem" }}>
					<Col md={2} className="m-auto">
						<GameItem
							isBig
							isFeatured
							game={featuredGames[0]}
							thumbnail={featuredGames[0]?.thumbnails[7]}
						/>
					</Col>
					<Col md={2} className="m-auto">
						<GameItem
							isBig
							isFeatured
							game={featuredGames[1]}
							thumbnail={featuredGames[1]?.thumbnails[2]}
						/>
					</Col>
					<Col md={3} style={{ height: "1%" }} className="m-auto">
						<GameItem
							isFeatured
							game={featuredGames[2]}
							thumbnail={featuredGames[2]?.thumbnails[0]}
						/>
						<GameItem
							isFeatured
							game={featuredGames[3]}
							thumbnail={featuredGames[3]?.thumbnails[0]}
						/>
					</Col>
					<Col md={2} className="m-auto">
						<GameItem
							isBig
							isFeatured
							game={featuredGames[4]}
							thumbnail={featuredGames[4]?.thumbnails[3]}
						/>
					</Col>
					<Col md={2} className="m-auto">
						<GameItem
							isBig
							isFeatured
							game={featuredGames[5]}
							thumbnail={featuredGames[5]?.thumbnails[3]}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
});
