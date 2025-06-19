import { locationFromJson, type Location } from "./location"
import { specialtyFromJson, type Specialty } from "./specialty"

export interface Doctor {
    id: number
    first_name: string
    last_name: string
    description: string
    avatar: string
    location: Location
    specialties: Specialty[]
    phone_numbers: string[]
    addresses: string[]
    longitude: number
    latitude: number
    status: number
    work_plans: string[]
}

export const doctorFromJson = (json: any): Doctor => {

    return {
        id: json.id,
        first_name: json.first_name,
        last_name: json.last_name,
        description: json.description,
        location: locationFromJson(json.location),
        specialties: json.specialties.map((specialty: any) => specialtyFromJson(specialty)),
        phone_numbers: json.phone_numbers,
        addresses: json.addresses,
        longitude: json.longitude,
        latitude: json.latitude,
        status: json.status,
        work_plans: json.work_plans,
        avatar: "https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg", // json.avatar
    }
}
 