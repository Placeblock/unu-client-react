import { useState } from "react";
import CardStackGroupSettings from "../cardstackgroupsettings/CardStackGroupSettings";
import CreateCardGroup from "../createcardgroup/CreateCardGroup";
import "./CardStackEditor.css"
import useKeyBind from "../../../../../hooks/KeyBindHook";

export default function CardStackEditor({onClose}) {
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    useKeyBind("Escape", () => {
        onClose();
    });

    return (
        <div className="card-stack-editor">
            {showCreateGroup?
                <CreateCardGroup onFinish={() => setShowCreateGroup(!showCreateGroup)} />:
                <CardStackGroupSettings onCreateGroup={() => setShowCreateGroup(!showCreateGroup)} />
            }
        </div>
    )
}