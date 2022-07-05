import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { ISlotFilters } from "./types";
import "./styles.scss";
import { Col, Row } from "react-bootstrap";
import { SlotFilter } from "../SlotFilter";

export const SlotFilters: ISlotFilters = observer(() => {
	const { store } = useContext(pageContext);

	return (
		<div className="filters-container">
			<Row>
				<Col sm={3}>
					<SlotFilter />
				</Col>
				<Col sm={3}>
					<SlotFilter />
				</Col>
			</Row>
		</div>
	);
});
