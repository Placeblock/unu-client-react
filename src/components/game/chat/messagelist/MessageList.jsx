import "./MessageList.css"
import Message from "../message/Message"
import { useContext, useState } from "react"
import ScrollBottomButton from "../scrollbottombutton/ScrollBottomButton";
import { WebsocketContext } from "../../../websocket/WebSocketContext";

export default function MessageList({messages}) {
    const {sendMessage} = useContext(WebsocketContext);
    const [showScrollButton, setShowScrollButton] = useState(false);
    var scrollAnchor;

    function scrollIntoView() {
        scrollAnchor.scrollIntoView()
    }
    function handleScroll(e) {
        const t = e.target;
        const showScrollButton = t.scrollTopMax - t.scrollTop > 50;
        setShowScrollButton(showScrollButton);
    }
    function handleDelete(uuid) {
        sendMessage("delete_message", {"uuid":uuid})
    }

    return (
        <ul className="message-list" onScroll={handleScroll}>
            {showScrollButton && <div className="scroll-button-container"><ScrollBottomButton onClick={scrollIntoView} /></div>}
            {messages.map((message, i) => (
                <Message key={i} playerName={message.playerName} content={message.content} onDelete={() => handleDelete(message.uuid)}/>
            ))}
            {messages.length == 0 && <p className="empty-chat-info">** Grillenzirpen **</p>}
            <div className="message-list-anchor" ref={el => scrollAnchor = el}></div>
        </ul>
    )
}