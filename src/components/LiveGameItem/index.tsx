import React from "react";
import { ILiveGameItem } from "./types";
import HoverVideoPlayer from "react-hover-video-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
//TODO ask Teodor pn 0886250566

export const LiveGameItem: ILiveGameItem = ({ game, thumbnail }) => {
	const tags = game?.slotData?.tags;
	const lines = game?.slotData?.linesCount;
	const thumb = game?.thumbnails[0];

	const checkImage = (url: string) => {
		var request = new XMLHttpRequest();
		var status = 0;
		request.open("GET", url, true);
		request.send();
		request.onload = function () {
			status = request.status;
			console.log(status);
			if (request.status == 200) {
				//if(statusText == OK)
				console.log("image exists");
			} else {
				console.log("image doesn't exist");
			}
		};
	};

	checkImage(thumb?.imageUrl);

	return (
		<div className="live-game">
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
					{game?.liveData?.playersCount}
				</div>
			</div>
		</div>
	);
};
