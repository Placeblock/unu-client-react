import "./CardDeckPreset.css"

export default function CardDeckPreset({name, description, onSelect}) {
    return (
        <button className="card-deck-preset" onClick={onSelect}>
            <h2>{name}</h2>
            <p>{description}</p>
        </button>
    )
}