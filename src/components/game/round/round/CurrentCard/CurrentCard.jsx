import { useSelector } from "react-redux";
import "./CurrentCard.css"
import Card from "../../../../card/Card";

export default function CurrentCard() {
    const card = useSelector(state => state.round.value.currentCard);

    return (
        <div className="current-card">
            <Card card={card}/>
        </div>
    )
}