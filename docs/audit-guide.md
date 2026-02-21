# Content Audit Guide

How to audit existing content against the Musher Brand guidelines.

---

## Quick Audit Checklist

### 1. Banned Vocabulary Check

Search content for banned terms. The canonical list lives in [brand-packet.md](brand-packet.md) (Field 7: Banned Vocabulary).

**Default banned** (always — from brand packet):

```
supercharge, unleash, seamless, revolutionize, empower, robust, unlock, leverage
```

**Product-specific banned** (from brand packet):

```
AI-powered, intelligent, cutting-edge, next-generation, scalable,
game-changing, innovative, effortless, holistic, end-to-end,
disruptive, frictionless
```

**Additional audit terms** (cliches and filler):

```
best-in-class, world-class, easy, simple, magic, delight,
utilize, synergy, transform, chatbot, hallucination, revolutionary
```

**Action:** Replace with specific alternatives. See the brand packet's Field 7 for replacement strategies per word.

### 2. Voice Check

Does the content sound like a Senior Engineer?

| Check | Pass | Fail |
|-------|------|------|
| Direct and concise | Pass | Wordy, meandering |
| Technically precise | Pass | Vague, hand-wavy |
| Admits limitations | Pass | Overpromises |
| Helpful and actionable | Pass | Generic platitudes |

**Action:** Rewrite failing sections using the brand voice persona as guide.

### 3. Tone Check

Does the tone match the context?

| Context | Expected Tone |
|---------|---------------|
| Marketing | Confident, direct |
| Docs | Precise, instructional |
| Errors | Diagnostic, actionable |
| Security | Formal, transparent |

**Action:** Adjust per the brand tone spectrum guidelines.

### 4. Global English Check

Search for idioms and colloquialisms:

```
hit it out of the park, low-hanging fruit, boil the ocean,
move the needle, at the end of the day, touch base,
circle back, deep dive, run it up the flagpole
```

**Action:** Replace with literal alternatives.

---

## Detailed Audit Process

### Step 1: Inventory

List all content to audit:

- [ ] Marketing site pages
- [ ] Documentation pages
- [ ] Error messages
- [ ] API reference
- [ ] Email templates
- [ ] Social media bios
- [ ] Blog posts
- [ ] README files

### Step 2: Automated Scan

Run textlint or grep for banned terms:

```bash
# Example grep command
grep -rni "seamless\|revolutionary\|magic\|delight" ./content/
```

### Step 3: Manual Review

For each piece of content:

1. Read through completely
2. Mark voice violations
3. Mark tone mismatches
4. Mark idiom usage
5. Note structural issues

### Step 4: File Issues

Create GitHub Issues for violations:

**Issue Template:**
```markdown
## Brand Violation

**Location:** [URL or file path]
**Type:** [Banned term / Voice violation / Tone mismatch / Idiom]
**Current text:** "[exact quote]"
**Suggested fix:** "[replacement text]"
**Brand guideline:** [link to relevant brand doc]
```

### Step 5: Prioritize

Priority order for fixes:

1. **Critical:** Homepage, main landing pages
2. **High:** Documentation main pages, error messages
3. **Medium:** Blog posts, tutorials
4. **Low:** Internal docs, older content

### Step 6: Fix and Verify

- Make changes via PR
- Reference the Issue
- Have second reviewer verify brand alignment
- Update CHANGELOG if significant

---

## Audit Frequency

| Content Type | Frequency |
|--------------|-----------|
| Marketing pages | Monthly |
| Documentation | With each release |
| Error messages | Quarterly |
| Blog posts | Before publish |
| Social bios | Quarterly |

---

## Common Violations

### Marketing

| Common Issue | Example | Fix |
|--------------|---------|-----|
| Hype language | "Revolutionary AI" | "Persistence runtime" |
| Vague claims | "Easy to integrate" | "Standard REST API" |
| Missing proof | "Fast" | "180ms average latency" |

### Documentation

| Common Issue | Example | Fix |
|--------------|---------|-----|
| Casual tone | "Basically, you just..." | "Connect using..." |
| Missing precision | "Configure settings" | "Set `timeout` to 30s" |
| Idioms | "Out of the box" | "By default" |

### Error Messages

| Common Issue | Example | Fix |
|--------------|---------|-----|
| Cutesy | "Oops!" | "Error:" |
| Not actionable | "Something went wrong" | "Invalid date format. Use ISO-8601." |
| Blaming user | "You entered..." | "Input parsing failed." |

---

## Reporting

After audit, create summary:

```markdown
## Brand Audit Report - [Date]

### Summary
- **Pages audited:** X
- **Issues found:** Y
- **Critical:** Z

### Top Issues
1. [Most common issue]
2. [Second most common]
3. [Third most common]

### Action Items
- [ ] Fix critical issues by [date]
- [ ] Schedule follow-up audit
```
