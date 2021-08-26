import React, { useEffect, useState } from 'react'
import piclick from "./img/piclick.png"
import { storage } from './firebase/firebase'
var storageRef = storage.ref("images")

function Input() {
    const [error, setError] = useState("")
    var dataLen;
    storageRef.listAll().then(u => dataLen = u.items.length);
    const [data, setData] = useState([])
    var photo
    const [tempArray, setTempArray] = useState([])
    const [tempArray2, setTempArray2] = useState([])
    function send(){
        if(!photo){
            setError("No photo provided")
            return 
        }
        const uploadTask = storage.ref(`images/${photo.name}`).put(photo)
        console.log("photo: " + photo);
        uploadTask.on(
            "state changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(photo.name)
                    .getDownloadURL()
                    .then(url =>{
                        tempArray2.push(url)
                        setTempArray2(tempArray2)
                        photo = ""
                    })
            }
        )
        console.log(dataLen);
        tempArray2.slice(0, dataLen)
        setTempArray2(tempArray2)
        setData(tempArray2)
        console.log(data);
    }
    
    useEffect(() => {
        storageRef.listAll().then(u => (u.items.forEach(d => {
            d.getDownloadURL().then(url => {
                tempArray.push(url)
                setTempArray(data)
            })
        })))
        tempArray.slice(0, dataLen)
        setData(tempArray)
    }, [data])

    return (
        <div>
            <img className="logo" src={piclick} alt="picklick" />

            <input onChange={e=> photo = e.target.files[0]} type="file" />
            <button onClick={send} className="send">send</button>
            <h1>{error}</h1>

            <p>{data[0] && data.length}</p>
            <div className="posts">
                {
                    data[0] && data.map((d, index )=>{
                        return(
                            <div>
                                <img key={index} className="post" src={d} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Input
