<template>
  <Transition name="fade">

    <div class="w-screen h-screen fixed top-0 left-0 bg-slate-800/50 flex items-center justify-center z-50 px-4" v-show="modal" @click="locationStore.hideModal()">

      <div class="w-full lg:w-[420px] flex flex-col items-start justify-center bg-white rounded-lg p-4 text-sm" @click.stop>
      
        <div class="text-base font-bold"> لطفا شهر خود را انتخاب کنید </div>

        <div class="text-sm text-gray-800 mt-2"> با تغییر شهر پزشکان شهر مورد نظر برای شما در نظر گرفته می شود </div>

        <div class="w-full flex flex-col items-start justify-center gap-2 mt-4">

          <div v-for="location in locations" :key="location.id" class="w-full flex items-center justify-center text-center border border-gray-800 text-gray-800 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white rounded-lg py-2 px-4 cursor-pointer transition-all duration-300 text-xs gap-1" @click="() => updateLocation(location.id)">

              <b> {{ location.city }} </b>

              <Icon name="ic:outline-check" size="16" class="text-green-500" v-if="location_id === location.id" />

          </div>
        </div>

           
      </div>

    </div>

  </Transition>
</template>
<script lang="ts" setup>

  const authStore = useAuthStore()
  const locationStore = useLocationStore()

  const { authenticated } = storeToRefs(authStore)
  const { location_id, locations, modal } = storeToRefs(locationStore)

  const updateLocation = (id: number) => {

    if( authenticated.value )
      ask.update_user_location(id)
    
    locationStore.setLocationId(id)
    locationStore.hideModal()
  }

</script>