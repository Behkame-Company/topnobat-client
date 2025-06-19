<template>
    <div class="border-b border-r border-slate-400 rounded-full animate-spin" :style="`width: ${size}px; height: ${size}px;`"></div>
</template>
<script setup lang="ts">

defineProps({
    size: { 
        type: String,
         default: "20"
    },
})

</script>
