import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";
import pageContext from "../../../context";
import { IHeader } from "./types";
import "./styles.scss";

export const Header: IHeader = observer(() => {
	const { store } = useContext(pageContext);
	const { player } = store;
	const currencySymbol = getSymbolFromCurrency(player.currency);

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			className="app-header">
			<Container>
				<Navbar.Brand href="/">
					<div className="app-header__logo"></div>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="app-header__navbar">
					<Nav className="app-header__navbar__links">
						<NavLink
							className="app-header__navbar__nav-link nav-link"
							to="/live">
							LIVE CASINO GAMES
						</NavLink>
						<NavLink
							className="app-header__navbar__nav-link nav-link"
							to="/">
							SLOT GAMES
						</NavLink>
					</Nav>
					<Nav>
						<div className="app-header__navbar__player">
							<span className="username">{player.username},</span>
							<span className="balance">
								{currencySymbol ? currencySymbol : ""}
								{player.balance}
							</span>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
});
