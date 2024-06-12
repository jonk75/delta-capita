import { Subdivide } from "./subdivision.model";
import { Translation } from "../../models/translation.model";

export interface Holiday {
    displayName: string;
    endDate: string;
    id: string;
    name: Translation[];
    nationwide: boolean;
    startDate: string;
    subdivisions?: Subdivide[];
    type: string;
}