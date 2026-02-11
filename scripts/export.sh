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
export_logo_svgs() {
  local count=0
  for subdir in mark wordmark lockup; do
    local src_path="$SRC_DIR/logo/$subdir"
    local dst_path="$DIST_DIR/logo/svg"

    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$dst_path/"
        count=$((count + 1))
      done < <(find "$src_path" -name "*.svg" -print0 2>/dev/null)
    fi
  done

  log "Exported $count logo SVG(s) to dist/logo/svg/"
}

# Generate rasterized PNGs from SVGs
export_logo_pngs() {
  local count=0
  local svg_dir="$DIST_DIR/logo/svg"
  local png_dir="$DIST_DIR/logo/png"

  while IFS= read -r -d '' svg; do
    local basename
    basename=$(basename "$svg" .svg)

    for size in "${LOGO_SIZES[@]}"; do
      local output="$png_dir/${basename}-${size}.png"
      sharp --input "$svg" --output "$output" -- resize "$size" "$size" -- png 2>/dev/null && count=$((count + 1))
    done
  done < <(find "$svg_dir" -name "*.svg" -print0 2>/dev/null)

  log "Generated $count logo PNG(s) to dist/logo/png/"
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

log "Exporting assets from $SRC_DIR to $DIST_DIR..."
export_logo_svgs
export_logo_pngs
export_icons
export_social
export_backgrounds
log "Done!"
