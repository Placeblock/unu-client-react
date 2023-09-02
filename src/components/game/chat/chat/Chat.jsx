import { memo, useContext } from "react";
import MessageInput from "../messageinput/MessageInput";
import MessageList from "../messagelist/MessageList";
import "./Chat.css"
import { useDispatch, useSelector } from "react-redux";
import { findPlayer } from "../../../../store/roomSlice";
import { addMessage, removeMessage } from "../../../../store/roomSlice";
import { WebsocketContext } from "../../../websocket/WebSocketContext";
import useWebSocket from "../../../websocket/WebSocketHook";


export default memo(function Chat({focus}) {
    const messages = useSelector(state => state.room.value.chat.messages);
    const {sendMessage} = useContext(WebsocketContext);
    const players = useSelector(state => state.room.value.players);
    const dispatch = useDispatch();

    function handleMessage(content) {
        sendMessage("message", {"message": content});
    }
    
    useWebSocket("message", (data) => {
        const player = findPlayer(players, data.message.sender);
        if (player == null) return;
        dispatch(addMessage({...data.message, playerName: player.name}));
    }, [players])
    useWebSocket("delete_message", (data) => {
        dispatch(removeMessage(data.uuid));
    })

    return (
        <div className="chat">
            <div className="message-list-container">
                <MessageList messages={messages}/>
            </div>
            <div className="message-input-container">
                <MessageInput onSubmit={handleMessage} focus={focus}/>
            </div>
        </div>
    )

})