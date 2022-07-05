import React, { Children, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISimpleToolTip } from "./types";
import "./styles.scss";

export const SimpleToolTip: ISimpleToolTip = ({
	id,
	children,
	text = "",
	showTooltip = true,
	tooltipPlacement = "top",
	trigger = ["hover", "focus"],
	rootClose = false,
	disabledWrapperClass = "d-inline-block w-100 position-relative",
}) => {
	const [childrenDisabled, setChildrenDisabled] = useState(false);
	const childElement = Children.only(children);

	useEffect(() => {
		if (childElement.props.disabled) {
			setChildrenDisabled(true);
		}
	}, [children]);

	if (!showTooltip) {
		return children;
	}

	return (
		<OverlayTrigger
			placement={tooltipPlacement}
			trigger={trigger}
			rootClose={rootClose}
			overlay={<Tooltip id={id}>{text}</Tooltip>}>
			{childrenDisabled ? (
				<div className={disabledWrapperClass}>
					{children}
					<div className="active-block-cover" />
				</div>
			) : (
				children
			)}
		</OverlayTrigger>
	);
};
