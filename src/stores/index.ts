import { action, makeObservable, observable } from "mobx";
import { GameAPI } from "../api/Games";
import { PlayerAPI } from "../api/Player";
import { Req } from "./Common/Req";
import { IGame, IPageData, IPlayerData, IPlayerResponse } from "./types";

export default class GlobalStore {
	@observable player: IPlayerData;

	@observable games: IGame[];

	private playerToken = "Player777";
	private operatorToken = "654be709f71140f7aa65dcd8cede80d4";

	constructor(pageData: IPageData) {
		this.player = pageData.player.data;
		this.games = pageData.games;

		makeObservable(this);
	}

	@action
	setPlayer = (response: IPlayerResponse) => {
		this.player = response.data;
	};

	@action
	setGames = (response: IGame[]) => {
		this.games = response;
	};

	loadPlayer = new Req(async () => {
		const res = await PlayerAPI.loadPlayer({
			playerToken: this.playerToken,
			operatorToken: this.operatorToken,
		});
		this.setPlayer(res);
	});

	loadGames = new Req(async (currency: string, type: string) => {
		const res = await GameAPI.loadGames({
			operatorToken: this.operatorToken,
			currency,
			type,
		});
		this.setGames(res);
	});
}
