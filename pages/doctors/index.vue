<template>
    <div class="w-full flex flex-col items-start justify-center pt-4 pb-12 px-2 lg:px-64 gap-2">
        
        <div class="w-full flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-0 mb-2">

            <input type="text" v-model="searchText" class="w-full lg:w-auto lg:flex-1 rounded-lg border border-slate-200 py-2 px-4 text-start text-gray-800 text-sm" placeholder="جستجوی پزشک یا تخصص ..." />

            <button class="w-full lg:w-auto rounded-lg border bg-slate-500 hover:bg-slate-600 py-2 px-6 text-center text-white text-sm ms-2" @click="() => fetchDoctors()">
                جستجو
            </button>

        </div>

        <div class="w-full h-[80vh] flex justify-center items-center" v-if="loading_doctors">
            <LoadingSpinner size="20"  />
        </div>

        <template v-else >

            <DoctorRecord v-for="doctor of doctors" :doctor="doctor" />

        </template>

    </div>
</template> 

<script setup lang="ts">
import type { Doctor } from '~/models/doctor'

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت | پزشکان`,
})

const searchText = ref<string>('')
const doctors = ref<Doctor[]>([])
const loading_doctors = ref<boolean>(true)

const fetchDoctors = async () => {
    
    loading_doctors.value = true 
    return ask.get_doctors(searchText.value)
        .then( data => doctors.value = data )
        .finally( () => loading_doctors.value = false )
}

onMounted(() => {

    fetchDoctors()
})


</script>