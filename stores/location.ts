import type { Location } from '~/models/location' 

const getLocationFromLocalStorage = (): number => {

    if (process.client) 
        return parseInt(localStorage.getItem('location') || '1')

    return 1
}

export const useLocationStore = defineStore('location', () => {

    const locations = ref<Location[]>([])
    const loading_locations = ref<boolean>(true)
    const location_id = ref<number>(getLocationFromLocalStorage())
    const modal = ref<boolean>(false)
 
    const location = computed(() => locations.value.find((location: { id: number }) => location.id === location_id.value))
 
    const fetchLocations = async () => {

        loading_locations.value = true
        return await ask.get_locations()
            .then(records => locations.value = records)
            .finally(() => loading_locations.value = false)
    }
    
    const setLocationId = (value: number): void => {

        location_id.value = value

        if (process.client)
            localStorage.setItem('location', value.toString())  
    }

    const showModal = () => modal.value = true

    const hideModal = () => modal.value = false

    onMounted(() => {
        fetchLocations()
    })

    return {
        locations,
        loading_locations,
        location_id,
        location,
        modal,

        showModal,
        hideModal,
        setLocationId,
    }
})