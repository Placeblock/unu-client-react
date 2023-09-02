import { memo, useContext } from "react"
import "./ColorPicker.css"
import { setShowColorPicker } from "../../../../store/roundSlice";
import { WebsocketContext } from "../../../websocket/WebSocketContext";
import { useDispatch } from "react-redux";

export default memo(function ColorPicker() {
    const dispatch = useDispatch();
    const {sendMessage} = useContext(WebsocketContext);

    function pick(color) {
        sendMessage("select_color", {"color":color})
        dispatch(setShowColorPicker(false));
    }

    return (
        <div className="color-picker">
            <button className="color-picker-red" onClick={() => pick("RED")}></button>
            <button className="color-picker-blue" onClick={() => pick("BLUE")}></button>
            <button className="color-picker-green" onClick={() => pick("GREEN")}></button>
            <button className="color-picker-yellow" onClick={() => pick("YELLOW")}></button>
        </div>
    )
})