import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraft = {
  length: number;
  maxLength: number;
  tooLong: boolean;
  unsaved: boolean;
  canSave: boolean;
};

export function describeDraft(draft: string, savedBody: string): NoteDraft {
  // The server trims before checking and storing, so count and compare what
  // it will see: trailing whitespace is neither a change nor over the limit.
  const toStore = draft.trim();
  const tooLong = toStore.length > MAX_NOTE_LENGTH;
  const unsaved = toStore !== savedBody;

  return {
    length: toStore.length,
    maxLength: MAX_NOTE_LENGTH,
    tooLong,
    unsaved,
    // The server rejects an empty note, so an empty draft is never saveable.
    canSave: unsaved && toStore.length > 0 && !tooLong,
  };
}
