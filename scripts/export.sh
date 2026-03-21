#!/usr/bin/env bash
# =============================================================================
# export.sh - Export optimized assets from src/ to dist/
#
# Copies SVGs to dist/logo/svg/, generates PNG rasters at standard sizes,
# and copies social/icon assets with the musher naming convention.
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$ROOT_DIR/src"
DIST_DIR="$ROOT_DIR/dist"

log() {
  echo "[export] $*"
}

# Check dependencies
for cmd in sharp; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Error: $cmd is not installed. Run: npm install -g sharp-cli" >&2
    exit 1
  fi
done

# Standard raster sizes for logo PNGs
LOGO_SIZES=(64 128 256 512 1024)

# Export logo SVGs
# Copies outlined/plain SVGs to dist. Skips *-text.svg (editable, not portable).
export_logo_svgs() {
  local count=0
  local dst_path="$DIST_DIR/logo/svg"

  # Mark SVGs (plain, no outlined/text distinction)
  local mark_path="$SRC_DIR/logo/mark"
  if [ -d "$mark_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$dst_path/"
      count=$((count + 1))
    done < <(find "$mark_path" -maxdepth 1 -name "*.svg" -print0 2>/dev/null)
  fi

  # Wordmark SVGs (export outlined only, strip -outlined suffix for dist)
  local wordmark_path="$SRC_DIR/logo/wordmark"
  if [ -d "$wordmark_path" ]; then
    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file" | sed 's/-outlined//')
      cp "$file" "$dst_path/$name"
      count=$((count + 1))
    done < <(find "$wordmark_path" -maxdepth 1 -name "*-outlined.svg" -print0 2>/dev/null)
  fi

  # Lockup SVGs (recurse into layout subdirs, export outlined only, strip -outlined suffix)
  local lockup_path="$SRC_DIR/logo/lockup"
  if [ -d "$lockup_path" ]; then
    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file" | sed 's/-outlined//')
      cp "$file" "$dst_path/$name"
      count=$((count + 1))
    done < <(find "$lockup_path" -name "*-outlined.svg" -print0 2>/dev/null)
  fi

  log "Exported $count logo SVG(s) to dist/logo/svg/"
}

# Export logo PNGs
# Copies pre-rendered PNGs from src (lockups have non-square aspect ratios).
# Falls back to generating from SVGs for marks at standard square sizes.
export_logo_pngs() {
  local count=0
  local png_dir="$DIST_DIR/logo/png"

  # Copy pre-rendered PNGs from all logo subdirectories
  for subdir in mark wordmark; do
    local src_path="$SRC_DIR/logo/$subdir"
    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$png_dir/"
        count=$((count + 1))
      done < <(find "$src_path" -maxdepth 1 -name "*.png" -print0 2>/dev/null)
    fi
  done

  # Copy lockup PNGs from layout subdirectories
  local lockup_path="$SRC_DIR/logo/lockup"
  if [ -d "$lockup_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$png_dir/"
      count=$((count + 1))
    done < <(find "$lockup_path" -name "*.png" -print0 2>/dev/null)
  fi

  log "Exported $count logo PNG(s) to dist/logo/png/"
}

# Export icon assets
export_icons() {
  local count=0
  for subdir in favicon pwa ios android; do
    local src_path="$SRC_DIR/icon/$subdir"
    local dst_path="$DIST_DIR/icon/$subdir"

    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$dst_path/"
        count=$((count + 1))
      done < <(find "$src_path" -maxdepth 1 -type f -print0 2>/dev/null)
    fi
  done

  log "Exported $count icon file(s)"
}

# Export social assets
export_social() {
  local count=0
  for subdir in avatar og; do
    local src_path="$SRC_DIR/social/$subdir"
    local dst_path="$DIST_DIR/social/$subdir"

    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$dst_path/"
        count=$((count + 1))
      done < <(find "$src_path" -maxdepth 1 -type f -print0 2>/dev/null)
    fi
  done

  # Export banners (source is flat, dist is per-platform)
  local banner_src="$SRC_DIR/social/banner"
  if [ -d "$banner_src" ]; then
    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file")
      # Copy to all platform dirs - users should organize by platform
      for platform in x linkedin youtube instagram; do
        if [[ "$name" == *"$platform"* ]]; then
          cp "$file" "$DIST_DIR/social/banner/$platform/"
          count=$((count + 1))
        fi
      done
    done < <(find "$banner_src" -maxdepth 1 -type f -print0 2>/dev/null)
  fi

  log "Exported $count social asset(s)"
}

# Export background assets
export_backgrounds() {
  local count=0
  for subdir in hero pattern gradient; do
    local src_path="$SRC_DIR/background/$subdir"
    local dst_path="$DIST_DIR/background/$subdir"

    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$dst_path/"
        count=$((count + 1))
      done < <(find "$src_path" -maxdepth 1 -type f -print0 2>/dev/null)
    fi
  done

  log "Exported $count background asset(s)"
}

# Export illustration assets
export_illustrations() {
  local count=0
  local src_path="$SRC_DIR/illustration/scene"
  local svg_dst="$DIST_DIR/illustration/svg"
  local png_dst="$DIST_DIR/illustration/png"

  if [ -d "$src_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$svg_dst/"
      count=$((count + 1))
    done < <(find "$src_path" -maxdepth 1 -name "*.svg" -print0 2>/dev/null)

    while IFS= read -r -d '' file; do
      cp "$file" "$png_dst/"
      count=$((count + 1))
    done < <(find "$src_path" -maxdepth 1 -name "*.png" -print0 2>/dev/null)
  fi

  log "Exported $count illustration file(s)"
}

log "Exporting assets from $SRC_DIR to $DIST_DIR..."
export_logo_svgs
export_logo_pngs
export_illustrations
export_icons
export_social
export_backgrounds
log "Done!"
