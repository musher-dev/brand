#!/usr/bin/env bash
# =============================================================================
# validate.sh - Validate naming conventions and expected files in dist/
#
# Checks:
# 1. Files in dist/ follow the musher-{asset}-{variant}-{color}-{size}.{ext} pattern
# 2. Expected favicon files exist (when dist/icon/favicon/ has content)
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$ROOT_DIR/dist"

errors=0

log() {
  echo "[validate] $*"
}

err() {
  echo "[validate] ERROR: $*" >&2
  errors=$((errors + 1))
}

# Validate naming convention
# Pattern: musher-{asset}-{variant}-{color}-{size}.{ext}
# All asset files (not .gitkeep) should start with "musher-"
validate_naming() {
  log "Checking naming convention..."
  local checked=0
  local skipped=0

  while IFS= read -r -d '' file; do
    local name
    name=$(basename "$file")

    # Skip .gitkeep and .md files
    if [ "$name" = ".gitkeep" ] || [[ "$name" == *.md ]]; then
      skipped=$((skipped + 1))
      continue
    fi

    checked=$((checked + 1))

    # All dist files should start with "musher-"
    if [[ ! "$name" =~ ^musher- ]]; then
      err "Naming violation: $file (expected musher-* prefix)"
    fi
  done < <(find "$DIST_DIR" -type f -print0 2>/dev/null)

  log "Checked $checked file(s) ($skipped .gitkeep skipped)"
}

# Validate expected favicon files exist (only if there are real files)
validate_favicons() {
  local favicon_dir="$DIST_DIR/icon/favicon"

  if [ ! -d "$favicon_dir" ]; then
    log "No favicon directory found, skipping favicon validation"
    return
  fi

  # Count non-gitkeep files
  local file_count
  file_count=$(find "$favicon_dir" -type f ! -name ".gitkeep" 2>/dev/null | wc -l)

  if [ "$file_count" -eq 0 ]; then
    log "No favicon files yet, skipping favicon validation"
    return
  fi

  log "Checking expected favicon files..."

  # Check dist/icon/favicon/ for core favicon files
  local expected_favicons=("musher-icon-favicon.ico" "musher-icon-favicon.svg")
  for expected in "${expected_favicons[@]}"; do
    if [ ! -f "$favicon_dir/$expected" ]; then
      err "Missing expected favicon: $expected"
    fi
  done

  # Check dist/icon/ios/ for apple touch icon
  local ios_dir="$DIST_DIR/icon/ios"
  if [ -d "$ios_dir" ] && [ ! -f "$ios_dir/musher-icon-apple-touch-180.png" ]; then
    err "Missing expected iOS icon: musher-icon-apple-touch-180.png"
  fi

  # Check dist/icon/android/ for android icons
  local android_dir="$DIST_DIR/icon/android"
  if [ -d "$android_dir" ]; then
    for expected in "musher-icon-android-192.png" "musher-icon-android-512.png"; do
      if [ ! -f "$android_dir/$expected" ]; then
        err "Missing expected Android icon: $expected"
      fi
    done
  fi
}

log "Validating dist/ in $ROOT_DIR..."
validate_naming
validate_favicons

if [ "$errors" -gt 0 ]; then
  log "Validation failed with $errors error(s)"
  exit 1
fi

log "All validations passed!"
