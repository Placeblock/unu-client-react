import { useSelector } from "react-redux";
import "./RoomSettings.css"
import RoomSettingsSwitchItem from "./RoomSettingsSwitchItem";
import { useCallback, useContext, useState } from "react";
import { WebsocketContext } from "../../websocket/WebSocketContext"
import RoomSettingsCounterItem from "./RoomSettingsCounterItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardDeckEditor from "./carddeckedit/carddeckeditor/CardDeckEditor";
import useKeyBind from "../../../hooks/KeyBindHook";

export default function RoomSettings({onClose}) {
    const settings = useSelector(state => state.room.value.settings);
    const {sendMessage} = useContext(WebsocketContext);
    const [showCardDeckEdit, setShowCardDeckEdit] = useState(false);
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

    const toggleCardDeckEdit = useCallback(() => {
        setShowCardDeckEdit(showCardDeckEdit => !showCardDeckEdit)
    },[disabled]);

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
                <div className="room-settings-item-container">
                    <RoomSettingsCounterItem title={"Startcards"} name={"start_card_amount"} onUpdate={handleUpdate} disabled={disabled} min={1} max={50}/>
                    <RoomSettingsCounterItem title={"No ack. Punishment"} name={"no_last_card_ack_punishment"} onUpdate={handleUpdate} disabled={disabled} min={0} max={5}/>
                    <RoomSettingsCounterItem title={"False ack. Punishment"} name={"punishment_false_ack"} onUpdate={handleUpdate} disabled={disabled} min={0} max={5}/>
                    <p style={{color: "white"}}>Cards</p>
                    <RoomSettingsSwitchItem title={"4+ on 4+"} name={"plus4_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"2+ on 4+ if color matches"} name={"plus2_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"4+ on 2+"} name={"plus4_on_plus2"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"Wish on 4+"} name={"wish_on_plus4"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"4+ on Wish"} name={"plus4_on_wish"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"Wish on Wish"} name={"wish_on_wish"} onUpdate={handleUpdate} disabled={disabled}/>
                    <p style={{color: "white"}}>Miscellaneous</p>
                    <RoomSettingsSwitchItem title={"Play again with inverse card"} name={"skip_on_inverse2_players"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"Auto next player if no choice"} name={"auto_next_no_choice"} onUpdate={handleUpdate} disabled={disabled}/>
                    <RoomSettingsSwitchItem title={"Clear draw stack if player leaves"} name={"clear_draw_stack_on_leave"} onUpdate={handleUpdate} disabled={disabled}/>
                    <p style={{color: "white"}}>Deck</p>
                    <div className="open-card-deck-button-container">
                        <button className="button open-card-deck-button" onClick={toggleCardDeckEdit}>Edit Card-Deck</button>
                    </div>
                </div>
            </div>
            {showCardDeckEdit&&<div className="card-deck-edit-container dark-container">
                <CardDeckEditor onClose={toggleCardDeckEdit} disabled={disabled}/>
            </div>}
        </div>
    )

}