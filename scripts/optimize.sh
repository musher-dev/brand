#!/usr/bin/env bash
# =============================================================================
# optimize.sh - Optimize SVGs and PNGs in src/
#
# Runs svgo on all SVG files and sharp-cli on all PNG files.
# This is a non-destructive operation (overwrites in-place in src/).
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$ROOT_DIR/src"

log() {
  echo "[optimize] $*"
}

# Check dependencies
for cmd in svgo sharp; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Error: $cmd is not installed. Run: npm install -g svgo sharp-cli" >&2
    exit 1
  fi
done

# Optimize SVGs with svgo
optimize_svgs() {
  local count=0
  while IFS= read -r -d '' file; do
    svgo --quiet "$file"
    count=$((count + 1))
  done < <(find "$SRC_DIR" -name "*.svg" -print0 2>/dev/null)

  log "Optimized $count SVG file(s)"
}

# Optimize PNGs with sharp-cli (lossless)
optimize_pngs() {
  local count=0
  while IFS= read -r -d '' file; do
    local tmp="${file}.tmp.png"
    sharp --input "$file" --output "$tmp" -- png --compressionLevel 9 2>/dev/null && mv "$tmp" "$file"
    count=$((count + 1))
  done < <(find "$SRC_DIR" -name "*.png" -print0 2>/dev/null)

  log "Optimized $count PNG file(s)"
}

log "Optimizing assets in $SRC_DIR..."
optimize_svgs
optimize_pngs
log "Done!"
