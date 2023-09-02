import { useContext, useState } from "react";
import Card from "../../../../card/Card"
import "./CreateCardGroup.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faPlus } from "@fortawesome/free-solid-svg-icons";
import AppTooltip from "../../../../tooltip/AppTooltip";
import { useSelector } from "react-redux";
import { WebsocketContext } from "../../../../websocket/WebSocketContext";

const colors = [
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW"
]
const allCards = [];
colors.map((c, _) => {
    [...Array(10)].map((_, i) => (
        allCards.push({"type":"number","color":c,"number":i})
    ))
    allCards.push({"type":"draw_2","color":c})
    allCards.push({"type":"suspend","color":c})
    allCards.push({"type":"invert_direction","color":c})
});
allCards.push({"type":"wish"})
allCards.push({"type":"draw_4"})

export default function CreateCardGroup({onFinish}) {
    const [selected, setSelected] = useState({});
    const groups = useSelector(state => state.cardStack.value);
    const {sendMessage} = useContext(WebsocketContext);

    function select(index) {
        setSelected({
            ...selected,
            [index]: true
        })
    }

    function deselect(index) {
        const selectedCopy = {...selected};
        delete selectedCopy[index];
        setSelected(selectedCopy)
    }

    function toggleSelected(index) {
        if (isSelected(index)) {
            deselect(index);
        } else {
            select(index);
        }
    }

    function isSelected(index) {
        return index in selected;
    }

    function isEmpty() {
        return Object.keys(selected).length == 0;
    }

    function createGroup() {
        const cards = [];
        for (let i in selected) {
            cards.push(allCards[i]);
        }
        sendMessage("card_stack", {card_stack: {groups: [...groups, {
            cards: cards,
            amount: 1
        }]}});
        onFinish();
    }

    return (
        <div className="card-stack-edit-page">
            <div className="card-stack-edit-controls">
                <div className="card-stack-edit-title">
                    <h1>Create Card-Group</h1>
                    <p>Select cards for the new group.</p>
                </div>
                <div className="card-stack-edit-buttons">
                    {!isEmpty()&&<><button className="button icon-button positive-button create-card-group-button"
                                            onClick={createGroup}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <AppTooltip id="create-card-group-button" content={"Create Group"} /></>}
                    <button className="button icon-button toggle-show-create-group-button" 
                            onClick={onFinish}>
                        <FontAwesomeIcon icon={faGrip}/>
                    </button>
                    <AppTooltip id="toggle-show-create-group-button" content={"Cancel"} />
                </div>
            </div>
            <div className="card-stack-edit-content">
                <div className="create-group-cards-container">
                    {allCards.map((c, i) => (
                        <div key={i} className={`create-card-group-card ${isSelected(i)?"":"ccgc-unselected"}`} onClick={() => toggleSelected(i)}><Card card={c}/></div>
                    ))}
                </div>
            </div>
        </div>
    )
}