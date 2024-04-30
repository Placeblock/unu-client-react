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
                {Object.entries(players)
                    .toSorted(([p1Uuid, p1], [p2Uuid, p2]) => ((leaderboard[p2Uuid]||0) - (leaderboard[p1Uuid]||0)))
                    .map(([uuid, player],i) => (
                    <PlayerListItem 
                        isOwner={uuid==owner} 
                        isUser={uuid==user} 
                        points={leaderboard[uuid]||0}
                        index={i}
                        name={player.name} key={i}/>
                ))}
            </div>
        </div>
    )
}