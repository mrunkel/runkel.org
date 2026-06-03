# Hugo → Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all content from the Hugo site at `/Users/mrunkel/Herd/runkel.org` (read-only reference) into this Next.js Spotlight-template site, running perfectly locally.

**Architecture:** Each Hugo post becomes a co-located MDX article (`src/app/articles/<slug>/page.mdx`) using the template's native article pattern. Demo content is deleted; Home/About are personalized; a new `/resume` page and a `<Gist />` server component are added; old Hugo URLs get permanent redirects in `next.config.mjs`.

**Tech Stack:** Next.js 16 (App Router), MDX via `@next/mdx`, Tailwind CSS 4, TypeScript.

**Spec:** `docs/superpowers/specs/2026-06-03-hugo-to-nextjs-migration-design.md`

**⚠️ Git rule (overrides any commit steps convention):** Marc handles ALL git commits himself. Never run `git commit`. Each task ends at a "checkpoint" where the working tree is left clean and buildable for Marc to review/commit.

**Verification model:** This is a content migration with no test framework in the project. The red/green loop here is: `npm run build` must pass after every task, plus the explicit curl/grep checks listed in each task. Don't skip them.

**Source material (read-only — never modify):**
- Posts: `/Users/mrunkel/Herd/runkel.org/content/post/*.md`
- About: `/Users/mrunkel/Herd/runkel.org/content/page/about.md`
- Resume: `/Users/mrunkel/Herd/runkel.org/static/resume/index.html`
- Images: `/Users/mrunkel/Herd/runkel.org/static/images/`
- Ground-truth old URLs: `/Users/mrunkel/Herd/runkel.org/public/`

---

## Task 1: Environment + site identity

**Files:**
- Create: `.env.local`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/feed.xml/route.ts:12-29`

- [ ] **Step 1: Create `.env.local`**

```
NEXT_PUBLIC_SITE_URL=https://runkel.org
```

- [ ] **Step 2: Update root metadata in `src/app/layout.tsx`**

Replace the `metadata` export (keep `alternates` as-is):

```tsx
export const metadata: Metadata = {
  title: {
    template: '%s - Marc Runkel',
    default: 'Marc Runkel - Problem Solver',
  },
  description: "Marc Runkel's place on the Internet",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}
```

- [ ] **Step 3: Update feed author in `src/app/feed.xml/route.ts`**

```ts
let author = {
  name: 'Marc Runkel',
  email: 'marc@runkel.org',
}
```

And in the `new Feed({...})` options change `description: 'Your blog description'` to `description: "Marc Runkel's place on the Internet"`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Checkpoint** — leave tree clean for Marc to review/commit.

---

## Task 2: Navigation + delete demo pages

**Files:**
- Modify: `src/components/Header.tsx` (nav lists at lines ~124-128 and ~169-173)
- Modify: `src/components/Footer.tsx` (nav links at lines ~30-33)
- Delete: `src/app/projects/`, `src/app/speaking/`, `src/app/uses/`, `src/app/thank-you/`

- [ ] **Step 1: Update nav links in Header.tsx**

In BOTH `MobileNavigation` and `DesktopNavigation`, the nav items become exactly:

```tsx
<NavItem href="/about">About</NavItem>
<NavItem href="/articles">Articles</NavItem>
<NavItem href="/resume">Resume</NavItem>
```

(`MobileNavItem` variant for the mobile list.) `/resume` 404s until Task 9 — acceptable, build still passes.

- [ ] **Step 2: Update Footer.tsx links to the same three** (About, Articles, Resume).

- [ ] **Step 3: Delete demo page directories**

```bash
rm -rf src/app/projects src/app/speaking src/app/uses src/app/thank-you
```

- [ ] **Step 4: Verify no dangling references**

Run: `grep -rn 'projects\|speaking\|uses\|thank-you' src/ --include='*.tsx' --include='*.ts' | grep -v 'useContext\|useRouter\|useEffect\|usePathname\|useState'`
Expected: only the Newsletter form's `action="/thank-you"` in `src/app/page.tsx` (removed in Task 8) — nothing else.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 6: Checkpoint** for Marc.

---

## Task 3: Gist component

**Files:**
- Create: `src/components/Gist.tsx`

A React **server component** that fetches a gist's raw content at build/request time and renders it as a code block styled by the existing Prism/Prose CSS, with a "View on GitHub" link. On fetch failure it degrades to just the link (keeps `npm run build` non-flaky).

- [ ] **Step 1: Write `src/components/Gist.tsx`**

```tsx
const GIST_HOST = 'https://gist.github.com'

