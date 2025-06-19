export interface User {
    id: number
    first_name: string | null
    last_name: string | null
    social_number: string | null
    avatar: string | null
    phone_number: string | null
    latitude: number | null
    longitude: number | null
    created_at: string
    updated_at: string
}

export const userFromJson = (json: any): User => {

    return {
        id: json.id,
        first_name: json.first_name,
        last_name: json.last_name,
        social_number: json.social_number,
        avatar: json.avatar,
        phone_number: json.phone_number,
        latitude: json.latitude,
        longitude: json.longitude,
        created_at: json.created_at,
        updated_at: json.updated_at
    }
}
 