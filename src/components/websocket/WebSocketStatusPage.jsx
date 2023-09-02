import "./WebSocketStatusPage.css"
import Logo from "../logo/Logo"
import WebSocketStatus from "./WebSocketStatus";
import { memo, useContext, useEffect } from "react";
import { State, WebsocketContext } from "./WebSocketContext";
import { useDispatch } from "react-redux";
import { resetRoom } from "../../store/roomSlice";
import { resetRound } from "../../store/roundSlice";
import { resetUser } from "../../store/userSlice";


export default memo(function WebSocketStatusPage() {
    const {status, retries} = useContext(WebsocketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status!==State.CONNECTED) {
            dispatch(resetRound());
            dispatch(resetRoom());
            dispatch(resetUser());
        }
    }, [status]);

    return (
        <div className="websocket-status-page">
            <Logo />
            <WebSocketStatus status={status} retries={retries}/>
        </div>
    )
});