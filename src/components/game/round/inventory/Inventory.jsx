import "./Inventory.css"

import Card from "../../../card/Card";
import { useContext } from "react";
import { WebsocketContext } from "../../../websocket/WebSocketContext";
import { useSelector } from "react-redux";

export default function Inventory() {
    const cards = useSelector(state => state.round.value.inventory);
    const {sendMessage} = useContext(WebsocketContext);
    const amount = cards.length;

    function getTransform(i) {
        const trans = calcTranslation(amount, i);
        const rot = calcRotation(amount, i);
        return "translateX("+trans+"px) rotate(" + rot + "deg)";
    }
    function handlePlace(uuid) {
        sendMessage("place_card", {"uuid":uuid});
    }

    return (
        <div className="inventory">
            {cards.map((c, i) => (
                <button className="inventory-card" 
                    onClick={() => handlePlace(c.uuid)}
                    key={c.uuid}
                    style={{transform: getTransform(i)}}>
                    <Card card={c}/>
                </button>
            ))}
        </div>
    )
}

export function calcTranslation(amount, i) {
    const totalwidth = window.innerWidth/2;
    const betweencardsx = Math.min(totalwidth/amount, 30);
    const absolutecardsx = i*betweencardsx;
    return absolutecardsx-betweencardsx*amount/2;
}
export function calcRotation(amount, i) {
    const betweencardsangle = 60/amount;
    const absoluteindexangle = (i+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
}