# Activation Checklist

4-week roadmap to operationalize the Musher Brand.

---

## Week 1: The Codebase

### Goals
- Brand repo is live
- Linter configured for banned terms
- Team has access

### Tasks

- [ ] Verify `musher-dev/brand` repository structure is complete
- [ ] Set up textlint or similar with banned terms list
- [ ] Add pre-commit hook for cliche check (optional)
- [ ] Create PR template referencing brand guidelines
- [ ] Document contribution process in README

### Deliverables
- Brand repo live at `github.com/musher-dev/brand`
- Linter configuration
- Contribution guidelines

---

## Week 2: The Audit

### Goals
- Existing content audited against brand
- Issues filed for violations
- Homepage hero updated

### Tasks

- [ ] Crawl marketing site for banned terms
- [ ] Crawl documentation for voice violations
- [ ] File GitHub Issues for each violation found
- [ ] Rewrite Homepage hero section using new tagline
- [ ] Update meta tags and social bios
- [ ] Review error messages against tone spectrum

### Deliverables
- Audit report (Issues filed)
- Updated homepage hero
- Updated meta tags

### Audit Targets

| Content | Check For |
|---------|-----------|
| Homepage | Banned terms, tone alignment |
| Docs | Voice consistency, Global English |
| Error messages | Diagnostic, actionable, blameless |
| API reference | Precision, determinism |
| Social bios | Tagline alignment |

---

## Week 3: Internal Launch

### Goals
- Team understands the brand
- Design tokens mapped
- Voice training complete

### Tasks

- [ ] Schedule "Lunch and Learn" for Engineering
- [ ] Present "Why Human Interface Layer" with Stripe/Terraform analogies
- [ ] Run Design Token workshop
- [ ] Map voice attributes to Figma/design system tokens
- [ ] Update internal style guides
- [ ] Q&A session for questions

### Deliverables
- Recorded training session
- Design token mapping document
- Updated internal style guide

### Training Topics

1. Why "Human Interface Layer" (positioning)
2. The Senior Engineer voice (communication)
3. Approved vs. Banned terms (lexicon)
4. Persona profiles (who we're building for)
5. Tone spectrum (context adaptation)

---

## Week 4: Public Launch

### Goals
- Public brand presence updated
- Blog post published
- External awareness

### Tasks

- [ ] Deploy updated `/about` page
- [ ] Publish blog post: "Why we're building the Human Interface Layer"
- [ ] Update all social bios and meta tags
- [ ] Update LinkedIn company page
- [ ] Notify key stakeholders/partners
- [ ] Monitor feedback and iterate

### Deliverables
- Live `/about` page
- Published manifesto blog post
- Updated social presence

---

## Post-Launch: Ongoing

### Monthly
- [ ] Review new content against brand guidelines
- [ ] Update CHANGELOG.md for any brand changes
- [ ] Refresh banned terms list if needed

### Quarterly
- [ ] Brand audit of all public content
- [ ] Persona validation (are they still accurate?)
- [ ] Voice calibration (is it landing?)

### As Needed
- [ ] PR review for brand changes
- [ ] New term additions to lexicon
- [ ] Tone spectrum updates for new contexts

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Banned term usage | 0 in new content | Linter reports |
| Voice consistency | 90%+ aligned | Manual audit |
| Developer trust signals | Increasing | GitHub stars, NPS |
| Internal adoption | 100% team trained | Training completion |
