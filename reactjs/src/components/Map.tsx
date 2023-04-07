import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "./../media/css/map.css"
import useVeloData from "../hooks/useVeloData";
import {Icon} from "leaflet"
import parkingIcon from "./../media/img/bicycle-parking-icon.png"
import favoriteParkingIcon from "./../media/img/bicycle-parking-favorite-icon.png"
import {Button} from "@mui/material";
import Station from "../entities/Station";
import axios from "axios";
import {useSnackbar} from "notistack";
import useAuth from "../hooks/useAuth";

const bicycleParkingIcon = new Icon({
    iconUrl: parkingIcon,
    iconSize: [32,32]
})

const bicycleParkingFavoriteIcon = new Icon({
    iconUrl: favoriteParkingIcon,
    iconSize: [32,32]
})

export default function Map() {
    const {center, stations, zoom} = useVeloData()

    return <MapContainer className={"map"} center={center} zoom={zoom} scrollWheelZoom={true} minZoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations
            .map(station => <StationMarker key={station.station.id} station={station} />)}
    </MapContainer>
}

function StationMarker({station}:{station:Station}) {
    const {refresh} = useVeloData()
    const {isAuthorized} = useAuth()
    const {enqueueSnackbar} = useSnackbar()

    async function toggleStation() {
        if(!station.isFavorite) {
            await axios.post("/station/favorites/add", {stationId: station.station.id})
            enqueueSnackbar("Successfully added favorite")
        } else {
            await axios.delete(`/station/favorites/${station.station.id}`)
            enqueueSnackbar("Successfully removed favorite")
        }
        refresh()
    }

    return <Marker key={station.station.id} position={[station.station.latitude, station.station.longitude]} icon={station.isFavorite ? bicycleParkingFavoriteIcon : bicycleParkingIcon}>
        <Popup>
            {station.station.name}
            <br/>
            Free slots: {station.station.free_bikes}
            <br />
            {isAuthorized && <div className={"flexElements centerElements"}>
                <Button color={station.isFavorite ? "error" : "success"} sx={{mt: 1}} onClick={toggleStation}>
                    {station.isFavorite ? "Remove favorite" : "Favorite"}
                </Button>
            </div>}
        </Popup>
    </Marker>
}
