import { useState } from "react";
import CardDeckGroupSettings from "../carddeckgroupsettings/CardDeckGroupSettings";
import CreateCardGroup from "../createcardgroup/CreateCardGroup";
import "./CardDeckEditor.css"
import useKeyBind from "../../../../../hooks/KeyBindHook";
import CardDeckPresets from "../carddeckpresets/CardDeckPresets";

const Page = {
    "GROUP_SETTINGS": 0,
    "CREATE_GROUP": 1,
    "SELECT_PRESET": 2
}
export default function CardDeckEditor({onClose, disabled}) {
    const [page, setPage] = useState(Page.GROUP_SETTINGS);

    useKeyBind("Escape", () => {
        onClose();
    });

    return (
        <div className="card-deck-editor">
            {page==Page.GROUP_SETTINGS&&
                <CardDeckGroupSettings onClose={onClose} onCreateGroup={() => setPage(Page.CREATE_GROUP)} onDeckSelect={() => setPage(Page.SELECT_PRESET)} disabled={disabled}/>
            }
            {page==Page.CREATE_GROUP&&
                <CreateCardGroup onFinish={() => setPage(Page.GROUP_SETTINGS)} />
            }
            {page==Page.SELECT_PRESET&&
                <CardDeckPresets onFinish={() => setPage(Page.GROUP_SETTINGS)} />
            }
        </div>
    )
}