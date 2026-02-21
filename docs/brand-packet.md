# Brand Packet: Musher

**Date**: 2026-02-21
**Version**: 1.0
**Stage**: Pre-launch / Stealth

---

## Competitive Position Scorecard

Analysis of 5 direct competitors and 3 aspirational sites across 5 dimensions.

### Direct Competitors

| Dimension | Factory AI | GitHub Agent HQ | Devin | Cursor | Windsurf |
|-----------|-----------|----------------|-------|--------|----------|
| Hero Impact | 4/5 | 4/5 | 4/5 | 4/5 | 3/5 |
| Copy Quality | 4/5 | 3/5 | 3/5 | 3/5 | 3/5 |
| Trust Density | 3/5 | 5/5 | 3/5 | 4/5 | 2/5 |
| Design Maturity | 4/5 | 4/5 | 4/5 | 5/5 | 3/5 |
| Tech Modernity | 5/5 | 5/5 | 4/5 | 5/5 | 4/5 |
| **Total** | **20/25** | **21/25** | **18/25** | **21/25** | **15/25** |

### Aspirational Sites

| Dimension | Linear | Vercel | Supabase |
|-----------|--------|--------|----------|
| Hero Impact | 5/5 | 5/5 | 4/5 |
| Copy Quality | 5/5 | 5/5 | 4/5 |
| Trust Density | 4/5 | 4/5 | 4/5 |
| Design Maturity | 5/5 | 5/5 | 4/5 |
| Tech Modernity | 5/5 | 5/5 | 5/5 |
| **Total** | **24/25** | **24/25** | **21/25** |

### Pattern Analysis

| Dimension | Category Pattern | Musher Opportunity |
|-----------|-----------------|-------------------|
| **Hero patterns** | Category-Creation (Factory), Split-Column (Devin), Centered Statement (Cursor) dominate | Animated Terminal — `mush bundle` CLI demo differentiates from GUI-focused competitors |
| **Copy strategy** | Category-Creation and Technical Authority most common; all lean heavily on "agent" framing | Technical Authority with proof — show deterministic pipeline execution, not AI hype |
| **Trust baseline** | GitHub has massive trust (150M+ users, Fortune 100); Factory/Devin thin on metrics | Founder credentials + GitHub velocity + open-source CLI; accept Trust Density 2 at pre-launch |
| **Design benchmark** | Cursor invested in custom typeface (CursorGothic); dark mode standard; all use Next.js + Tailwind | SvelteKit + Tailwind v4 is a tech differentiator; existing token system is production-ready |
| **Positioning gap** | No competitor positions on *developer control* — all frame agents as autonomous replacements | "Control plane" positions Musher as the tool that keeps developers in charge |

### Key Gap: Control vs. Autonomy

Every competitor positions AI coding agents as autonomous workers that replace developer effort. None position around *developer control over agent behavior*. This is Musher's category wedge: the control plane for developers who want agents to work deterministically, not autonomously.

---

## Strategic Foundation

### Field 1: Positioning Statement

**Musher** is a **control plane for AI coding agents** that helps **solo developers and small teams using tools like Claude Code** achieve **automated, observable, auditable agent workflows** by **bundling agent configurations into portable packages and routing events through deterministic pipelines with local-first execution**.

| Slot | Value | Quality Test |
|------|-------|-------------|
| Product | Musher | Unambiguous |
| Category | Control plane for AI coding agents | Searchable — developers search for "agent management", "agent orchestration" |
| Audience | Solo developers and small teams using Claude Code or similar AI coding agents | Picturable — a developer in their terminal, running Claude Code on a side project |
| Outcome | Automated, observable, auditable agent workflows | Measurable — can audit what agents did, replay events, verify deterministic output |
| Mechanism | Bundling agent configurations into portable packages and routing events through deterministic pipelines | Unique — no competitor offers `mush bundle` or event-driven agent pipeline execution |

### Field 2: Ideal Customer Profile (ICP)

**Primary**: A solo developer or small team lead using Claude Code (or Codex, OpenCode) who struggles with manually babysitting agents, config drift across projects, and zero visibility into what agents actually did.

