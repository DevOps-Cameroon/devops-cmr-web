import { useEffect, useState } from 'react'

const BOOT_LINES = [
  { prompt: 'guest@devopscameroon:~$ ', command: 'ssh devops-cameroon@community', cls: '' },
  { text: 'Connecting to relay... done', cls: 'dim' },
  { text: 'Authenticating guest session... done', cls: 'dim' },
  { text: 'Loading modules: docker terraform kubernetes ansible ci/cd', cls: 'dim' },
  { text: '[OK] modules loaded.......', cls: 'ok' },
]

export default function BootOverlay() {
  const [renderedLines, setRenderedLines] = useState([])
  const [typingLine, setTypingLine] = useState('')
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setRenderedLines(
        BOOT_LINES.map((line) =>
          line.command ? `${line.prompt}${line.command}` : line.text,
        ),
      )
      setFinished(true)
      return
    }

    const timers = []
    let lineIndex = 0
    let charIndex = 0

    const typeChar = () => {
      const currentLine = BOOT_LINES[lineIndex]
      if (!currentLine) {
        setFinished(true)
        return
      }

      if (currentLine.command && charIndex < currentLine.command.length) {
        setTypingLine((prev) => prev + currentLine.command[charIndex])
        charIndex += 1
        timers.push(setTimeout(typeChar, 35))
      } else {
        const completedLine = currentLine.command
          ? `${currentLine.prompt}${currentLine.command}`
          : currentLine.text

        setRenderedLines((prev) => [...prev, completedLine])
        setTypingLine('')

        if (lineIndex === 0) {
          timers.push(
            setTimeout(() => {
              setRenderedLines((prev) => [
                ...prev,
                ...BOOT_LINES.slice(1).map((line) => line.text),
              ])
            }, 260),
          )
          timers.push(setTimeout(() => setFinished(true), 900))
          return
        }

        lineIndex += 1
        charIndex = 0
        timers.push(setTimeout(typeChar, 280))
      }
    }

    timers.push(setTimeout(typeChar, 220))
    return () => timers.forEach(clearTimeout)
  }, [])

  if (finished) {
    return null
  }

  return (
    <div className="boot-overlay" role="status" aria-live="polite">
      <div className="boot-lines">
        {renderedLines.map((line, index) => (
          <div key={index} className={`boot-line ${BOOT_LINES[index]?.cls ?? ''}`}>
            {line}
          </div>
        ))}
        <div className="boot-line">
          <span className="boot-prompt">{BOOT_LINES[0].prompt}</span>
          <span>{typingLine}</span>
          <span className="boot-cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
