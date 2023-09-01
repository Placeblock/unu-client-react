import "./CounterInput.css"

export default function CounterInput({onChange, value, disabled}) {
    return (
        <div className={`counter-input ${disabled?"counter-input-disabled":""}`}>
            <button className="button counter-input-button"
                    onClick={() => onChange(value-1)}>-</button>
            <span  className="counter-input-value">{value}</span>
            <button className="button counter-input-button"
                    onClick={() => onChange(value+1)}>+</button>
        </div>
    )
}