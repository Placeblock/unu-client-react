import "./ScrollBottomButton.css"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ScrollBottomButton({onClick}) {
    return (
        <button className="button scroll-bottom-button" onClick={onClick}>
            <FontAwesomeIcon className="" icon={faChevronDown} />
        </button>
    )
}