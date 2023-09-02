import { useDispatch } from "react-redux";
import "./CardGroupItem.css"
import Card from "../../../../card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CounterInput from "../../../../input/CounterInput";

export default function CardGroupItem({cardGroup, onAmount, onDelete}) {
    return (
        <div className="card-group-item">
            <button onClick={onDelete} 
                className="button negative-button delete-card-group-button">
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
            <div className="card-group-amount-container">
                <CounterInput onChange={onAmount} value={cardGroup.amount}/>
            </div>
            <div className="card-group-cards-container">
                {cardGroup["cards"].map((c, i) => (
                    <div key={i} className="card-group-card-container">
                        <Card card={c} />
                    </div>
                ))}
            </div>
        </div>
    )
}