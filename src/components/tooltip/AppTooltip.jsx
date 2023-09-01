import "./AppTooltip.css"
import { Tooltip } from "react-tooltip"

export default function AppTooltip({id, content}) {
    return (
        <>
            <Tooltip 
                anchorSelect={"."+id}
                delayShow={1000}
                content={content}/>
        </>
    )
}