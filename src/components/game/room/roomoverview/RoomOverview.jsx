import { useSelector } from "react-redux";
import PlayerList from "../playerlist/PlayerList"
import "./RoomOverview.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import AppTooltip from "../../../tooltip/AppTooltip";
import { faPlay, faSliders } from "@fortawesome/free-solid-svg-icons";

export default function RoomOverview({onToggleSettings, onStart}) {
    const code = useSelector(state => state.room.value.code);
    
    function copyCode() {
        navigator.clipboard.writeText(code);
    }

    return (
        <div className="room-overview">
            <div className="room-info room-overview-container">
                <h1 className="room-info-header">Room: {code}</h1>
                <div className="room-info-controls">
                    <button className="button icon-button copy-code-button" onClick={copyCode}>
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <AppTooltip id="copy-code-button" content="Copy Room-ID" />
                    <button className="button icon-button open-settings-button" onClick={onToggleSettings}>
                        <FontAwesomeIcon icon={faSliders} />
                    </button>
                    <AppTooltip id="open-settings-button" content="Open Settings (s)" />
                </div>
            </div>
            <div className="player-list-container room-overview-container">
                <PlayerList />
            </div>
            <div className="start-button-container">
                <button className="button positive-button start-button" onClick={onStart}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <AppTooltip id="start-button" content="Start Game (p)" />
            </div>
        </div>
    )
}