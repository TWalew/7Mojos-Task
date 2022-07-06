import React from "react";

import { IGameTag } from "./types";
import "./styles.scss";

export const GameTag: IGameTag = ({ lines, tag }) => {
	return (
		<span className={`game-tag ${lines ? "lines" : "tag"}`}>
			{tag && (
				<>
					{tag?.split(" ").map((t, index) => (
						<span key={t} className={`tag${index}`}>
							{t}{" "}
						</span>
					))}
				</>
			)}
			{lines && (
				<>
					<span className="lines-number">{lines}</span>
					<span className="lines-text"> LINES</span>
				</>
			)}
		</span>
	);
};
