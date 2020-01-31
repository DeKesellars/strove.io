import { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'

export default () => {
  const ref = useRef(null)
  useEffect(() => {
    const measurePerformance = performanceEntries => {
      performanceEntries.getEntries().forEach(entry => {
        console.log(
          'entry',
          entry,
          'entry.isIntersecting',
          entry.isIntersecting
        )
        if (entry.isIntersecting) {
          ReactGA.event({
            category: 'Load Performace',
            variable: 'Paint time',
            value: entry.startTime,
          })
          console.log(
            'Paint',
            'entry.intersectionRatio',
            entry.startTime,
            'entry.name',
            entry.name
          )

          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Server Latency',
            value: entry.responseStart - entry.requestStart,
          })
          console.log(
            'Server Latency',
            entry.responseStart - entry.requestStart
          )

          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Download time',
            value: entry.responseEnd - entry.responseStart,
          })
          console.log('Download time', entry.responseEnd - entry.responseStart)

          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Total load time',
            value: entry.responseEnd - entry.requestStart,
          })
          console.log('Total load time', entry.responseEnd - entry.requestStart)
        }
      })
    }
    const observer = new PerformanceObserver(measurePerformance)
    /* https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming */
    observer.observe({ entryTypes: ['paint', 'navigation'] })
  }, [])

  return ref
}
