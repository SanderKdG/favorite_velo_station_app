import {TextField} from "@mui/material";
import {StationInfo} from "../entities/StationInfo";
import useVeloData from "../hooks/useVeloData";
import "./../media/css/stations-list.css"

export default function List() {
    const {stations, filter, setFilter} = useVeloData()

    return <>
        <TextField fullWidth label={"Search"} value={filter} onChange={e => setFilter(e.target.value)} />
        <div className={"stationsList"}>
            {stations
                .map(station => <StationCard key={station.station.id} station={station.station} />)}
        </div>
    </>
}

function StationCard({station}: { station: StationInfo }) {
    return <div className={"stationCard"}>
        {station.name}
        <br/>
        <small>Bicycles: {station.free_bikes}, Empty slots: {station.empty_slots}</small>
    </div>
}
