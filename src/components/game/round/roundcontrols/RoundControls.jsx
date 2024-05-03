import { memo, useContext, useState } from "react"
import "./RoundControls.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide, faBullhorn, faCheck } from "@fortawesome/free-solid-svg-icons";
import AppTooltip from "../../../tooltip/AppTooltip";
import { WebsocketContext } from "../../../websocket/WebSocketContext";
import { useDispatch } from "react-redux";
import { sortInventory } from "../../../../store/roundSlice";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import ReactionMenu from "../quickreactions/ReactionMenu";
import useKeyBind from "../../../../hooks/KeyBindHook";

export default memo(function RoundControls() {
    const [showReactionMenu, setShowReactionMenu] = useState(false);
    const {sendMessage} = useContext(WebsocketContext);
    const dispatch = useDispatch();

    function sort() {
        dispatch(sortInventory());
    }
    useKeyBind("KeyS", () => {
        ackLastCard();
    })

    function endMove() {
        sendMessage("skip_move", {});
    }

    function ackLastCard() {
        sendMessage("acknowledge_last_card", {});
    }
    useKeyBind("KeyU", () => {
        ackLastCard();
    })

    return (
        <div className="round-controls">
            <button className="button open-reaction-menu-button" onClick={() => setShowReactionMenu(!showReactionMenu)}>
                <FontAwesomeIcon icon={faSmile}/>
            </button>
            <AppTooltip id="sort-button" content={"Sort Inventory (S)"} />
            <button className="button sort-button" onClick={sort}>
                <FontAwesomeIcon icon={faArrowDownShortWide}/>
            </button>
            <AppTooltip id="sort-button" content={"Sort Inventory"} />
            <button className="button skip-button" onClick={endMove}>
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <AppTooltip id="skip-button" content={"End Move"} />
            <button className="button ack-last-card-button" onClick={ackLastCard}>
                <FontAwesomeIcon icon={faBullhorn}/>
            </button>
            <AppTooltip id="ack-last-card-button" content={"Say UNU! (U)"} />
            {showReactionMenu&&<div className="reaction-menu-container">
                <ReactionMenu onClose={() => setShowReactionMenu(!showReactionMenu)}/>
            </div>}
        </div>
    )
});