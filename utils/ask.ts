import { doctorFromJson, type Doctor } from "~/models/doctor"
import { locationFromJson, type Location } from "~/models/location"
import { userFromJson, type User } from "~/models/user"

const api = async (method: string, url: string, params: any = {}): Promise<any> => {

    const host = 'https://topnobat.ir'

  const { token } = storeToRefs(useAuthStore())

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  if( token.value )
    headers['Authorization'] = `Bearer ${token.value}`

  let body = null
  if( params )  
    body = JSON.stringify(params)

  if( method == "GET" ) {
    return fetch(host + url, {
      headers: headers,
      method: method,
    })
    .then( async (response) => {

      const json = await response.json()

      if( response.status != 200 && response.status != 201  ) {
        handleResponse(response.status, json.message)
        return Promise.reject()
      }

      return json
    })  
  }

  return fetch(host + url, {
      method: method,
      headers: headers,
      body: body
    })
    .then( async (response) => {
      
      const json = await response.json()
      
      if( response.status != 200 && response.status != 201  ) {
        handleResponse(response.status, json.message)
        return Promise.reject()
      }

      return json
    })
}

const handleResponse = async (status: number, message: string) => {

  console.log(status, message)
  if (status === 401 || status === 403) {
      useRouter().push('/logout')
      return
  } else if (status == 404) {
      showError({
          statusCode: status,
          statusMessage: message,
      })
      return
  } else if (status == 469) {
     swal.error("خطا", message)
     return
  } else if (status == 422) {
      swal.error("خطا", message)
      return
  }

  swal.error("خطا", message)
}

export const ask = {

    request_token: (phone_number: string): Promise<void> => api("POST", "/api/auth/token-request", { phone_number: phone_number }),

    validate_token: (phone_number: string, otp_token: string ): Promise<string> => api("POST", "/api/auth/login", { phone_number: phone_number, otp_token: otp_token }).then( data => data.token ),

    get_locations: (): Promise<Location[]> => api("GET", "/api/locations").then( data => data.data.map( (item: any) => locationFromJson(item) ) ),

    get_user: (): Promise<User> => api("GET", "/api/auth/me").then( data => userFromJson(data.data) ),

    update_user_information: (first_name: string, last_name: string, social_number: string): Promise<void> => api("POST", "/api/auth/update-user", { first_name: first_name, last_name: last_name, social_number: social_number }),

    update_user_location: (location_id: number): Promise<void> => api("POST", "/api/auth/update-location", { location_id: location_id }),

    update_user_lat_and_long: (latitude: number, longitude: number): Promise<void> => api("POST", "/api/auth/update-coordinates", { user_latitude: latitude, user_longitude: longitude }),

    get_doctors: (search: string = ""): Promise<Doctor[]> => api("POST", "/api/doctors", { search: search }).then( data => data.data.map( (item: any) => doctorFromJson(item) ) ),

    get_doctor: (id: number): Promise<Doctor> => api("GET", "/api/doctors/" + id).then( data => doctorFromJson(data.data) ),

    get_recommended_doctors: (speciality_id: number): Promise<Record<string, Doctor>> => api("POST", "/api/index/recommend",{ specialty_id: speciality_id }).then( data => data.data ),

}