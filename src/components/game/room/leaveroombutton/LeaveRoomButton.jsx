import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./LeaveRoomButton.css"
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import AppTooltip from "../../../tooltip/AppTooltip"

export default function LeaveRoomButton({onLeave}) {
    return (
        <>
            <button className="button icon-button leave-room-button"
                onClick={onLeave}
                data-tooltip-delay-show={1000}
                data-tooltip-content={"Leave Room"}>
                <FontAwesomeIcon icon={faDoorOpen}/>
            </button>
            <AppTooltip id="leave-room-button" content="Leave Room" />
        </>
    )
}