export type Place = {
    name: string;
    id: string;
    description: string;
    location: {
        coordinates: [number, number]
    }
}