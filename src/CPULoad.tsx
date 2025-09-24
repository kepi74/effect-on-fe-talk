import { Atom, useAtomValue } from '@effect-atom/atom-react'

const cpuAtom: Atom.Atom<string> = Atom.make((get) => {
  const cpuCallback = (records: Array<{ state: string }>) => {
    const lastRecord = records[records.length - 1]
    get.setSelf(lastRecord.state)
  }

  // @ts-expect-error PressureObserver is not in lib yet
  const observer = new PressureObserver(cpuCallback)
  observer.observe('cpu', {
    sampleInterval: 100,
  })

  return 'unknown'
})

export const CPULoad = () => {
  const cpuLoad = useAtomValue(cpuAtom)

  return (
    <>
      <h2>CPU Load</h2>
      <div>Current CPU Load: {cpuLoad}</div>
    </>
  )
}
