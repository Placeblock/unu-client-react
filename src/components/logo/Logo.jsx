import { memo } from "react";
import Card from "../card/Card"
import "./Logo.css"

export default memo(function Logo() {
    return (
        <div className="logo">
            <div className="logo-cards-container">
                <div className="logo-card-container" style={{"rotate":"-20deg"}}>
                    <Card card={{type:"draw_4"}}/>
                </div>
                <div className="logo-card-container" style={{"rotate":"0deg"}}>
                    <Card card={{type:"draw_2", color:"BLUE"}}/>
                </div>
                <div className="logo-card-container" style={{"rotate":"20deg"}}>
                    <Card card={{type:"wish", force_color:"RED", number:3}}/>
                </div>
            </div>
            <h1>UNU!</h1>
        </div>
    )
});