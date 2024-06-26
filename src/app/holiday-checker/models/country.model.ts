import { Translation } from "../../models/translation.model";

export interface Country {
    displayName: string;
    isoCode: string;
    name: Translation[];
    officialLanguages: string[];
}