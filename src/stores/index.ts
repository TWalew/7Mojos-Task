import { action, makeObservable, observable } from "mobx";
import { LinesFilter } from "utils/Enums/linesFilter";
import { SlotGameTag, SlotGameTagTextFeatured } from "utils/Enums/slotGameTag";
import { GameAPI } from "../api/Games";
import { PlayerAPI } from "../api/Player";
import { Req } from "./Common/Req";
import { IGame, IPageData, IPlayerData, IPlayerResponse } from "./types";

export default class GlobalStore {
	@observable player: IPlayerData;

	@observable games: IGame[];

	@observable liveGames: IGame[];

	@observable filteredGames: IGame[];

	@observable tagsFilter: SlotGameTag[];

	@observable linesFilter: string;

	private playerToken = "Player777";
	private operatorToken = "654be709f71140f7aa65dcd8cede80d4";

	constructor(pageData: IPageData) {
		this.player = pageData.player.data;
		this.games = pageData.games;
		this.filteredGames = pageData.games;
		this.liveGames = pageData.games;
		this.tagsFilter = [];
		this.linesFilter = "";

		makeObservable(this);
	}

	@action
	setPlayer = (response: IPlayerResponse) => {
		this.player = response.data;
	};

	@action
	setSlots = (response: IGame[]) => {
		this.games = response;
		this.filteredGames = response;
	};

	@action
	setLives = (response: IGame[]) => {
		this.liveGames = response;
	};

	@action
	setTagFilter = (feature: any) => {
		const index = this.tagsFilter.findIndex((x) => x === feature);
		if (index === -1) {
			this.tagsFilter.push(feature);
		} else {
			this.tagsFilter.splice(index, 1);
		}
		this.filterSlots();
	};

	@action
	setLinesFilter = (lines: string) => {
		this.linesFilter = lines;
		this.filterSlots();
	};

	@action
	filterSlots = () => {
		const games = [...this.games];
		const linesArr = this.linesFilter.replace(">", "").split("-");
		let newGames: IGame[] = [];
		newGames = games.filter((fg) => {
			const linesCount = fg?.slotData?.linesCount as number;
			return linesCount >= +linesArr[0] && linesArr[1]
				? linesCount <= +linesArr[1]
				: false;
		});
		if (this.tagsFilter.length) {
			this.tagsFilter.forEach((tf) => {
				newGames = newGames.filter((fg) => {
					return fg.slotData?.tags.includes(
						+SlotGameTagTextFeatured[tf]
					);
				});
			});
		}

		this.filteredGames = [...newGames];
	};

	@action
	openGame = (game: IGame) => {
		const url = `${game.clientUrl}?gameToken=${game.token}&operatorToken=${this.operatorToken}&playerToken=${this.playerToken}&host=${game.hostUrl}`;
		window.open(url, "_blank", "noopener,noreferrer");
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
		type === "slots" ? this.setSlots(res) : this.setLives(res);
	});
}
