import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Row } from "react-bootstrap";
import pageContext from "context";
import { ISlotFilters } from "./types";
import { SlotFilter } from "../SlotFilter";
import { BoxFilter } from "../BoxFilter";
import { LinesFilter } from "utils/Enums/linesFilter";
import { SlotGameTagTextFeatured } from "utils/Enums/slotGameTag";
import "./styles.scss";

export const SlotFilters: ISlotFilters = observer(() => {
	const { store } = useContext(pageContext);

	const getArrFromEnum = (enu: any) => {
		return Object.keys(enu).filter((k) => isNaN(Number(k)));
	};

	const onClear = () => {
		store.clearFilters();
	};

	return (
		<div className="filters-container">
			<Row>
				<Col sm={3}>
					<SlotFilter
						title="Lines"
						filter={
							<>
								<BoxFilter
									isRadio
									enu={getArrFromEnum(LinesFilter)}
								/>
							</>
						}
					/>
				</Col>
				<Col sm={3}>
					<SlotFilter
						title="Game Features"
						filter={
							<>
								<BoxFilter
									enu={getArrFromEnum(
										SlotGameTagTextFeatured
									)}
								/>
							</>
						}
					/>
				</Col>
				<Col sm={1}>
					<Button className="pink-button m-3" onClick={onClear}>
						Clear
					</Button>
				</Col>
			</Row>
		</div>
	);
});
