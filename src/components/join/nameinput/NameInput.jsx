import "./NameInput.css"
import { useState } from "react";

export default function NameInput({onSubmit}) {
    const [name, setStateName] = useState("");

    function handleClick(e) {
        e.preventDefault();
        if (name === "") return;
        onSubmit(name);
    }

    function handleChange(e) {
        setStateName(e.target.value);
    }

    return (
        <div className="name-input">
            <form>
                <div className="name-input-container">
                    <label htmlFor="name">Nickname</label>
                    <input placeholder="Name" className="input" value={name} onChange={handleChange} />
                </div>
                <button className="button basic-button" type="submit" onClick={handleClick}>Play</button>
            </form>
        </div>
    )
}