import { createContext } from "react";
import Store from "./stores";
import { initialPageData } from "./stores/initialValues";

type IDetailsContext = {
	store: Store;
};

export default createContext<IDetailsContext>({
	store: new Store(initialPageData),
});
