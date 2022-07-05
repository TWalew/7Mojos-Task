import { toast as toastLib, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

toastLib.configure({
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	transition: Zoom,
});

export const toast = toastLib;
