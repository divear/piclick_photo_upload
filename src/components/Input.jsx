import React, { useState } from 'react'
import piclick from "./img/piclick.png"

function Input() {
    const [photo, setPhoto] = useState()
    return (
        <div>
            <img className="logo" src={piclick} alt="picklick" />

            <input onChange={e => setPhoto(e.target.value)} value={photo} type="file" />
            <button className="send">send</button>
        </div>
    )
}

export default Input
