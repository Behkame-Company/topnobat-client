<template>
    <div class="w-full flex items-start justify-start px-2 lg:px-64 pb-12 gap-6" style="min-height: calc(100vh - 112px);">
        
        <div class="w-1/4 flex flex-col items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">
            
            <div class="w-full flex items-center justify-start py-2 px-3 my-1 gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-indigo-500 text-sm rounded cursor-pointer transition-all duration-300" @click="() => changeTab('profile')">
                <Icon name="ic:outline-edit" size="16" />
                <span>ویرایش پروفایل </span>
                <Icon v-if="tab === 'profile'" name="ic:baseline-expand-more" class="text-indigo-500 ms-auto" size="16" />
            </div>

            <div class="w-full flex items-center justify-start py-2 px-3 my-1 gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-indigo-500 text-sm rounded cursor-pointer transition-all duration-300" @click="() => changeTab('address')">
                <Icon name="ic:outline-location-on" size="16" />
                <span>موقعیت مکانی</span>
                <Icon v-if="tab === 'address'" name="ic:baseline-expand-more" class="text-indigo-500 ms-auto" size="16" />
            </div>
            
            <div class="w-full flex items-center justify-start py-2 px-3 my-1 gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-indigo-500 text-sm rounded cursor-pointer transition-all duration-300" @click="() => changeTab('appointments')">
                <Icon name="ic:outline-calendar-month" size="16" />
                <span>نوبت های من</span>
                <Icon v-if="tab === 'appointments'" name="ic:baseline-expand-more" class="text-indigo-500 ms-auto" size="16" />
            </div>
           
            <div class="w-full flex items-center justify-start py-2 px-3 my-1 gap-2 bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-indigo-500 text-sm rounded cursor-pointer transition-all duration-300" @click="logout">
                <Icon name="ic:outline-logout" size="16" />
                <span>خروج</span>
            </div>

        </div>

        <div class="w-3/4 flex flex-col items-center justify-start mt-4">

            <div class="w-full flex flex-col items-start justify-center gap-2 px-4 py-4 bg-white rounded-lg" v-if="tab === 'profile'">

                <div class="w-1/2 flex flex-col items-start justify-center gap-2">
                    <label for="name" class="text-sm text-gray-800">نام</label>
                    <input v-model="first_name" type="text" id="name" class="w-full border border-gray-200 rounded-md py-1.5 px-2 text-sm text-gray-800" placeholder="امیر حسین" :disabled="loading" />
                </div>

                <div class="w-1/2 flex flex-col items-start justify-center gap-2">
                    <label for="name" class="text-sm text-gray-800">نام خانوادگی</label>
                    <input v-model="last_name" type="text" id="name" class="w-full border border-gray-200 rounded-md py-1.5 px-2 text-sm text-gray-800" placeholder="رنجبر حسنی" :disabled="loading" />
                </div>

                <div class="w-1/2 flex flex-col items-start justify-center gap-2">
                    <label for="name" class="text-sm text-gray-800">کدملی</label>
                    <input v-model="national_code" type="text" id="name" class="w-full border border-gray-200 rounded-md py-1.5 px-2 text-sm text-gray-800" placeholder="3040506070" :disabled="loading" />
                </div>

                <div class="w-1/2 flex flex-col items-start justify-center gap-2">
                    <label for="name" class="text-sm text-gray-800">شماره تلفن</label>
                    <input type="text" id="name" class="w-full border border-gray-200 rounded-md py-1.5 px-2 text-sm disabled:text-gray-500" :value="phone_number" disabled />
                </div>

                <div class="w-full flex flex-col items-start justify-center gap-2">
                    <button class="w-44 flex justify-center items-center rounded-md bg-indigo-500 hover:bg-indigo-600 py-1.5 px-4 text-center text-white transition-all duration-300 text-sm mt-4 ms-auto" @click="updateUserInformation"> 
                        <LoadingSpinner v-if="loading" size="16" class="my-1" />
                        <span v-else>ذخیره اطلاعات</span>
                    </button>
                </div>
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-2 px-4 py-4 bg-white rounded-lg" v-if="tab === 'address'">

                <div class="text-gray-800 text-sm font-bold mb-2">لطفا روی نقشه موقعیت مکانی خود را انتخاب کنید</div>

                <LocationPicker @location-selected="handleLocationSelected" :latitude="latitude" :longitude="longitude" />

                <div class="w-full flex flex-col items-start justify-center gap-2">
                    <button class="w-44 flex justify-center items-center rounded-md bg-indigo-500 hover:bg-indigo-600 py-1.5 px-4 text-center text-white transition-all duration-300 text-sm mt-4 ms-auto" @click="updateUserLatAndLong"> 
                        <LoadingSpinner v-if="loading" size="16" class="my-1" />
                        <span v-else>ذخیره اطلاعات</span>
                    </button>
                </div>

            </div>

            <template v-if="tab === 'appointments'">

                <div class="w-full flex flex-col items-center justify-start bg-white rounded-lg p-4">
                    
                    <div class="w-full flex items-center justify-start gap-4">

                        <div class="w-16 h-16 rounded-full bg-slate-200"></div>

                        <div class="flex flex-col items-start justify-start gap-2">
                            <div class="text-gray-800 text-sm font-bold">امیر حسین رنجبر حسنی</div>
                            <div class="text-gray-800 text-xs">دکتر جراح سرطان</div>
                        </div>

                        <div class="flex flex-col items-start justify-start gap-2">
                            <div class="text-gray-800 text-sm font-bold">
                                <span>زمان ویزیت:</span>
                                <span class="mx-1">10 بهمن</span>
                                <span>14:00</span>
                            </div>
                            <div class="text-gray-800 text-xs">آدرس: تهران، خیابان آزادی، پلاک 123</div>
                        </div>

                        <div class="ms-auto my-auto pe-4 text-green-500 text-sm font-bold">پرداخت شده</div>
                            
                        

                    </div>

                </div>

            </template>

        </div>
      
    </div>
