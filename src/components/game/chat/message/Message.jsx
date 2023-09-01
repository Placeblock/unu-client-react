import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Message.css"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

export default function Message({playerName, content, onDelete}) {
    return (
        <li className="chat-message">
            <span className="chat-message-player-name">{playerName}:</span>
            <span className="chat-message-content">{content}</span>
            <button className="delete-message-button" onClick={onDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
        </li>
    )
}