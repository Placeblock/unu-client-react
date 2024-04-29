import { useSelector } from "react-redux";
import OpponentInventory from "../opponentinventory/OpponentInventory"
import "./OpponentInventoryList.css"
import { findPlayer } from "../../../../store/roomSlice";

export default function OpponentInventoryList() {
    const players = useSelector(state => state.round.value.players);
    const roomPlayers = useSelector(state => state.room.value.players);
    const currentPlayer = useSelector(state => state.round.value.currentPlayer);
    const playerCards = useSelector(state => state.round.value.playerCards);
    
    return (
        <ul className="opponent-inventory-list">
            {players.map((p) => (
                <li className="oponent-inventory-container"
                    key={p}>
                    <OpponentInventory 
                        playerUUID={p}
                        playerName={findPlayer(roomPlayers, p)?.name}
                        active={p==currentPlayer}
                        amount={playerCards[p]}/>
                </li>
            ))}
        </ul>
    )
}