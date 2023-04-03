import {TextField} from "@mui/material";
import {useState} from "react";
import {Station} from "../entities/Station";
import useVeloData from "../hooks/useVeloData";
import "./../media/css/stations-list.css"

export default function List() {
    const {network} = useVeloData()
    const [filter, setFilter] = useState("")

    return <>
        <TextField fullWidth label={"Search"} value={filter} onChange={e => setFilter(e.target.value)} />
        <div style={{height: "400px", overflowY: "auto"}}>
            {network
                .stations
                .filter(station => station.name.toLowerCase().includes(filter.toLowerCase()))
                .map(station => <StationCard key={station.id} station={station} />)}
        </div>
    </>
}

function StationCard({station}: { station: Station }) {
    const {setSelectedStation} = useVeloData()

    return <div className={"stationCard"} onClick={() => setSelectedStation(station)}>
        {station.name}
        <br/>
        <small>Bicycles: {station.free_bikes}, Empty slots: {station.empty_slots}</small>
    </div>
}
