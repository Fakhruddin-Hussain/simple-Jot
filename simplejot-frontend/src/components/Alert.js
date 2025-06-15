import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

function Alert() {
    const capitalize=(word)=>{
        word === "danger" && (word="Error");
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
    const context = useContext(NoteContext);
    const {alert} = context
    return (
        alert && <div>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {capitalize(alert.type)}: {alert.message}
            </div>
        </div>
    )
}

export default Alert