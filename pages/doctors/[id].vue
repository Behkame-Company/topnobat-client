<template>

    <div class="w-full flex flex-col lg:flex-row items-start justify-center pb-12 px-2 lg:px-64 gap-x-6">
        
        <Transition name="fade">
            <div class="w-full h-[85vh] flex justify-center items-center" v-if="loading">
                <LoadingSpinner size="20" />
            </div>
        </Transition>

        <Transition name="fade">
            <div class="w-full lg:w-3/4 flex flex-col items-center justify-start" v-if="!loading">

                <div class="w-full flex flex-col lg:flex-row items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">

                    <div class="w-24 h-24 rounded-full bg-slate-200" :style="{ backgroundImage: `url(${doctor.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>

                    <div class="flex flex-col items-center lg:items-start justify-start ps-4 gap-5 mt-4 lg:mt-0 text-center lg:text-start">
                        <div class="text-gray-800 text-sm font-bold">{{ name }}</div>
                        <div class="text-gray-800 text-xs">{{ specialties }}</div>
                    </div>


                    <div class="w-full lg:w-auto flex flex-col items-start justify-start ps-4 gap-5 ms-auto mt-4 lg:mt-0">
                        
                        <div class="w-full flex items-center justify-center lg:justify-end">
                            <Icon name="ic:outline-star" size="16" class="text-gray-200" />

                            <Icon name="ic:outline-star" size="16" class="text-yellow-400" />

                            <Icon name="ic:outline-star" size="16" class="text-yellow-400" />

                            <Icon name="ic:outline-star" size="16" class="text-yellow-400" />

                            <Icon name="ic:outline-star" size="16" class="text-yellow-400" />
                        </div>

                        <div class="w-full text-gray-800 text-xs text-center lg:text-start">
                            ثبت نام: 
                            بهمن 1404
                        </div>

                    </div>

                </div>

                <div class="w-full flex flex-col items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">

                    <div class="w-full text-gray-800 text-sm font-bold border-b border-gray-200 pb-4 mb-4">
                        درباره ی 
                        {{ name }}
                    </div>

                    <p class="w-full text-gray-800 text-sm">  
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>

                </div>

            </div>
        </Transition>

        <Transition name="fade">
            <div class="w-full lg:w-1/4 flex flex-col items-center justify-start" v-if="!loading">

                <div class="w-full flex flex-col items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">

                    <div class="w-full text-gray-800 text-sm font-bold border-b border-gray-200 pb-4 mb-4">
                        نوبت اینترنتی و مراجعه حضوری
                    </div>

                    <div class="w-full text-gray-800 text-sm">
                        <div>امکان دریافت زودترین نوبت</div>
                        <div>دریافت نوبت در زمان مناسب برای شما</div>           
                    </div>
                    
                    <button class="w-full flex justify-center items-center rounded-md bg-indigo-500 hover:bg-indigo-600 py-1.5 px-4 text-center text-white transition-all duration-300 text-sm mt-4" @click="showAppointmentModel"> دریافت نوبت</button>

                </div>
                
                <div class="w-full flex flex-col items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">

                    <div class="w-full text-gray-800 text-sm font-bold border-b border-gray-200 pb-4 mb-4">
                        آدرس و شماره تماس
                    </div>

                    <div class="w-full flex flex-col items-center justify-start">

                        <div class="w-full flex items-center justify-start gap-2 text-gray-800 text-sm" v-for="address of addresses">
                            <div class="flex items-center justify-start gap-2">
                                <Icon name="ic:outline-location-on" size="18" class="text-gray-800" />
                                {{ address }}
                            </div>
                        </div>
                        
                        <a v-for="phone_number of phone_numbers" href="tel:{{ phone_number }}" class="w-full flex items-center justify-center gap-2 mt-4 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-md py-2.5 px-4 text-xs transition-all duration-300 cursor-pointer">
                            <Icon name="ic:outline-phone" size="16" />
                            <div>{{ phone_number }}</div>
                        </a>
                        
                        <div class="w-full flex items-center justify-center gap-2 mt-4 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-md py-2.5 px-4 text-xs transition-all duration-300 cursor-pointer" @click="showWorkProgramModel">
                            <Icon name="ic:outline-calendar-month" size="16" />
                            <div>برنامه کاری</div>
                        </div>

                    </div>
                </div>

            </div>
        </Transition>

        <ModalDoctorWorkProgram :modal="work_program_model" :hideModal="hideWorkProgramModel" :doctor="doctor" />
        
        <ModalDoctorAppointment :modal="appointment_model" :hideModal="hideAppointmentModel" :doctor="doctor" />
    
    </div>

</template> 
<script setup lang="ts">
import type { Doctor } from '~/models/doctor'

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت | پزشک`,
})

const id = computed(() => useRoute().params.id)

const loading = ref<boolean>(true)

const doctor = ref<Doctor>({} as Doctor)

const work_program_model = ref<boolean>(false)

const appointment_model = ref<boolean>(false)

const fetchDoctor = async () => {

    loading.value = true
    ask.get_doctor(Number(id.value))
        .then((data) => doctor.value = data )
        .finally(() => loading.value = false)
}

onMounted(() => fetchDoctor())

const name = computed(() => {

    if( loading.value ) 
        return ""

    return doctor.value.first_name + " " + doctor.value.last_name
})

const specialties = computed<string>(() => {

    if( loading.value ) 
        return ""

    return doctor.value.specialties.map(specialty => specialty.name).join(', ')
})

const addresses = computed<string[]>(() => {

    if( loading.value ) 
        return []

    return doctor.value.addresses
})

const phone_numbers = computed<string[]>(() => {

    if( loading.value ) 
        return []

    return doctor.value.phone_numbers
})

const hideWorkProgramModel = () => work_program_model.value = false

const hideAppointmentModel = () => appointment_model.value = false

const showWorkProgramModel = () => work_program_model.value = true

const showAppointmentModel = () => appointment_model.value = true

</script>