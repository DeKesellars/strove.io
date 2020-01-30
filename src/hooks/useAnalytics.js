import { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'

export default () => {
  console.log('hello')
  const ref = useRef(null)
  useEffect(() => {
    const callback = list => {
      list.getEntries().forEach(entry => {
        if (entry.isIntersecting) {
          ReactGA.event({
            category: 'Rendering',
            variable: entry.name,
            value: entry.startTime,
          })
        }
        console.log('entry.intersectionRatio', entry.startTime)
      })
    }
    const observer = new PerformanceObserver(callback)
    observer.observe({ entryTypes: ['paint'] })
  }, [])

  return ref
}
