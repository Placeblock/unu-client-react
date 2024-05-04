import { useContext, useEffect, useState } from "react";import "./PublicRooms.css"
import { WebsocketContext } from "../../websocket/WebSocketContext";
import useWebSocket from "../../websocket/WebSocketHook";

export default function PublicRooms({onJoin}) {
    const {sendMessage} = useContext(WebsocketContext);
    const [publicRooms, setPublicRooms] = useState([]);
    useEffect(() => {
        sendMessage("public_rooms", {});
    }, []);
    useWebSocket("public_rooms", data => {
        setPublicRooms(data.public_room_infos)
    })
    useWebSocket("room_visibility", data => {
        if (data.public_room) {
            setPublicRooms(pr => {
                const found = pr.find(r => r.code === data.room_info.code) !== undefined
                if (!found) {
                    return [...pr, data.room_info]
                }
                return pr;
            })
        } else {
            setPublicRooms(pr => pr.filter(r => r.code !== data.room_info.code))
        }
    })

    return (
        <div className="public-rooms">
            {publicRooms.map((room) => (
                <div className="public-room" onClick={() => onJoin(room.code)}>
                    <p>{room.owner_name} </p>
                    <span>{room.players} {room.players > 1 ? "Players":"Player"}</span>
                </div>
            ))}
            {publicRooms.length === 0 && <p style={{textAlign: "center", color: "white"}}>No rooms</p>}
        </div>
    )
}