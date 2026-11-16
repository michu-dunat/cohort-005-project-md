import { describe, it, expect } from "vitest";
import { landingHero } from "../index";

type Course = { id: number; title: string };

function hero(
  overrides: Partial<Parameters<typeof landingHero<Course>>[0]> = {}
) {
  return landingHero<Course>({
    totalCourses: 4,
    totalCategories: 5,
    signedIn: false,
    featuredCourses: [],
    ...overrides,
  });
}

describe("landingHero stats", () => {
  it("counts courses and categories, then self-paced access", () => {
    expect(hero().stats).toEqual([
      { value: "4", label: "courses" },
      { value: "5", label: "categories" },
      { value: "24/7", label: "self-paced access" },
    ]);
  });

  it("uses the singular for a count of one", () => {
    expect(hero({ totalCourses: 1, totalCategories: 1 }).stats).toEqual([
      { value: "1", label: "course" },
      { value: "1", label: "category" },
      { value: "24/7", label: "self-paced access" },
    ]);
  });

  it("leaves out a count of zero", () => {
    expect(hero({ totalCourses: 0, totalCategories: 0 }).stats).toEqual([
      { value: "24/7", label: "self-paced access" },
    ]);
  });
});

describe("landingHero secondary action", () => {
  it("invites a signed-out visitor to sign up", () => {
    expect(hero({ signedIn: false }).secondaryAction).toEqual({
      label: "Create a free account",
      to: "/signup",
    });
  });

  it("sends a signed-in visitor to their dashboard", () => {
    expect(hero({ signedIn: true }).secondaryAction).toEqual({
      label: "Go to your dashboard",
      to: "/dashboard",
    });
  });
});

describe("landingHero spotlight", () => {
  it("is the first featured course", () => {
    const first = { id: 1, title: "First" };
    const second = { id: 2, title: "Second" };
    expect(hero({ featuredCourses: [first, second] }).spotlight).toBe(first);
  });

  it("is null when nothing is featured", () => {
    expect(hero({ featuredCourses: [] }).spotlight).toBeNull();
  });
});
