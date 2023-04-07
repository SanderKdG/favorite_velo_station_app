import {StationInfo} from "./StationInfo";

export interface Network {
    stations: StationInfo[]
}

export const defaultNetwork : Network = {
    stations: []
}
