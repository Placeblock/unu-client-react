import "./Round.css"
import Inventory from "../inventory/Inventory"
import Pile from "../pile/Pile"
import OpponentInventoryList from "../opponentinventorylist/OpponentInventoryList"
import { useDispatch } from "react-redux"
import { addCard, removeCard, removePlayer, setCurrentCard, setCurrentPlayer, setDrawStack, setPlayerCards } from "../../../../store/roundSlice"
import CurrentCard from "./CurrentCard/CurrentCard"
import { useCallback, useContext } from "react"
import { WebsocketContext } from "../../../websocket/WebSocketContext"
import useWebSocket from "../../../websocket/WebSocketHook"


export default function Round() {
    const dispatch = useDispatch();
    const {sendMessage} = useContext(WebsocketContext);
    
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
    useWebSocket("play_card", data => {
      dispatch(setCurrentCard(data.card));
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
        <div className="inventory-container">
            <Inventory />
        </div>
      </div>
    )
}