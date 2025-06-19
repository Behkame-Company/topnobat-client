<template>
  <Transition name="fade">

    <div class="w-screen h-screen fixed top-0 left-0 bg-slate-800/50 flex items-center justify-center z-50 px-4" v-show="modal" @click="authStore.hideModal()">

      <div class="w-full lg:w-[420px] flex flex-col items-start justify-center bg-white rounded-lg p-4 text-sm" @click.stop>
      
        <div class="text-base font-bold"> ورود / ثبت نام </div>

        <template v-if="step == 1">

          <div class="text-sm mt-2"> لطفا شماره موبايل خود را وارد کنيد </div>
  
          <input type="text" class="w-full rounded-lg border border-slate-200 py-2 px-4 text-start text-gray-800 text-sm mt-4 focus:border-indigo-400" placeholder="09" style="direction: ltr;" :disabled="loading" v-model="phone" /> 
  
          <button class="w-full flex justify-center items-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 text-sm mt-4" @click="sendCode"  :disabled="loading"> 
          
              <LoadingSpinner v-if="loading" size="16" />
  
              <span v-else> ادامه </span>
  
          </button>
  
          <div class="w-full text-xs text-gray-800 mt-4 text-center">ورود شما به معنای پذیرش شرایط تاپ نوبت و قوانین حریم‌خصوصی است</div>

        </template>

        <template v-if="step == 2">

          <div class="text-sm mt-2"> لطفا کد ارسال شده به شماره {{ phone }} را وارد کنید.
          </div>
  
          <input type="text" class="w-full rounded-lg border border-slate-200 py-2 px-4 text-start text-gray-800 text-sm mt-4 focus:border-indigo-400" placeholder="x x x x x x" style="direction: ltr;" :disabled="loading" v-model="code" /> 
  
          <div class="w-full d-flex justify-center items-center text-sm text-indigo-600 mt-6 text-center cursor-pointer" @click="editPhone">
            ویرایش شماره موبایل
            {{ phone }}
          </div>

          <button class="w-full flex justify-center items-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 text-sm mt-6" @click="verifyCode"  :disabled="loading"> 
          
              <LoadingSpinner v-if="loading" size="16" />
  
              <span v-else> ورود </span>
  
          </button>
  
        </template>


      </div>

    </div>

  </Transition>
</template>
<script lang="ts" setup>

  const authStore = useAuthStore()
  const router = useRouter()
  const { modal } = storeToRefs(authStore)

  const phone = ref<string>('')
  const code = ref<string>('')
  const loading = ref<boolean>(false)
  const step = ref<number>(1)

  const sendCode = () => {

    loading.value = true
    authStore.setPhone(phone.value)
    authStore.sendCode()
      .then( () => step.value = 2 )
      .finally(() => loading.value = false)
  }

  const editPhone = () => step.value = 1

  const verifyCode = () => {

    loading.value = true
    authStore.setCode(code.value)
    authStore.verifyCode()
      .then( () => {
        swal.success("ورود به حساب کاربری", "شما با موفقیت وارد حساب کاربری خود شدید")
        authStore.hideModal()
        router.push('/profile')
      })
      .finally(() => loading.value = false)
  }

</script>