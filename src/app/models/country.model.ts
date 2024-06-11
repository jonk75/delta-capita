import { CountryName } from "./country-name.model";

export interface Country {
    isoCode: string;
    name: CountryName[];
    officialLanguages: string[];
}