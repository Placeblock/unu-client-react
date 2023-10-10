import { memo } from "react"
import "./ReactionItem.css"

export default memo(function ReactionItem({reactionKey, onReact}) {
    return (
        <button className="reaction-item" onClick={() => onReact(reactionKey)}>
            {getReaction(reactionKey)}
        </button>
    )
});


export function getReaction(key) {
    switch (key) {
        case "HAPPY":
            return "😃"
        case "ANGRY":
            return "🤬"
        case "FUNNY":
            return "😆"
        case "TONGUE":
            return "😛"
        case "SAD":
            return "😢"
        default:
            return "";
    }
}