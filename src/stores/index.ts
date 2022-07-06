import { action, makeObservable, observable } from "mobx";
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

	private playerToken = "Player777";
	private operatorToken = "654be709f71140f7aa65dcd8cede80d4";

	constructor(pageData: IPageData) {
		this.player = pageData.player.data;
		this.games = pageData.games;
		this.filteredGames = pageData.games;
		this.liveGames = pageData.games;
		this.tagsFilter = [];

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
			this.filteredGames = [...this.games];
		}
	};

	// TODO fix filters
	@action
	setFilteredGamesByLine = (lines: string) => {
		const games = [...this.games];
		const linesArr = lines.replace(">", "").split("-");
		let newGames = [];
		if (linesArr.length > 1) {
			newGames = games.filter((fg) => {
				const linesCount = fg?.slotData?.linesCount as number;
				return linesCount >= +linesArr[0] && linesCount <= +linesArr[1];
			});
			this.filteredGames = [...newGames];
		} else {
			newGames = games.filter((fg) => {
				const linesCount = fg?.slotData?.linesCount as number;
				return linesCount > +linesArr[0];
			});
			this.filteredGames = [...newGames];
		}
	};

	@action
	setFilteredGamesByFeature = (feature: any) => {
		this.setTagFilter(feature);
		const games = [...this.filteredGames];
		let newGames = [];
		if (this.tagsFilter.length) {
			this.tagsFilter.forEach((tf) => {
				newGames = games.filter((fg) => {
					return fg.slotData?.tags.includes(
						+SlotGameTagTextFeatured[tf]
					);
				});
				this.filteredGames = [...newGames];
			});
		} else {
			this.filteredGames = this.games;
		}
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
