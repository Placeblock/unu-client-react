import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PlayerListItem.css"
import { faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons"
import AppTooltip from "../../../tooltip/AppTooltip"

export default function PlayerListItem({name, points, isOwner, isUser}) {
    return (
        <div className="player-list-item">
            <div className="player-list-item-metadata">
                <p className="player-list-item-name">{name}</p>
                {isUser&&<FontAwesomeIcon icon={faUser} className="player-list-item-user"/>}
                {isOwner&&<FontAwesomeIcon icon={faScrewdriverWrench} className="player-list-item-owner"/>}
                <AppTooltip id="player-list-item-user" content="You" />
                <AppTooltip id="player-list-item-owner" content="Owner" />
            </div>
            <p>{points} P</p>
        </div>
    )
}