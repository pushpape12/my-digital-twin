# Meet Pushpa

A responsive, recruiter-facing digital twin of Pushpa Peddamganti. Built with native JavaScript, CSS, HTML, and a dependency-free Node server.

## Run

Requires Node.js 20 or newer. No install step or API key is needed.

```sh
npm start
npm test
npm run check
```

The server defaults to port 3000 on loopback. For a hosting platform, set `HOST=0.0.0.0` and its supplied `PORT`. You can also deploy the four frontend files (`index.html`, `styles.css`, `app.js`, `knowledge.js`) to a static web host with HTTPS. No backend data storage is required. This repository does not automatically publish a public site.

## Features

- Clearly disclosed AI twin with an initials avatar.
- Profile-grounded topic retrieval for typed questions; unknown facts are acknowledged.
- Eight project walkthroughs separating self-reported contributions from illustrative workflows.
- Career timeline, education, and LinkedIn contact.
- Job-description keyword comparison: supported skills, selected undocumented requirements, and questions for human review. It is not an exhaustive assessment or hiring score. Negation and requirement priority are not interpreted.
- Optional browser speech playback with a standard synthetic voice. Microphone input uses browser speech recognition where supported, usually requiring HTTPS or localhost and permission. A notice appears before recording because the browser provider may process audio remotely.
- Responsive layout, keyboard-focus styles, native accessible dialogs, reduced-motion support, and live chat announcements.

## Content and privacy

`knowledge.js` contains only the professional information Pushpa supplied in chat. It is self-reported, not independently verified. No portrait, resume PDF, private LinkedIn analytics, contact details, invented metrics, or proprietary employer material is included. SnowPro Core is marked expired September 2025 unless a renewal is confirmed. “Present” employment reflects the supplied profile; review it before publication.

This first version uses deterministic topic matching, **not a live generative model**. It does not impersonate Pushpa or claim to speak on behalf of an employer. General workflow diagrams are explicitly illustrative. To extend answers, edit the curated content in `knowledge.js`. A future model integration should run server-side, protect credentials, cite profile evidence, and retain the unknown-answer boundary.

Typed chat and pasted job descriptions stay in page memory and are cleared on refresh. No analytics, cookies, third-party fonts, or remote AI calls are used. Speech features depend on browser/OS providers. No voice cloning is included.

## Validation

`npm test` exercises factual retrieval, unknown-answer handling, certification status, job matching, and project evidence boundaries. `npm run check` validates JavaScript syntax. Headless Chromium integration checks passed for chat, unknown facts, walkthrough dialogs, role matching, safe text rendering, clearing chat, mobile horizontal overflow at 390px, and absence of browser errors. HTTP checks confirmed the app returns 200 and an undeclared file path returns 404. Real microphone capture and audible speech playback were not tested; verify them on the target browser.

## Publish a shareable website with GitHub Pages

1. Create or grant access to `pushpape12/my-digital-twin`. For free GitHub Pages on a personal account, use a public repository; private repository support depends on your plan. Only the supplied public-facing professional profile is included.
2. Upload this project's files to the repository root on `main`, including `.github/workflows/pages.yml`.
3. In the repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
4. Open **Actions → Deploy Meet Pushpa to GitHub Pages**. Run the workflow manually if the initial push happened before Pages was enabled.
5. After a successful deployment, share the URL reported by the workflow's `github-pages` environment. The expected address for this exact owner and repository is `https://pushpape12.github.io/my-digital-twin/`; it is not live until publication succeeds.

The workflow runs tests, publishes only the four frontend files, and provides HTTPS. The static site includes the profile-based assistant; a future generative AI agent needs a separate secured backend. Never put API keys in frontend JavaScript or GitHub Pages files. Workflow execution and the published URL must be verified after GitHub access is available.

## Forward Deployed Engineer positioning

The portfolio targets Forward Deployed Engineer roles without claiming that title as current employment. Recent owner-supplied additions cover Business Banking LoanWrapper, prepayment and prepayment OPM, FTP in a CCAR context, Spark cluster optimization for model execution performance, feature-based accuracy improvements without an invented percentage, and reusable skill files. Runtime figures and internal configuration details are withheld at the owner’s request. Public content does not include employer data, code, model parameters, or internal documents.

The older résumé contributes Snowflake operations, Snowpipe, CDC, performance tuning, Terraform, and AWS service experience. Current employment comes from the newer supplied profile. Conflicting education grades are omitted. Personal phone numbers, date of birth, and private contact details from the PDF are not published; the PDF itself is not committed.

LangChain, LangGraph, and RAG appear as planned project extensions, not implemented features or confirmed work experience. Confirm actual usage before promoting these into professional skills. This site itself is included as a shipped personal project.

## Portfolio layout and floating assistant

Dark navy and violet styling, subtle background grid, glass-like project cards, section navigation, and a prominent introduction are inspired by the user-selected visual reference. All content and code are specific to this portfolio; no reference-site biography, metrics, images, or source implementation is used. Sections cover about, skills, selected work, experience, achievements, and contact. An initials illustration is used because no portrait was supplied.

A fixed robot launcher at the bottom-right opens a nonmodal assistant panel. Visitors can continue browsing while chatting. It supports explicit close, Escape, a synchronized expanded state, and focus return to the launcher. On mobile it fits within the viewport. Existing voice features and evidence boundaries remain in place.

The downloadable résumé is the updated public version; it excludes private contacts, withheld benchmarks, and conflicting grades. Static deployments must include `Pushpa-Peddamganti-Resume.pdf`; the Pages workflow copies it explicitly. Browser checks passed for all sections, eight project cards, nonmodal chat, factual replies, keyboard close/focus, project dialog, role analysis, PDF download, mobile sizing, and absence of browser errors. Real microphone/audio output remains dependent on browser support and was not tested.
