import {Station} from "./Station";

export interface Network {
    stations: Station[]
}

export const defaultNetwork : Network = {
    stations: []
}
