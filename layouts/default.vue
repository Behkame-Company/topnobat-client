<template>
    
    <div class="w-full flex flex-col items-center justify-center">

        <MasterHeader />

        <MasterBody>
            <slot />
        </MasterBody>
        
        <MasterFooter />
        
        <ModalAuth />

        <ModalLocation />

    </div>

</template>