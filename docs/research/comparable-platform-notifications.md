# What comparable course platforms notify about, and what users can turn off

Research for [#5](https://github.com/michu-dunat/cohort-005-project-md/issues/5) (part of map [#1](https://github.com/michu-dunat/cohort-005-project-md/issues/1)). Researched 2026-11-12 from the platforms' own help centres.

**Source caveat.** Teachable, Podia and Kajabi help articles were read directly. Udemy (`support.udemy.com`, `business-support.udemy.com`) and Thinkific (`support.thinkific.com`) returned HTTP 403 to the fetcher. Their claims below come from search-engine excerpts of those official pages and are marked *(excerpt)*. Menu names change often, so treat them as indicative.

## Teachable

**Admin/staff emails.** Each admin user turns these on or off for themselves under *Settings > Notifications*. [T1]

| Group | Recipients | Events |
| --- | --- | --- |
| Enrollment | primary owners, owners, authors, affiliates | new student joins the school; enrolment in a paid product; enrolment in a free product |
| Comments | primary owners, owners, authors | comment needs moderation; new comment in your course; new comment in a thread you commented on; reply to your comment |
| Subscriptions | primary owners, owners | subscription payment failed or cancelled for non-payment; student cancels a subscription |

**Automated student emails.** Owners turn these on or off for the whole school under *Emails > Settings*. They are: certificate of completion, comment in a discussion the student is part of, drip content unlocked, automatic unenrolment when access expires, free-product receipt, and lead double opt-in. [T1]

**Student controls.**
- One profile toggle, "Receive instructional and promotional emails from [School]", covers both kinds of email.
- The unsubscribe link in an email turns that same toggle off.
- Comment notifications have their own profile settings.
- Some emails are delivered "regardless of their opt-in settings". The article doesn't list which ones. [T2]

**Creator broadcasts.** Under *Emails > Compose*, an admin can email chosen users, everyone in one course, or all users in the school. User filters can narrow the list further, for example to students only. [T3]

**Channel.** The articles describe email only. They don't mention an in-app notification centre. [T1]

## Thinkific *(excerpt)*

- **Admin.** Site Owners and Site Admins are emailed about new free and paid orders. A "New order" toggle under *Users > Notification Emails > Admin* controls the email to the Site Owner. [TH1]
- **Students.** Order receipts and payment notifications are configured separately under *Notification Emails > Student*. [TH1] A Site Welcome Email goes to each newly created student and is on by default. There is also a per-course welcome email. [TH2]
- **Completion.** An email fires when a student reaches 100% completion. The admin can make sure it is on and cc themselves. [TH3]
- **Not found.** I found no first-party list of in-app notifications or student opt-out controls. Per-enrolment admin alerts appear only through Zapier or IFTTT.

## Podia

**Creator/account notifications.** [P1]
- **Channels.** Web (an in-site popover) and email. Each notification type can be toggled separately for each channel.
- **Activity** covers new posts, comments, reactions and mentions. It is on by default for spaces you follow, posts you created or commented on, and lessons you commented on.
- **Activity email frequency.** Instant (one email per action), hourly, daily (08:10 local time), weekly (Friday 08:10), or off. Digests list items without previews.
- **Chat.** On or off. Chat emails are grouped and sent with a 10-minute delay.
- **Unsubscribing.** An unsubscribe link in a notification email turns off only that notification type. "Manage all notifications" opens the account settings.
- **Product events.** An older version of the article lists new product comments, free and paid sign-ups, successful and failed payments, cancellations and affiliate sales, plus muting per product. [P2]
- **Not optional.** Podia's FAQ says the automatic email sent to the creator when a customer cancels a subscription can't be disabled *(excerpt)*.
- **Members.** Separate articles cover a creator-set default notification schedule for members. I didn't read them.

## Kajabi

**Account owner/staff emails.** Configured at the account level. [K1]
- **Account & Security** (password resets, account setup): "This can't be disabled."
- **Comments.** Five checkboxes: lesson comments and replies, newsletter comments and replies, and new community posts. Users only get these for sites they can access.
- **Customer subscriptions and payments.** One checkbox each for failed payment, card removed, cancellation, tier change, offline-payment authorisation, and pause/resume.
- **Kajabi Payments and affiliate payouts.** These are routed by role:
  - Owner only: payouts and negative balance.
  - Owner and the Owner role: payments received.
  - Owner, Owner role and Administrator role: invoices paid, dispute activity, invoice reminders, Form 1099-K, and affiliate payouts.
- **Data export.** The owner can be notified when an admin exports data.
- **Kajabi's own marketing.** Eight opt-in categories, or unsubscribe from all.
- **Other.** Some emails aren't covered by these settings. Marking Kajabi mail as spam can also stop password resets.

**Community (members).** [K2]
- **Events.**
  - Replies, direct messages and mentions.
  - Challenge events.
  - Meetups: reminders 1 day and 1 hour before, start, created, rescheduled, cancelled.
  - Live Room start and recording available.
  - Announcements, both global and per Channel.
  - A Weekly Digest.
- **Channels.** Email, in-app notification centre, and mobile push. Each feature can be toggled per channel.
- **Defaults and overrides.** New members start with everything on. Owners and Admins set community-level defaults that **override** member preferences: anything the owner disables appears greyed out for members, who can't turn it back on.
- **Member controls.** Members choose All, Mentions or Muted for each Channel, and can turn the Weekly Digest off. The owner must also enable the Weekly Digest.
- **Announcements.** New top-level Channel posts send no email. Kajabi recommends an Announcement when everyone should be alerted. Announcements reach only members with access through their Access Groups.

## Udemy *(excerpt)*

**Instructor announcements to enrolled students.** [U1][U2]
- **Educational announcements.** At most 4 per course per month, to students enrolled in the course. External educational links are allowed.
- **Promotional emails.** At most 2 per course per month. They may promote only the instructor's own Udemy courses, may contain no external links, and only a visible instructor on the course can send them.
- **Analytics.** Promotional emails report open rate and unsubscribe rate. Educational announcements report unique views.

**Learner controls.** [U3][U4]
- **Global.** A Notification Preferences page is linked from the profile.
- **Per course.** In the course player's menu, learners have separate checkboxes for "New announcements emails" and "Promotional emails".
- **Udemy Business.** Learners get the same per-course announcement opt-out.

**Instructor notifications.** [U5][U6]
- **Settings.** Under *Account > Notification Settings*.
- **Not optional.** "Transactional emails, notifications for Q&A replies, and notifications for new direct messages cannot be disabled."
- **Instructor-email gate.** One checkbox controls instructor emails such as the Daily Q&A Digest, the New Student & Review Daily Digest, and lecture-ready confirmations. These are digests rather than one email per enrolment.
- **Per course.** Instructors can choose lecture-ready emails and the Q&A digest for each course.
- **Mobile push.** Available for direct messages, Q&A and reviews, delivered at 9 AM and 5 PM local time.
- **Direct messages.** An instructor can switch DMs off entirely.

## Patterns relevant to Cadence

These are observations, not decisions.

1. **Who gets told about what.**
   - Creators and staff are told about enrolments and sales, comments and Q&A, and subscription or payment trouble (Teachable, Kajabi, Podia, Thinkific).
   - Students are told about receipts, unlocked content, completion or certificates, replies in their threads, and broadcasts from the creator.
   - Platforms with several admin roles route money events by role (Kajabi: owner only vs Administrator).
2. **Volume handling.**
   - Udemy sends daily digests for new students, reviews and Q&A.
   - Podia lets each person choose instant, hourly, daily or weekly emails.
   - Kajabi sends a Weekly Digest.
   - None of the platforms surveyed relies on one email per enrolment as its main approach for big courses. This bears on #1's open "Volume" item.
3. **Channels.**
   - Podia and Kajabi pair an in-app notification centre with email, toggled per type and per channel.
   - Teachable and Thinkific are mostly email.
4. **What can't be turned off.**
   - Account security emails (Kajabi).
   - Transactional emails such as receipts and purchases (Udemy, and Teachable's unnamed "regardless of opt-in" emails).
   - On Udemy, Q&A replies and direct messages to instructors.
   - Podia's cancellation notice to the creator.
   - Everything else is optional.
5. **Two layers of control.**
   - Teachable and Kajabi let the school or community owner disable a notification type for everyone. Kajabi's owner setting overrides members.
   - Individuals then opt out per type.
   - Udemy and Podia also allow per-course or per-product opt-outs or mutes.
6. **Announcements.**
   - Creators can broadcast to everyone enrolled in one course (Udemy, Teachable), to the whole school (Teachable), or to a community or channel (Kajabi).
   - Udemy separates educational from promotional announcements, caps how many can be sent, and gives learners a separate opt-out for each kind.
   - Kajabi limits Announcements to members who have access to the content.
7. **Unsubscribe granularity.**
   - Podia's email unsubscribe link turns off one type.
   - Teachable's turns off the whole instructional and promotional bundle.

## Sources

- [T1] Teachable, "Email notifications": https://support.teachable.com/en/articles/11682445-email-notifications
- [T2] Teachable, "Email opt-in / opt-out": https://support.teachable.com/en/articles/11682447-email-opt-in-opt-out
- [T3] Teachable, "Email users": https://support.teachable.com/en/articles/11682444-email-users *(excerpt)*
- [TH1] Thinkific, "Student Order Receipts and Payment Notifications": https://support.thinkific.com/hc/en-us/articles/360035210354 *(excerpt)*
- [TH2] Thinkific, "Why didn't my student receive a Site Welcome Email?": https://support.thinkific.com/hc/en-us/articles/360047823413 *(excerpt)*
- [TH3] Thinkific, "Can I get notified when my student completes a course?": https://support.thinkific.com/hc/en-us/articles/360048909674 *(excerpt)*
- [P1] Podia, "Managing notifications": https://help.podia.com/en/articles/11371010-managing-notifications
- [P2] Podia, earlier version of the same article (search excerpt): https://help.podia.com/en/articles/11371010-manage-your-podia-account-notification-preferences
- [K1] Kajabi, "Manage your account notification preferences": https://help.kajabi.com/en/articles/17174377-manage-your-account-notification-preferences
- [K2] Kajabi, "Community settings: notifications": https://help.kajabi.com/en/articles/17175826-community-settings-notifications
- [U1] Udemy, "Promotional Emails Rules and Guidelines": https://support.udemy.com/hc/articles/229605908 *(excerpt)*
- [U2] Udemy, "Announcements Rules and Guidelines": https://support.udemy.com/hc/articles/229605828 *(excerpt)*
- [U3] Udemy Business, "Unsubscribe From Udemy or Instructor Notifications": https://business-support.udemy.com/hc/en-us/articles/12814600533271 *(excerpt)*
- [U4] Udemy, learner unsubscribe article: https://support.udemy.com/hc/articles/229231147 *(excerpt)*
- [U5] Udemy, "Instructor Account Notifications": https://support.udemy.com/hc/articles/115008393928 *(excerpt)*
- [U6] Udemy, instructor mobile notifications: https://support.udemy.com/hc/en-us/sections/360001680413 *(excerpt)*
