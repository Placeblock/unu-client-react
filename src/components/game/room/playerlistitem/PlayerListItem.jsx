import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PlayerListItem.css"
import { faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons"
import AppTooltip from "../../../tooltip/AppTooltip"

export default function PlayerListItem({name, points, isOwner, isUser, index}) {
    const color = index==0?"#FFD700":index==1?"#C0C0C0":index==2?"#A0522D":"white";

    return (
        <div className="player-list-item">
            <div className="player-list-item-metadata">
                <p style={{color}}>#{index+1}</p>
                <p className="player-list-item-name" style={{color}}>{name}</p>
                {isUser&&<FontAwesomeIcon icon={faUser} className="player-list-item-user"/>}
                {isOwner&&<FontAwesomeIcon icon={faScrewdriverWrench} className="player-list-item-owner"/>}
                <AppTooltip id="player-list-item-user" content="You" />
                <AppTooltip id="player-list-item-owner" content="Owner" />
            </div>
            <p style={{color}}>{points} P</p>
        </div>
    )
}