import React, { useState, useEffect, useRef } from 'react'

const MAP_RIGHT_ANSWERS = {
  'A':0,
  'B':1, 
  'C':2, 
  'D':3
}

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.prompt, flashcard.right_answer, flashcard.answers])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.prompt}
        <div>
          {flashcard.answers.map(answer => {
            return <div key={answer}>{answer}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answers[MAP_RIGHT_ANSWERS[flashcard.right_answer]]}</div>
    </div>
  )
}