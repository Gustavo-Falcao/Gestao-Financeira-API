import { useEffect, useReducer, useRef } from "react";
import { createPortal } from "react-dom"

function InfoPopup({msg, type, isOpen, onClose}) {
    const popupElement = document.getElementById("toast");
    const keyTimeOut = useRef(null)
    
    useEffect(() => {
        if(!popupElement) return
        
        if(!isOpen) {
            popupElement.className = "toast"
            return
        }
        
        popupElement.className = `toast ${type} show`
        
        keyTimeOut.current = setTimeout(() => {
            popupElement.className = 'toast'

            if(onClose) {
                onClose()
            }
        }, 5000)
        
        return () => {
            if(keyTimeOut.current) {
                clearTimeout(keyTimeOut.current)
            }
        }

    }, [isOpen, type, popupElement, onClose])

    if(!popupElement || !isOpen) {
        return null
    }

    return createPortal(
        <span>{msg}</span>, 
        popupElement
    );
}

export default InfoPopup