// PROTOTYPE — throwaway. Answers "What should the inbox look and feel like?"
// (wayfinder map "Notifications for Cadence"). Three variants mounted in the real
// app shell, switchable via ?variant=A|B|C. Notifications are fake, in memory,
// and chosen by the current user's role. Nothing is persisted.
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  Bell,
  Inbox,
  Megaphone,
  Check,
  CheckCheck,
  X,
  Receipt,
  UserPlus,
  MessageSquare,
  Star,
  BookOpen,
  Archive,
  AlertTriangle,
  Undo2,
  Armchair,
  Circle,
} from "lucide-react";
import { cn } from "~/lib/utils";

// ─── Fake data ────────────────────────────────────────────────────────────────

export type ProtoNotification = {
  id: string;
  kind: "event" | "announcement";
  icon: keyof typeof ICONS;
  title: string;
  body?: string;
  from?: string; // Announcements: who wrote it
  audience?: string; // Announcements: who it went to
  href: string;
  cta: string;
  ago: string;
  bucket: "Today" | "This week" | "Earlier";
  read: boolean;
};

const ICONS = {
  receipt: Receipt,
  enroll: UserPlus,
  comment: MessageSquare,
  star: Star,
  lesson: BookOpen,
  archive: Archive,
  fail: AlertTriangle,
  refund: Undo2,
  seat: Armchair,
  announce: Megaphone,
};

function n(p: Omit<ProtoNotification, "read"> & { read?: boolean }): ProtoNotification {
  return { read: false, ...p };
}

const platformAnnouncement = n({
  id: "a-platform",
  kind: "announcement",
  icon: "announce",
  title: "Scheduled maintenance on Sunday",
  body: "Cadence will be unavailable on Sunday 15 November between 02:00 and 03:00 UTC while we upgrade our video servers. Your progress is safe.",
  from: "Cadence team (Platform Admin)",
  audience: "Everyone",
  href: "/courses",
  cta: "Open announcement",
  ago: "3h",
  bucket: "Today",
});

function forStudent(isTeamAdmin: boolean): ProtoNotification[] {
  const list = [
    n({
      id: "s1",
      kind: "event",
      icon: "comment",
      title: "Priya replied to your question on “Closures in practice”",
      href: "/courses",
      cta: "View thread",
      ago: "12m",
      bucket: "Today",
    }),
    n({
      id: "s2",
      kind: "announcement",
      icon: "announce",
      title: "Live Q&A this Thursday",
      body: "Hi all, I'm running a live Q&A on Thursday at 18:00 CET for everyone on Advanced TypeScript. Bring your questions about generics. The recording goes up the day after.",
      from: "Matt (Instructor, Advanced TypeScript)",
      audience: "Students on Advanced TypeScript",
      href: "/courses",
      cta: "Go to course",
      ago: "1h",
      bucket: "Today",
    }),
    platformAnnouncement,
    n({
      id: "s3",
      kind: "event",
      icon: "lesson",
      title: "New lesson in Advanced TypeScript: “Variance annotations”",
      href: "/courses",
      cta: "Watch lesson",
      ago: "2d",
      bucket: "This week",
    }),
    n({
      id: "s4",
      kind: "event",
      icon: "refund",
      title: "Your Refund Request for “Intro to Rust” was approved",
      body: "$49.00, the full amount you paid, is on its way back to you.",
      href: "/dashboard",
      cta: "View purchase",
      ago: "3d",
      bucket: "This week",
      read: true,
    }),
    n({
      id: "s5",
      kind: "event",
      icon: "archive",
      title: "“CSS Grid in 2019” has been archived",
      href: "/dashboard",
      cta: "Go to course",
      ago: "2w",
      bucket: "Earlier",
      read: true,
    }),
    n({
      id: "s6",
      kind: "event",
      icon: "receipt",
      title: "You bought Advanced TypeScript",
      body: "$79.00, paid by card.",
      href: "/dashboard",
      cta: "Start course",
      ago: "3w",
      bucket: "Earlier",
      read: true,
    }),
  ];
  if (isTeamAdmin) {
    list.splice(
      1,
      0,
      n({
        id: "t1",
        kind: "event",
        icon: "seat",
        title: "Jonas claimed a Seat on Advanced TypeScript (7 of 10 claimed)",
        href: "/team",
        cta: "View team",
        ago: "40m",
        bucket: "Today",
      }),
      n({
        id: "t2",
        kind: "event",
        icon: "seat",
        title: "Ana claimed a Seat on Advanced TypeScript (6 of 10 claimed)",
        href: "/team",
        cta: "View team",
        ago: "5h",
        bucket: "Today",
      })
    );
  }
  return list;
}

