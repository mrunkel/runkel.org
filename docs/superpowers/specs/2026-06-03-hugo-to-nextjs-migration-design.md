# Hugo → Next.js Migration Design

**Date:** 2026-06-03
**Status:** Approved by Marc

## Goal

Migrate the content of the Hugo-based personal site at `../runkel.org` into this
Next.js site (Tailwind Plus "Spotlight" template) and get it running perfectly
locally. The Hugo site is read-only reference material — nothing in
`../runkel.org` is modified, and no cutover/deployment step is in scope.

Deployment target (for configuration decisions only): Vercel / Node host. No
static export needed.

## Approach

Port each Hugo post into the template's native MDX structure
(`src/app/articles/<slug>/page.mdx`). With only 10 posts, a one-time manual
conversion is cheaper and cleaner than building a markdown content pipeline,
and future posts get authored as MDX — the template's happy path.

Rejected alternatives:

- **Markdown content pipeline** (gray-matter/remark reading Hugo-style
  `content/post/*.md`): preserves authoring format but requires rewriting
  `src/lib/articles.ts`, loses MDX features, and needs custom shortcode
  handling. Worth it at 200 posts, not 10.
- **Hybrid** (verbatim markdown + adapters): worst of both at this size.

## 1. Content migration

### Posts (10)

Each Hugo post becomes `src/app/articles/<slug>/page.mdx` following the
template's existing article pattern:

```js
export const article = {
  author: 'Marc Runkel',
  date: 'YYYY-MM-DD',
  title: '...',
  description: '...',
}
```

