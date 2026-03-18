import { useState, useEffect, useRef } from 'react'

export function useTyping(phrases, { typeSpeed = 80, deleteSpeed = 40, pause = 2200 } = {}) {
  const [display, setDisplay] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const phraseIdx = useRef(0)
  const charIdx = useRef(0)

  useEffect(() => {
    if (!phrases.length) return
    let timeout

    const tick = () => {
      const current = phrases[phraseIdx.current]

      if (!isDeleting) {
        setDisplay(current.substring(0, charIdx.current + 1))
        charIdx.current++
        if (charIdx.current > current.length) {
          setIsDeleting(true)
          timeout = setTimeout(tick, pause)
          return
        }
      } else {
        setDisplay(current.substring(0, charIdx.current - 1))
        charIdx.current--
        if (charIdx.current <= 0) {
          setIsDeleting(false)
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length
          timeout = setTimeout(tick, 400)
          return
        }
      }

      timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
    }

    timeout = setTimeout(tick, 300)
    return () => clearTimeout(timeout)
  }, [isDeleting, phrases, pause, typeSpeed, deleteSpeed])

  return display
}
