import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./LoadingSpinner.css"
import { faAsterisk } from "@fortawesome/free-solid-svg-icons"

export default function LoadingSpinner() {
    return (<div className="loading-spinner">
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
        <FontAwesomeIcon icon={faAsterisk} />
    </div>)
}