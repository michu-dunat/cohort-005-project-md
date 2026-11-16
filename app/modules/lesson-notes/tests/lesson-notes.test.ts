import { describe, it, expect } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("counts the characters against the note limit", () => {
    const draft = describeNoteDraft("hello", null);

    expect(draft.length).toBe(5);
    expect(draft.maxLength).toBe(MAX_NOTE_LENGTH);
  });

  it("lets a new note be saved once it has text", () => {
    expect(describeNoteDraft("first thought", undefined)).toMatchObject({
      unsaved: true,
      empty: false,
      tooLong: false,
      canSave: true,
    });
  });

  it("does not offer to save a draft that matches the saved note", () => {
    expect(describeNoteDraft("same", "same")).toMatchObject({
      unsaved: false,
      canSave: false,
    });
  });

  it("ignores surrounding whitespace the server would trim anyway", () => {
    expect(describeNoteDraft("same\n", "same")).toMatchObject({
      unsaved: false,
      canSave: false,
    });
  });

  it("does not offer to save a blank draft", () => {
    expect(describeNoteDraft("   \n ", "old note")).toMatchObject({
      empty: true,
      unsaved: true,
      canSave: false,
    });
  });

  it("treats no note and an empty box as nothing to save", () => {
    expect(describeNoteDraft("", null)).toMatchObject({
      empty: true,
      unsaved: false,
      canSave: false,
    });
  });

  it("allows a draft exactly at the limit", () => {
    expect(describeNoteDraft("a".repeat(MAX_NOTE_LENGTH), "")).toMatchObject({
      tooLong: false,
      canSave: true,
    });
  });

  it("refuses a draft one character over the limit", () => {
    expect(
      describeNoteDraft("a".repeat(MAX_NOTE_LENGTH + 1), "")
    ).toMatchObject({
      tooLong: true,
      canSave: false,
    });
  });
});
