import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./LoadingSpinner.css"
import { faAsterisk } from "@fortawesome/free-solid-svg-icons"
import { memo } from "react";

export default memo(function LoadingSpinner() {
    return (<div className="loading-spinner">
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
    </div>)
});