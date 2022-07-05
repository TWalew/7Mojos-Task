import React from "react";
import { Outlet } from "react-router-dom";
import { ILayout } from "./types";
import { Header } from "./Header";
// import "./styles.scss";

export const Layout: ILayout = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};
