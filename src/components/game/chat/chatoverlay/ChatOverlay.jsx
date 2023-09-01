import OpenChatButton from "../../room/openchatbutton/OpenChatButton";
import "./ChatOverlay.css"
import Chat from "../chat/Chat";

export default function ChatOverlay({showChat}) {

    return (
        <div className="chat-overlay">
            <div className={`chat-container ${showChat ? "" : " chat-hidden"}`} >
                <Chat focus={showChat}/>
            </div>
        </div>
    )
}