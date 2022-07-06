import { IGame, IThumbnail } from "../../stores/types";
import type { FC } from "react";

export type ILiveGameItem = FC<{
	game: IGame;
	thumbnail?: IThumbnail;
}>;
