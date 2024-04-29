import "./Room.css";
import ChatOverlay from "../chat/chatoverlay/ChatOverlay";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "../../websocket/WebSocketHook";
import { addPlayer, removePlayer, resetRoom, setLeaderboard, setOwner, setSettings, setState } from "../../../store/roomSlice";
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
import { faMusic, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppTooltip from "../../tooltip/AppTooltip";
import Music from "./music/Music";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Room() {
    const { id } = useParams();
    const { sendMessage } = useContext(WebsocketContext);
    const code = useSelector(state => state.room.value.code);
    const status = useSelector(state => state.room.value.status);
    const [particlesInit, setParticlesInit] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [playMusic, setPlayMusic] = useState(true);
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
    useWebSocket("player_won", () => {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 10000);
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
    useWebSocket("leaderboard", data => {
        dispatch(setLeaderboard(data.leaderboard));
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

    const startRound = useCallback(() => {
        sendMessage("start_round", {});
    }, []);

    const toggleShowSettings = useCallback(() => {
        setShowSettings(ss => !ss);
    }, [])
    const toggleShowChat = useCallback(() => {
        if (showChat) {
            setShowControls(false);
        }
        setShowChat(sc => !sc);
    }, [showChat])
    const toggleShowControls = useCallback(() => {
        setShowControls(sc => !sc);
    }, [])
    const handleLeave = useCallback(() => {
        sendMessage("leave_room", {});
        dispatch(resetRoom())
        dispatch(resetRound())
        navigate("/join")
    });

    const options = useMemo(() => ({
        "particles": {
            "number": {
                "value": 100
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": [
                    "circle",
                    "square"
                ]
            },
            "opacity": {
                "value": {
                    "min": 0,
                    "max": 1
                },
                "animation": {
                    "enable": true,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                }
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 30
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        }
    }))

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setParticlesInit(true);
        });
    }, []);

    return (
        <div className="room">
            <div className="open-controls-button-container">
                <OpenControlsButton onToggle={toggleShowControls} />
            </div>
            <div className={`room-controls ${showControls ? "room-controls-visible" : ""}`}>
                <button className="button icon-button play-music-button"
                    onClick={() => setPlayMusic(!playMusic)}>
                    <FontAwesomeIcon icon={playMusic ? faMusic : faVolumeMute} />
                </button>
                <AppTooltip id="open-chat-button" content="Mute/Play Music" />
                <div className="open-chat-button-container">
                    <OpenChatButton onToggle={toggleShowChat} />
                </div>
                <LeaveRoomButton onLeave={handleLeave} />
            </div>
            <Music play={playMusic} />
            <ChatOverlay showChat={showChat} />
            {status == "LOBBY" ?
                <>
                    <RoomOverview onToggleSettings={toggleShowSettings} onStart={startRound} />
                    {showSettings && <RoomSettings onClose={toggleShowSettings} />}
                </> :
                <Round />
            }
            {showParticles && particlesInit && <div id="particles-container">
                <Particles
                    id="ts-particles"
                    options={options}
                />
            </div>}
        </div>
    )
}