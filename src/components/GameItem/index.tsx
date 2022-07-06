import React from "react";
import { IGameItem } from "./types";
import "./styles.scss";
import {
	SlotGameTag,
	SlotGameTagText,
	SlotGameTagTextFeatured,
} from "utils/Enums/slotGameTag";
import { GameTag } from "components/Common/GameTag";
import { SimpleToolTip } from "../Shared/SimpleTooltip";

export const GameItem: IGameItem = ({
	game,
	thumbnail,
	isBig = false,
	isFeatured = false,
}) => {
	const tags = game?.slotData?.tags;
	const lines = game?.slotData?.linesCount;
	const thumb = !thumbnail
		? game?.thumbnails.find((thumb) => thumb.width === 301) ||
		  game?.thumbnails[0]
		: thumbnail;

	return (
		<SimpleToolTip
			id="order-warning"
			text={<p className="game-tooltip">{game?.name}</p>}>
			<div className="game mb-4">
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
};