| Attribute | Value |
|-----------|-------|
| Company stage | Pre-seed to Series A, or individual developer |
| Team size | 1-5 developers |
| Replacing | Manual agent invocation, scattered dotfiles, no pipeline between events and agent work |
| Trigger event | Third time re-configuring agent rules for a new repo; agent makes an unreviewed change that breaks prod |
| Cost of inaction | Hours per week of manual agent supervision; config drift causes inconsistent agent behavior across repos |
| Technical level | Technical — comfortable with CLI, YAML, git workflows |
| Evaluation method | `pip install musher` or `brew install musher` — self-serve CLI, free tier |
| Deal-breaker | Cloud-only execution (must work locally); vendor lock-in to a single AI agent provider |

### Field 3: Anti-ICP

We are explicitly not built for:

1. **Enterprise procurement buyers** looking for a cloud-hosted autonomous agent platform with SOC 2 compliance, SSO, and seats-based pricing — Musher is CLI-first, local-first, and designed for individual developers and small teams, not enterprise IT departments.

2. **Non-technical users** looking for a no-code or low-code way to "use AI" without understanding what agents do — Musher requires comfort with terminals, configuration files, and git. It shows you what agents are doing, which means you need to understand what you're looking at.

3. **Teams seeking full agent autonomy** looking for AI that codes independently without human oversight — Musher is a *control plane*. It adds guardrails, observability, and deterministic execution to agent workflows. If you want agents to run unsupervised with no audit trail, Musher is not for you.

### Field 4: Differentiators

| # | Capability | Proof | Proof Type | ICP Relevance |
|---|-----------|-------|-----------|--------------|
| 1 | Portable agent bundles: define reusable config packages with `mush bundle`, share publicly | Open-source CLI ships `bundle` command; bundles are git-trackable YAML + asset directories | Architecture + Open Source | Eliminates config drift — same agent behavior across every repo and team member |
| 2 | Event-driven job pipelines with durable retries and deterministic execution | Pipeline domain processes webhook events through configurable instruction chains with retry policies | Architecture | Agents run in response to real events (PR opened, issue labeled) with guaranteed delivery, not ad-hoc invocation |
| 3 | Local-first execution: CLI runs on your machine, your credentials, your context | `musher` CLI executes locally; no cloud relay required for agent invocation | Architecture + Negative Proof | No data leaves your machine unless you choose to; works offline, works in air-gapped environments |
| 4 | Agent-agnostic harness model: works with Claude Code, Codex, OpenCode, more planned | Integration domain supports multiple agent providers via harness abstraction | Architecture | Not locked into one agent vendor; switch providers without rewriting pipelines |

---

## Voice & Tone

### Field 5: Vibe

| # | Adjective | Definition | Observable In |
|---|-----------|-----------|--------------|
| 1 | **Candid** | Says what the product does and doesn't do. No hedging, no puffery. Acknowledges limitations. | Short declarative sentences. "Musher routes events to agent jobs. It does not make your agents smarter." Direct feature descriptions without qualification. |
| 2 | **Capable** | Demonstrates competence through specifics, not claims. Shows working systems. | Code examples in docs. CLI output screenshots. Architecture diagrams that show real data flow. Metrics where available, silence where not. |
| 3 | **Deliberate** | Every word, feature, and design choice is intentional. Nothing is accidental. | Tight copy with no filler. Consistent terminology (always "bundle", never "package" or "template"). Minimal UI with clear purpose for each element. |

**Archetype blend**: Technical Founder (precise, direct, understated) + Challenger Brand (opinionated, concise).

### Field 6: Anti-Vibe

| Vibe | Anti-Vibe | Boundary |
|------|-----------|----------|
| Candid | **Harsh** | "We are candid, but never harsh." Candor means stating facts plainly — not dismissing users, mocking competitors, or being abrasive about limitations. "We don't support X yet" is candid. "If you need X, use something else" is harsh. |
| Capable | **Elitist** | "We are capable, but never elitist." Showing competence means making complex things understandable — not gatekeeping with jargon, assuming prior knowledge, or writing docs only experts can parse. A CLI tool can be powerful and still have a clear `--help` output. |
| Deliberate | **Overthinking** | "We are deliberate, but never overthinking." Intentionality means purposeful choices — not analysis paralysis, excessive caveats, or refusing to ship until perfect. "We chose YAML over TOML because..." is deliberate. A 3-paragraph disclaimer before a code example is overthinking. |

### Field 7: Banned Vocabulary

**Default banned** (always):

