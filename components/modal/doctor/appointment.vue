<template>
  <Transition name="fade">

    <div class="w-screen h-screen fixed top-0 left-0 bg-slate-800/50 flex items-center justify-center z-50 px-4" v-show="props.modal" @click="props.hideModal">
      <div class="w-full lg:w-[740px] flex flex-col items-start justify-center bg-white rounded-lg p-4 text-sm" @click.stop>
      
        <div class="text-base font-bold"> انتخاب زمان نوبت </div>
        
        <div class="w-full flex flex-col items-start justify-center gap-2 mt-4">

          <div class="w-full h-[110px] overflow-hidden">
            
            <div class="w-auto flex flex-row-reverse items-start justify-start overflow-x-scroll px-2 py-2 gap-2 border border-gray-100 rounded-lg"  style="scrollbar-width: thin;">
              <div class="w-[180px] flex-nowrap bg-gray-100 hover:bg-gray-200 px-4 py-4 gap-2 rounded-lg cursor-pointer transition-all" v-for="day in [0,1,2,3,4,5,6,3,4,5,6]" >
                  <div class="text-gray-800 text-base">یک شنبه</div>
                  <div class="text-gray-600 text-xs">10 اسفند</div>
              </div>
              
            </div>

          </div>

          <div class="w-full h-[240px] flex flex-wrap items-start justify-start gap-2 border border-gray-100 rounded-lg py-4 px-2" style="direction: ltr;" >
            
            <div class="w-[68px] flex justify-center items-center bg-gray-100 hover:bg-gray-200 py-3 rounded-lg cursor-pointer transition-all" v-for="time in [0,1,2,3,]" >
              <span class="text-gray-700 text-sm">10:00</span>
            </div>
            
          </div>
    
        </div> 

        <div class="w-full flex items-center justify-end gap-2 mt-4">

          <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 px-6 py-2 gap-2 rounded-lg cursor-pointer transition-all" >
            <span class="text-white text-sm">ثبت نوبت</span>
          </button>

        </div>

      </div>
    </div>

  </Transition>
</template>
<script lang="ts" setup>

import type { Doctor } from '~/models/doctor' 

const props = defineProps({
  modal: { 
    type: Boolean,
    default: false
  },
  hideModal: { 
    type: Function as PropType<(event: MouseEvent) => void>,
    default: () => {}
  },
  doctor: { 
    type: Object as PropType<Doctor>,
    default: () => ({})
  },
})

</script>