import "./Inventory.css"

import Card from "../../../card/Card";
import { useContext, useEffect, useRef } from "react";
import { WebsocketContext } from "../../../websocket/WebSocketContext";
import { useSelector } from "react-redux";

export default function Inventory() {
    const cards = useSelector(state => state.round.value.inventory);
    const currentPlayer = useSelector(state => state.round.value.currentPlayer);
    const user = useSelector(state => state.user.value.uuid);
    const {sendMessage} = useContext(WebsocketContext);
    const amount = cards.length;
    const invRef = useRef();

    function handlePlace(uuid) {
        sendMessage("place_card", {"uuid":uuid});
    }

    useEffect(() => {
        if (invRef != null) {
            // Center inventory at beginning
            invRef.current.scrollTo(invRef.current.scrollWidth/2-window.innerWidth/2, 0);
        }
    }, [invRef]);

    return (
        <div ref={invRef} className={`inventory ${currentPlayer!=user?"inventory-disabled":""}`}>
            {cards.map((c, i) => (
                <div className="inventory-card-container">
                    <button className="inventory-card" 
                        onClick={() => handlePlace(c.uuid)}
                        key={c.uuid}
                        style={{transform: "translateX(-50%) rotate(" + calcRotation(amount,i) + "deg)"}}>
                        <Card card={c}/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export function calcRotation(amount, i) {
    const betweencardsangle = 60/amount;
    const absoluteindexangle = (i+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
}