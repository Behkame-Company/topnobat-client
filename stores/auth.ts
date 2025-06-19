
export const useAuthStore = defineStore('auth', () => {

    const authenticated = ref<boolean>(false)
    const modal = ref<boolean>(false)
    const phone = ref<string>(localStorage.getItem('phone') || '')
    const code = ref<string>('')
    const token = ref<string>(localStorage.getItem('otp_token') || '')
    
    const sendCode = async (): Promise<void> => ask.request_token(phone.value)

    const verifyCode = async (): Promise<void> => {
        try {
            const value = await ask.validate_token(phone.value, code.value)
            token.value = value
            authenticated.value = true
            localStorage.setItem('otp_token', value)
        } catch (error) {
            console.error(error)
        }
    }

    const setPhone = (value: string) => {

        phone.value = value
        localStorage.setItem('phone', value)
    }

    const setCode = (value: string) => code.value = value

    const showModal = () => modal.value = true

    const hideModal = () => modal.value = false

    const logout = () => {

        authenticated.value = false
        token.value = ''
        localStorage.removeItem('otp_token')
        localStorage.removeItem('phone')
    }

    onMounted(() => {
        
        if( token.value )
            authenticated.value = true
    })

    return {
        authenticated,
        modal,
        phone,
        code,
        token,
        
        setPhone, // TODO : store in localstorage 
        setCode,
        showModal,
        hideModal,
        sendCode,
        verifyCode,
        logout,
    }
})