- **Slug**: taken from Hugo's actual generated URL (ground truth:
  `../runkel.org/public/`), cleaned up where the old slug is awkward (e.g.
  the Scrum post's old slug ends in a literal period — the new slug drops it).
- **Description**: the excerpt text before Hugo's `<!--more-->` marker
  (condensed to one or two sentences if long). The `<!--more-->` marker itself
  is removed from the body.
- **Hugo shortcodes** — explicit mapping (all seven shortcode types used
  across the posts):

  | Shortcode | Occurrences | MDX conversion |
  |---|---|---|
  | `{{< image >}}` | 1 | Imported `Image` component (thumbnail attrs collapse to the single full image) |
  | `{{< figure >}}` | 6 | `Image` + caption text |
  | `{{< highlight >}}` / `{{< codeblock >}}` | 2 / 1 | Fenced code block with language tag |
  | `{{< hl-text >}}` | 8 | Bold/emphasis (`**…**`) — template has no text-highlight idiom |
  | `{{< alert >}}` | 2 | Blockquote (template's styled `blockquote` via Prose) |
  | `{{< gist >}}` | 1 | New `<Gist />` React server component: fetches the gist's raw content at build time, renders it as a syntax-highlighted code block via the template's Prism styling, with a "view on GitHub" link. No client-side script embed. |
- **Images**: copied from `../runkel.org/static/images/` and co-located in each
  article's folder (the template's pattern), imported and rendered via the
  MDX `Image` component.
- **Dropped**: categories, tags, keywords, thumbnail/cover frontmatter,
  comments flags — Spotlight has no taxonomy or comments.
- **Kept**: title, date, full body content (fidelity verified against the
  original).

Post inventory and redirect map. Old URLs are taken from Hugo's actual
generated output in `../runkel.org/public/` (ground truth, verified — slugs
come from post titles, not filenames):

| Hugo file | Date | Old URL (from public/) | New URL |
|---|---|---|---|
| Troubleshooting-SMTP.md | 2008-08-13 | /2008/08/troubleshooting-smtp/ | /articles/troubleshooting-smtp |
| Only-Important-Scrum-Rule.md | 2016-09-04 | /2016/09/the-only-important-rule-of-the-scrum-process./ | /articles/the-only-important-rule-of-the-scrum-process |
| Updating-all-LXD-containers.md | 2017-03-02 | /2017/03/updating-all-lxd-containers/ | /articles/updating-all-lxd-containers |
| Terminating-Torrents.md | 2017-03-19 | /2017/03/terminating-torrents/ | /articles/terminating-torrents |
| Things-I-Believe.md | 2017-07-10 | /2017/07/things-i-believe/ **and** /2020/07/things-i-believe/ (both exist in public/; both redirect) | /articles/things-i-believe |
| Drawing-A-Network-Diagram.md | 2017-07-12 | /2017/07/drawing-a-network-diagram/ | /articles/drawing-a-network-diagram |
| Bruges-Belgium.md | 2017-07-20 | — (was `draft: true`, never published; no redirect) | /articles/bruges-belgium |
| Pick-A-Password.md | 2017-09-28 | /2017/09/how-to-pick-a-password/ | /articles/how-to-pick-a-password |
| free-software.md | 2018-07-19 | /2018/07/free-software/ | /articles/free-software |
| gdpr-wrong.md | 2018-07-19 | /2018/07/gdpr-wrong/ | /articles/gdpr-wrong |

Notes:

- **Bruges-Belgium.md is a draft in Hugo and was never published. Decision
  (Marc): publish it now** as a normal article on the new site. It gets no
  redirect (no old URL exists).
- The Scrum post's old URL really does end in `.` (period) — the redirect
  source must include it; the new slug drops it.
- All 10 posts migrate; 9 published posts get redirects (Things-I-Believe
  gets two).

### About page

`src/app/about/page.tsx` rewritten with the Hugo about-page content
("This site is all about me") plus `me.jpg` as the portrait image. Social
links: GitHub (`mrunkel`), LinkedIn (`marcrunkel`), email
(`marc@runkel.org`). Demo text removed.

## 2. Pages

Final site structure: **Home, About, Articles, Resume** (4 pages plus
individual articles).

### Home (`/`)

- Bio/intro: "Problem Solver", Düsseldorf, Germany — adapted from Hugo config
  author block; Marc to refine wording later if desired.
- Social icons: GitHub, LinkedIn (newsletter form removed).
- Photo strip: kept, seeded with suitable images from the Hugo site
  (`d-dorf.jpg`, `me.jpg`, etc.); Marc can swap photos later.
- Recent articles list: works automatically once posts are migrated.
- Work-history widget ("Work" card): populated from the resume content in
  `../runkel.org/static/resume/index.html`. Company logos omitted or replaced
  with a neutral placeholder where no logo asset exists.

### Resume (`/resume`)

New page at `src/app/resume/page.tsx`. Content extracted from the old static
HTML resume (`../runkel.org/static/resume/index.html`), rebuilt in Spotlight
idiom (`SimpleLayout` + section components), with dark-mode support. Content
ported as-is; updating resume content is out of scope. Only the text content
is extracted — the old resume's CSS/LESS themes, fonts, and other assets are
discarded entirely (Spotlight styling replaces them).

### Removed

- Pages: `/projects`, `/speaking`, `/uses`, `/thank-you`.
- The three demo articles and their images.
- Demo assets: `src/images/logos/*`, demo `src/images/photos/*` (replaced by
  Hugo-site photos), demo `avatar.jpg`/`portrait.jpg` (replaced by `me.jpg`).
- Header/footer nav updated to: Home, About, Articles, Resume.

## 3. Plumbing

- **Redirects** (`next.config.mjs`, `permanent: true`):
  - The 10 old post URLs per the table above (9 posts, Things-I-Believe ×2;
    with and without trailing slash — Next.js handles trailing-slash
    normalization, verified locally).
  - `/page/about` → `/about`.
  - `/index.xml` → `/feed.xml` (Hugo RSS path → template RSS route).
- **RSS**: template's `/feed.xml` route works on Vercel as-is; it picks up
  migrated articles automatically.
- **Favicons**: copied from Hugo `static/` into `public/` and wired via app
  metadata.
- **Dropped**: Google Analytics (dead UA property), Disqus, cookie-consent
  JS/CSS.
- **Site metadata**: title "Marc Runkel", description from Hugo config
  ("Marc Runkel's place on the Internet") — applied in `src/app/layout.tsx`.
- **Env**: `.env.local` with `NEXT_PUBLIC_SITE_URL=https://runkel.org`.

## 4. Verification

- `npm run build` passes clean (this also catches MDX syntax errors).
- `npm run dev`: manually verify every page (Home, About, Articles index,
  all 10 articles, Resume, feed.xml) renders without errors, no broken
  images, dark mode works.
- Every redirect in the map returns 308 to the correct target.
- Content fidelity: each migrated post compared against the Hugo original
  (no lost paragraphs, images, or links).
- No remaining references to removed pages/demo content (grep for
  `/projects`, `/speaking`, `/uses`, `/thank-you`, demo names).

## Out of scope

- Any modification to `../runkel.org` (cutover, deletion, commits there).
- Deployment to Vercel.
- Rewriting/updating resume or post content.
- Comments, analytics, taxonomy (tags/categories) features.
