import { Endpoint } from "./../EndpointClass/endpointClass";
import { IPlayerApi } from "./types";

export const PlayerAPI: IPlayerApi = {
	loadPlayer: new Endpoint("get", `/api/lobby/player`).build(),
};
