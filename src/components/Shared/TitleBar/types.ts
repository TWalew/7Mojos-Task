import type { FC, ReactElement, ReactNode } from "react";

export type ITitleBar = FC<{
	children: ReactElement;
	filters?: ReactNode;
	classNames?: string;
}>;
