import "./Pile.css";
import Card from "../../../card/Card";
import { useState } from "react";


export default function Pile({onDraw}) {
    const [transformations, setTransformations] = useState(() => getPileCards())

    function handleDraw() {
        const removed = transformations.slice(0, -1);
        const added = [getRandom(), ...removed]
        onDraw();
        setTransformations(added);
    }

    return (
        <div className="pile">
            {transformations.map((t, i) => (
                (i+1!==transformations.length) ? 
                <div className="pile-card" 
                    key={i}
                    style={{transform: getTransform(t), opacity: i*5 + "%"}}>
                    <Card card={{}} back={true}/>
                </div> : 
                <button className="pile-card pile-card-clickable" 
                    onClick={handleDraw}
                    key={i}
                    style={{transform: getTransform(t)}}>
                    <Card card={{}} back={true}/>
                </button>
            ))}
        </div>
    )
}

function getTransform(t) {
    return "rotate("+t.rot+"deg) translateX(" + t.x + "px) translateY(" + t.y + "px)";
}

function getPileCards() {
    let cards = [];
    for (let i = 0; i < 20; i++) {
        cards.push(getRandom())
    }
    return cards;
}

function getRandom() {
    const rot = Math.random()*30-15;
    const x = Math.random()*50-25;
    const y = Math.random()*50-25;
    return {rot: rot, x: x, y: y};
}
