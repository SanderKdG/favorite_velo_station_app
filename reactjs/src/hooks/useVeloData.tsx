import {createContext, useContext, useState} from "react";
import {defaultNetwork, Network} from "../entities/Network";
import useGetSingle from "./useGetSingle";
import useInterval from "./useInterval";
import {LatLng} from "leaflet";
import {Station} from "../entities/Station";

const VeloContext = createContext<{
    network : Network,
    selectedStation: Station|null,
    setSelectedStation: (val:Station) => void,
    setCenter: (val:LatLng) => void,
    center: LatLng,
    zoom: number
}>({network: defaultNetwork, selectedStation: null, setSelectedStation: () => {}, setCenter: () => {}, center: new LatLng(0,0), zoom: 13})

export default function useVeloData() {
    return useContext(VeloContext)
}

export function VeloDataProvider(props:{children:JSX.Element}) {
    const {data:network, loading, refresh} = useGetSingle<null| { network: Network }>("https://api.citybik.es/v2/networks/velo-antwerpen?fields=stations", null)
    useInterval(refresh, 5000)
    const [selectedStation, setSelectedStation] = useState<Station|null>(null)
    const [center, setCenter] = useState(new LatLng(51.214468, 4.412213))
    const [zoom, setZoom] = useState(14)

    function setSelectedStationHandler(station:Station) {
        console.log("clicked station")
        if(station === null) setZoom(13)
        else {
            setCenter(new LatLng(station.latitude, station.longitude))
            setZoom(17)
        }
        setSelectedStation(station)
    }

    if(network === null) return <>
        {loading
            ? "Loading..."
            : "Failed to communicate with backend services."}
    </>

    return <VeloContext.Provider value={{network: network?.network ?? defaultNetwork, selectedStation, setSelectedStation: setSelectedStationHandler, setCenter, center, zoom}}>
        {props.children}
    </VeloContext.Provider>
}
