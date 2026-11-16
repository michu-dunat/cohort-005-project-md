import { describeDraft, type NoteDraft } from "./lib/draft";

export type { NoteDraft };

/**
 * What the note editor should show for the text in the box, given the body
 * last saved (empty string when the Student has no note yet).
 */
export function describeNoteDraft(
  draft: string,
  savedBody: string | null | undefined
): NoteDraft {
  return describeDraft(draft, savedBody ?? "");
}
