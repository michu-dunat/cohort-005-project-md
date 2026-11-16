import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraft = {
  length: number;
  maxLength: number;
  tooLong: boolean;
  empty: boolean;
  unsaved: boolean;
  canSave: boolean;
};

export function describeDraft(draft: string, savedBody: string): NoteDraft {
  const empty = draft.trim().length === 0;
  const tooLong = draft.length > MAX_NOTE_LENGTH;
  // The server trims before storing, so trailing whitespace is not a change.
  const unsaved = draft.trim() !== savedBody;

  return {
    length: draft.length,
    maxLength: MAX_NOTE_LENGTH,
    tooLong,
    empty,
    unsaved,
    // The server rejects an empty note, so an empty draft is never saveable.
    canSave: unsaved && !empty && !tooLong,
  };
}
