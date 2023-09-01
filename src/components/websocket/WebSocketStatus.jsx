import "./WebSocketStatus.css"
import Logo from "../logo/Logo"
import { State, WebsocketContext } from "./WebSocketContext";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useContext } from "react";


export default function WebSocketStatus() {
    const {status, retries} = useContext(WebsocketContext);
    const connectionStatus = {
        [State.CONNECTING]: 'Connecting',
        [State.CONNECTED]: 'Connected',
        [State.RECONNECTING]: 'Reconnecting',
        [State.CLOSED]: 'Closed'
    }[status];
    return (
        <div className="websocket-status">
            <Logo />
            <p className="websocket-status-message">{connectionStatus} {status==State.RECONNECTING&&<span>Try {retries}/10</span>}</p>
            <LoadingSpinner />
        </div>
    )
}