import {createContext, useContext, useState} from "react";
import useGetSingle from "./useGetSingle";
import useInterval from "./useInterval";
import {LatLng} from "leaflet";
import {StationInfo} from "../entities/StationInfo";
import useAuth from "./useAuth";
import Station from "../entities/Station";

const VeloContext = createContext<{
    stations : Station[],
    selectedStation: StationInfo|null,
    setSelectedStation: (val:StationInfo) => void,
    setCenter: (val:LatLng) => void,
    center: LatLng,
    zoom: number,
    refresh: () => void,
    filter: string,
    setFilter: (val:string) => void
}>({
    stations: [],
    selectedStation: null,
    setSelectedStation: () => {},
    setCenter: () => {},
    refresh: () => {},
    center: new LatLng(0,0),
    zoom: 13,
    filter: "",
    setFilter: () => {}
})

export default function useVeloData() {
    return useContext(VeloContext)
}

export function VeloDataProvider(props:{children:JSX.Element}) {
    const {isAuthorized} = useAuth()
    const {data:stations, loading, refresh} = useGetSingle<Station[]>(`/station/${isAuthorized ? 'favorites' : 'list'}`, [])
    useInterval(refresh, 5000)
    const [selectedStation, setSelectedStation] = useState<StationInfo|null>(null)
    const [center, setCenter] = useState(new LatLng(51.214468, 4.412213))
    const [zoom, setZoom] = useState(14)
    const [filter, setFilter] = useState("")

    function setSelectedStationHandler(station:StationInfo) {
        if(station === null) setZoom(13)
        else {
            setCenter(new LatLng(station.latitude, station.longitude))
            setZoom(17)
        }
        setSelectedStation(station)
    }

    if(stations.length === 0) return <>
        {loading
            ? "Loading..."
            : "Failed to communicate with backend services."}
    </>

    return <VeloContext.Provider value={{
        stations: stations.filter(station => station.station.name.toLowerCase().includes(filter.toLowerCase())),
        selectedStation,
        setSelectedStation:
        setSelectedStationHandler,
        setCenter,
        center,
        refresh,
        zoom,
        filter,
        setFilter}}>
        {props.children}
    </VeloContext.Provider>
}


//https://react-leaflet.js.org/docs/example-external-state/ To move to a point
