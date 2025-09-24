---
marp: true
theme: gaia
author: Pavel Kepka
footer: Ataccama FE Meetup
---
# <!-- fit -->Effect on Frontend?

## Pavel Kepka

---

# <!-- fit -->What is Effect?

---

## Application Framework

- Requirements Management
- Observability
- Configuration
- Scheduling
- Concurrency
- ...

---

## Standard Library

- BigDecimal
- Duration
- DateTime
- Either & Option
- ...

---

## Language

- Opinionated way to write code
- Exhaustive Pattern Matching
- Compositional patterns: generators & piping
- Functions decoloration

---

## This is Effect

```TypeScript
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
```

---
## This is Effect

```
         ┌─── Represents the success type
         │        ┌─── Represents the error type
         │        │      ┌─── Represents required dependencies
         ▼        ▼      ▼
Effect<Success, Error, Requirements>
```

---

# <!-- fit -->But how to use Effect on FE?

---

## A reactive state management library for Effect

### @effect-atom/atom-react

---

## Thank You!

### Resources

- @effect-atom/atom-react: https://github.com/tim-smart/effect-atom
- Effect: https://effect.website/
- @effect/platform: https://github.com/Effect-TS/effect/tree/main/packages/platform
