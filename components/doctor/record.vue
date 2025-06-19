<template>
    <div class="w-full flex flex-col items-center justify-start bg-white rounded-lg p-4">
        
        <div class="w-full flex flex-col lg:flex-row items-center justify-start">

            <div class="w-16 h-16 rounded-full bg-slate-200" :style="{ backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>

            <div class="flex flex-col items-center lg:items-start justify-center lg:justify-start ps-4 gap-2 mt-2 lg:mt-0">
                <NuxtLink :to="doctorPage" class="text-gray-800 hover:text-indigo-500 text-sm font-bold transition-all duration-300">{{ name }}</NuxtLink>
                <div class="text-gray-800 text-xs">{{ specialties }}</div>
            </div>

            <div class="w-full lg:w-auto flex justify-center items-center ms-auto mt-2 lg:mt-0">

                <Icon name="ic:outline-star" size="16" :class="stars >= 5 ? 'text-yellow-400' : 'text-gray-200'" />

                <Icon name="ic:outline-star" size="16" :class="stars >= 4 ? 'text-yellow-400' : 'text-gray-200'" />

                <Icon name="ic:outline-star" size="16" :class="stars >= 3 ? 'text-yellow-400' : 'text-gray-200'" />

                <Icon name="ic:outline-star" size="16" :class="stars >= 2 ? 'text-yellow-400' : 'text-gray-200'" />

                <Icon name="ic:outline-star" size="16" :class="stars >= 1 ? 'text-yellow-400' : 'text-gray-200'" />

            </div>

        </div>

        <div class="w-full flex items-center justify-start ps-0 lg:ps-20 mt-2 lg:mt-0">

            <div class="hidden lg:flex items-center justify-start gap-2 text-gray-800 text-xs">
                آدرس: 
                <span>{{ address }}</span>
            </div>

            <NuxtLink :to="doctorPage" class="w-full lg:w-auto flex justify-center items-center rounded-md bg-indigo-500 hover:bg-indigo-600 py-1.5 px-4 text-center text-white transition-all duration-300 text-xs ms-auto"> دریافت نوبت</NuxtLink>

        </div>
        
    </div>
</template>
<script setup lang="ts">
import type { Doctor } from '~/models/doctor' 

const props = defineProps({
    doctor: {
        type: Object as PropType<Doctor>,
        required: true
    }
})

const name = computed<string>(() => props.doctor.first_name + " " + props.doctor.last_name)

const avatar = computed<string>(() => props.doctor.avatar)

const specialties = computed<string>(() => props.doctor.specialties.map((specialty) => specialty.name).join(","))

const address = computed<string>(() => props.doctor.addresses?.length > 0 ? props.doctor.addresses[0] : "-")

const stars = computed<number>(() => props.doctor.status)

const doctorPage = computed<string>(() => "/doctors/" + props.doctor.id)

</script>
