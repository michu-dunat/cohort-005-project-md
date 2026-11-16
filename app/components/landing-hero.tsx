import { Link } from "react-router";
import { ArrowRight, BookOpen, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CourseImage } from "~/components/course-image";
import type { Hero, HeroStat } from "~/modules/landing";

export type SpotlightCourse = {
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string | null;
  instructorName: string | null;
  categoryName: string | null;
  lessonCount: number;
};

export function LandingHero({ hero }: { hero: Hero<SpotlightCourse> }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Courses for developers, by developers
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Learn to code,
            <br />
            <span className="text-muted-foreground">at your own pace</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Structured courses built by experienced instructors. Track your
            progress, take quizzes, and build real-world skills.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/courses">
                Browse Courses
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={hero.secondaryAction.to}>
                {hero.secondaryAction.label}
              </Link>
            </Button>
          </div>
          <HeroStats stats={hero.stats} />
        </div>
        {hero.spotlight && <Spotlight course={hero.spotlight} />}
      </div>
    </section>
  );
}

function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="text-sm text-muted-foreground">{stat.label}</dt>
          <dd className="text-3xl font-bold tracking-tight">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Spotlight({ course }: { course: SpotlightCourse }) {
  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl border border-border bg-muted"
      />
      <Link
        to={`/courses/${course.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-shadow hover:shadow-2xl"
      >
        <CourseImage
          src={course.coverImageUrl}
          alt={course.title}
          className="aspect-video w-full object-cover"
        />
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Newest course
            {course.categoryName ? ` · ${course.categoryName}` : ""}
          </p>
          <h2 className="mt-2 text-xl font-semibold group-hover:text-primary">
            {course.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="size-3" />
              {course.instructorName ?? "Instructor"}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="size-3" />
              {course.lessonCount} lessons
            </span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              Start learning
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
