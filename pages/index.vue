<template>
    <div class="w-full flex flex-col items-center justify-center pb-12" style="min-height: calc(100vh - 112px);">
        
        <Transition name="fade"> 

            <div class="w-full flex flex-col items-center justify-center" v-if="step === 1">

                <ClientOnly>
                    <Vue3Lottie
                        :animationData="robotAnimation"
                        :height="200"
                        :width="200"
                        :speed="1"
                        :loop="true"
                        :autoPlay="true"
                    />
                </ClientOnly>
            
                <div class="w-full text-gray-800 text-base mt-6 mb-2 px-4 text-center"> {{ firstText }} </div>
        
                <div class="w-full text-gray-800 text-base mb-4 px-4 text-center"> {{ secondText }} </div>
                    
                <input :disabled="loading" type="text" v-model="inputText" class="w-[300px] lg:w-[460px] h-[40px] rounded-lg border border-slate-200 py-2 px-4 text-center text-gray-800 text-sm" placeholder="برای مثال: گلوم درد میکنه ..." maxLength="255" />
        
                <button :disabled="loading" @click="sendData" class="w-[144px] flex justify-center items-center rounded-lg bg-indigo-500 hover:bg-indigo-600 border border-slate-200 px-4 py-2 text-center text-white transition-all duration-300 text-sm mt-4">
                    
                    <LoadingSpinner v-if="loading" size="16" class="my-1" />
        
                    <span v-else>ارسال</span>
        
                </button>

            </div>

        </Transition>

        <div class="w-4/5 lg:w-[600px] flex flex-col justify-center items-center" v-if="step === 2">
                
            <LoadingSpinner v-if="loading" size="20" class="my-1 border-slate-500" />

            <Transition name="fade">

                <div class="w-full flex flex-col justify-center items-center" v-if="!loading">

                    <div class="w-full bg-white rounded-lg text-sm text-start py-4 px-4 mt-4 mb-2 text-gray-800" style="direction: ltr;" v-if="thinking">
                        Thinking:
                        {{ thinking }}
                    </div>

                    <div class="w-full bg-white rounded-lg text-sm text-start py-4 px-4 mt-4 mb-2 text-gray-800" v-if="result">{{ result }}</div>

                    <TransitionGroup name="fade">

                        <div class="w-full flex flex-col justify-center items-start mt-3" v-if="oldestDoctor" >
                            <div class="text-sm text-gray-800 font-bold mb-2">سابقه دار ترین</div>
                            <DoctorSuggestion :doctor="oldestDoctor" />
                        </div>

                        <div class="w-full flex flex-col justify-center items-start mt-3" v-if="topDoctor" >
                            <div class="text-sm text-gray-800 font-bold mb-2">محبوب ترین</div>
                            <DoctorSuggestion :doctor="topDoctor" />
                        </div>

                        <div class="w-full flex flex-col justify-center items-start mt-3" v-if="nearestDoctor" >
                            <div class="text-sm text-gray-800 font-bold mb-2">نزدیک ترین</div>
                            <DoctorSuggestion :doctor="nearestDoctor" />
                        </div>

                    </TransitionGroup>

                    <Transition name="fade">
                        <button v-if="!loading" class="w-[144px] flex justify-center items-center rounded-lg bg-slate-500 hover:bg-slate-600 border border-slate-200 px-4 py-2 text-center text-white transition-all duration-300 text-sm mt-4" @click="resetResult">
                            <span>بازگشت</span>
                        </button>
                    </Transition>

                </div>

            </Transition>

        </div>
        
    </div>
</template> 

<script setup lang="ts">
import robotAnimation from '~/assets/lottie/robot.json'
import { useTypingEffect } from '~/composables/useTypingEffect'
import type { Doctor } from '~/models/doctor'

const { displayText: firstText } = useTypingEffect('سلام من ربات تاپ نوبت هستم', 25, 0)
const { displayText: secondText } = useTypingEffect('توی باکس زیر میتونی علایم بیماری ات رو بنویسی تا من برات بهترین دکتر رو برای مراجعه پیدا کنم', 25, 650)

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت`,
})

const inputText = ref<string>('') 
const loading = ref<boolean>(false)
const step = ref<number>(2)
const topDoctor = ref<Doctor>() 
const nearestDoctor = ref<Doctor>() 
const oldestDoctor = ref<Doctor>() 
const thinking = ref<string>('')
const result = ref<string>('')

const sendData = async () => {
    loading.value = true
    step.value = 2

    const response = await fetch("https://topnobat.ir/api/index", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: inputText.value })
    })

    if (!response.body)
        return

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false
    let buffer = ''
    let specialtyId: number | null = null
    let fullResponse = ''

    while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        if (value) {
            const chunkText = decoder.decode(value);
            buffer += chunkText 
            
            const lines = buffer.split('\n')
            buffer = lines.pop() || '' 

            for (const line of lines) {
                if (line.includes('data: ')) {
                    try {
                        const json = JSON.parse(line.replace('data: ', ''))
                        const temp = JSON.parse(json.text)
                        fullResponse += temp.response
                    } catch (error) {
                        console.warn('Skipping malformed JSON:', line)
                        continue
                    }
                }
            }
        }
    } 

    // Extract thinking text between <think> tags
    const thinkMatch = fullResponse.match(/<think>([\s\S]*?)<\/think>/)
    if (thinkMatch) {
        thinking.value = thinkMatch[1].trim()
        // Remove the thinking part from the full response
        fullResponse = fullResponse.replace(/<think>[\s\S]*?<\/think>/, '').trim()
    }

    // Extract specialty ID if present
    const match = fullResponse.match(/\[(-?\d+)\]/)
    if (match) {
        specialtyId = parseInt(match[1])
        // Remove the specialty ID from the result text
        fullResponse = fullResponse.replace(/\[-?\d+\]/, '').trim()
    }

    // Set the final result
    result.value = fullResponse
 
    loading.value = false 
    
    console.log('Thinking:', thinking.value)
    console.log('Result:', result.value)
    console.log('Specialty ID:', specialtyId)

    if( specialtyId == -1 ) {

        swal.warn("خطا", "متاسفانه با متن وارد شده ما نتوانستیم بهترین دکتر رو برای شما پیدا کنیم")

    } else if (specialtyId && specialtyId > 0) {
        ask.get_recommended_doctors(specialtyId)
            .then((doctors) => {
                
                if( doctors.top_doctor )
                    topDoctor.value = doctors.top_doctor

                if( doctors.nearest_doc )
                    nearestDoctor.value = doctors.nearest_doc

                if( doctors.oldest_doctor )
                    oldestDoctor.value = doctors.oldest_doctor

            })
            .catch((error) => console.error('Error fetching recommended doctors:', error))
    }
}

const resetResult = () => {
    
    step.value = 1
    thinking.value = ''
    result.value = ''
    topDoctor.value = undefined
    nearestDoctor.value = undefined
    oldestDoctor.value = undefined
}

onMounted(async () => {
    
    resetResult()
})
 
</script>