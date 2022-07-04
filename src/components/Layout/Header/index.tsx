import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import pageContext from "../../../context";
import { IHeader } from "./types";
import "./styles.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";

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
				<Navbar.Brand href="#home">
					<div className="app-header__logo"></div>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="app-header__navbar">
					<Nav className="m-auto app-header__navbar__links">
						<Nav.Link
							className="app-header__navbar__nav-link"
							href="#live">
							LIVE CASINO GAMES
						</Nav.Link>
						<Nav.Link
							className="app-header__navbar__nav-link"
							href="#slots">
							SLOT GAMES
						</Nav.Link>
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
