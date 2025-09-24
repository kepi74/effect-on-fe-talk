import { Effect, Console } from 'effect'
import { NodeRuntime } from '@effect/platform-node'
import { getTemperature } from './weather.effect.ts'

getTemperature.pipe(Effect.andThen(Console.log), NodeRuntime.runMain)
