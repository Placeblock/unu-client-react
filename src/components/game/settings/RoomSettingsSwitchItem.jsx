import { useSelector } from "react-redux"
import "./RoomSettingsSwitchItem.css"
import SwitchInput from "../../input/SwitchInput";
import RoomSettingsItem from "./RoomSettingsItem";

export default function RoomSettingsSwitchItem({title, name, onUpdate, disabled}) {
    const setting = useSelector(state => state.room.value.settings[name]);

    return (
        <RoomSettingsItem title={title}>
            <SwitchInput 
                onSwitch={() => onUpdate(name, !setting)} toggled={setting}
                disabled={disabled} />
        </RoomSettingsItem>
    )

}