import { getTemperature } from './weather.effect'
import { Atom, useAtomValue, Result } from '@effect-atom/atom-react'
import { BrowserHttpClient } from '@effect/platform-browser'
import { Cause } from 'effect'

Atom.runtime.addGlobalLayer(BrowserHttpClient.layerXMLHttpRequest)

const weatherAtom = Atom.make(getTemperature)

export const Weather = () => {
  const result = useAtomValue(weatherAtom)

  return Result.match(result, {
    onInitial: () => <div>Loading...</div>,
    onFailure: (error) => <div>Error: {Cause.pretty(error.cause)}</div>,
    onSuccess: (data) => (
      <div>
        Temperature: {data.value.current_weather.temperature} {data.value.current_weather_units.temperature}
      </div>
    ),
  })
}
