import { useSelector } from "react-redux";
import CounterInput from "../../input/CounterInput"
import "./RoomSettingsCounterItem.css"
import RoomSettingsItem from "./RoomSettingsItem"


export default function RoomSettingsCounterItem({title, name, onUpdate, disabled}) {
    const setting = useSelector(state => state.room.value.settings[name]);

    return (
        <RoomSettingsItem title={title}>
            <CounterInput 
                onChange={c => onUpdate(name, c)} value={setting}
                disabled={disabled} />
        </RoomSettingsItem>
    )
}