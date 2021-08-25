import React, { useEffect, useState } from 'react'
import piclick from "./img/piclick.png"
import { storage } from './firebase/firebase'
var storageRef = storage.ref("images")

function Input() {
    const [data, setData] = useState([])
    const [photo, setPhoto] = useState()
    const [tempArray, setTempArray] = useState([])
    function send(tr){
        const uploadTask = storage.ref(`images/${photo.name}`).put(photo)
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
                        data.push(url)
                        setData(data)
                        console.log(data);
                    })
            }
        )
    }
    
    useEffect(() => {
        console.log("dklfklasjklfjskaljflkasjdkljgksh");
        storageRef.listAll().then(u => (u.items.forEach(d => {
            d.getDownloadURL().then(url => {
                tempArray.push(url)
                setTempArray(data)
            })
        })))
        setData(tempArray)
    }, [data])

    return (
        <div>
            <img className="logo" src={piclick} alt="picklick" />

            <input onChange={e=> setPhoto(e.target.files[0])} type="file" />
            <button onClick={send} className="send">send</button>

            <div className="posts">
                {
                    data[0] && data.map((d, index )=>{
                        // console.log(d);
                        return(
                            <img key={index} className="post" src={d} alt="" />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Input
