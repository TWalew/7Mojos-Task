import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Form } from "react-bootstrap";

import { IBoxFilter } from "./types";
import pageContext from "context";
import "./styles.scss";

export const BoxFilter: IBoxFilter = observer(({ enu, isRadio = false }) => {
	const { store } = useContext(pageContext);
	const { setLinesFilter, setTagFilter, linesFilter, tagsFilter } = store;

	const onFilterByLine = (line: any) => {
		setLinesFilter(line);
	};

	const onFilterByFeature = (feature: string) => {
		setTagFilter(feature);
	};

	return (
		<Form className="slot-lines-filter">
			{enu.map((key) => (
				<div key={key} className="mb-3">
					<Form.Check
						readOnly
						inline
						label={key}
						name={isRadio ? "GameLines" : "GameFeatures"}
						type={isRadio ? "radio" : "checkbox"}
						id={`inline-${key}-1`}
						checked={
							isRadio
								? linesFilter === key
								: tagsFilter.includes(key as any)
						}
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
