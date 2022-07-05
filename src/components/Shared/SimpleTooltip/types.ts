import type { FC, ReactElement, ReactNode } from "react";
import type { OverlayTriggerProps } from "react-bootstrap";

export type ISimpleToolTip = FC<{
	id: string;
	children: ReactElement;
	text: string | ReactNode;
	showTooltip?: boolean;
	tooltipPlacement?: OverlayTriggerProps["placement"];
	trigger?: OverlayTriggerProps["trigger"];
	rootClose?: OverlayTriggerProps["rootClose"];
	disabledWrapperClass?: string;
}>;
