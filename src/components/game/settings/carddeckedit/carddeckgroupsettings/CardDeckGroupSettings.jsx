import "./CardDeckGroupSettings.css"
import CardGroupItem from "../cardgroupitem/CardGroupItem"
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus, faSearch, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import AppTooltip from "../../../../tooltip/AppTooltip";
import { useContext, useRef } from "react";
import { WebsocketContext } from "../../../../websocket/WebSocketContext";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function CardDeckGroupSettings({onCreateGroup, onDeckSelect, disabled, onClose}) {
    const groups = useSelector(state => state.cardDeck.value);
    const {sendMessage} = useContext(WebsocketContext);
    const importFileRef = useRef(null);

    function deleteGroup(i) {
        const groupsCopy = [...groups];
        groupsCopy.splice(i, 1);
        updateWebSocket(groupsCopy);
    }
    function deleteDeck() {
        updateWebSocket([]);
    }
    function updateAmount(i, amount) {
        const groupsCopy = [...groups];
        groupsCopy[i] = {
            ...groupsCopy[i],
            amount: amount
        };
        updateWebSocket(groupsCopy);
    }
    function updateWebSocket(groups) {
        sendMessage("card_deck", {card_deck: {groups: groups}});
    }
    function importDeck() {
        importFileRef.current.click();
    }
    function handleImport(e) {
        try {
            let files = e.target.files;
            if (!files.length) return;
            let file = files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                const json = JSON.parse(event.target.result);
                if (!Array.isArray(json)) return;
                for (let group of json) {
                    if (!("cards" in group) || !("amount" in group)) return;
                    if (typeof group["amount"] !== "number" || !Array.isArray(group["cards"])) return;
                }
                updateWebSocket(json);
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }
    const deckDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(groups));
    return (
        <div className="card-deck-edit-page">
            <div className="card-deck-edit-controls group-settings-controls">
                <div className="card-deck-edit-title">
                    <h1>Card-Deck Editor</h1>
                    {disabled&&<p>You don't have edit-permissions</p>}
                </div>
                <div className="card-deck-edit-buttons">
                    {!disabled&&<>
                        <button className="button icon-button negative-button delete-deck-button" 
                                onClick={deleteDeck}>
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                        <AppTooltip id="delete-deck-button" content={"Delete Deck"} />
                        <a className="button icon-button export-deck-button" 
                            href={deckDataStr}
                            download={"unu-deck.json"}>
                            <FontAwesomeIcon icon={faDownload}/>
                        </a>
                        <AppTooltip id="export-deck-button" content={"Export Deck"} />
                        <button className="button icon-button import-deck-button" 
                                onClick={importDeck}>
                            <FontAwesomeIcon icon={faUpload}/>
                        </button>
                        <input ref={importFileRef} type="file" 
                            className="import-deck-input" onChange={handleImport}
                            accept="application/json "/>
                        <AppTooltip id="import-deck-button" content={"Import Deck"} />
                        <button className="button icon-button toggle-show-deck-select-button"
                                onClick={onDeckSelect}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                        <AppTooltip id="toggle-show-deck-select-button" content={"Select Deck-Preset"} />
                        <button className="button icon-button toggle-show-create-group-button" 
                                onClick={onCreateGroup}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                        <AppTooltip id="toggle-show-create-group-button" content={"Create New Group"} />
                    </>}
                    <button className="button icon-button close-deck-settings-button" 
                            onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                    <AppTooltip id="close-deck-settings-button" content={"Close"} />
                </div>
            </div>
            <div className="card-deck-edit-content">
                <div className="card-groups-container">
                    {groups.map((c, i) => (
                        <CardGroupItem disabled={disabled} key={i} cardGroup={c}
                            onDelete={() => deleteGroup(i)} 
                            onAmount={amount => updateAmount(i, amount)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}