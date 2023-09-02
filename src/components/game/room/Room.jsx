import "./Room.css";
import ChatOverlay from "../chat/chatoverlay/ChatOverlay";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "../../websocket/WebSocketHook";
import { addPlayer, removePlayer, resetRoom, setOwner, setSettings, setState } from "../../../store/roomSlice";
import { setPlayerName } from "../../../store/roomSlice";
import OpenChatButton from "./openchatbutton/OpenChatButton";
import OpenControlsButton from "./opencontrolsbutton/OpenControlsButton";
import LeaveRoomButton from "./leaveroombutton/LeaveRoomButton";
import RoomOverview from "./roomoverview/RoomOverview";
import useKeyBind from "../../../hooks/KeyBindHook";
import RoomSettings from "../settings/RoomSettings";
import Round from "../round/round/Round";
import { WebsocketContext } from "../../websocket/WebSocketContext";
import { setCardDeck } from "../../../store/cardDeckSlice";
import { resetRound, setInventory, setRoundData } from "../../../store/roundSlice";

export default function Room() {
    const {id} = useParams();
    const {sendMessage} = useContext(WebsocketContext);
    const code = useSelector(state => state.room.value.code);
    const status = useSelector(state => state.room.value.status);
    const [showSettings, setShowSettings] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (code === undefined) {
            navigate("/join/" + id);
        }
    }, [code]);
    useWebSocket("player_data", data => {
        dispatch(addPlayer(data.player));
    })
    useWebSocket("player_left_room", data => {
        dispatch(removePlayer(data.player));
    })
    useWebSocket("player_name", data => {
        dispatch(setPlayerName(data));
    })
    useWebSocket("room_owner", data => {
        dispatch(setOwner(data.owner));
    })
    useWebSocket("round_settings", data => {
        dispatch(setSettings(data.round_settings));
    })
    useWebSocket("card_deck", data => {
        dispatch(setCardDeck(data.card_deck.groups));
    })
    useWebSocket("room_state", data => {
        dispatch(setState(data.state));
    })
    useWebSocket("round_data", data => {
        setRoundData(dispatch, data.round_data);
    })
    useWebSocket("inventory", data => {
        dispatch(setInventory(data.inventory.cards));
    })

    useKeyBind("Escape", () => {
        setShowChat(false);
    });


    useKeyBind("KeyS", () => {
        toggleShowSettings();
    })
    useKeyBind("KeyP", () => {
        startRound();
    })

    const startRound = useCallback(() =>  {
        sendMessage("start_round", {});
    }, []);

    const toggleShowSettings = useCallback(() => {
        setShowSettings(ss => !ss);
    }, [])
    const toggleShowChat = useCallback(() => {
        setShowChat(sc => !sc);
    }, [])
    const toggleShowControls = useCallback(() => {
        setShowControls(sc => !sc);
    }, [])
    const handleLeave = useCallback(() => {
        sendMessage("leave_room", {});
        dispatch(resetRoom())
        dispatch(resetRound())
    });

    return (
        <div className="room">
            <div className="open-controls-button-container">
                <OpenControlsButton onToggle={toggleShowControls} />
            </div>
            <div className={`room-controls ${showControls?"room-controls-visible":""}`}>
                <div className="open-chat-button-container">
                    <OpenChatButton onToggle={toggleShowChat} />
                </div>
                <LeaveRoomButton onLeave={handleLeave}/>
            </div>
            <ChatOverlay showChat={showChat} />
            {status=="LOBBY"?
                <>
                    <RoomOverview onToggleSettings={toggleShowSettings} onStart={startRound} />
                    {showSettings&&<RoomSettings onClose={toggleShowSettings} />}
                </>:
                <Round />
            }
        </div>
    )
}