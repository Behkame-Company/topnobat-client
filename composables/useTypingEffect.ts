import { ref, onMounted } from 'vue'

export const useTypingEffect = (text: string, characterDelay: number = 100, startDelay: number = 0) => {

  const displayText = ref('')
  let currentIndex = 0

  const typeNextChar = () => {
    if (currentIndex < text.length) {
      displayText.value += text[currentIndex]
      currentIndex++
      setTimeout(typeNextChar, characterDelay)
    }
  }

  onMounted(() => {

    setTimeout(typeNextChar, startDelay)
  })

  return {
    displayText
  }
} 