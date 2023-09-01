import { useSelector } from "react-redux";
import "./RoomSettings.css"
import RoomSettingsSwitchItem from "./RoomSettingsSwitchItem";
import { useContext } from "react";
import { WebsocketContext } from "../../websocket/WebSocketContext"
import RoomSettingsCounterItem from "./RoomSettingsCounterItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function RoomSettings({onClose}) {
    const settings = useSelector(state => state.room.value.settings);
    const {sendMessage} = useContext(WebsocketContext);
    const owner = useSelector(state => state.room.value.owner);
    const user = useSelector(state => state.user.value.uuid);

    const disabled = owner!=user;

    function handleUpdate(name, value) {
        if (disabled) return;
        sendMessage("round_settings", {"roundSettings": {
            ...settings,
            [name]: value
        }});
    }

    return (
        <div className="room-settings">
            <div className="room-settings-info">
                <h1>Settings</h1>
                {disabled&&<p>You don't have permission</p>}
                <button className="room-settings-close-button" 
                        onClick={onClose}><FontAwesomeIcon icon={faTimes}/></button>
            </div>
            <div className="room-settings-contents">
                <RoomSettingsCounterItem title={"Startcards"} name={"startCardAmount"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on 4+"} name={"plus4OnPlus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"2+ on 4+"} name={"plus2OnPlus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on 2+"} name={"plus4OnPlus2"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"Wish on 4+"} name={"wishOnPlus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on Wish"} name={"plus4OnWish"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"Wish on Wish"} name={"wishOnWish"} onUpdate={handleUpdate} disabled={disabled}/>
            </div>
        </div>
    )

}