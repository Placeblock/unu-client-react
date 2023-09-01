import "./RoomSettingsItem.css"

export default function RoomSettingsItem({title, children}) {

    return (
        <div className="room-settings-item">
            <p>{title}</p>
            <div className="room-section-item-input">
                {children}
            </div>
        </div>
    )

}