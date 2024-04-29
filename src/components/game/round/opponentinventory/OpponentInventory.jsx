import Card from "../../../card/Card"
import "./OpponentInventory.css"
import { calcRotation } from "../inventory/Inventory";
import useWebSocket from "../../../websocket/WebSocketHook";
import { useEffect, useRef, useState } from "react";
import { getReaction } from "../quickreactions/ReactionItem";

export default function OpponentInventory({playerUUID, playerName, amount, active}) {
    const [showAckLastCard, setShowAckLastCard] = useState(false);
    const [showReaction, setShowReaction] = useState(false);
    const [lastReaction, setLastReaction] = useState("");
    const ref = useRef(null);

    function calcTranslation(i) {
        const betweencardsx = 5;
        return i*betweencardsx-betweencardsx*amount/2;
    }
    function getTransform(i) {
        return "translateX(-50%) translateX("+calcTranslation(i)+"px) rotate(" + -calcRotation(amount, i) + "deg)";
    }
    useWebSocket("acknowledge_last_card", data => {
        if (playerUUID==data.player) {
            setShowAckLastCard(true);
            setTimeout(() => {
                setShowAckLastCard(false);
            }, 3500);
        }
    })
    useWebSocket("quick_reaction", data => {
        if (playerUUID==data.player) {
            setLastReaction(data.quick_reaction);
            setShowReaction(true);
            setTimeout(() => {
                setShowReaction(false);
            }, 7000);
        }
    })

    useEffect(() => {
        if (active && ref.current != null) {
            ref.current.scrollIntoView({behaviour: "smooth"});
        }
    }, [active])

    return (
        <div ref={ref} className={`opponent-inventory ${active?"active-opponent-inventory":""}`} tabIndex={0}>
            <p className="opponent-inventory-player-name">{playerName}</p>

            <div className="opponent-inventory-large">
                <div className="opponent-inventory-cards-container">
                    {[...Array(amount)].map((_, i) => (
                        <div className="opponent-inventory-card-container"
                            key={i}
                            style={{transform: getTransform(i)}}>
                            <Card back={true} card={{}}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="opponent-inventory-small">
                <div className="opponent-inventory-number-card">
                    <p>{amount}</p>
                </div>
            </div>
            {showAckLastCard&&<p className="ack-last-card">UNU!!</p>}
            {showReaction&&<p className="reaction">{getReaction(lastReaction)}</p>}
        </div>
    )
}