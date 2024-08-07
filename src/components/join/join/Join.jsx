import { useNavigate, useParams } from "react-router-dom"
import Logo from "../../logo/Logo"
import "./Join.css"
import { useContext, useEffect, useState } from "react"
import { WebsocketContext } from "../../websocket/WebSocketContext"
import { useDispatch } from "react-redux"
import { setUserName } from "../../../store/userSlice"
import useWebSocket from "../../websocket/WebSocketHook"
import NameInput from "../nameinput/NameInput"
import RoomInput from "../roominput/RoomInput"
import LoadingSpinner from "../../loading/LoadingSpinner"
import { setLeaderboard, setMessages, setOwner, setPublic } from "../../../store/roomSlice"
import { setCode, setState as setRoomState } from "../../../store/roomSlice"
import { setPlayers } from "../../../store/roomSlice"
import { setSettings } from "../../../store/roomSlice"
import { setCardDeck } from "../../../store/cardDeckSlice"
import { setRoundData } from "../../../store/roundSlice"
import { playMusic, stopMusic } from "../../game/room/Room"


const State = {
    NAME: 0,
    ROOM: 1,
    LOADING: 2
}

export default function Join() {
    const {id} = useParams();
    const {sendMessage} = useContext(WebsocketContext);
    const [state, setState] = useState(State.NAME);
    const [invalidRoom, setInvalidRoom] = useState(false);
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

    useWebSocket("invalid_room", () => {
        setState(State.ROOM);
        setInvalidRoom(true);
    })

    function joinRoom(roomID) {
        setInvalidRoom(false);
        sendMessage("join_room", {code:roomID});
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
        dispatch(setCardDeck(data.room_data.card_deck.groups));
        dispatch(setLeaderboard(data.room_data.leaderboard));
        dispatch(setPublic(data.room_data.public_room))
        if (data.room_data.round != null) {
            setRoundData(dispatch, data.room_data.round);
        }
        navigate("/" + data.room_data.code);
        playMusic()
    })

    useEffect(() => {
        stopMusic()
    }, [])

    return (
        <div className="join">
            <Logo />
            {state==State.NAME&&
                <NameInput onSubmit={setName} />
            }
            {state==State.ROOM&&
                <RoomInput invalidRoom={invalidRoom} onJoin={joinRoom} onCreate={createRoom} />
            }
            {state==State.LOADING&&
                <div className="join-content">
                    <h1 className="loading-title">Joining</h1>
                    <LoadingSpinner />
                </div>
            }
            <p className="credits">Created with ❤️ by Placeblock</p>
        </div>
    )
}