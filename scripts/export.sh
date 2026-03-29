#!/usr/bin/env bash
# =============================================================================
# export.sh - Export optimized assets from src/ to dist/
#
# Copies SVGs to dist/logo/svg/, copies pre-rendered PNGs,
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

# Clean dist directories (preserves directory structure, removes stale files)
clean_dist() {
  log "Cleaning dist directories..."
  find "$DIST_DIR" -type f -not -name '.gitkeep' -delete
}

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
  for subdir in avatar og discord github; do
    local src_path="$SRC_DIR/social/$subdir"
    local dst_path="$DIST_DIR/social/$subdir"

    if [ -d "$src_path" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$dst_path/"
        count=$((count + 1))
      done < <(find "$src_path" -maxdepth 1 -type f -print0 2>/dev/null)
    fi
  done

  # Export banners (source is per-platform subdirectory)
  for platform in x linkedin youtube instagram; do
    local banner_platform_src="$SRC_DIR/social/banner/$platform"
    local banner_platform_dst="$DIST_DIR/social/banner/$platform"
    if [ -d "$banner_platform_src" ]; then
      while IFS= read -r -d '' file; do
        cp "$file" "$banner_platform_dst/"
        count=$((count + 1))
      done < <(find "$banner_platform_src" -maxdepth 1 -type f -print0 2>/dev/null)
    fi
  done

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

# Export Hub logo SVGs
# Copies mark SVGs directly; copies outlined lockup/wordmark SVGs (stripping -outlined suffix).
# Non-outlined SVGs without an outlined counterpart are also copied.
export_hub_logo_svgs() {
  local count=0
  local dst_path="$DIST_DIR/logo/hub/svg"

  # Mark SVGs (all)
  local mark_path="$SRC_DIR/logo/hub/mark"
  if [ -d "$mark_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$dst_path/"
      count=$((count + 1))
    done < <(find "$mark_path" -maxdepth 1 -name "*.svg" -print0 2>/dev/null)
  fi

  # Lockup SVGs (outlined preferred, strip suffix; include non-outlined without counterpart)
  local lockup_path="$SRC_DIR/logo/hub/lockup"
  if [ -d "$lockup_path" ]; then
    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file" | sed 's/-outlined//')
      cp "$file" "$dst_path/$name"
      count=$((count + 1))
    done < <(find "$lockup_path" -name "*-outlined.svg" -print0 2>/dev/null)

    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file")
      [[ "$name" == *-outlined.svg ]] && continue
      local outlined="${file%.svg}-outlined.svg"
      if [ ! -f "$outlined" ]; then
        cp "$file" "$dst_path/$name"
        count=$((count + 1))
      fi
    done < <(find "$lockup_path" -name "*.svg" -print0 2>/dev/null)
  fi

  # Wordmark SVGs (same logic)
  local wordmark_path="$SRC_DIR/logo/hub/wordmark"
  if [ -d "$wordmark_path" ]; then
    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file" | sed 's/-outlined//')
      cp "$file" "$dst_path/$name"
      count=$((count + 1))
    done < <(find "$wordmark_path" -maxdepth 1 -name "*-outlined.svg" -print0 2>/dev/null)

    while IFS= read -r -d '' file; do
      local name
      name=$(basename "$file")
      [[ "$name" == *-outlined.svg ]] && continue
      local outlined="${file%.svg}-outlined.svg"
      if [ ! -f "$outlined" ]; then
        cp "$file" "$dst_path/$name"
        count=$((count + 1))
      fi
    done < <(find "$wordmark_path" -maxdepth 1 -name "*.svg" -print0 2>/dev/null)
  fi

  log "Exported $count Hub logo SVG(s) to dist/logo/hub/svg/"
}

# Export Hub logo PNGs
export_hub_logo_pngs() {
  local count=0
  local png_dir="$DIST_DIR/logo/hub/png"

  local mark_path="$SRC_DIR/logo/hub/mark"
  if [ -d "$mark_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$png_dir/"
      count=$((count + 1))
    done < <(find "$mark_path" -maxdepth 1 -name "*.png" -print0 2>/dev/null)
  fi

  log "Exported $count Hub logo PNG(s) to dist/logo/hub/png/"
}

# Export Hub icon assets (favicons)
export_hub_icons() {
  local count=0
  local src_path="$SRC_DIR/icon/hub/favicon"
  local dst_path="$DIST_DIR/icon/hub/favicon"

  if [ -d "$src_path" ]; then
    while IFS= read -r -d '' file; do
      cp "$file" "$dst_path/"
      count=$((count + 1))
    done < <(find "$src_path" -maxdepth 1 -type f -print0 2>/dev/null)
  fi

  log "Exported $count Hub icon file(s)"
}

log "Exporting assets from $SRC_DIR to $DIST_DIR..."
clean_dist
export_logo_svgs
export_logo_pngs
export_illustrations
export_icons
export_social
export_backgrounds
export_hub_logo_svgs
export_hub_logo_pngs
export_hub_icons
log "Done!"
