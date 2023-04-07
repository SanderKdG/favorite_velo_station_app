import {createContext, useContext, useState} from "react";
import useGetSingle from "./useGetSingle";
import useInterval from "./useInterval";
import useAuth from "./useAuth";
import Station from "../entities/Station";

const VeloContext = createContext<{
    stations : Station[],
    refresh: () => void,
    filter: string,
    setFilter: (val:string) => void
}>({
    stations: [],
    refresh: () => {},
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
    const [filter, setFilter] = useState("")

    if(stations.length === 0) return <>
        {loading
            ? "Loading..."
            : "Failed to communicate with backend services."}
    </>

    return <VeloContext.Provider value={{
        stations: stations.filter(station => station.station.name.toLowerCase().includes(filter.toLowerCase())),
        refresh,
        filter,
        setFilter}}>
        {props.children}
    </VeloContext.Provider>
}


//https://react-leaflet.js.org/docs/example-external-state/ To move to a point
