import type { FC, ReactNode } from "react";

export type ISlotFilter = FC<{
	title: string;
	filter: ReactNode;
}>;
