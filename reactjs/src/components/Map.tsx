import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "./../media/css/map.css"
import useVeloData from "../hooks/useVeloData";
import {Icon} from "leaflet"
import parkingIcon from "./../media/img/bicycle-parking-icon.png"

export default function Map() {
    const {center, network, zoom} = useVeloData()

    const bicycleParkingIcon = new Icon({
        iconUrl: parkingIcon,
        iconSize: [32,32]
    })


    return <MapContainer className={"map"} center={center} zoom={zoom} scrollWheelZoom={false} minZoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {network.stations
            .map(station =>
                <Marker key={station.id} position={[station.latitude, station.longitude]} icon={bicycleParkingIcon}>
                    <Popup>
                        {station.name}
                        <br/>
                        Free slots: {station.free_bikes}
                    </Popup>
                </Marker>
            )}
    </MapContainer>
}
