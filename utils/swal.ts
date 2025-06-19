export const swal = {
    
    default: (options: {
        title: string,
        text: string,
        icon: "error" | "success"
    }) => {

        const { $swal } = useNuxtApp()

        // @ts-ignore
        return $swal.fire({ 
            confirmButtonText: "متوجه شدم",
            ...options 
        })
    },

    error: (title: string, text: string) => {

        return swal.default({ title, text, icon: "error" })
    },

    warn: (title: string, text: string) => {

        return swal.default({ title, text, icon: "warn" })
    },

    success: (title: string, text: string) => {

        return swal.default({ title, text, icon: "success" })
    },
}
