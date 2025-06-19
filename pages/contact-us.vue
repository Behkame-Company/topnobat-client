<template>
    <div class="w-full flex flex-col items-center justify-start px-2 lg:px-64 pb-12" style="min-height: calc(100vh - 112px);">
        
        <div class="w-full flex flex-col items-center justify-start mt-4 px-4 py-4 bg-white rounded-lg">
            
            <div class="w-full text-gray-800 text-base font-bold border-b border-gray-200 pb-4 mb-4">
                تماس با ما
            </div>

            <div class="w-full flex flex-col-reverse lg:flex-row  justify-between items-start text-gray-800 text-sm" style="line-height: 2rem;">

                <div class="w-full lg:w-2/3 pe-4">
                    
                    <div> ما در تاپ نوبت همواره آماده شنیدن نظرات، پیشنهادات و انتقادات شما هستیم. تیم پشتیبانی ما به صورت شبانه روزی پاسخگوی سوالات و مشکلات احتمالی شما خواهد بود. </div>

                    <div> برای ارتباط با ما می‌توانید از طریق شماره تماس یا ایمیل زیر اقدام نمایید. همکاران ما در اسرع وقت به پیام شما رسیدگی خواهند کرد. </div>
                        
                    <div> همچنین در صورت تمایل به همکاری با تاپ نوبت، می‌توانید رزومه خود را از طریق ایمیل برای ما ارسال کنید. </div>

                    <ul>
                        <li>
                            شماره تماس:
                            <a href="tel:+989123456789">09123456789</a>
                        </li>
                        <li>
                            ایمیل:
                            <a href="mailto:info@topnotbat.com">info@topnotbat.ir</a>
                        </li>
                    </ul>

                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full lg:w-1/3 px-8 pt-4 pb-8 text-indigo-500">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>

            </div>

        </div>
      
    </div>
</template> 

<script setup lang="ts">

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت | تماس با ما`,
})

</script>