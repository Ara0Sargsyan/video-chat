import useStateWithCallBack from "./useStateWithCallBack";
import {useCallback, useEffect, useRef} from "react";
import socket from "../socket";
import ACTIONS from "../socket/actions"

const LOCAL_VIDEO = "LOCAL_VIDEO"

export default function (roomID) {
    const [clients, updateClients] = useStateWithCallBack([])

    const addNewClient = useCallback((newClient, cb) => {
        if (!clients.includes(newClient)) {
            updateClients(list => [...list, newClient], cb)
        }
    }, [clients, updateClients])

    const peerConnections = useRef({})
    const localMediaStream = useRef(null)
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null
    })

    useEffect(() => {

        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 1200,
                    height: 720,
                }
            })

            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO]

                if (localVideoElement) {
                    localVideoElement.volume = 0
                    localVideoElement.srcObject = localMediaStream.current
                }
            })
        }

        startCapture().then(() => {
            socket.emit(ACTIONS.JOIN, {room: roomID})
        }).catch(e => {
            console.error("error getting userMedia", e)
        })

    }, [roomID])

    return [clients]
}