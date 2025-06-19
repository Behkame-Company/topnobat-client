<template>
   <header class="w-screen h-[64px] px-2 lg:px-64 flex items-center justify-between border-b border-slate-200">

      <!---------------------- Desktop Menu  ---------------------->

      <div class="hidden lg:flex justify-start items-center gap-6">

         <NuxtLink to="/">

            <img src="/topnotbat.png" alt="logo" class="h-10 me-4">
            
         </NuxtLink>

         <NuxtLink to="/" class=" text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">صفحه اصلی</NuxtLink>

         <NuxtLink to="/doctors" class=" text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">پزشکان</NuxtLink>

         <NuxtLink to="/about-us" class="hidden lg:block text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">درباره ما</NuxtLink>
         
         <NuxtLink to="/contact-us" class="hidden lg:block text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">تماس با ما</NuxtLink>

      </div>

      <div class="hidden lg:flex justify-center items-center gap-4">

         <div class="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-2 py-2 cursor-pointer transition-all duration-300 text-xs gap-1" v-if="!loading_locations" :class="{ 'px-4': location_name_visible }" @mouseenter="showLocationName" @mouseleave="hideLocationName" @click="locationStore.showModal()">
            <Icon name="ic:outline-location-on" size="18"/>
            <span v-if="location_name_visible">{{ locationName }}</span>
         </div>

         <div class="flex justify-center items-center border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg py-2 px-4 cursor-pointer transition-all duration-300 text-xs" @click="profileOrLoginCallback">
           
            <template v-if="!authenticated"> 
               ورود | ثبت نام
            </template>

            <span v-else class="flex justify-center items-center gap-1">
                <Icon name="ic:outline-person" size="18"/>
               حساب کاربری
            </span>

         </div>

      </div>

      <!---------------------- Mobile Menu  ---------------------->

      <div class="flex lg:hidden w-full justify-between items-center">

         <div class="flex w-1/3 justify-start items-center">
            <Icon name="ic:outline-menu" size="28" class="text-gray-500 hover:text-indigo-600 cursor-pointer transition-all duration-300" @click="showMenu" />
         </div>

         <div class="flex w-1/3 justify-center items-center" v-if="!loading_locations">
            <div class="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2 cursor-pointer transition-all duration-300 text-xs gap-1" @mouseenter="showLocationName" @mouseleave="hideLocationName" @click="locationStore.showModal()">
               <Icon name="ic:outline-location-on" size="18"/>
               <span>{{ locationName }}</span>
            </div>
         </div>

         <div class="flex w-1/3 justify-end items-center">
            <div class="flex justify-center items-center border border-slate-500 text-slate-500 rounded-lg py-2 px-2 cursor-pointer transition-all duration-300 text-xs" @click="profileOrLoginCallback">
               <Icon name="ic:outline-person" size="18"/>
            </div>
         </div>

      </div>

      <Transition name="fade">
         <div class="fixed top-0 left-0 w-screen h-screen bg-slate-800/50 z-10" v-if="menu_visible" @click="hideMenu">

            <div class="w-[280px] h-full flex flex-col items-start justify-between py-4 px-4 gap-4 bg-white">

               <div class="w-full flex flex-col items-start justify-start gap-4"> 

                  <div class="w-full flex justify-center items-center">
                     <img src="/topnotbat.png" alt="logo" class="h-12 me-4">
                  </div>

                  <div class="w-full border-b border-slate-200 mb-2"></div>

                  <NuxtLink to="/" class="flex justify-center items-center gap-2 text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">
                     <Icon name="ic:outline-home" size="18" />
                     <span>صفحه اصلی</span>
                  </NuxtLink>
      
                  <NuxtLink to="/doctors" class="flex justify-center items-center gap-2 text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">
                     <Icon name="ic:outline-person" size="18" />
                     <span>پزشکان</span>
                  </NuxtLink>
      
                  <NuxtLink to="/about-us" class="flex justify-center items-center gap-2 text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">
                     <Icon name="ic:outline-info" size="18" />
                     <span>درباره ما</span>
                  </NuxtLink>
      
                  <NuxtLink to="/contact-us" class="flex justify-center items-center gap-2 text-gray-800 hover:text-indigo-600 text-sm cursor-pointer transition-all duration-300">
                     <Icon name="ic:outline-phone" size="18" />
                     <span>تماس با ما</span>
                  </NuxtLink>

               </div>

               <div class="w-full flex justify-center items-center gap-2 text-gray-500 text-xs cursor-pointer transition-all duration-300">
                  آریا نوین بهکامه
               </div>


            </div>

         </div>
      </Transition>

   </header> 
</template>
<script setup lang="ts">

const authStore = useAuthStore() 
const locationStore = useLocationStore()
const router = useRouter()

const { authenticated } = storeToRefs(authStore)

const { location, loading_locations } = storeToRefs(locationStore)

const menu_visible = ref<boolean>(false)

const location_name_visible = ref<boolean>(false)

const showMenu = () => menu_visible.value = true

const hideMenu = () => menu_visible.value = false

const showLocationName = () => location_name_visible.value = true 

const hideLocationName = () => location_name_visible.value = false 

const locationName = computed(() => location.value?.city)

const profileOrLoginCallback = () => {

   if( authenticated.value )
      router.push('/profile')
   else
      authStore.showModal()
}
</script>
