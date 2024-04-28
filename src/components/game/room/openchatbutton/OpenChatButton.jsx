import "./OpenChatButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import useKeyBind from "../../../../hooks/KeyBindHook"
import AppTooltip from "../../../tooltip/AppTooltip"

export default function OpenChatButton({onToggle}) {
    useKeyBind("KeyC", () => {
        onToggle();
    });

    return (
        <>
            <button className="button icon-button open-chat-button" 
                onClick={onToggle}>
                <FontAwesomeIcon icon={faComment} />
            </button>
            <AppTooltip id="open-chat-button" content="Open/Close Chat (c)" />
        </>

    )
}