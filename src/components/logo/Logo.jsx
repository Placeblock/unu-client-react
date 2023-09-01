import Card from "../card/Card"
import "./Logo.css"


const rotations = [

]

export default function Logo() {
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
                    <Card card={{type:"number", color:"RED", number:3}}/>
                </div>
            </div>
            <h1>UNU!</h1>
        </div>
    )
}