import useKeyBind from "../../../hooks/KeyBindHook";
import PinInput from "../../input/PinInput"
import AppTooltip from "../../tooltip/AppTooltip";
import "./RoomInput.css"

export default function RoomInput({onJoin, onCreate, invalidRoom}) {
    function joinRoom(value) {
        onJoin(Number(value));
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
        </div>
    )
}