function forInstructor(): ProtoNotification[] {
  return [
    n({
      id: "i1",
      kind: "event",
      icon: "comment",
      title: "Sam asked a question on “Mapped types”",
      body: "“Why does keyof on a union give me never?”",
      href: "/instructor/questions",
      cta: "Answer",
      ago: "5m",
      bucket: "Today",
    }),
    n({
      id: "i2",
      kind: "event",
      icon: "enroll",
      title: "Lena enrolled on Advanced TypeScript",
      href: "/instructor",
      cta: "View Students",
      ago: "20m",
      bucket: "Today",
    }),
    n({
      id: "i3",
      kind: "event",
      icon: "enroll",
      title: "Omar enrolled on Advanced TypeScript (Claimed Seat)",
      href: "/instructor",
      cta: "View Students",
      ago: "1h",
      bucket: "Today",
    }),
    n({
      id: "i4",
      kind: "announcement",
      icon: "announce",
      title: "New payout schedule from December",
      body: "From 1 December, Instructor payouts move from monthly to fortnightly. Nothing to do on your side.",
      from: "Cadence team (Platform Admin)",
      audience: "All Instructors",
      href: "/instructor/analytics",
      cta: "Open analytics",
      ago: "2h",
      bucket: "Today",
    }),
    n({
      id: "i5",
      kind: "event",
      icon: "star",
      title: "Advanced TypeScript got a new 5★ rating",
      href: "/instructor/analytics",
      cta: "View ratings",
      ago: "1d",
      bucket: "This week",
    }),
    n({
      id: "i6",
      kind: "event",
      icon: "refund",
      title: "A Purchase of Advanced TypeScript was refunded",
      href: "/instructor/analytics",
      cta: "View course",
      ago: "4d",
      bucket: "This week",
      read: true,
    }),
    platformAnnouncement,
  ];
}

function forPlatformAdmin(): ProtoNotification[] {
  return [
    n({
      id: "p1",
      kind: "event",
      icon: "refund",
      title: "New Refund Request on Advanced TypeScript needs deciding",
      body: "“The course wasn't what I expected.” — Lena, $79.00",
      href: "/admin/refunds",
      cta: "Decide",
      ago: "8m",
      bucket: "Today",
    }),
    n({
      id: "p2",
      kind: "event",
      icon: "fail",
      title: "A Refund for “Intro to Rust” failed to send",
      body: "The payment provider said: card expired.",
      href: "/admin/refunds",
      cta: "Investigate",
      ago: "2h",
      bucket: "Today",
    }),
    n({
      id: "p3",
      kind: "event",
      icon: "refund",
      title: "New Refund Request on Intro to Rust needs deciding",
      href: "/admin/refunds",
      cta: "Decide",
      ago: "2d",
      bucket: "This week",
      read: true,
    }),
    { ...platformAnnouncement, from: "Kim (Platform Admin)", read: true },
  ];
}

export function useProtoNotifications(role: string | null, isTeamAdmin: boolean) {
  const initial = useMemo(() => {
    if (role === "instructor") return forInstructor();
    if (role === "admin") return forPlatformAdmin();
    return forStudent(isTeamAdmin);
  }, [role, isTeamAdmin]);
  const [items, setItems] = useState(initial);
  const [lastRole, setLastRole] = useState(`${role}:${isTeamAdmin}`);
  if (lastRole !== `${role}:${isTeamAdmin}`) {
    setLastRole(`${role}:${isTeamAdmin}`);
    setItems(initial);
  }
  return {
    items,
    unread: items.filter((i) => !i.read).length,
    markRead: (id: string, read = true) =>
      setItems((xs) => xs.map((x) => (x.id === id ? { ...x, read } : x))),
    markAllRead: (pred: (n: ProtoNotification) => boolean = () => true) =>
      setItems((xs) => xs.map((x) => (pred(x) ? { ...x, read: true } : x))),
    reset: () => setItems(initial),
  };
}

export type Inbox = ReturnType<typeof useProtoNotifications>;

function Icon({ n, className }: { n: ProtoNotification; className?: string }) {
  const C = ICONS[n.icon];
  return <C className={className} />;
}