| Banned Word | Replacement Strategy |
|-------------|---------------------|
| supercharge | Name the specific improvement: "reduce agent setup time from 20 minutes to 2" |
| unleash | Name what becomes possible: "run agents in response to any webhook event" |
| seamless | Describe the experience: "one command: `mush bundle apply`" |
| revolutionize | Name the change: "replaces manual agent invocation with event-driven pipelines" |
| empower | Name the capability: "gives developers full audit trails for every agent action" |
| robust | Name the quality: "retries failed jobs 3 times with exponential backoff" |
| unlock | Name the outcome: "define bundles once, reuse across every project" |
| leverage | Use "use" or name the action: "use existing webhook events to trigger agent jobs" |

**Product-specific banned**:

| Banned Word | Reason | Replacement |
|-------------|--------|-------------|
| AI-powered | Every competitor says this; it's noise | Name the specific agent: "works with Claude Code" |
| intelligent | Implies the tool thinks; Musher is deterministic | "deterministic" or "event-driven" |
| cutting-edge | Unverifiable claim | Describe the specific technical approach |
| next-generation | Vague future promise | Describe what ships today |
| scalable | Every SaaS claims this without proof | Cite specific numbers when available |
| game-changing | Hyperbolic, self-awarded | Let users decide; show the workflow |
| innovative | Self-congratulatory | Show the feature, don't label it |
| effortless | Dismisses real complexity; agents require thought | "One command" or "3-step setup" |
| holistic | Meaningless in developer tools | Name the specific scope |
| end-to-end | Only if literally true; overused | Name the actual boundaries |
| disruptive | Self-awarded disruption | Let the market decide |
| frictionless | Same issue as "seamless" | Describe the actual experience |

---

## Trust

### Field 8: Trust Signals

**Trust Density Score**: 2/5 (expected for pre-launch — see acquisition plan below)

#### Metrics

| Metric | Source | Status |
|--------|--------|--------|
| 21 releases in 13 days during initial development sprint | GitHub release history | Verified Feb 2026 |
| [placeholder: CLI install count] | PyPI / Homebrew download stats | Acquire post-launch |
| [placeholder: Bundle registry count] | Internal analytics | Acquire when registry launches |
| [placeholder: Events processed] | Internal telemetry | Acquire post-launch |

#### Logos

Pre-launch: no customer logos available.

| Logo | Status | Acquisition Path |
|------|--------|-----------------|
| [placeholder: Early adopter 1] | Needed | Design partner outreach |
| [placeholder: Early adopter 2] | Needed | Design partner outreach |
| [placeholder: Early adopter 3] | Needed | Design partner outreach |
| Claude Code (integration partner) | Available | Agent provider — display as "Works with" integration logo |
| Codex (integration partner) | Available | Agent provider — display as "Works with" integration logo |
| OpenCode (integration partner) | Available | Agent provider — display as "Works with" integration logo |

#### Badges

| Badge | Status | Timeline |
|-------|--------|----------|
| [placeholder: SOC 2 Type II] | Not started | Consider post-revenue |
| Open Source CLI | Available now | MIT license, public GitHub repo |

#### Quotes

| Quote | Person | Role | Company | Status |
|-------|--------|------|---------|--------|
| [placeholder] | [placeholder] | [placeholder] | [placeholder] | Acquire from design partners |

#### Community

| Signal | Value | Source | Status |
|--------|-------|--------|--------|
| GitHub stars | [placeholder] | github.com/musher-dev/musher | Track post-launch |
| Discord members | [placeholder] | Discord server | Launch with product |
| Contributors | [placeholder] | GitHub contributors graph | Track post-launch |

#### Media

| Mention | Publication | Status |
|---------|------------|--------|
| [placeholder] | [placeholder] | Pursue after public launch |

