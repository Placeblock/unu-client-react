import "./CounterInput.css"

export default function CounterInput({onChange, value, disabled, min=1, max=100}) {

    function handleChange(newvalue) {
        if (newvalue >= min && newvalue <= max) {
            onChange(newvalue);
        }
    }

    return (
        <div className={`counter-input ${disabled?"counter-input-disabled":""}`}>
            <button className="button counter-input-button"
                    onClick={() => handleChange(value-1)}>-</button>
            <span  className="counter-input-value">{value}</span>
            <button className="button counter-input-button"
                    onClick={() => handleChange(value+1)}>+</button>
        </div>
    )
}