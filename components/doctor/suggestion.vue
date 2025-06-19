<template>
    <div class="w-full flex flex-col items-center justify-start bg-white rounded-lg p-4">
        
        <div class="w-full flex flex-col lg:flex-row items-center justify-start">

            <div class="w-16 h-16 rounded-full bg-slate-200" :style="{ backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>

            <div class="flex flex-col items-center lg:items-start justify-center lg:justify-start ps-4 gap-2 mb-4 lg:mb-0 lg:mt-0">
                <div class="text-gray-800 text-sm font-bold">{{ name }}</div>
                <div class="text-gray-800 text-xs">{{ speciality }}</div>
            </div>

            <NuxtLink :to="doctorPage" class="w-full lg:w-auto flex justify-center items-center rounded-md bg-indigo-500 hover:bg-indigo-600 py-1.5 px-4 text-center text-white transition-all duration-300 text-xs ms-auto">مشاهده پروفایل</NuxtLink>

        </div>
        
    </div>
</template>
<script setup lang="ts">

import type { Doctor } from '~/models/doctor';

const props = defineProps<{
    doctor: Doctor
}>()

const name = ref<string>(props.doctor.first_name + ' ' + props.doctor.last_name)

const avatar = computed<string>(() => props.doctor.avatar)

const speciality = ref<string>(props.doctor.specialties.map(specialty => specialty.name).join(', '))

const doctorPage = computed<string>(() => "/doctors/" + props.doctor.id)

</script>
