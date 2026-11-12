# What do email rules require for unsubscribing?

Research for [#6](https://github.com/michu-dunat/cohort-005-project-md/issues/6), part of map [#1](https://github.com/michu-dunat/cohort-005-project-md/issues/1) (Notifications for Cadence). Researched 2026-11-12.

**This is not legal advice.** It summarises primary sources (statute, regulation, regulator guidance, RFCs, mailbox-provider and Postmark docs) so the spec can be written with the constraints in view. Quotes are short excerpts; follow the links for full text.

## TL;DR

- **Classification is by content, not by who writes it.** Under CAN-SPAM, a message whose content is only "transactional or relationship" is exempt from the opt-out rules; any message with commercial content can become "commercial" depending on subject line and placement. EU law (ePrivacy Art. 13 / GDPR Art. 21) regulates "direct marketing"; regulator guidance treats neutral service messages as outside it, but marketing elements make a message marketing "even if that is not the main purpose".
- **"New lesson in a course you bought"** fits CAN-SPAM's explicit category of delivering goods/services "including product updates or upgrades" the recipient is entitled to under a transaction. Likely transactional *as long as it promotes nothing else*.
- **An Announcement is ambiguous.** Neutral course logistics to enrolled Students look transactional/relationship; an Announcement that promotes a new course, upsell, sale, or anything the reader hasn't bought is commercial/marketing. Since Instructors write free text, Cadence cannot know the content class in advance. Postmark separately classifies "Product update announcements", "Newsletters", "Promotions" and one-to-many sends as **Broadcast** regardless of legal class.
- **Commercial/marketing email must carry a working, free opt-out** (CAN-SPAM: honoured within 10 business days, working 30 days after send, plus a postal address and ad identification; EU: objection free of charge "on the occasion of each message"). Gmail (≥ ~5,000/day to personal Gmail, permanent status) and Yahoo require RFC 8058 one-click `List-Unsubscribe` for "marketing and subscribed messages" and honouring within 2 days / 48 h. Transactional messages are excluded from Gmail's one-click requirement.
- **Postmark:** Broadcast streams *require* an unsubscribe link (auto-added if missing) and, by default, Postmark adds RFC 8058 headers and manages the unsubscribe list. Unsubscribes are **per stream**. Transactional streams need no unsubscribe link and do not accept bulk mail.

## 1. Transactional vs. commercial (US, CAN-SPAM)

### Definitions

- A "commercial electronic mail message" is one whose "primary purpose" is "the commercial advertisement or promotion of a commercial product or service" ([FTC CAN-SPAM compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business); [15 U.S.C. 7702(2)](https://www.law.cornell.edu/uscode/text/15/7702)).
- A "transactional or relationship message" ([15 U.S.C. 7702(17)(A)](https://www.law.cornell.edu/uscode/text/15/7702)) is one whose primary purpose is to:
  1. facilitate, complete or confirm a transaction the recipient already agreed to;
  2. give warranty, recall, safety or security information about a product/service used or bought;
  3. about "a subscription, membership, account, loan, or comparable ongoing commercial relationship": notify of changes to terms or features, changes in the recipient's standing, or periodic account statements;
  4. give employment / benefit-plan information;
  5. deliver goods or services, **including "product updates or upgrades"**, that the recipient is entitled to receive under a transaction they agreed to.

### Primary purpose test ([16 CFR 316.3](https://www.law.cornell.edu/cfr/text/16/316.3))

| Content of the message | Result |
| --- | --- |
| Only commercial | Commercial |
| Only transactional/relationship | Transactional (316.3(b)) |
| Commercial + transactional | Commercial if the subject line would make a recipient "likely conclude that the message contains the commercial advertisement", **or** the transactional content "does not appear, in whole or in substantial part, at the beginning of the body" |
| Commercial + other (neither) content | Commercial if subject line test as above, or a recipient reading the body "would likely conclude that the primary purpose ... is the commercial advertisement"; factors: placement, proportion, colour/graphics/type size highlighting it |

### What CAN-SPAM requires, by class ([15 U.S.C. 7704](https://www.law.cornell.edu/uscode/text/15/7704))

- **All messages, including transactional:** no materially false or misleading header information (7704(a)(1)).
- **Commercial messages only** (7704(a)(2)-(5)):
  - A "clearly and conspicuously displayed" return address or Internet-based opt-out mechanism. A menu of message types is allowed, but it must include an option to receive no commercial messages from the sender.
  - The mechanism must work for "no less than 30 days after the transmission of the original message".
  - Stop sending within "10 business days after the receipt of such request"; no transferring/selling the opted-out address.
  - Clear identification as an advertisement (waived with prior affirmative consent), clear notice of the opt-out, and "a valid physical postal address of the sender".
  - FTC guide adds: you can't charge a fee or require personally identifying info beyond the email address to opt out ([FTC guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)).

### Applying it to Cadence's planned mail (interpretation, not settled law)

| Message | Likely class | Basis |
| --- | --- | --- |
| Purchase receipt, refund decision (existing mail) | Transactional | 7702(17)(A)(i) |
| "New lesson published" in a course the Student bought | Likely transactional | 7702(17)(A)(v) "product updates or upgrades" the recipient is entitled to; fails if it also promotes other courses |
| Announcement: course logistics (schedule change, live session time, errata) to enrolled Students | Likely transactional/relationship | (A)(iii) changes to features of an ongoing relationship, or (A)(v) |
| Announcement: "my new course is out", discount, upsell, or sent to people who haven't bought | Commercial | promotes a commercial product |
| Announcement mixing both | Depends on subject line and whether the transactional part leads the body (316.3(a)(2)) | |
| Instructor-facing Notifications (new enrollment, comment, Refund Request) | Not commercial (no promotion); arguably "relationship" with the platform | Not covered by an enumerated category for every case; no opt-out *legally* required if non-commercial |

## 2. EU: ePrivacy Directive and GDPR

- **ePrivacy Directive 2002/58/EC, Art. 13** (as amended by 2009/136/EC; text via [legislation.gov.uk EU-directive copy](https://www.legislation.gov.uk/eudr/2002/58/article/13/data.html), EUR-Lex was not machine-readable from here):
  - 13(1): email for direct marketing "may be allowed only in respect of subscribers or users who have given their prior consent".
  - 13(2) "soft opt-in": a seller who obtained a customer's email "in the context of the sale of a product or a service" may market its **own similar products or services**, provided the customer is given "the opportunity to object, free of charge and in an easy manner" at collection **and on each message**.
  - 13(4): direct-marketing email that disguises the sender, or lacks "a valid address to which the recipient may send a request that such communications cease", "shall be prohibited".
  - Being a Directive, Art. 13 is implemented by each Member State's national law; details (e.g. B2B treatment) vary by country.
- **GDPR Art. 21(2)-(3)** ([text](https://gdpr-info.eu/art-21-gdpr/)): where personal data are processed for direct marketing, the data subject may object "at any time", and then the data "shall no longer be processed for such purposes". This is absolute (no balancing test).
- **What counts as "direct marketing" vs. a service message.** The Directive doesn't define it. The UK regulator's guidance (ICO, under UK PECR, which implements the same Art. 13; persuasive, not binding in the EU) says: non-promotional administrative messages are service messages; general branding/logos doesn't make them marketing; but a message containing marketing is marketing "even if that is not the main purpose of your message"; "phrasing, tone and context are likely to be a key factor" and "simply using a neutral tone doesn't necessarily avoid messages being direct marketing"; a message that "actively promotes or encourages people to make use of a particular service" is likely marketing ([ICO: Identify direct marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/), updated 2025-08-20). Note this is **stricter than CAN-SPAM's primary-purpose test**: any promotional element can tip a message into marketing.

## 3. Mailbox providers: Gmail and Yahoo bulk-sender rules

### Gmail ([Email sender guidelines](https://support.google.com/a/answer/81126); [FAQ](https://support.google.com/a/answer/14229414))

- In force since 1 February 2024.
- **Bulk sender:** sends "close to 5,000 messages or more to personal Gmail accounts within a 24-hour period"; messages from the same primary domain are combined; status is permanent ("doesn't have an expiration date").
- **All senders:** SPF or DKIM, valid forward/reverse DNS, TLS, RFC 5322 formatting, spam rate below 0.3%.
- **Bulk senders additionally:** SPF **and** DKIM **and** DMARC (p=none allowed) with From-domain alignment; "Marketing messages and subscribed messages must support one-click unsubscribe".
- **Transactional exemption:** "Transactional messages are excluded from this requirement" (examples: password resets, reservation confirmations, form-submission confirmations).
- **Timing:** unsubscribes should be honoured within 48 hours; not doing so is listed as a sender-requirement issue.
- A visible body link is allowed but not required for Gmail's requirement, and need not be one-click; a body `mailto:` alone does not satisfy it.

### Yahoo ([Sender best practices](https://senders.yahooinc.com/best-practices/))

- No numeric bulk threshold published.
- Bulk senders: SPF **and** DKIM, DMARC (≥ p=none) passing with relaxed alignment, spam rate below 0.3%.
- One-click `List-Unsubscribe` for marketing and subscribed messages (POST per RFC 8058 recommended; mailto acceptable), **plus** a clearly visible unsubscribe link in the body (may go to a preference page); "Honor unsubscribes within 2 days."
- No explicit transactional exemption is stated; the requirement is scoped to "marketing and subscribed messages".

### RFC 8058 one-click unsubscribe ([RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html))

- `List-Unsubscribe` header "MUST contain one HTTPS URI" (may also contain mailto).
- `List-Unsubscribe-Post: List-Unsubscribe=One-Click`.
- Both headers must be covered by a valid DKIM signature (`h=` tag).
- The URI must identify recipient and list (ideally with an opaque, hard-to-forge token); the endpoint accepts a POST that carries no cookies or auth, and "MUST NOT return an HTTPS redirect". No further confirmation step from the user.

## 4. Postmark message streams

- **Transactional streams** are for "one-to-one emails triggered by a user action" ([Postmark: message streams](https://postmarkapp.com/support/article/1207-how-to-create-and-send-through-message-streams)). Postmark's examples ([good-fit article](https://postmarkapp.com/support/article/1082-what-types-of-messages-are-a-good-fit-for-postmark), modified 2026-10-26): welcome, password reset, **comment notifications**, **weekly digest emails**, order confirmations, receipts/invoices.
- **Broadcast streams** are for "one-to-many sends"; examples: "**Product update announcements**", "Newsletters", "Promotions", "Updates to Terms of Service". "These types of messages must be sent through Broadcast Message Streams"; transactional and broadcast traffic "does not mix in Postmark, including IP ranges" ([good-fit](https://postmarkapp.com/support/article/1082-what-types-of-messages-are-a-good-fit-for-postmark); [Can I send bulk emails?](https://postmarkapp.com/support/article/can-i-send-bulk-emails)).
- **Broadcast unsubscribe:** "Every message sent through a broadcast Message Stream in Postmark is required to have an unsubscribe link", inserted with `{{{ pm:unsubscribe }}}` or appended automatically if missing ([Postmark manual, ch. 5](https://postmarkapp.com/manual)). By default Postmark also adds the one-click `List-Unsubscribe` / `List-Unsubscribe-Post` headers and hosts the unsubscribe list/landing page ([List-Unsubscribe article](https://postmarkapp.com/support/article/1299-how-to-include-a-list-unsubscribe-header)).
- **Self-managed unsubscribes** on Broadcast require Postmark's approval; you must then supply a working link in every message and the headers yourself ("Postmark no longer includes these headers for you"), and must never send to unsubscribed recipients ([Managing your own unsubscribe process](https://postmarkapp.com/support/article/managing-your-own-unsubscribe-process), modified 2026-10-26).
- **Transactional unsubscribe:** not required; you may add your own link/headers and Postmark passes them through ([Postmark manual](https://postmarkapp.com/manual); List-Unsubscribe article).
- **Scope:** unsubscribes and suppressions are **per stream**. A recipient "will *only* be unsubscribed from the message stream from which the message was sent"; hard bounces, spam complaints and unsubscribes are auto-suppressed per stream ([manual, ch. 5](https://postmarkapp.com/manual)).

## 5. Repo note

The task brief mentions `app/lib/mailer.server.ts`; that file does not exist on `origin/main` at the time of research. The only email hook found is a `sendEmail` flag in `app/routes/courses.$slug.purchase.tsx`. No Postmark stream configuration exists in the repo yet.

## 6. Open ambiguities

1. **Who is the "sender" of an Instructor Announcement** under CAN-SPAM (Cadence, the Instructor, or both)? Not researched in depth; 16 CFR 316.2 has rules for messages with multiple senders.
2. **Free-text Announcements:** classification depends on what the author writes. Neither law nor Postmark offers a way to classify a message by its author's role.
3. **EU "direct marketing" boundary** is set by national law and regulator practice, and ICO guidance (UK) is stricter than CAN-SPAM: a single promotional line can make a message marketing.
4. **Soft opt-in for free courses or free accounts:** the CJEU has addressed free services under Art. 13(2) (only secondary commentary was found here; primary judgment not verified).
5. **Postmark vs. legal classification can diverge:** a legally transactional "course logistics" Announcement sent one-to-many to a whole cohort may still be "broadcast" by Postmark's one-to-many / "announcements" definition. Postmark's per-message quiz was not retrieved.
6. **Yahoo threshold** is unpublished; Gmail counts per primary domain, so all Cadence mail from one domain likely counts together toward the 5,000 figure. Google's pages don't say explicitly whether transactional mail is excluded from the *count*. The one-click requirement itself applies only to marketing/subscribed mail.
7. **"Subscribed messages"** (Gmail/Yahoo) is not precisely defined; opt-in Notification emails (e.g. a digest someone turned on) may fall under it even if not marketing.
