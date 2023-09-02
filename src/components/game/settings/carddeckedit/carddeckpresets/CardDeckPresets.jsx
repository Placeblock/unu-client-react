import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardDeckPreset from "../carddeckpreset/CardDeckPreset";
import "./CardDeckPresets.css"
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AppTooltip from "../../../../tooltip/AppTooltip";
import { useCallback, useContext } from "react";
import { WebsocketContext } from "../../../../websocket/WebSocketContext";

export default function CardDeckPresets({onFinish}) {
    const presets = useSelector(state => state.room.value.cardDeckPresets);
    const {sendMessage} = useContext(WebsocketContext);

    const handleSelect = useCallback((id) => {
        sendMessage("card_deck_preset", {id: id});
        onFinish();
    }, []);

    return (
        <div className="card-deck-edit-page">
            <div className="card-deck-edit-controls">
                <div className="card-deck-edit-title">
                    <h1>Deck Presets</h1>
                </div>
                <div className="card-deck-edit-buttons">
                    <button className="button icon-button toggle-show-create-group-button" 
                            onClick={onFinish}>
                        <FontAwesomeIcon icon={faGrip}/>
                    </button>
                    <AppTooltip id="toggle-show-create-group-button" content={"Cancel"} />
                </div>
            </div>
            <div className="card-deck-edit-content">
                <div className="card-deck-presets-container">
                    {presets.map((p, i) => (
                        <CardDeckPreset name={p.name} description={p.description} onSelect={() => handleSelect(i)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}