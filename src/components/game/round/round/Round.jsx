import "./Round.css"
import Inventory from "../inventory/Inventory"
import Pile from "../pile/Pile"
import OpponentInventoryList from "../opponentinventorylist/OpponentInventoryList"
import { useDispatch, useSelector } from "react-redux"
import { addCard, removeCard, removePlayer, setCurrentCard, setCurrentPlayer, setDrawStack, setPlayerCards, setShowColorPicker, sortInventory } from "../../../../store/roundSlice"
import CurrentCard from "../currentcard/CurrentCard"
import { useCallback, useContext } from "react"
import { WebsocketContext } from "../../../websocket/WebSocketContext"
import useWebSocket from "../../../websocket/WebSocketHook"
import RoundControls from "../roundcontrols/RoundControls"
import ColorPicker from "../colorpicker/ColorPicker"


export default function Round() {
    const dispatch = useDispatch();
    const {sendMessage} = useContext(WebsocketContext);
    const showColorPicker = useSelector(state => state.round.value.showColorPicker)
    
    useWebSocket("current_player", data => {
      dispatch(setCurrentPlayer(data.player));
    })
    useWebSocket("add_card", data => {
      dispatch(addCard(data.card));
    })
    useWebSocket("remove_card", data => {
      dispatch(removeCard(data.uuid));
    })
    useWebSocket("draw_stack", data => {
      dispatch(setDrawStack(data.draw_stack));
    })
    useWebSocket("current_card", data => {
      dispatch(setCurrentCard(data.card));
    })
    useWebSocket("select_color", _ => {
      dispatch(setShowColorPicker(true));
    })
    useWebSocket("player_card_amount", data => {
      dispatch(setPlayerCards({
        uuid: data.player,
        amount: data.amount
      }));
    })
    useWebSocket("player_left_round", data => {
      dispatch(removePlayer(data.player));
    })
    const handleDraw = useCallback(() => {
      sendMessage("draw_card", {});
    }, []);

    return (
      <div className="round">
        <div className="opponent-inventory-list-container">
          <OpponentInventoryList />
        </div>
        <CurrentCard />
        <Pile onDraw={handleDraw}/>
        {showColorPicker&&<div className="color-picker-container">
          <ColorPicker />
        </div>}
        <div className="inventory-container">
          <Inventory />
        </div>
        <div className="round-controls-container">
          <RoundControls />
        </div>
      </div>
    )
}