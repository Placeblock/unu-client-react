import "./Card.css"

export default function Card({back=false, card={}}) {
    let text = "";
    switch (card.type) {
        case "draw_4":
            text = "+4";
            break;
        case "draw_2":
            text = "+2";
            break;
        case "invert_direction":
            text = "I";
            break;
        case "number":
            text = card.number
            break;
        case "suspend":
            text = "S";
            break;
        case "wish":
            text = "W";
            break;
    }
    return (
        <div className="card" style={{"borderColor":getHex(card.force_color, "#ffffff")}}>
            {!back && 
            <div className="front" style={{"backgroundColor":getHex(card.color, "#000000")}}>
                <p className="top">{text}</p>
                <p>{text}</p>
                <p className="bottom">{text}</p>
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