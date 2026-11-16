import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "~/components/ui/card";

/**
 * The frame shared by the lesson page's working panels (notes, discussion),
 * so they read as one family rather than drifting apart one class at a time.
 */
export function LessonPanel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="mb-8 gap-0 p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-primary" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </Card>
  );
}