function Badge({ count, className }: { count: number; className?: string }) {
  if (count === 0) return null;
  return (
    <span
      className={cn(
        "min-w-5 rounded-full bg-red-600 px-1.5 text-center text-[11px] font-bold leading-5 text-white",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ─── Variant A: bell + popover ────────────────────────────────────────────────
// Bell in the sidebar header. One flat, chronological list. Announcements are
// rows like any other, marked with a megaphone and "from". Clicking a row marks
// it read and navigates.

export function VariantABell({ inbox }: { inbox: Inbox }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent"
        title="Notifications"
      >
        <Bell className="size-5" />
        <Badge count={inbox.unread} className="absolute -right-1.5 -top-1" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="fixed left-56 top-2 z-50 ml-2 w-96 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-semibold">Notifications</span>
              <button
                onClick={() => inbox.markAllRead()}
                disabled={inbox.unread === 0}
                className="text-xs font-medium text-primary disabled:opacity-40"
              >
                Mark all as read
              </button>
            </div>
            <ul className="max-h-[70vh] divide-y overflow-y-auto">
              {inbox.items.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => {
                      inbox.markRead(n.id);
                      setOpen(false);
                      navigate(n.href);
                    }}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3 text-left hover:bg-accent",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <Icon
                      n={n}
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        n.kind === "announcement" ? "text-amber-600" : "text-muted-foreground"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      {n.kind === "announcement" && (
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                          Announcement · {n.from}
                        </div>
                      )}
                      <div className={cn("text-sm", !n.read && "font-semibold")}>{n.title}</div>
                      {n.body && (
                        <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</div>
                      )}
                      <div className="mt-1 text-[11px] text-muted-foreground">{n.ago} ago</div>
                    </div>
                    {!n.read && <Circle className="mt-1.5 size-2 shrink-0 fill-primary text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

// ─── Variant B: Inbox page, email-client style ───────────────────────────────
// "Inbox" is a sidebar nav entry with a count. It takes over the main area:
// list on the left with All / Unread / Announcements tabs, a reading pane on
// the right. Opening marks read; you can mark unread again.

export function VariantBNavItem({ inbox }: { inbox: Inbox }) {
  const [params, setParams] = useSearchParams();
  const active = params.get("inbox") === "1";
  return (
    <button
      onClick={() => {
        const p = new URLSearchParams(params);
        active ? p.delete("inbox") : p.set("inbox", "1");
        setParams(p);
      }}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
      )}
    >
      <Inbox className="size-4" />
      Inbox
      <Badge count={inbox.unread} className="ml-auto" />
    </button>
  );
}

export function VariantBPage({ inbox }: { inbox: Inbox }) {
  const [tab, setTab] = useState<"all" | "unread" | "announcements">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const list = inbox.items.filter((n) =>
    tab === "unread" ? !n.read : tab === "announcements" ? n.kind === "announcement" : true
  );
  const selected = inbox.items.find((n) => n.id === selectedId) ?? null;
  return (
    <div className="flex h-full">
      <div className="flex w-[420px] shrink-0 flex-col border-r">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h1 className="text-lg font-bold">Inbox</h1>
          <button
            onClick={() => inbox.markAllRead()}
            className="flex items-center gap-1 text-xs font-medium text-primary"
          >
            <CheckCheck className="size-4" /> Mark all read
          </button>
        </div>
        <div className="flex gap-1 border-b px-3 py-2 text-sm">
          {(["all", "unread", "announcements"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1 capitalize",
                tab === t ? "bg-accent font-semibold" : "text-muted-foreground"
              )}
            >
              {t}
              {t === "unread" && ` (${inbox.unread})`}
            </button>
          ))}
        </div>
        <ul className="flex-1 overflow-y-auto">
          {list.length === 0 && (
            <li className="p-8 text-center text-sm text-muted-foreground">Nothing here.</li>
          )}
          {list.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => {
                  setSelectedId(n.id);
                  inbox.markRead(n.id);
                }}
                className={cn(
                  "flex w-full items-start gap-3 border-b px-4 py-3 text-left",
                  selectedId === n.id ? "bg-accent" : "hover:bg-accent/50",
                  !n.read && "border-l-4 border-l-primary"
                )}
              >
                <Icon n={n} className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                    <span className="truncate">
                      {n.kind === "announcement" ? n.from : "Cadence"}
                    </span>
                    <span className="shrink-0">{n.ago}</span>
                  </div>
                  <div className={cn("truncate text-sm", !n.read && "font-semibold")}>{n.title}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        {!selected ? (
          <div className="grid h-full place-items-center text-muted-foreground">
            Select a Notification to read it.
          </div>
        ) : (
          <article className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon n={selected} className="size-4" />
              {selected.kind === "announcement" ? (
                <span>
                  Announcement from <b>{selected.from}</b> to <b>{selected.audience}</b>
                </span>
              ) : (
                <span>Notification</span>
              )}
              <span>· {selected.ago} ago</span>
            </div>
            <h2 className="text-2xl font-bold">{selected.title}</h2>
            {selected.body && <p className="whitespace-pre-line leading-relaxed">{selected.body}</p>}
            <div className="flex gap-2 pt-2">
              <Link
                to={selected.href}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                {selected.cta}
              </Link>
              <button
                onClick={() => inbox.markRead(selected.id, false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Mark unread
              </button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

// ─── Variant C: right-hand drawer, Announcements pinned ───────────────────────
// A bell in a thin top bar opens a drawer over the page. Unread Announcements
// sit on top as full-text cards you dismiss; event Notifications below, grouped
// by Today / This week / Earlier, marked read one by one with a tick on hover.

export function VariantCTopBar({ inbox }: { inbox: Inbox }) {
  const [open, setOpen] = useState(false);
  const announcements = inbox.items.filter((n) => n.kind === "announcement" && !n.read);
  const events = inbox.items.filter((n) => n.kind === "event");
  const buckets = ["Today", "This week", "Earlier"] as const;
  return (
    <>
      <div className="sticky top-0 z-30 flex h-12 items-center justify-end border-b bg-background/80 px-4 backdrop-blur">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-accent"
        >
          <Bell className="size-4" />
          {inbox.unread > 0 ? `${inbox.unread} new` : "No new"}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[440px] flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-bold">Notifications</h2>
              <button onClick={() => setOpen(false)} className="rounded p-1 hover:bg-accent">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              {announcements.length > 0 && (
                <section className="space-y-3">
                  {announcements.map((n) => (
                    <div key={n.id} className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:bg-amber-950/30">
                      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300">
                        <span className="flex items-center gap-1">
                          <Megaphone className="size-3.5" /> {n.from}
                        </span>
                        <span>{n.ago} ago</span>
                      </div>
                      <div className="font-semibold">{n.title}</div>
                      <p className="mt-1 text-sm">{n.body}</p>
                      <div className="mt-3 flex justify-between">
                        <Link to={n.href} onClick={() => inbox.markRead(n.id)} className="text-sm font-medium text-primary">
                          {n.cta} →
                        </Link>
                        <button onClick={() => inbox.markRead(n.id)} className="text-xs text-muted-foreground hover:underline">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )}
              {buckets.map((b) => {
                const xs = events.filter((n) => n.bucket === b);
                if (xs.length === 0) return null;
                const unreadHere = xs.some((n) => !n.read);
                return (
                  <section key={b}>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{b}</h3>
                      {unreadHere && (
                        <button
                          onClick={() => inbox.markAllRead((n) => n.kind === "event" && n.bucket === b)}
                          className="text-xs text-primary"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {xs.map((n) => (
                        <li
                          key={n.id}
                          className={cn(
                            "group flex items-start gap-3 rounded-md p-2 hover:bg-accent",
                            n.read && "opacity-60"
                          )}
                        >
                          <span className={cn("mt-2 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-primary")} />
                          <Icon n={n} className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          <Link to={n.href} onClick={() => inbox.markRead(n.id)} className="min-w-0 flex-1">
                            <div className="text-sm">{n.title}</div>
                            {n.body && <div className="truncate text-xs text-muted-foreground">{n.body}</div>}
                            <div className="text-[11px] text-muted-foreground">{n.ago} ago</div>
                          </Link>
                          {!n.read && (
                            <button
                              onClick={() => inbox.markRead(n.id)}
                              title="Mark read"
                              className="invisible rounded p-1 hover:bg-background group-hover:visible"
                            >
                              <Check className="size-4" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export const INBOX_VARIANTS = [
  { key: "A", name: "Bell popover" },
  { key: "B", name: "Inbox page" },
  { key: "C", name: "Drawer, Announcements pinned" },
];
