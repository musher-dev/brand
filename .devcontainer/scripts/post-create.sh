#!/usr/bin/env bash
# =============================================================================
# POST-CREATE SCRIPT (runs ONCE after container is created)
# Installs tools for brand asset development: Task runner, svgo, sharp-cli
# Initializes Git LFS and token dependencies
# =============================================================================

set -euo pipefail

log() {
  echo "[$(date '+%H:%M:%S')] $*"
}

command_exists() {
  command -v "$1" &>/dev/null
}

# Install Task runner
install_task() {
  log "Installing Task runner..."

  if command_exists task; then
    log "Task is already installed: $(task --version 2>/dev/null || true)"
    return 0
  fi

  curl -sL https://taskfile.dev/install.sh | sudo sh -s -- -d -b /usr/local/bin || {
    log "WARNING: Failed to install Task. Install manually: https://taskfile.dev/installation/"
    return 1
  }

  log "Task installed: $(task --version)"
}

# Install asset optimization tools
install_asset_tools() {
  log "Installing asset optimization tools (svgo, sharp-cli)..."

  npm install -g svgo sharp-cli || {
    log "WARNING: Failed to install svgo/sharp-cli globally"
    return 1
  }

  log "Asset tools installed"
}

# Initialize Git LFS
init_git_lfs() {
  log "Initializing Git LFS..."

  if ! command_exists git-lfs; then
    sudo apt-get update && sudo apt-get install -y git-lfs || {
      log "WARNING: Failed to install git-lfs"
      return 1
    }
  fi

  git lfs install || {
    log "WARNING: Failed to initialize Git LFS"
    return 1
  }

  log "Git LFS initialized"
}

# Install token dependencies
install_token_deps() {
  log "Installing token dependencies..."

  if [ -d "tokens" ] && [ -f "tokens/package.json" ]; then
    cd tokens && npm install && cd ..
    log "Token dependencies installed"
  else
    log "WARNING: tokens/package.json not found, skipping"
  fi
}

# Verify tools
verify_tools() {
  log "Verifying installed tools..."
  local tools=(task node npm svgo sharp git-lfs claude gh)

  for cmd in "${tools[@]}"; do
    if command_exists "$cmd"; then
      local version
      version=$("$cmd" --version 2>/dev/null | head -n1 || true)
      log "  $cmd: $version"
    else
      log "  WARNING: $cmd not found"
    fi
  done
}

main() {
  log "Starting post-create setup for Musher Brand..."

  install_task
  install_asset_tools
  init_git_lfs
  install_token_deps
  verify_tools

  log "Post-create setup completed successfully"
}

main "$@"
