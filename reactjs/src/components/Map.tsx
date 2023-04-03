import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "./../media/css/map.css"
import useVeloData from "../hooks/useVeloData";
import {Icon} from "leaflet"
import parkingIcon from "./../media/img/bicycle-parking-icon.png"
import favoriteParkingIcon from "./../media/img/bicycle-parking-favorite-icon.png"
import {Station} from "../entities/Station";
import {Button} from "@mui/material";

const bicycleParkingIcon = new Icon({
    iconUrl: parkingIcon,
    iconSize: [32,32]
})

const bicycleParkingFavoriteIcon = new Icon({
    iconUrl: favoriteParkingIcon,
    iconSize: [32,32]
})

export default function Map() {
    const {center, network, zoom} = useVeloData()

    return <MapContainer className={"map"} center={center} zoom={zoom} scrollWheelZoom={false} minZoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {network.stations
            .map(station => <StationMarker key={station.id} station={station} />)}
    </MapContainer>
}

function StationMarker({station}:{station:Station}) {
    const isFavorite = station.free_bikes < 5

    return <Marker key={station.id} position={[station.latitude, station.longitude]} icon={isFavorite ? bicycleParkingFavoriteIcon : bicycleParkingIcon}>
        <Popup>
            {station.name}
            <br/>
            Free slots: {station.free_bikes}
            <br />
            <div className={"flexElements centerElements"}>
                <Button color={"success"} sx={{mt:1}}>Favorite</Button>
            </div>
        </Popup>
    </Marker>
}
