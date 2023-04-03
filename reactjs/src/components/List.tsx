import {TextField} from "@mui/material";
import {Station} from "../entities/Station";
import useVeloData from "../hooks/useVeloData";
import "./../media/css/stations-list.css"

export default function List() {
    const {stations, filter, setFilter} = useVeloData()

    return <>
        <TextField fullWidth label={"Search"} value={filter} onChange={e => setFilter(e.target.value)} />
        <div className={"stationsList"}>
            {stations
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
