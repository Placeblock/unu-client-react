import "./PlayerList.css"
import { useSelector } from "react-redux"
import PlayerListItem from "../playerlistitem/PlayerListItem";


export default function PlayerList() {
    const players = useSelector(state => state.room.value.players);
    const owner = useSelector(state => state.room.value.owner);
    const user = useSelector(state => state.user.value.uuid);
    const leaderboard = useSelector(state => state.room.value.leaderboard.points);

    return (
        <div className="player-list">
            <h1 className="player-list-title">Players</h1>
            <div className="player-list-items-container">
                {players.map((player,i) => (
                    <PlayerListItem 
                        isOwner={player.uuid==owner} 
                        isUser={player.uuid==user} 
                        points={leaderboard[player.uuid]||0}
                        name={player.name} key={i}/>
                ))}
            </div>
        </div>
    )
}