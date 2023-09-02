import "./Room.css";
import ChatOverlay from "../chat/chatoverlay/ChatOverlay";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "../../websocket/WebSocketHook";
import { addPlayer, removePlayer, setOwner, setSettings, setState } from "../../../store/roomSlice";
import { setPlayerName } from "../../../store/roomSlice";
import OpenChatButton from "./openchatbutton/OpenChatButton";
import OpenControlsButton from "./opencontrolsbutton/OpenControlsButton";
import LeaveRoomButton from "./leaveroombutton/LeaveRoomButton";
import RoomOverview from "./roomoverview/RoomOverview";
import useKeyBind from "../../../hooks/KeyBindHook";
import RoomSettings from "../settings/RoomSettings";
import Round from "../round/round/Round";
import { WebsocketContext } from "../../websocket/WebSocketContext";
import { setCardStack } from "../../../store/cardStackSlice";
import { setInventory, setRoundData } from "../../../store/roundSlice";

export default function Room() {
    const {id} = useParams();
    const {sendMessage} = useContext(WebsocketContext);
    const code = useSelector(state => state.room.value.code);
    const status = useSelector(state => state.room.value.status);
    const [showSettings, _setShowSettings] = useState(false);
    const showSettingsRef = useRef(showSettings);
    const toggleSettings = () => {
        const current = showSettingsRef.current;
        _setShowSettings(!current)
        showSettingsRef.current = !current;
    }
    const [showChat, _setShowChat] = useState(false);
    const showChatRef = useRef(showChat);
    const toggleShowChat = () => {
        const current = showChatRef.current;
        _setShowChat(!current)
        showChatRef.current = !current;
    }
    const [showControls, _setShowControls] = useState(false);
    const showControlsRef = useRef(showControls);
    const toggleShowControls = () => {
        const current = showControlsRef.current;
        _setShowControls(!current)
        showControlsRef.current = !current;
    }
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
    useWebSocket("card_stack", data => {
        dispatch(setCardStack(data.card_stack.groups));
    })
    useWebSocket("room_state", data => {
        dispatch(setState(data.state));
    })
    useWebSocket("round_data", data => {
        setRoundData(dispatch, data.round_data);
    })
    useWebSocket("inventory", data => {
        console.log(data.inventory.cards);
        dispatch(setInventory(data.inventory.cards));
    })

    useKeyBind("Escape", () => {
        if (showChat) {
            toggleShowChat();
        }
    }, [showChat]);


    useKeyBind("KeyS", () => {
        toggleSettings();
    })
    useKeyBind("KeyP", () => {
        startRound();
    })

    const startRound = useCallback(() =>  {
        sendMessage("start_round", {});
    }, []);

    return (
        <div className="room">
            {status=="LOBBY"?
                <>
                    <div className="open-controls-button-container">
                        <OpenControlsButton onToggle={toggleShowControls} />
                    </div>
                    <div className={`room-controls ${showControls?"room-controls-visible":""}`}>
                        <div className="open-chat-button-container">
                            <OpenChatButton onToggle={toggleShowChat} />
                        </div>
                        <LeaveRoomButton onLeave={() => {}}/>
                    </div>
                    <ChatOverlay showChat={showChat} />
                    {showSettings&&<RoomSettings onClose={toggleSettings} />}
                    <RoomOverview onToggleSettings={toggleSettings} onStart={startRound} />
                </>:
                <Round />
            }
        </div>
    )
}