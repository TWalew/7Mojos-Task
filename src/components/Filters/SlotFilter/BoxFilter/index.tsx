import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "context";
import { IBoxFilter } from "./types";
import "./styles.scss";
import { Form } from "react-bootstrap";
import { LinesFilter } from "utils/Enums/linesFilter";

export const BoxFilter: IBoxFilter = observer(({ enu, isRadio = false }) => {
	const { store } = useContext(pageContext);
	const { setFilteredGamesByLine, setFilteredGamesByFeature } = store;

	const onFilterByLine = (line: string) => {
		setFilteredGamesByLine(line);
	};

	const onFilterByFeature = (feature: string) => {
		setFilteredGamesByFeature(feature);
	};

	return (
		<Form className="slot-lines-filter">
			{enu.map((key) => (
				<div key={key} className="mb-3">
					<Form.Check
						inline
						label={key}
						name={isRadio ? "GameLines" : "GameFeatures"}
						type={isRadio ? "radio" : "checkbox"}
						id={`inline-${key}-1`}
						onClick={() =>
							isRadio
								? onFilterByLine(key)
								: onFilterByFeature(key)
						}
					/>
				</div>
			))}
		</Form>
	);
});
