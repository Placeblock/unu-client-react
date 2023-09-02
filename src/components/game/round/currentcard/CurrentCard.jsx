import { useSelector } from "react-redux";
import "./CurrentCard.css"
import Card from "../../../card/Card";

export default function CurrentCard() {
    const card = useSelector(state => state.round.value.currentCard);
    const drawStack = useSelector(state => state.round.value.drawStack);

    return (
        <div className="current-card">
            <Card card={card}/>
            {drawStack!=0&&<span className="draw-stack-badge">{drawStack}</span>}
        </div>
    )
}