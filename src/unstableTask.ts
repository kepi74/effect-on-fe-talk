import { Effect, Schedule } from 'effect'

let attempt = 0

const unstableTask = Effect.gen(function* () {
  attempt += 1
  yield* Effect.log(`Attempt ${attempt}`)

  if (attempt < 3) {
    return yield* Effect.fail(new Error('Task failed'))
  }
  return yield* Effect.succeed('Task succeeded')
}).pipe(Effect.withLogSpan('unstableTask'))

Effect.runPromise(Effect.retry(unstableTask, Schedule.fixed('600 millis')))
  .then(console.log)
  .catch(console.error)
