import { BookOpen, User } from "lucide-react";

export function CourseInstructor({ name }: { name: string | null }) {
  return (
    <span className="flex items-center gap-1">
      <User className="size-3" />
      {name ?? "Instructor"}
    </span>
  );
}

export function CourseLessonCount({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-1">
      <BookOpen className="size-3" />
      {count} lessons
    </span>
  );
}
