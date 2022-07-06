import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { ITitleBar } from "./types";
import "./styles.scss";

export const TitleBar: ITitleBar = ({ filters, children, classNames }) => {
	const [open, setOpen] = useState(false);

	const onOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className={`title-bar  ${classNames ? classNames : ""}`}>
				<Container>
					{children}
					{filters && (
						<Button
							className={`pink-button  ${open ? "opened" : ""}`}
							onClick={onOpen}>
							Filters{" "}
							{open ? (
								<FontAwesomeIcon icon={faChevronUp} />
							) : (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
						</Button>
					)}
				</Container>
			</div>
			{open && (
				<Container>
					<div className="filters mb-4">{filters}</div>
				</Container>
			)}
		</>
	);
};
