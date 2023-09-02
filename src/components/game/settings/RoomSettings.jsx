import { useSelector } from "react-redux";
import "./RoomSettings.css"
import RoomSettingsSwitchItem from "./RoomSettingsSwitchItem";
import { useCallback, useContext, useState } from "react";
import { WebsocketContext } from "../../websocket/WebSocketContext"
import RoomSettingsCounterItem from "./RoomSettingsCounterItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardStackEditor from "./cardstackedit/cardstackeditor/CardStackEditor";
import useKeyBind from "../../../hooks/KeyBindHook";

export default function RoomSettings({onClose}) {
    const settings = useSelector(state => state.room.value.settings);
    const {sendMessage} = useContext(WebsocketContext);
    const [showCardStackEdit, setShowCardStackEdit] = useState(false);
    const owner = useSelector(state => state.room.value.owner);
    const user = useSelector(state => state.user.value.uuid);

    const disabled = owner!=user;

    const handleUpdate = useCallback((name, value) => {
        if (disabled) return;
        sendMessage("round_settings", {"round_settings": {
            ...settings,
            [name]: value
        }});
    }, [disabled, settings]);

    const toggleCardStackEdit = useCallback(() => {
        setShowCardStackEdit(showCardStackEdit => !showCardStackEdit)
    },[]);

    useKeyBind("Escape", () => {
        onClose();
    });

    return (
        <div className="room-settings dark-container">
            <div className="room-settings-info">
                <h1>Settings</h1>
                {disabled&&<p>You don't have permission</p>}
                <button className="room-settings-close-button" 
                        onClick={onClose}><FontAwesomeIcon icon={faTimes}/></button>
            </div>
            <div className="room-settings-contents">
                <RoomSettingsCounterItem title={"Startcards"} name={"start_card_amount"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on 4+"} name={"plus4_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"2+ on 4+"} name={"plus2_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on 2+"} name={"plus4_on_plus2"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"Wish on 4+"} name={"wish_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"4+ on Wish"} name={"plus4_on_wish"} onUpdate={handleUpdate} disabled={disabled}/>
                <RoomSettingsSwitchItem title={"Wish on Wish"} name={"wish_on_wish"} onUpdate={handleUpdate} disabled={disabled}/>
                <button className="button open-card-stack-button" onClick={() => toggleCardStackEdit()}>Edit Card-Stack</button>
            </div>
            {showCardStackEdit&&<div className="card-stack-edit-container dark-container">
                <CardStackEditor onClose={toggleCardStackEdit}/>
            </div>}
        </div>
    )

}