import { IPageData, IPlayerData, IPlayerResponse } from "./types";

export const initialPlayerData: IPlayerData = {
	username: "",
	currency: "",
	balance: 0,
};

export const initialPlayer: IPlayerResponse = {
	successful: false,
	errorMsg: null,
	data: initialPlayerData,
};

export const initialPageData: IPageData = {
	player: initialPlayer,
	games: [],
};
