import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css"
import { faBan, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function Card({back=false, card={}}) {
    let text = <span>U</span>;
    switch (card.type) {
        case "draw_4":
            text = <span>+4</span>;
            break;
        case "draw_2":
            text = <span>+2</span>;
            break;
        case "invert_direction":
            text = <FontAwesomeIcon icon={faRotate} />;
            break;
        case "number":
            text = <span>{card.number}</span>
            break;
        case "suspend":
            text = <FontAwesomeIcon icon={faBan} />;
            break;
        case "wish":
            text = <div id="wish-text">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>;
            break;
    }
    return (
        <div className="card" style={{"borderColor":getHex(card.force_color, "#ffffff")}}>
            {!back && 
            <div className="front" style={{"backgroundColor":getHex(card.color, "#000000")}}>
                <div className="top">{text}</div>
                <div>{text}</div>
                <div className="bottom">{text}</div>
            </div>}
            {back && 
            <div className="back">
                <p>UNU</p>
            </div>}
        </div>
    );
}

export function getHex(color, fallback) {
    if (color == undefined) return fallback;
    return "var(--card-" + color.toLowerCase() + ")";
}