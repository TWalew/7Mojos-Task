import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";

import { ISlotFilter } from "./types";
import "./styles.scss";

export const SlotFilter: ISlotFilter = observer(() => {
	const { store } = useContext(pageContext);

	return (
		<div className="slot-filter">
			<p className="slot-filter__title">Title</p>
			<p>filter</p>
			<p>filter</p>
			<p>filter</p>
			<p>filter</p>
		</div>
	);
});
