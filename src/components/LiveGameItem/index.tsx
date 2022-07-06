import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import HoverVideoPlayer from "react-hover-video-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import getSymbolFromCurrency from "currency-symbol-map";

import pageContext from "context";
import { SimpleToolTip } from "components/Shared/SimpleTooltip";
import { GameTag } from "components/Common/GameTag";
import { GameCategory, GameCategoryText } from "utils/Enums/gameCategory";
import { ILiveGameItem } from "./types";
import { IGame } from "stores/types";
import "./styles.scss";

export const LiveGameItem: ILiveGameItem = observer(({ game }) => {
	const { store } = useContext(pageContext);
	const thumb = game?.thumbnails[0];
	const minLimit = game?.betData?.min;
	const maxLimit = game?.betData?.max;
	const categories = game?.categories;
	const currencySymbol = getSymbolFromCurrency(store.player.currency);

	const openGame = (game: IGame) => {
		store.openGame(game);
	};

	return (
		<SimpleToolTip
			id="order-warning"
			text={<p className="game-tooltip">{game?.name}</p>}>
			<div className="live-game" onClick={() => openGame(game)}>
				<HoverVideoPlayer
					className="player-wrapper"
					videoSrc={
						thumb?.videoUrl ||
						"../../../assets/default_thumbnail.png"
					}
					pausedOverlay={
						<img
							className={`live-game__thumbnail ${
								thumb === undefined ? "default" : ""
							}`}
							src={thumb?.imageUrl}
							alt=""
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					}
					loadingOverlay={
						<div className="loading-overlay">
							<div className="loading-spinner" />
						</div>
					}
				/>
				<div className="live-game__details">
					<div className="live-game__details__name">{game?.name}</div>
					<div className="live-game__details__people">
						<FontAwesomeIcon
							className="live-game__details__people__icon"
							icon={faSlash}
						/>
						<div className="live-game__details__people__image" />
						<span className="live-game__details__people__count">
							{game?.liveData?.playersCount}
						</span>
					</div>
				</div>
				<div className="live-game__tags">
					<GameTag
						tag={`Min: ${currencySymbol}${minLimit} Max: ${currencySymbol}${maxLimit}`}
					/>
					{categories &&
						categories.map(
							(t: GameCategory) =>
								GameCategoryText[t] && (
									<GameTag
										key={t}
										tag={GameCategoryText[t]}
									/>
								)
						)}
				</div>
			</div>
		</SimpleToolTip>
	);
});
