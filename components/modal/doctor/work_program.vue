<template>
  <Transition name="fade">

    <div class="w-screen h-screen fixed top-0 left-0 bg-slate-800/50 flex items-center justify-center z-50" v-show="props.modal" @click="props.hideModal">
      
        <div class="w-[420px] flex flex-col items-start justify-center bg-white rounded-lg p-4 text-sm" @click.stop>
        
            <div class="text-base font-bold"> برنامه کاری پزشک  </div>

            <div class="w-full flex flex-col items-start justify-center gap-2 mt-4">

                <table class="w-full text-gray-800">
                    <tbody>
                        <tr v-for="(time, day) of doctor.work_plans">
                            <td class="border border-gray-200 px-3 py-2 text-start"> {{ dayNumberToPersian(day) }} </td>
                            <td class="border border-gray-200 px-3 py-2 text-end"> {{ time }} </td>
                        </tr>
                    </tbody>
                </table>
        
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

const dayNumberToPersian = (day: number) => ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'][day]

</script>