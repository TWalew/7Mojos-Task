import React, { useState } from "react";
import { ITitleBar } from "./types";
import "./styles.scss";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
							className={`title-bar__filter-button ${
								open ? "opened" : ""
							}`}
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
