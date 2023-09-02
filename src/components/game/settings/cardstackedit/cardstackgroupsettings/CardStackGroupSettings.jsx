import "./CardStackGroupSettings.css"
import CardGroupItem from "../cardgroupitem/CardGroupItem"
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppTooltip from "../../../../tooltip/AppTooltip";
import { useContext } from "react";
import { WebsocketContext } from "../../../../websocket/WebSocketContext";

export default function CardStackGroupSettings({onCreateGroup}) {
    const groups = useSelector(state => state.cardStack.value);
    const {sendMessage} = useContext(WebsocketContext);

    function deleteGroup(i) {
        const groupsCopy = [...groups];
        groupsCopy.splice(i, 1);
        updateWebSocket(groupsCopy);
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
        sendMessage("card_stack", {card_stack: {groups: groups}});
    }
    return (
        <div className="card-stack-edit-page">
            <div className="card-stack-edit-controls">
                <h1>Card-Stack Editor</h1>
                <div className="card-stack-edit-buttons">
                    <button className="button icon-button toggle-show-create-group-button" 
                            onClick={onCreateGroup}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <AppTooltip id="toggle-show-create-group-button" content={"Create New Group"} />
                </div>
            </div>
            <div className="card-stack-edit-content">
                <div className="card-groups-container">
                    {groups.map((c, i) => (
                        <CardGroupItem key={i} cardGroup={c}
                            onDelete={() => deleteGroup(i)} 
                            onAmount={amount => updateAmount(i, amount)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}