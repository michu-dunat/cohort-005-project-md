import type { Route } from "../../routes/+types/courses.$slug.lessons.$lessonId";

type LessonLoaderData = Route.ComponentProps["loaderData"];

export type LockedLessonData = Extract<LessonLoaderData, { view: "locked" }>;
export type FullLessonData = Extract<LessonLoaderData, { view: "full" }>;
