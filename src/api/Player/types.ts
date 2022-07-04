import { IPlayerResponse } from "../../stores/types";
import type { EndpointFunc } from "../EndpointClass";

export type IPlayerApi = {
	loadPlayer: EndpointFunc<
		{ playerToken: string; operatorToken: string },
		IPlayerResponse
	>;
};
