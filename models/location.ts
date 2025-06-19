export interface Location {
    id: number
    city: string
    province: string
}

export const locationFromJson = (json: any): Location => {
    return {
        id: json.id,
        city: json.city,
        province: json.province
    }
}
