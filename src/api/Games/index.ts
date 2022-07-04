import { Endpoint } from "./../EndpointClass/endpointClass";
import { IGameApi } from "./types";

export const GameAPI: IGameApi = {
	loadGames: new Endpoint("get", `/api/lobby/games`).build(),
};
