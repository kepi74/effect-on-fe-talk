import { Effect, Schema } from 'effect'
import { FetchHttpClient, HttpClient, HttpClientRequest, HttpClientResponse } from '@effect/platform'

const WeatherResponseSchema = Schema.Struct({
  latitude: Schema.Number,
  longitude: Schema.Number,
  generationtime_ms: Schema.Number,
  utc_offset_seconds: Schema.Number,
  timezone: Schema.String,
  timezone_abbreviation: Schema.String,
  elevation: Schema.Number,
  current_weather_units: Schema.Struct({
    time: Schema.String,
    interval: Schema.String,
    temperature: Schema.String,
  }),
  current_weather: Schema.Struct({
    time: Schema.String,
    interval: Schema.Number,
    temperature: Schema.Number,
  }),
})

export const getTemperature = Effect.gen(function* () {
  const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk)

  return yield* HttpClientRequest.get('/public/weather.json').pipe(
    client.execute,
    Effect.flatMap(HttpClientResponse.schemaBodyJson(WeatherResponseSchema)),
  )
}).pipe(Effect.provide(FetchHttpClient.layer))
