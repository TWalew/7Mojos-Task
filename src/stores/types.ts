import { SlotGameTag } from "../utils/Enums/slotGameTag";
import { GameCategory } from "./../utils/Enums/gameCategory";
import { GameType } from "./../utils/Enums/gameType";

export interface IPageData {
	player: IPlayerResponse;
	games: IGame[];
}

export interface IPlayerResponse {
	successful: boolean;
	errorMsg: string | null;
	data: IPlayerData;
}

export interface IPlayerData {
	username: string;
	currency: string;
	balance: number;
}

export interface IGame {
	name: string;
	token: string;
	thumbnails: IThumbnail[];
	gameType: GameType;
	categories: GameCategory[];
	isFeatured: boolean;
	hostUrl: string;
	clientUrl: string;
	slotData: ISlotData | null;
	liveData: ILiveData | null;
	betData: IBetData | null;
}

export interface IThumbnail {
	width: number;
	height: number;
	imageUrl: string;
	videoUrl: string;
}

export interface ISlotData {
	reelsCount: number;
	rowsCount: number;
	volatility: number;
	hitRate: number;
	linesCount: number;
	tags: SlotGameTag[];
}

export interface ILiveData {
	lastResults: number[];
	playersCount: number;
	dealerName: string;
	schedule: ISchedule;
}

export interface IBetData {
	min: number;
	max: number;
}

export interface ISchedule {
	from: string;
	to: string;
	timezone: string;
}
