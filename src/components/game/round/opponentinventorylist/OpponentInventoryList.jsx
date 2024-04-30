import { useSelector } from "react-redux";
import OpponentInventory from "../opponentinventory/OpponentInventory"
import "./OpponentInventoryList.css"

export default function OpponentInventoryList() {
    const players = useSelector(state => state.round.value.players);
    const roomPlayers = useSelector(state => state.room.value.players);
    const currentPlayer = useSelector(state => state.round.value.currentPlayer);
    const playerCards = useSelector(state => state.round.value.playerCards);
    
    return (
        <ul className="opponent-inventory-list">
            {players.map((uuid) => (
                <li className="oponent-inventory-container"
                    key={uuid}>
                    <OpponentInventory 
                        playerUUID={uuid}
                        playerName={roomPlayers[uuid]?.name}
                        active={uuid==currentPlayer}
                        amount={playerCards[uuid]}/>
                </li>
            ))}
        </ul>
    )
}