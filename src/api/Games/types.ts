import { IGame } from "../../stores/types";
import type { EndpointFunc } from "../EndpointClass";

export type IGameApi = {
	loadGames: EndpointFunc<
		{ operatorToken: string; currency: string; type: string },
		IGame[]
	>;
};
