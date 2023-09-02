import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./MessageInput.css"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";

export default function MessageInput({onSubmit, focus}) {
    const [content, setContent] = useState("");
    var inputElement;

    useEffect(() => {
        inputElement.focus();
    }, [focus]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get("content");
        if (text != "") {
            onSubmit(text);
            setContent("");
            inputElement.focus()
        }
    }
    function handleChange(e) {
        setContent(e.target.value.substring(0,1000));
    }
    return (
        <form id="testForm" method="post" className="message-input-container" onSubmit={handleSubmit}>
            <input ref={r => inputElement = r} name="content" className="input message-input" value={content} onChange={handleChange}/>
            <button type="submit" className="button send-message-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
    )
}