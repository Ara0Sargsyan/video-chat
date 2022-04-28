import {useParams} from "react-router-dom";
import useWebRtc from "../../hooks/useWebRtc";

export default function Room () {

    const {id: roomID} = useParams()
    const [clients] = useWebRtc(roomID)
    console.log(clients);

    return (
        <div>
            Room Page
        </div>
    )
}