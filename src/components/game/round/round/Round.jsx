import "./Round.css"
import { useState } from "react"
import Inventory from "../inventory/Inventory"
import Pile from "../pile/Pile"
import Card from "../../../card/Card"
import OpponentInventoryList from "../opponentinventorylist/OpponentInventoryList"


export default function Round() {
    const [cards, setCards] = useState(Array(10).fill({type:"draw_2","color":"RED"}))

    return (
      <div className="round">
        <div className="opponent-inventory-list-container">
          <OpponentInventoryList  players={[
            {playerName:"Felix", amount: 5, active: false},
            {playerName:"Paula", amount: 10, active: false},
            {playerName:"Klaus", amount: 3, active: false},
            {playerName:"Sabine", amount: 4, active: false},
            {playerName:"Felix", amount: 5, active: false},
            {playerName:"Paula", amount: 10, active: true},
            {playerName:"Klaus", amount: 3, active: false},
            {playerName:"Sabine", amount: 4, active: false}
          ]}/>
        </div>
        <Card card={{type:"draw_2","color":"RED"}}/>
        <Pile cards={cards} onDraw={() => console.log("PILE")}/>
        <div className="inventory-container">
            <Inventory cards={cards}/>
        </div>
      </div>
    )
}