# Brand Changelog

All notable changes to the Musher Brand will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] - 2026-02-11

### Changed

- **Rebrand**: Mutualistic -> Musher across all assets and documentation
- **Package**: `@mutualistic/design-tokens` -> `@musher/design-tokens`
- **Repository**: Split brand assets into standalone `musher-dev/brand` repo

### Added

- Asset directory structure (`src/`, `dist/`) for logo, icon, social, and background assets
- Automation scripts: `optimize.sh`, `export.sh`, `validate.sh`
- Naming convention: `musher-{asset}-{variant}-{color}-{size}.{ext}`
- Git LFS tracking for binary design files (`.psd`, `.ai`, `.fig`, `.png`, `.jpg`, `.ico`)
- Devcontainer for brand asset development
- Root `Taskfile.yml` with `setup`, `build`, `optimize`, `export`, `validate`, `clean` tasks

---

## [1.0.0] - 2026-01-06

### Added

#### Manifesto
- **Vision**: "A world where software adapts to human intent, not the other way around."
- **Mission**: "To build the infrastructure that translates human ambiguity into machine-executable schema."
- **Principles**: 6 operating values
  1. Consent is the API
  2. Scaffolding, Not Crutches
  3. Silence by Default
  4. Memory is Earned
  5. Determinism over Delight
  6. Docs Lead Code (new addition)

#### Positioning
- **Category**: Human Interface Layer
- **Comparison Anchors**: Stripe, Terraform, Auth0
- **Messaging Ladder**: Tagline -> One-liner -> Elevator Pitch
- **"Not This" Boundaries**: Agent Platform, Vector Database, Chatbot Framework

#### Personas
- **The Builder**: Senior Backend Engineer (primary user)
- **The Platform Lead**: VP Engineering (gatekeeper)
- **The Product Architect**: PM/Designer (influencer)
- **The Compliance Guardian**: Compliance/Clinical Lead (new addition for regulated industries)

#### Voice
- **Persona**: The Senior Engineer
- **Tone Spectrum**: Context-specific tone guidelines
- **Lexicon**: Approved and Banned terms

#### Implementation
- **Activation Checklist**: 4-week roadmap
- **Audit Guide**: Content audit process

### Notes

- Initial Brand Kernel based on strategic brand framework analysis
- Added 6th principle "Docs Lead Code" to align with platform's docs-first philosophy
- Added Compliance Guardian persona for healthcare/regulated industry buyers
- Aesthetic direction set to domain-flexible (IDE-dark for dev tools, warm for coaching/healthcare)

---

## How to Update This Changelog

When making brand changes:

1. Add entry under appropriate version header
2. Use these categories:
   - **Added**: New brand elements
   - **Changed**: Modifications to existing elements
   - **Deprecated**: Elements being phased out
   - **Removed**: Elements deleted
3. Include brief rationale for significant changes
4. Reference PR number if applicable

### Version Numbering

- **Major** (X.0.0): Fundamental brand repositioning
- **Minor** (0.X.0): New elements added (personas, principles)
- **Patch** (0.0.X): Clarifications, typo fixes, minor adjustments
