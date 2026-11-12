import { describe, it, expect, beforeEach } from "vitest";
import { createTestDb, seedBaseData } from "~/test/setup";
import * as schema from "~/db/schema";
import { getNote, listNotes, saveNote } from "./notes.server";

type TestDb = ReturnType<typeof createTestDb>;

const NOW = new Date(2026, 9, 6, 12, 0, 0);

function minutesLater(minutes: number) {
  return new Date(NOW.getTime() + minutes * 60_000);
}

let db: TestDb;
let base: ReturnType<typeof seedBaseData>;
let lessonIds: number[];

beforeEach(() => {
  db = createTestDb();
  base = seedBaseData(db);

  const module = db
    .insert(schema.modules)
    .values({ courseId: base.course.id, title: "Basics", position: 1 })
    .returning()
    .get();

  lessonIds = [1, 2].map(
    (position) =>
      db
        .insert(schema.lessons)
        .values({ moduleId: module.id, title: `Lesson ${position}`, position })
        .returning()
        .get().id
  );
});

describe("saving a Note", () => {
  it("creates a Note with the body trimmed", () => {
    const result = saveNote(
      db,
      base.user.id,
      lessonIds[0],
      "  # not a heading  ",
      NOW
    );

    expect(result).toMatchObject({
      ok: true,
      note: {
        body: "# not a heading",
        createdAt: NOW.toISOString(),
        updatedAt: NOW.toISOString(),
      },
    });
  });

  it("replaces the body and moves the last-edited time on when saved again", () => {
    saveNote(db, base.user.id, lessonIds[0], "First draft", NOW);
    saveNote(db, base.user.id, lessonIds[0], "Second draft", minutesLater(5));

    expect(getNote(db, base.user.id, lessonIds[0])).toMatchObject({
      body: "Second draft",
      createdAt: NOW.toISOString(),
      updatedAt: minutesLater(5).toISOString(),
    });
    expect(listNotes(db, base.user.id)).toHaveLength(1);
  });

  it("accepts a Note of exactly 2,000 characters", () => {
    expect(
      saveNote(db, base.user.id, lessonIds[0], "a".repeat(2000), NOW).ok
    ).toBe(true);
  });

  it("refuses a Note over 2,000 characters", () => {
    expect(
      saveNote(db, base.user.id, lessonIds[0], "a".repeat(2001), NOW)
    ).toEqual({
      ok: false,
      error: "Note must be 2,000 characters or fewer",
    });
    expect(getNote(db, base.user.id, lessonIds[0])).toBeUndefined();
  });

  it("refuses an empty Note", () => {
    expect(saveNote(db, base.user.id, lessonIds[0], "   ", NOW)).toEqual({
      ok: false,
      error: "Note cannot be empty",
    });
  });

  it("never leaves a Student with two Notes on one Lesson", () => {
    saveNote(db, base.user.id, lessonIds[0], "Mine", NOW);

    expect(() =>
      db
        .insert(schema.notes)
        .values({ userId: base.user.id, lessonId: lessonIds[0], body: "Dup" })
        .run()
    ).toThrow();
  });
});

describe("listing Notes", () => {
  it("lists only the Student's own Notes, last edited first, with Lesson and Course", () => {
    saveNote(db, base.user.id, lessonIds[0], "Older", NOW);
    saveNote(db, base.user.id, lessonIds[1], "Newer", minutesLater(5));
    saveNote(
      db,
      base.instructor.id,
      lessonIds[0],
      "Someone else's",
      minutesLater(10)
    );

    expect(listNotes(db, base.user.id)).toEqual([
      expect.objectContaining({
        body: "Newer",
        lessonId: lessonIds[1],
        lessonTitle: "Lesson 2",
        courseTitle: "Test Course",
        courseSlug: "test-course",
      }),
      expect.objectContaining({ body: "Older", lessonId: lessonIds[0] }),
    ]);
  });

  it("puts a re-saved Note back at the top", () => {
    saveNote(db, base.user.id, lessonIds[0], "First", NOW);
    saveNote(db, base.user.id, lessonIds[1], "Second", minutesLater(5));
    saveNote(db, base.user.id, lessonIds[0], "First, edited", minutesLater(10));

    expect(listNotes(db, base.user.id).map((n) => n.body)).toEqual([
      "First, edited",
      "Second",
    ]);
  });
});
