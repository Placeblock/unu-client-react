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
        <div className="card">
            {!back && 
            <div className="front" style={{"backgroundColor":getHex(card.color)}}>
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

function getHex(color) {
    switch (color) {
        case "RED":
            return "#b02525"
        case "BLUE":
            return "#2323db"
        case "GREEN":
            return "#32ba4d"
        case "YELLOW":
            return "#ebeb00"
        default:
            return "#000000"
    }
}