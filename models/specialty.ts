export interface Specialty {
    id: number
    name: string
}

export const specialtyFromJson = (json: any): Specialty => {
    
    return {
        id: json.id,
        name: json.specialty
    }
}
