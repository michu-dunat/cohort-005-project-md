import { useState } from "react";
import { useFetcher } from "react-router";
import { Lock, NotebookPen } from "lucide-react";
import { LessonPanel } from "~/components/lesson-panel";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatRelativeTime } from "~/lib/utils";
import { describeNoteDraft } from "~/modules/lesson-notes";

export function LessonNote({
  note,
}: {
  note: { body: string; updatedAt: string } | null;
}) {
  const fetcher = useFetcher<{ ok: boolean; error?: string }>();
  const [body, setBody] = useState(note?.body ?? "");
  const draft = describeNoteDraft(body, note?.body);
  const isSaving = fetcher.state !== "idle";
  const error = fetcher.data?.error;

  return (
    <LessonPanel
      icon={NotebookPen}
      title="Your notes"
      description={<PrivacyHint />}
    >
      <fetcher.Form method="post" className="space-y-2">
        <input type="hidden" name="intent" value="save-note" />
        <Textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={4}
          placeholder="Key ideas, questions to come back to, commands to try..."
          aria-label="Your notes"
          className="min-h-24 resize-y"
        />

        <div className="flex items-center gap-3">
          <Button type="submit" size="sm" disabled={isSaving || !draft.canSave}>
            {isSaving ? "Saving..." : "Save note"}
          </Button>

          <NoteStatus
            error={error}
            unsaved={draft.unsaved}
            updatedAt={note?.updatedAt}
          />

          <span
            className={cn(
              "ml-auto text-xs",
              draft.tooLong ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {draft.length} / {draft.maxLength}
          </span>
        </div>
      </fetcher.Form>
    </LessonPanel>
  );
}

function NoteStatus({
  error,
  unsaved,
  updatedAt,
}: {
  error: string | undefined;
  unsaved: boolean;
  updatedAt: string | undefined;
}) {
  if (error) return <span className="text-sm text-destructive">{error}</span>;
  if (unsaved) {
    return (
      <span className="text-xs text-muted-foreground">Unsaved changes</span>
    );
  }
  if (!updatedAt) return null;
  return (
    <span suppressHydrationWarning className="text-xs text-muted-foreground">
      Saved {formatRelativeTime(updatedAt)}
    </span>
  );
}

function PrivacyHint() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Lock className="size-3.5" />
      Private to you. Jot down what you want to remember from this lesson.
    </span>
  );
}
