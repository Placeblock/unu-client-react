import OpponentInventory from "../opponentinventory/OpponentInventory"
import "./OpponentInventoryList.css"

export default function OpponentInventoryList({players}) {
    return (
        <ul className="opponent-inventory-list">
            {players.map((p, i) => (
                <li className="oponent-inventory-container"
                    key={i}>
                    <OpponentInventory 
                        playerName={p.playerName}
                        active={p.active}
                        amount={p.amount}/>
                </li>
            ))}
        </ul>
    )
}