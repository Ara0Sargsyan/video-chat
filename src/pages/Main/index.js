import socket from "../../socket";
import {useEffect, useState} from "react";
import ACTIONS from "../../socket/actions"
import {useNavigate} from "react-router-dom";
import {v4} from "uuid"

export default function Main() {
    const [rooms, setRooms] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms}) => {
            setRooms(rooms)
        })
    }, [])

    return (
        <div>
            <h1>Avaliable Rooms</h1>
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() => {
                            navigate(`/room/${roomID}`)
                        }}>
                            Join Room
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                navigate(`/room/${v4()}`)
            }} >Create ne Room</button>
        </div>
    )
}