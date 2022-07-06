import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import HoverVideoPlayer from "react-hover-video-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import pageContext from "context";
import { ILiveGameItem } from "./types";
import { IGame } from "stores/types";
import "./styles.scss";

export const LiveGameItem: ILiveGameItem = observer(({ game, thumbnail }) => {
	const { store } = useContext(pageContext);
	const tags = game?.slotData?.tags;
	const lines = game?.slotData?.linesCount;
	const thumb = game?.thumbnails[0];

	const openGame = (game: IGame) => {
		store.openGame(game);
	};

	return (
		<div className="live-game" onClick={() => openGame(game)}>
			<HoverVideoPlayer
				className="player-wrapper"
				videoSrc={
					thumb?.videoUrl || "../../../assets/default_thumbnail.png"
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
		</div>
	);
});
