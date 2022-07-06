import React, { useContext } from "react";
import { IGameItem } from "./types";
import { observer } from "mobx-react-lite";

import pageContext from "context";
import {
	SlotGameTag,
	SlotGameTagText,
	SlotGameTagTextFeatured,
} from "utils/Enums/slotGameTag";
import { IGame } from "stores/types";
import { GameTag } from "components/Common/GameTag";
import { SimpleToolTip } from "../Shared/SimpleTooltip";
import "./styles.scss";

export const GameItem: IGameItem = observer(
	({ game, thumbnail, isBig = false, isFeatured = false }) => {
		const { store } = useContext(pageContext);
		const tags = game?.slotData?.tags;
		const lines = game?.slotData?.linesCount;
		const thumb = !thumbnail
			? game?.thumbnails.find((thumb) => thumb.width === 301) ||
			  game?.thumbnails[0]
			: thumbnail;

		const openGame = (game: IGame) => {
			store.openGame(game);
		};

		return (
			<SimpleToolTip
				id="order-warning"
				text={<p className="game-tooltip">{game?.name}</p>}>
				<div onClick={() => openGame(game)} className="game mb-4">
					<img
						className={`game__thumbnail ${
							thumb === undefined ? "default" : ""
						}`}
						src={thumb?.imageUrl}
						alt=""
					/>
					<div className={`game__details ${isBig ? "big" : ""}`}>
						<GameTag lines={lines} />
						{tags &&
							tags.map((t: SlotGameTag) =>
								!isFeatured
									? SlotGameTagText[t] && (
											<GameTag
												key={t}
												tag={SlotGameTagText[t]}
											/>
									  )
									: SlotGameTagTextFeatured[t] && (
											<GameTag
												key={t}
												tag={SlotGameTagTextFeatured[t]}
											/>
									  )
							)}
					</div>
				</div>
			</SimpleToolTip>
		);
	}
);
