export type HeroStat = { value: string; label: string };

export type HeroAction = { label: string; to: string };

export type HeroInput<Course> = {
  totalCourses: number;
  totalCategories: number;
  signedIn: boolean;
  featuredCourses: readonly Course[];
};

export type Hero<Course> = {
  stats: HeroStat[];
  secondaryAction: HeroAction;
  spotlight: Course | null;
};

function countStat(count: number, singular: string, plural: string) {
  return { value: String(count), label: count === 1 ? singular : plural };
}

export function buildHero<Course>(input: HeroInput<Course>): Hero<Course> {
  const counts = [
    countStat(input.totalCourses, "course", "courses"),
    countStat(input.totalCategories, "category", "categories"),
  ].filter((stat) => stat.value !== "0");

  return {
    stats: [...counts, { value: "24/7", label: "self-paced access" }],
    secondaryAction: input.signedIn
      ? { label: "Go to your dashboard", to: "/dashboard" }
      : { label: "Create a free account", to: "/signup" },
    spotlight: input.featuredCourses[0] ?? null,
  };
}