**Founder credential** (available now):
Justin Merrell — Founding Engineer then Chief of Staff at RunPod. Creator of [runpod-python](https://github.com/runpod/runpod-python), the official Python SDK for RunPod's serverless GPU platform. Demonstrated track record of building developer-facing infrastructure tools from zero to production at scale.

#### Placement Strategy

| Zone | Signals |
|------|---------|
| Hero | "Works with" agent logos (Claude Code, Codex, OpenCode) + primary metric when available |
| Post-Claim | Founder credential after "built by" claim; GitHub velocity metric (21 releases in 13 days) |
| Feature | Bundle-specific metric or quote per feature section when available |
| Pricing | Open source badge + "no credit card required" for free tier |
| Footer | GitHub link + Discord + open source license badge + agent integration logos |

#### Trust Signal Acquisition Plan

| Priority | Signal | Target | Timeline |
|----------|--------|--------|----------|
| 1 | CLI install count | 500+ installs | Launch + 30 days |
| 2 | GitHub stars | 200+ stars | Launch + 60 days |
| 3 | Design partner logos (3) | Named companies using Musher | Launch + 90 days |
| 4 | Named testimonial quote (1) | Metric-backed quote from design partner | Launch + 90 days |
| 5 | Community size | 100+ Discord members | Launch + 60 days |
| 6 | Press mention | Developer-focused publication (DevTo, HN, or similar) | Launch + 120 days |

---

## Visual System

### Field 9: Color Tokens

Derived from existing `brand/tokens/primitives/colors.json` and `brand/tokens/semantic/colors.dark.json`. Dark mode first — marketing pages default to dark.

| Token | Hex | OKLCH | Role | Source Token |
|-------|-----|-------|------|-------------|
| accent-primary | #00A3A0 | `oklch(65% 0.14 195)` | CTA buttons, links, key highlights | `color.brand.teal.500` |
| base-dark | #161616 | `oklch(14% 0.005 285)` | Page background | `color.neutral.5` / `surface.base` |
| surface-secondary | #262626 | `oklch(20% 0.005 285)` | Cards, code blocks, elevated panels | `color.neutral.10` / `surface.elevated` |
| text-primary | #F4F4F4 | `oklch(96% 0 0)` | Headlines, key content | `color.neutral.95` / `text.primary` |
| text-secondary | #C6C6C6 | `oklch(78% 0 0)` | Body text, descriptions | `color.neutral.70` / `text.secondary` |
| border-subtle | #525252 | `oklch(36% 0.005 285)` | Dividers, card borders | `color.neutral.20` / `border.subtle` |

**Supplementary marketing tokens** (from existing system):

| Token | Hex | OKLCH | Role |
|-------|-----|-------|------|
| signal-action | #4589FF | `oklch(59% 0.24 255)` | Interactive primary (secondary CTA) |
| signal-success | #42BE65 | `oklch(72% 0.17 145)` | Deterministic pass indicators |
| warmth-coral | — | `oklch(70% 0.15 25)` | Human warmth moments (onboarding, celebration) |
| glow-brand | — | `rgba(0, 163, 160, 0.3)` | Marketing emphasis glow effect |

**Contrast ratios** (on base-dark #161616):
- accent-primary (#00A3A0): ~5.2:1 — passes WCAG AA (4.5:1)
- text-primary (#F4F4F4): ~15.3:1 — passes WCAG AAA (7:1)
- text-secondary (#C6C6C6): ~10.1:1 — passes WCAG AAA (7:1)

**Derivation**: All tokens reference existing `brand/tokens/` primitives. Engineering Teal (`oklch(65% 0.14 195)`) bridges trust (blue hue range) and forward movement (green hue range) at hue 195. Dark mode uses near-black with a slight cool cast (hue 285, chroma 0.005) to avoid pure black harshness.

### Field 10: Typography System

Derived from existing `brand/tokens/primitives/typography.json`. Inter for UI/marketing, JetBrains Mono for code — following the developer-focused decision tree path (Inter + JetBrains Mono pairing).

| Role | Family | Size | Line Height | Weight | Tracking |
|------|--------|------|-------------|--------|----------|
| Display/Hero | Inter | 64px | 72px (1.13) | 700 (Bold) | -0.02em |
| Display | Inter | 48px | 56px (1.17) | 700 (Bold) | -0.02em |
| Page Title | Inter | 24px | 32px (1.33) | 600 (Semibold) | -0.01em |
| Section Heading | Inter | 20px | 28px (1.40) | 600 (Semibold) | -0.01em |
| Heading Small | Inter | 16px | 24px (1.50) | 600 (Semibold) | 0 |
| Body Large | Inter | 16px | 24px (1.50) | 400 (Regular) | 0 |
| Body | Inter | 14px | 20px (1.43) | 400 (Regular) | 0 |
| Data | Inter | 13px | 20px (1.54) | 400 (Regular) | 0 |
| Label | Inter | 11px | 16px (1.45) | 500 (Medium) | +0.5px |
| Code/Mono | JetBrains Mono | 14px | 20px (1.43) | 400 (Regular) | 0 |
| Code Display | JetBrains Mono | 16px | 24px (1.50) | 400 (Regular) | 0 |

**Font stacks** (from `brand/tokens/primitives/typography.json`):
- Sans: `Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- Mono: `JetBrains Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

**Baseline Grid**: 4px — all line heights snap to 4px multiples.

**Weight Contrast**: Display 700 / Body 400 = delta 300 (exceeds minimum 200).

**Responsive type scale** (fluid sizing for marketing pages):
- Hero: `clamp(2.5rem, 5vw, 4rem)` — 40px to 64px
- Display: `clamp(2rem, 4vw, 3rem)` — 32px to 48px
- Title: `clamp(1.25rem, 2vw, 1.5rem)` — 20px to 24px

### Field 11: Spatial Rules

Derived from existing `brand/tokens/primitives/spacing.json`. 4px/8px grid system.

**Scale** (from `brand/tokens/primitives/spacing.json`):

```
4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96
```

All spacing values must come from this scale. No arbitrary values (37px, 55px, 100px).

**Macro-Whitespace**:

| Zone | Spacing | Token Reference |
|------|---------|----------------|
| Hero to first section | 96px | `spacing.24` |
| Between major sections | 96px | `spacing.24` |
| Between sub-sections | 48-64px | `spacing.12` to `spacing.16` |
| Within components | 32-40px | `spacing.8` to `spacing.10` |
| Navigation height | 64px | `spacing.16` |
| Footer top margin | 96px | `spacing.24` |

**Grid**:

| Property | Value |
|----------|-------|
| Max content width | 1200px |
| Columns | 12 |
| Column gap | 24px (`spacing.6`) |
| Side padding (mobile) | 24px (`spacing.6`) |
| Side padding (tablet) | 40px (`spacing.10`) |
| Side padding (desktop) | 64px (`spacing.16`) |

**Micro-Spacing**:

| Context | Spacing | Token |
|---------|---------|-------|
| Icon to label | 8px | `spacing.2` |
| Label to input | 6px | `spacing.1.5` |
| Button padding | 12px 24px | `spacing.3` / `spacing.6` |
| Button padding (large) | 16px 32px | `spacing.4` / `spacing.8` |
| Badge/tag padding | 4px 12px | `spacing.1` / `spacing.3` |
| Card internal padding | 24-32px | `spacing.6` to `spacing.8` |
| List item gap | 8-12px | `spacing.2` to `spacing.3` |
| Paragraph gap | 16px | `spacing.4` |
| Heading to body | 12px | `spacing.3` |
| Section title to content | 24px | `spacing.6` |

**Responsive breakpoints**:

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | 1 column, 24px side padding |
| Tablet | 640-1024px | 2 columns, 32px gap |
| Desktop | 1024px+ | 12 columns, 24px gap |
| Wide | 1200px+ | Max-width container centers |

**Touch targets**: Minimum 44px for all interactive elements on mobile.

**Border radii** (from `brand/tokens/primitives/radii.json`):

| Context | Radius | Token |
|---------|--------|-------|
| Buttons, inputs | 2px | `radius.control` |
| Cards, panels | 4px | `radius.panel` |
| Elevated components | 6px | `radius.card` |
| Marketing cards | 8px | `radius.lg` |
| Pills, avatars | 9999px | `radius.full` |

**Motion** (from `brand/tokens/primitives/motion.json`):

| Context | Duration | Easing |
|---------|----------|--------|
| Hover states | 150ms | `cockpit` (0.2, 0, 0.38, 0.9) |
| Dropdowns, panels | 250ms | `cockpit` |
| Modals, page transitions | 400ms | `ease-in-out` |
| Complex sequences | 600ms | `ease-in-out` |

Motion philosophy: Mechanical, precise — like cockpit instruments. Not bouncy or playful.

---

## Validation

### Completeness Check

| Field | Status | Notes |
|-------|--------|-------|
| 1. Positioning Statement | PASS | All 5 slots filled: product, category, audience, outcome, mechanism |
| 2. ICP | PASS | Role (solo dev / team lead) + company type (pre-seed to Series A) + pain point (manual babysitting, config drift, no visibility) |
| 3. Anti-ICP | PASS | 3 excluded personas: enterprise procurement, non-technical users, full-autonomy seekers |
| 4. Differentiators | PASS | 4 differentiators, each with architecture proof and ICP relevance |
| 5. Vibe | PASS | 3 specific, observable, differentiating adjectives: Candid, Capable, Deliberate |
| 6. Anti-Vibe | PASS | 3 failure modes with boundary statements: Harsh, Elitist, Overthinking |
| 7. Banned Vocabulary | PASS | 8 default + 12 product-specific = 20 banned words |
| 8. Trust Signals | PASS (conditional) | Pre-launch: 1 verified metric, founder credential, integration logos. Gaps flagged with acquisition timeline |
| 9. Color Tokens | PASS | 6 tokens with hex + OKLCH, all contrast ratios verified, sourced from existing brand tokens |
| 10. Typography | PASS | Inter + JetBrains Mono, 11-level scale, 4px baseline grid, weight delta 300, tracking rules defined |
| 11. Spatial Rules | PASS | 8-point scale from existing tokens, macro-whitespace 96px+, grid defined, responsive breakpoints, touch targets |

**Completeness Score**: 11/11

### Polish Evaluation Rubric

| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| 1. Visual Hierarchy | 5/5 | 3+ heading levels via weight (700/600/500/400) + size (64px to 11px). Macro-whitespace 96px between sections. Weight delta 300. Grayscale test passes — hierarchy built on weight and size, not color. |
| 2. Typography System | 5/5 | Display tracking -0.02em. All line heights on 4px grid. Inter + JetBrains Mono pairing with 11-level scale. Weight hierarchy 400-700. Responsive clamp() rules defined. |
| 3. Spacing & Rhythm | 5/5 | All spacing from existing 4px/8px token scale. Section gaps 96px. Grid with 1200px max-width + 24px gaps. Micro-spacing rules for all component contexts. Zero arbitrary values. |
| 4. Mobile Responsiveness | 4/5 | Fluid typography with clamp(). Touch targets 44px minimum. Responsive breakpoints defined (mobile/tablet/desktop/wide). Single-column mobile specified. Minor: no specific hero adaptation rules beyond fluid type. |
| 5. Copy Specificity | 5/5 | Zero banned words in any field. All claims architecture-backed. Positioning uses all 5 slots with specific terms. ICP is picturable (developer in terminal). Every differentiator has typed proof. |
| 6. Trust Density | 2/5 | Pre-launch expected score. 1 verified metric (21 releases/13 days). Founder credential. Integration logos. All gaps flagged with acquisition timeline and priorities. |

**Total Score**: 26/30

### Pre-Launch Trust Density Adjustment

Per the validation skill's edge case guidance for pre-launch products:
- Trust Density minimum drops to 2/5 (expected — limited signals available)
- Trust gaps flagged with acquisition timeline
- All other dimensions maintain 4+ minimum

**Adjusted Verdict**: **CONDITIONAL PASS** — Brand Packet ready for page production with the understanding that Trust Density (Field 8) will be backfilled as signals become available. All other dimensions score 4+. Trust signal acquisition plan is defined with 6 prioritized milestones.

### Cross-Field Consistency Check

| Check | Status | Detail |
|-------|--------|--------|
| Differentiators (F4) have matching trust signals (F8)? | PARTIAL | Bundle system → pending install/usage metrics. Pipelines → pending events-processed metric. Local-first → architecture proof (available). Agent-agnostic → integration logos (available). |
| Voice (F5-7) aligns with ICP (F2)? | PASS | Candid/Capable/Deliberate matches technical developer who values straight talk and working demos over marketing fluff. Anti-vibes guard against alienating newcomers (Elitist) or being dismissive (Harsh). |
| Visual system (F9-11) matches voice archetype? | PASS | Technical Founder archetype → tight tracking, dark mode, minimal radii (2-6px), mechanical motion easing, monospace presence. All confirmed in token system. |
| Banned vocabulary absent from all fields? | PASS | No banned words appear in any Brand Packet field. |
| Color tokens reference actual brand tokens? | PASS | All 6 tokens trace directly to `brand/tokens/primitives/colors.json` and `brand/tokens/semantic/colors.dark.json`. |