async function fetchGistContent(
  user: string,
  id: string,
): Promise<string | null> {
  try {
    let res = await fetch(`${GIST_HOST}/${user}/${id}/raw`, {
      redirect: 'follow',
    })
    if (!res.ok) {
      return null
    }
    return await res.text()
  } catch {
    return null
  }
}

export async function Gist({
  user,
  id,
  language = '',
}: {
  user: string
  id: string
  language?: string
}) {
  let content = await fetchGistContent(user, id)
  let gistUrl = `${GIST_HOST}/${user}/${id}`

  return (
    <figure>
      {content !== null && (
        <pre className={language ? `language-${language}` : undefined}>
          <code>{content}</code>
        </pre>
      )}
      <figcaption>
        <a href={gistUrl} target="_blank" rel="noopener noreferrer">
          View this gist on GitHub
        </a>
      </figcaption>
    </figure>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: success (component not used yet; that's fine).

- [ ] **Step 3: Checkpoint** for Marc.

---

## Task 4: Articles batch 1 — straightforward posts (no/simple shortcodes)

**Files (create one dir per article):**
- `src/app/articles/the-only-important-rule-of-the-scrum-process/page.mdx`
- `src/app/articles/bruges-belgium/page.mdx`
- `src/app/articles/free-software/page.mdx`
- `src/app/articles/drawing-a-network-diagram/page.mdx`
- Delete: the 3 demo article dirs (`crafting-a-design-system-for-a-multiplanetary-future`, `introducing-animaginary`, `rewriting-the-cosmos-kernel-in-rust`)

**Conversion procedure (applies to every article in Tasks 4–6):**

1. Read the Hugo source post in `/Users/mrunkel/Herd/runkel.org/content/post/`.
2. Create `src/app/articles/<slug>/page.mdx` with this exact scaffold (template pattern, see existing demo articles before deleting them):

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'Marc Runkel',
  date: 'YYYY-MM-DD',
  title: '<title>',
  description: '<description>',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />

<body content>
```

3. Body = full Hugo post body minus frontmatter, minus the `<!--more-->` line. **Content fidelity is the requirement: no lost paragraphs, links, lists, or images. Do not rewrite prose.**
4. Images referenced by the post: copy from `/Users/mrunkel/Herd/runkel.org/static/images/...` into the article's own folder, then render via the MDX `Image` component (auto-injected, no import needed):
   ```mdx
   import imgName from './file.png'

   <Image src={imgName} alt="<figure title or empty>" />
   ```
   For `{{< figure ... title="X" >}}` keep the caption: wrap as `<figure><Image .../><figcaption>X</figcaption></figure>` or `Image` followed by an italic caption line — use the figure form.
5. Frontmatter `thumbnailImage`/`coverImage`/tags/categories/keywords are dropped.
6. Markdown headings using underline style (`Heading\n---`) must be converted to `## Heading` (setext H2 renders fine in MDX, but `---` after a paragraph can parse as `<hr>` — convert to ATX `##` to be safe).
7. Escape/JSX-proofing: MDX treats `<` + letter as JSX. Scan each body for raw `<tags>` or emails like `<foo@bar>` and wrap in backticks if present.

**Per-article specifics:**

- [ ] **Step 1: `the-only-important-rule-of-the-scrum-process`** (source `Only-Important-Scrum-Rule.md`)
  - date: `2016-09-04`, title: `The only important rule of the Scrum process.`
  - description: `There are many blog posts about scrum. There are sacred texts and high-priests. Most of that stuff is malarkey.`
  - Image: `/images/scrum/Yo-Dawg-Scrum-in-your-Scrum.jpg` → copy to article dir.
  - Note: new slug intentionally drops the trailing `.` of the old URL.

- [ ] **Step 2: `bruges-belgium`** (source `Bruges-Belgium.md` — was a Hugo draft; published now per spec)
  - date: `2017-07-20`, title: `Bruges, Belgium`
  - description: `Bruges is a lovely city in Belgium near the coast that has been a tourist destination for over a hundred years. It's worth a visit of 2 to 3 days.`
  - Images: `/images/Bruges/au-petit-grand.jpg`, `/images/Bruges/night-scene.jpg` → copy to article dir.

- [ ] **Step 3: `free-software`** (source `free-software.md`)
  - date: `2018-07-19`, title: `Free Software`
  - description: `A really cool list of free software so good you can't believe it's free, based on a reddit thread.`
  - Image: `/images/software-sign-lg.jpg` if referenced in body (check; copy whatever the body references — the software images appear to be frontmatter-thumbnail only).
  - ⚠️ **Highest MDX-breakage risk in the migration:** body contains ~80 angle-bracket autolinks (`<https://...>`) which MDX parses as JSX → build failure. Convert each to a normal markdown link (`[https://example.com](https://example.com)` or bare URL). Also fix the malformed `[here](<https://github.com/mrunkel)` link, and convert its setext `---` headings to `##` per procedure step 6.

- [ ] **Step 4: `drawing-a-network-diagram`** (source `Drawing-A-Network-Diagram.md`)
  - date: `2017-07-12`, title: `Drawing a Network Diagram`
  - description: `When drawing a network diagram, think about whether it makes sense to draw a logical or a physical diagram. 90% of the time, logical is more useful.`
  - Shortcode: `{{< figure src="/images/network-diagram.png" title="A simple logical network diagram" >}}` → figure with caption per procedure step 4.

- [ ] **Step 5: Delete the 3 demo article directories.**

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: success.
Run: `npm run dev` then `curl -s localhost:3000/articles | grep -o '<h2[^>]*>[^<]*'`
Expected: the 4 new articles listed, no demo articles.
Visually compare each rendered article against its Hugo source for fidelity.

- [ ] **Step 7: Checkpoint** for Marc.

---

## Task 5: Articles batch 2 — code-block posts

**Files:**
- `src/app/articles/updating-all-lxd-containers/page.mdx`
- `src/app/articles/terminating-torrents/page.mdx`
- `src/app/articles/things-i-believe/page.mdx`
- `src/app/articles/how-to-pick-a-password/page.mdx`

- [ ] **Step 1: `updating-all-lxd-containers`** (source `Updating-all-LXD-containers.md`)
  - date: `2017-03-02`, title: `Updating All LXD Containers`
  - description: `This script allows you to upgrade the OS on all your LXD containers. It could easily be modified to run whatever you'd like.`
  - Shortcode: `{{< codeblock "updateAllContainers.sh" "bash" >}}...{{< /codeblock >}}` → fenced block:
    ````
    ```bash
    <script content verbatim>
    ```
    ````
    Keep the filename as a bold line above the block: `**updateAllContainers.sh**`.

- [ ] **Step 2: `terminating-torrents`** (source `Terminating-Torrents.md`)
  - date: `2017-03-19`, title: `Terminating Torrents`
  - description: `I don't often Torrent, but when I do, it's my business and no one else's.`
  - Shortcodes: two `{{< highlight bash >}}...{{< /highlight >}}` → ` ```bash ` fenced blocks.
  - Inline `{{< figure class="inline-block" src="/images/play.png" alt="play" >}}` inside a sentence → copy `play.png` to article dir and use an inline `<Image src={playIcon} alt="play" className="inline-block" />` (import at top). Keep the sentence intact.

- [ ] **Step 3: `things-i-believe`** (source `Things-I-Believe.md`)
  - date: `2017-07-10`, title: `Things I Believe`
  - description: `Thoughts and ideas that guide me through my working life, collected over years of technology platforms, programming methodologies, and ways of doing business.`
  - Body uses setext `---` headings (`General`, etc.) — convert each to `## Heading` (procedure step 6).
  - Shortcode (inside a bullet): `{{<image classes="fancybox center" src="/images/TRS-80-reference-manual.jpg" thumbnail=... >}}` → thumbnail attrs collapse to the single full image: copy `TRS-80-reference-manual.jpg`, render `<Image src={trs80} alt="TRS-80 reference manual" />` after that bullet's text.

- [ ] **Step 4: `how-to-pick-a-password`** (source `Pick-A-Password.md`)
  - date: `2017-09-28`, title: `How to Pick a Password`
  - description: `Most of what you've been told about generating a good password is wrong.`
  - Shortcode: `{{< figure src="/images/xkcd-pick-password.png" link="https://xkcd.com/936/" >}}` → image wrapped in a link:
    ```mdx
    <a href="https://xkcd.com/936/"><Image src={xkcd} alt="xkcd 936: Password Strength" /></a>
    ```
  - Check body for other markdown-referenced images (`chbs.png` likely) and copy them too.

- [ ] **Step 5: Verify**

`npm run build` passes; dev-server check of all 4 articles; code blocks render with Prism highlighting; fidelity check against sources.

- [ ] **Step 6: Checkpoint** for Marc.

---

## Task 6: Articles batch 3 — complex posts (gist, alerts, hl-text)

**Files:**
- `src/app/articles/gdpr-wrong/page.mdx`
- `src/app/articles/troubleshooting-smtp/page.mdx`

- [ ] **Step 1: `gdpr-wrong`** (source `gdpr-wrong.md`)
  - date: `2018-07-19`, title: `GDPR Wrong`
  - description: `The GDPR harmonizes the handling of personal data for all EU citizens — and almost everyone is implementing it wrong.`
  - Three `{{< figure >}}` shortcodes (`gdpr/value.png`, `gdpr/nope.png`, `gdpr/cookies.png`) with `title` captions → figure-with-caption form; copy images to article dir.
  - `{{< gist mrunkel 7f16fad35250da476ab0cc58aebde7ec >}}` →
    ```mdx
    import { Gist } from '@/components/Gist'
    ...
    <Gist user="mrunkel" id="7f16fad35250da476ab0cc58aebde7ec" language="js" />
    ```
  - Check body for other images (`fail-tn.png` is frontmatter thumbnail — dropped).

- [ ] **Step 2: `troubleshooting-smtp`** (source `Troubleshooting-SMTP.md`)
  - date: `2008-08-13`, title: `Troubleshooting SMTP`
  - description: `Internet email is easy to troubleshoot if you do it step by step. A quick guide to figuring out what's wrong when you can't send or receive email.`
  - Two `{{< alert info >}}...{{< /alert >}}` → blockquotes (`> ...`).
  - Eight `{{< hl-text primary >}}X{{< /hl-text >}}` occurrences: these mark *the commands the user types* inside terminal transcripts. The transcripts should become fenced code blocks (no language). Since fenced blocks can't carry bold, represent the typed commands by keeping them on their own lines exactly as in the source — the `hl-text` wrapper is simply dropped. Where `hl-text` appears in prose (outside a transcript), use `**bold**`.
  - This post may contain raw `<` characters in SMTP dialogue (e.g. `<foo@bar.com>`) — keep all transcripts inside fenced code blocks so MDX doesn't parse them as JSX.
  - Check body for images (`Internet-mail-thumb.png` is likely frontmatter thumbnail — dropped; `stop-sign.png` if in body, copy it).

- [ ] **Step 3: Verify all 10 articles**

Run: `npm run build` → success.
Run dev server; `curl -s localhost:3000/articles` lists exactly 10 articles, newest first (gdpr-wrong / free-software at top, troubleshooting-smtp last).
Open `/articles/gdpr-wrong` — gist renders as highlighted code with a "View this gist on GitHub" link.
Fidelity check both posts against sources.

- [ ] **Step 4: Checkpoint** for Marc.

---

## Task 7: About page

**Files:**
- Modify: `src/app/about/page.tsx`
- Copy: `/Users/mrunkel/Herd/runkel.org/static/images/me.jpg` → `src/images/portrait.jpg` (overwrite demo portrait, keep filename)

- [ ] **Step 1: Replace portrait image**

```bash
cp /Users/mrunkel/Herd/runkel.org/static/images/me.jpg src/images/portrait.jpg
```

- [ ] **Step 2: Rewrite `src/app/about/page.tsx` content**

Keep the entire component structure/styling. Change only:
- Remove `InstagramIcon`/`XIcon` imports and their two `SocialLink` entries (lint requires unused imports gone).
- `metadata`: title `About`, description `I'm Marc Runkel. Problem solver, based in Düsseldorf, Germany.`
- `<h1>`: `I'm Marc Runkel. I live in Düsseldorf, Germany, where I solve problems.`
- Body paragraphs: port the Hugo about content faithfully (source `content/page/about.md`):
  - Para 1: "Just a quick note. This blog is my thoughts and ideas. I don't represent anyone and I don't get any renumeration for any products or services I talk about."
  - Para 2: 'So what I'm saying is: "This site is all about me."'
  - (The `{{< image src="/images/me.jpg" >}}` shortcode is satisfied by the portrait already on the page — don't duplicate it.)
- SocialLinks: GitHub → `https://github.com/mrunkel` ("Follow on GitHub"), LinkedIn → `https://linkedin.com/in/marcrunkel` ("Follow on LinkedIn"), Mail → `mailto:marc@runkel.org` displaying `marc@runkel.org`.

- [ ] **Step 3: Verify**

`npm run build` passes; `/about` renders with photo and correct links; `npm run lint` clean for the file.

- [ ] **Step 4: Checkpoint** for Marc.

---

## Task 8: Home page

**Files:**
- Modify: `src/app/page.tsx`
- Copy: 5 photo-strip images from Hugo site → `src/images/photos/image-1.jpg` … `image-5.jpg` (overwrite, keep filenames)
- Copy: `me.jpg` → `src/images/avatar.jpg` (overwrite header avatar)
- Delete: `src/images/logos/` (all demo logos)

- [ ] **Step 1: Replace photo-strip images and avatar**

```bash
cp "/Users/mrunkel/Herd/runkel.org/static/images/d-dorf.jpg" src/images/photos/image-1.jpg
cp "/Users/mrunkel/Herd/runkel.org/static/images/Bruges/night-scene.jpg" src/images/photos/image-2.jpg
cp "/Users/mrunkel/Herd/runkel.org/static/images/beliefs.jpg" src/images/photos/image-3.jpg
cp "/Users/mrunkel/Herd/runkel.org/static/images/Bruges/au-petit-grand.jpg" src/images/photos/image-4.jpg
cp "/Users/mrunkel/Herd/runkel.org/static/images/containers.jpg" src/images/photos/image-5.jpg
cp "/Users/mrunkel/Herd/runkel.org/static/images/me.jpg" src/images/avatar.jpg
```

(Photos are placeholders Marc can swap; check each exists first, substitute another image from `static/images/` if one is missing.)

- [ ] **Step 2: Edit `src/app/page.tsx`**

- Hero: `<h1>` → `Problem solver, technologist, and perpetual learner.`; intro paragraph → `I'm Marc Runkel, an IT executive based in Düsseldorf, Germany. I've spent 30+ years solving problems across applications, networks, and data centers — and I'm still learning something new every day.`
- SocialLinks: keep only GitHub (`https://github.com/mrunkel`) and LinkedIn (`https://linkedin.com/in/marcrunkel`); remove X/Instagram imports + usages.
- Delete the `Newsletter` component and `MailIcon` (and the `Button` import if then unused — note: `Resume` widget also uses `Button`, keep it).
- `Resume` widget data (from the old resume; no logos exist, so make `logo` optional in the `Role` interface and render a neutral placeholder — the company's first letter in a styled span — when absent):

```tsx
let resume: Array<Role> = [
  {
    company: 'plusForta GmbH',
    title: 'CTO',
    start: '2017',
    end: { label: 'Present', dateTime: new Date().getFullYear().toString() },
  },
  {
    company: 'Untangle',
    title: 'VP of Technical Operations',
    start: '2008',
    end: '2016',
  },
  {
    company: 'Skyriver / Total IT',
    title: 'Senior IT Engineer',
    start: '2004',
    end: '2008',
  },
  {
    company: 'IXP (NYPD 911)',
    title: 'Technical Manager',
    start: '2003',
    end: '2004',
  },
]
```

Placeholder render inside the existing logo circle div:

```tsx
{role.logo ? (
  <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
) : (
  <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
    {role.company.charAt(0)}
  </span>
)}
```

- "Download CV" button → `<Button href="/resume" variant="secondary" ...>View Resume</Button>` (keep or drop the arrow icon; if dropped, delete `ArrowDownIcon`).
- Remove logo imports (`logoAirbnb` etc.), then delete `src/images/logos/`.
- In the right column, `<Newsletter />` is removed leaving just `<Resume />`.

- [ ] **Step 3: Verify**

`npm run build` + `npm run lint` pass. Home shows bio, 2 social icons, photo strip, 4 most recent articles, Work card with 4 roles and letter placeholders. Header avatar is Marc's photo.

- [ ] **Step 4: Checkpoint** for Marc.

---

## Task 9: Resume page

**Files:**
- Create: `src/app/resume/page.tsx`

Content source: `/Users/mrunkel/Herd/runkel.org/static/resume/index.html` — extract text content only; all old CSS/LESS/fonts are discarded. **Port content as-is, do not update or editorialize.**

- [ ] **Step 1: Build the page**

Use `SimpleLayout` for the header (title: `Resume`, intro: the "Career Profile" opening line) and `Section` (`src/components/Section.tsx`) for groupings, following the styling idiom of the template. Structure:

1. **Contact** (top intro area or first section): Marc Runkel — "Solve any problem" IT Executive; `marc@runkel.org`; runkel.org; linkedin.com/in/marcrunkel; github.com/mrunkel. (Omit the phone numbers — they're personal data on a public site; flag to Marc in the checkpoint note that they were dropped deliberately, he can ask to restore.)
2. **Career Profile**: the full bullet list from the source (30+ years experience, architected/coded/deployed..., hands-on manager, polyglot developer, Scrum & Waterfall, DevOps before it had a name, project management, networking, virtualization, remote-work experience).
3. **Experience**: one entry per role, each with company, location, dates, and the complete bullet lists from the source HTML (including sub-groupings like IT Department / Website & E-Commerce / Datacenter Management / Customer Support / Product Management for Untangle):
   - CTO, plusForta GmbH — Düsseldorf, Germany (2017–Present)
   - VP of Technical Operations, Untangle — San Jose, CA & Düsseldorf (2008–2016)
   - Senior IT Engineer, Skyriver/Total IT — San Diego, CA (2004–2008)
   - PSAC (NYPD 911) Technical Manager, IXP — New York, NY (2003–2004)
   - Director of IT, ClearCross — New York, NY (1998–2002)
   - Network Planner, Universal Studios — Hollywood, CA (1997–1998)
   - Network Specialist, University of Massachusetts — Amherst, MA (1992–1997)
   - IT Manager, The Progressive Group — Hadley, MA (1990–1992)
4. **Education**: Computer Systems Analysis, UMass Amherst (1996–1997); Computer Science, UC Irvine (1986–1990).
5. **Languages**: English (Native), German (Fluent C2).
6. **Interests**: Traveling, Technology, Cooking, Learning.

Add `export const metadata = { title: 'Resume', description: 'Marc Runkel — IT executive with 30+ years of experience.' }`.

- [ ] **Step 2: Verify**

`npm run build` passes; `/resume` renders all sections; dark mode looks right (toggle in header); every employer from the old resume is present (8 roles).

- [ ] **Step 3: Checkpoint** for Marc.

---

## Task 10: Redirects + favicons

**Files:**
- Modify: `next.config.mjs`
- Copy favicons from `/Users/mrunkel/Herd/runkel.org/static/` → `src/app/` / `public/`

- [ ] **Step 1: Add redirects to `next.config.mjs`**

Add inside `nextConfig`:

```js
async redirects() {
  return [
    { source: '/2008/08/troubleshooting-smtp', destination: '/articles/troubleshooting-smtp', permanent: true },
    { source: '/2016/09/the-only-important-rule-of-the-scrum-process.', destination: '/articles/the-only-important-rule-of-the-scrum-process', permanent: true },
    { source: '/2017/03/updating-all-lxd-containers', destination: '/articles/updating-all-lxd-containers', permanent: true },
    { source: '/2017/03/terminating-torrents', destination: '/articles/terminating-torrents', permanent: true },
    { source: '/2017/07/things-i-believe', destination: '/articles/things-i-believe', permanent: true },
    { source: '/2020/07/things-i-believe', destination: '/articles/things-i-believe', permanent: true },
    { source: '/2017/07/drawing-a-network-diagram', destination: '/articles/drawing-a-network-diagram', permanent: true },
    { source: '/2017/09/how-to-pick-a-password', destination: '/articles/how-to-pick-a-password', permanent: true },
    { source: '/2018/07/free-software', destination: '/articles/free-software', permanent: true },
    { source: '/2018/07/gdpr-wrong', destination: '/articles/gdpr-wrong', permanent: true },
    { source: '/page/about', destination: '/about', permanent: true },
    { source: '/index.xml', destination: '/feed.xml', permanent: true },
  ]
},
```

Notes: the Scrum source path genuinely ends in `.` — keep it. No redirect for `bruges-belgium` (never published). Next.js normalizes trailing slashes automatically (`/x/` → `/x` 308 → redirect), verified below.

- [ ] **Step 2: Replace favicon**

```bash
cp /Users/mrunkel/Herd/runkel.org/static/favicon.ico src/app/favicon.ico
cp /Users/mrunkel/Herd/runkel.org/static/apple-touch-icon-180x180.png public/apple-touch-icon.png
```

(`apple-touch-icon.png` in `public/` is picked up by convention; no metadata change needed.)

- [ ] **Step 3: Verify redirects**

Run dev server, then for each source URL check both with and without trailing slash, e.g.:

```bash
for u in "/2008/08/troubleshooting-smtp" "/2016/09/the-only-important-rule-of-the-scrum-process." "/2017/03/updating-all-lxd-containers" "/2017/03/terminating-torrents" "/2017/07/things-i-believe" "/2020/07/things-i-believe" "/2017/07/drawing-a-network-diagram" "/2017/09/how-to-pick-a-password" "/2018/07/free-software" "/2018/07/gdpr-wrong" "/page/about" "/index.xml"; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "localhost:3000$u")"
  echo "$u/ -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "localhost:3000$u/")"
done
```

Expected: every line shows `308` with the correct destination (trailing-slash variants may chain through the normalize redirect — follow with `curl -L` and confirm final URL is the article and status 200).

- [ ] **Step 4: Checkpoint** for Marc.

---

## Task 11: Final sweep + full verification

- [ ] **Step 1: Demo-content grep**

```bash
grep -rni 'spencer\|planetaria\|animaginary\|cosmos\|airbnb\|starbucks' src/ public/ next.config.mjs
```

Expected: zero hits. Fix any stragglers.

- [ ] **Step 2: Unused asset check**

`src/images/logos/` gone; demo `portrait.jpg`/`avatar.jpg`/photos overwritten with Marc's images. `git status` shows no deleted-but-referenced files.

- [ ] **Step 3: Clean build + lint**

```bash
rm -rf .next && npm run build && npm run lint
```

Expected: both pass with no errors.

- [ ] **Step 4: Full page sweep on dev server**

`/`, `/about`, `/articles`, all 10 `/articles/<slug>`, `/resume`, `/feed.xml` → all 200, no broken images (check terminal for 404s while browsing), dark-mode toggle works. `/feed.xml` contains all 10 articles with correct titles/dates.

- [ ] **Step 5: Content fidelity audit**

For each of the 10 posts, diff the rendered article text against the Hugo source body — every paragraph, list item, link, and image present. (Reading both side by side is sufficient; report any intentional deviations, e.g. dropped thumbnails, the dropped phone numbers on the resume.)

- [ ] **Step 6: Final checkpoint** — summarize all changes for Marc to review and commit.
