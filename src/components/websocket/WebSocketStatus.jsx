import "./WebSocketStatus.css"
import { State } from "./WebSocketContext";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function WebSocketStatus({status, retries}) {
    const connectionStatus = {
        [State.CONNECTING]: 'Connecting',
        [State.CONNECTED]: 'Connected',
        [State.RECONNECTING]: 'Reconnecting',
        [State.CLOSED]: 'Closed'
    }[status];
    return (
        <div className="websocket-status">
            <p className="websocket-status-message">{connectionStatus} {status==State.RECONNECTING&&<span>Try {retries}/10</span>}</p>
            <LoadingSpinner />
        </div>
    )
}