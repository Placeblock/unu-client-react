import { memo, useCallback, useContext } from "react"
import "./ReactionMenu.css"
import ReactionItem from "./ReactionItem";
import { WebsocketContext } from "../../../websocket/WebSocketContext";

export default memo(function ReactionMenu({onClose}) {
    const {sendMessage} = useContext(WebsocketContext);

    const handleReaction = useCallback((key) => {
        sendMessage("quick_reaction", {"quick_reaction":key});
        onClose();
    });

    return (
        <div className="reaction-menu">
            <ReactionItem reactionKey={"HAPPY"} onReact={handleReaction}/>
            <ReactionItem reactionKey={"ANGRY"} onReact={handleReaction}/>
            <ReactionItem reactionKey={"FUNNY"} onReact={handleReaction}/>
            <ReactionItem reactionKey={"TONGUE"} onReact={handleReaction}/>
            <ReactionItem reactionKey={"SAD"} onReact={handleReaction}/>
        </div>
    )
});
