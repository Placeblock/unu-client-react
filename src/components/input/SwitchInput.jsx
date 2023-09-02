import { useState } from "react"
import "./SwitchInput.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

export default function SwitchInput({onSwitch, toggled, disabled}) {

    function handleClick() {
        if (disabled) return;
        onSwitch(!toggled);
    }

    return (
        <button className={`switch-input 
                ${toggled?"switch-input-on":"switch-input-off"} 
                ${disabled?"switch-input-disabled":""}`} onClick={handleClick}>
            {toggled?
                <FontAwesomeIcon icon={faToggleOn} />:
                <FontAwesomeIcon icon={faToggleOff} />
            }
        </button>
    )
}