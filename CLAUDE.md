# Shelf Starter Instructions

Shelf is the starter repository for the **Self-Testing AI Agents** course. It is a real SvelteKit + TypeScript book application, not a generated scaffold.

## What "done" means

A task is not done until these exit zero:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`

Do not report a task complete with any of these failing. If a failure looks unrelated, say so explicitly and link the failing test name in your summary.

## Routes

- Public: `/`, `/login`, `/design-system`, `/playground`
- Protected: `/search`, `/shelf`, `/goals`, `/admin` — gate server-side on `locals.user`, never with client guards
- Do not reintroduce `src/routes/demo/` or any generated starter pages
- New routes must match the Shelf product domain (books, shelves, ratings)

## How tests get written

- Write a failing test before the implementation. Commit the test first.
- Unit tests live next to the file under test as `<name>.test.ts` and run with Vitest.
- End-to-end tests live in `tests/end-to-end/` and run with Playwright.
- The starter Playwright suite is intentionally small. Later course labs add storage state, HAR replay, dossiers, accessibility, and visual coverage.

## Playwright locator rules

- `getByRole` first. `getByLabel` or `getByText` second. `data-testid` only when semantics genuinely don't exist.
- Never use raw CSS or XPath selectors in specs.
- Never use `page.waitForTimeout` or `page.waitForLoadState('networkidle')`. Use `expect(locator).toBeVisible()`, `page.waitForResponse`, or `page.waitForRequest`.
- Do not fix a failing Playwright test by changing the assertion to match broken UI.

## Waiting in Playwright

- Never use `page.waitForTimeout`. There is always a better option.
- Never use `page.waitForLoadState('networkidle')`.
- To wait for a UI change, use `expect(locator).toBeVisible()` or a
  similar assertion. They auto-retry up to the configured timeout.
- Do not use `locator.isVisible()` or similar boolean probes as waits.
  They answer immediately. Use retrying assertions.
- Prefer `locator.fill()` for text entry. Use `pressSequentially()` only
  when the page genuinely depends on real key events.
- To wait for a network call, set up `page.waitForResponse` with a
  URL+method matcher _before_ triggering the action.
- If you need to wait for actionability without acting, use the real
  action with `trial: true` instead of inventing a custom readiness wait.
- Use `expect.poll()` for eventually consistent values. Use `toPass()`
  only when you need to retry a whole assertion block, and set its
  timeout explicitly.
- To wait for clock-driven UI (toasts, timers, "X minutes ago"),
  install `page.clock` at the top of the test and advance it explicitly.
- If you are tempted to add a wait to "fix flakiness," stop. The flakiness
  is a symptom of an assertion not matching the actual end state. Find
  the real end state and assert on it.

## UI copy

- User-facing copy stays about books, shelves, and reading. Do not mention Playwright, seeded fixtures, test IDs, HARs, or course material in rendered page copy.
- Testing rationale and infrastructure details belong in code comments, `CLAUDE.md`, or `README.md`.

## Do not

- Do not silence type errors with `any` or `@ts-expect-error`. Fix the type.
- Do not add `eslint-disable` comments. Fix the code.
- Do not add new dependencies without flagging them in your summary.
- Do not hand-edit generated artifacts or build output.
