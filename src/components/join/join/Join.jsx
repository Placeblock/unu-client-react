import { Outlet, useNavigate, useParams } from "react-router-dom"
import Logo from "../../logo/Logo"
import "./Join.css"
import { useContext, useState } from "react"
import { WebsocketContext } from "../../websocket/WebSocketContext"
import { useDispatch } from "react-redux"
import { setUserName } from "../../../store/userSlice"
import useWebSocket from "../../websocket/WebSocketHook"
import NameInput from "../nameinput/NameInput"
import RoomInput from "../roominput/RoomInput"
import LoadingSpinner from "../../loading/LoadingSpinner"
import { setMessages, setOwner } from "../../../store/roomSlice"
import { setCode, setState as setRoomState } from "../../../store/roomSlice"
import { setPlayers } from "../../../store/roomSlice"
import { setSettings } from "../../../store/roomSlice"
import { setCardStack } from "../../../store/cardStackSlice"
import { setRoundData } from "../../../store/roundSlice"


const State = {
    NAME: 0,
    ROOM: 1,
    LOADING: 2
}

export default function Join() {
    const {id} = useParams();
    const {sendMessage} = useContext(WebsocketContext);
    const [state, setState] = useState(State.NAME);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function setName(name) {
        sendMessage("player_name", {"name": name});
    }
    useWebSocket("player_name", (data) => {
        dispatch(setUserName(data["name"]));
        if (id === undefined) {
            setState(State.ROOM);
        } else {
            joinRoom(id);
        }
    })

    function joinRoom(roomID) {
        sendMessage("join_room", {code:Number(roomID)});
        setState(State.LOADING);
    }
    function createRoom() { 
        sendMessage("create_room", {});
        setState(State.LOADING);
    }
    useWebSocket("room_data", (data) => {
        dispatch(setMessages(data.room_data.chat.messages));
        dispatch(setCode(data.room_data.code));
        dispatch(setPlayers(data.room_data.players));
        dispatch(setSettings(data.room_data.round_settings));
        dispatch(setRoomState(data.room_data.state));
        dispatch(setOwner(data.room_data.owner));
        dispatch(setCardStack(data.room_data.card_stack.groups));
        if (data.room_data.round != null) {
            setRoundData(dispatch, data.room_data.round);
        }
        navigate("/" + data.room_data.code);
    })

    return (
        <div className="join">
            <Logo />
            {state==State.NAME&&
                <NameInput onSubmit={setName} />
            }
            {state==State.ROOM&&
                <RoomInput onJoin={joinRoom} onCreate={createRoom} />
            }
            {state==State.LOADING&&
                <div className="join-content">
                    <h1 className="loading-title">Joining</h1>
                    <LoadingSpinner />
                </div>
            }
        </div>
    )
}