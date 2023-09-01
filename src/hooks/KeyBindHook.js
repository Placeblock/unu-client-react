import { useEffect } from "react";

export default function useKeyBind(key, callback, dependencies=[]) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const target = e.target;
            if (target.tagName == "INPUT" && e.code !== "Escape") {
                if (target.type != "number" || /[0-9]/.test(e.key)) {
                    return;
                }
            }
            if (e.code === key) {
                e.preventDefault();
                callback();
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, dependencies);
}