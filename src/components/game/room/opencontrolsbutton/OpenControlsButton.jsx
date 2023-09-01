import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./OpenControlsButton.css"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import AppTooltip from "../../../tooltip/AppTooltip"
import useKeyBind from "../../../../hooks/KeyBindHook";

export default function OpenControlsButton({onToggle}) {

    useKeyBind("KeyM", () => {
        onToggle();
    });

    return (
        <>
            <button onClick={onToggle}
                className="button icon-button open-controls-button">
                <FontAwesomeIcon icon={faBars} />
            </button>
            <AppTooltip id="open-controls-button" content="Open/Close Menu (m)" />
        </>
    )
}