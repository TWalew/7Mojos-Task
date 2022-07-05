import { IGame, IThumbnail } from "./../../../stores/types";
import type { FC } from "react";

export type IGameItem = FC<{
	game: IGame;
	thumbnail?: IThumbnail;
	isBig?: boolean;
	isFeatured?: boolean;
}>;
