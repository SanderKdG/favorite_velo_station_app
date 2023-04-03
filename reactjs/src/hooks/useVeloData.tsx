import {createContext, useContext, useState} from "react";
import {defaultNetwork, Network} from "../entities/Network";
import useGetSingle from "./useGetSingle";
import useInterval from "./useInterval";

const VeloContext = createContext<{
    network : Network,
    selectedStation: number|null,
    setSelectedStation: (val:number) => void
}>({network: defaultNetwork, selectedStation: null, setSelectedStation: () => {}})

export default function useVeloData() {
    return useContext(VeloContext)
}

export function VeloDataProvider(props:{children:JSX.Element}) {
    const {data:network, loading, refresh} = useGetSingle<null|Network>("/network", null)
    useInterval(refresh, 5000)
    const [selectedStation, setSelectedStation] = useState<number|null>(null)

    /*if(network === null) return <>
        {loading
            ? "Loading..."
            : "Failed to communicate with backend services."}
    </>*/

    return <VeloContext.Provider value={{network: network ?? defaultNetwork, selectedStation, setSelectedStation}}>
        {props.children}
    </VeloContext.Provider>
}
