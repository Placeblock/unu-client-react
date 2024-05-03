import { useContext } from "react";
import useKeyBind from "../../../hooks/KeyBindHook";
import PinInput from "../../input/PinInput"
import AppTooltip from "../../tooltip/AppTooltip";
import "./RoomInput.css"
import { WebsocketContext } from "../../websocket/WebSocketContext";
import PublicRooms from "../publicRooms/PublicRooms";

export default function RoomInput({onJoin, onCreate, invalidRoom}) {
    const {sendMessage} = useContext(WebsocketContext);

    function joinRoom(value) {
        onJoin(value);
    }

    useKeyBind("KeyC", onCreate)

    return (
        <div className="room-input">
            <div>
                <label>Join with ID</label>
                <PinInput length={4} onSubmit={joinRoom} />
            </div>
            {invalidRoom&&<p style={{color: "red"}}>Invalid Room!</p>}
            <hr></hr>
            <button className="button basic-button create-room-button" onClick={onCreate}>Create Room</button>
            <AppTooltip id="create-room-button" content="Create Room (c)" />
            <hr></hr>
            <p style={{color: "white"}}>Public Rooms</p>
            <PublicRooms onJoin={joinRoom} />
        </div>
    )
}