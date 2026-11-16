import { buildHero, type Hero, type HeroInput } from "./lib/hero";

export type { Hero, HeroAction, HeroStat } from "./lib/hero";

/**
 * What the landing page hero shows: the headline stats (a count of zero is
 * left out), the secondary call to action for a signed-in or signed-out
 * visitor, and the course in the spotlight (the first featured course, or
 * null when there is none).
 */
export function landingHero<Course>(input: HeroInput<Course>): Hero<Course> {
  return buildHero(input);
}
