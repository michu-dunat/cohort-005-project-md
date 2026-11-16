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

function countStat(count: number, singular: string, plural: string): HeroStat {
  return { value: String(count), label: count === 1 ? singular : plural };
}

export function buildHero<Course>(input: HeroInput<Course>): Hero<Course> {
  const counts = [
    { count: input.totalCourses, singular: "course", plural: "courses" },
    {
      count: input.totalCategories,
      singular: "category",
      plural: "categories",
    },
  ]
    .filter(({ count }) => count > 0)
    .map(({ count, singular, plural }) => countStat(count, singular, plural));

  return {
    stats: [...counts, { value: "24/7", label: "self-paced access" }],
    secondaryAction: input.signedIn
      ? { label: "Go to your dashboard", to: "/dashboard" }
      : { label: "Create a free account", to: "/signup" },
    spotlight: input.featuredCourses[0] ?? null,
  };
}
