<template>
    <div class="w-full flex items-center justify-center px-2 lg:px-64 pb-12 gap-6" style="min-height: calc(100vh - 112px);">
      <LoadingSpinner size="16" />
    </div>
</template> 
<script setup lang="ts">

const authStore = useAuthStore()
const router = useRouter()

definePageMeta({
    layout: 'default'
})

useHead({
    title: `تاپ نوبت | خروج از حساب کاربری`,
})

onMounted(() => {

    authStore.logout()
    router.push('/')
})

</script>