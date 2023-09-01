import Card from "../../../card/Card"
import "./OpponentInventory.css"
import { calcRotation } from "../inventory/Inventory";

export default function OpponentInventory({playerName, amount, active}) {
    function calcTranslation(i) {
        const betweencardsx = 5;
        return i*betweencardsx-betweencardsx*amount/2;
    }
    function getTransform(i) {
        return "translateX(-50%) translateX("+calcTranslation(i)+"px) rotate(" + -calcRotation(amount, i) + "deg)";
    }
    return (
        <div className="opponent-inventory" tabIndex={0}>
            <p className="opponent-inventory-player-name">{playerName}</p>

            <div className="opponent-inventory-large">
                <div className={`opponent-inventory-cards-container ${active?"active-opponent-inventory":""}`}>
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
                <div className={`opponent-inventory-number-card ${active?"active-opponent-inventory":""}`}>
                    <p>{amount}</p>
                </div>
            </div>

        </div>
    )
}