</template> 
<script setup lang="ts">

const router = useRouter()
const locationStore = useLocationStore()

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت | پروفایل`,
})

const { location_id } = storeToRefs(locationStore)
const tab = ref<string>('profile') // profile, address, appointments
const first_name = ref<string>('')
const last_name = ref<string>('')
const national_code = ref<string>('')
const phone_number = ref<string>('09370843199s')
const loading = ref<boolean>(false)
const latitude = ref<number>(0)
const longitude = ref<number>(0)

const changeTab = (value: string) => tab.value = value

const fetchUser = () => {

    ask.get_user()
        .then( data => {

            first_name.value = data.first_name || ''
            last_name.value = data.last_name || ''
            national_code.value = data.social_number || ''
            phone_number.value = data.phone_number || ''
            latitude.value = data.latitude || 30.403731 // default shohada rafsanjan
            longitude.value = data.longitude || 55.986075 // default shohada rafsanjan
        })
}

const updateUserInformation = () => {

    loading.value = true
    ask.update_user_information(first_name.value, last_name.value, national_code.value)
        .then( () => swal.success('اطلاعات پروفایل','اطلاعات با موفقیت ذخیره شد'))
        .finally(() => loading.value = false)
}

const handleLocationSelected = (location: { lat: number; lng: number }) => {

    latitude.value = location.lat
    longitude.value = location.lng
}

const updateUserLatAndLong = () => {

    loading.value = true
    ask.update_user_lat_and_long(latitude.value, longitude.value)
        .then( () => swal.success('اطلاعات پروفایل','اطلاعات با موفقیت ذخیره شد'))
        .finally(() => loading.value = false)
}

onMounted(() => {
    fetchUser()

    ask.update_user_location(location_id.value)
})

const logout = () => router.push('/logout')

</script>