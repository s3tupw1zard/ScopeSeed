#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-opencode.sh [--force] <target-project>

Installs the ScopeSeed OpenCode command and skill into an existing project.
The target project is expected to have Spec Kit installed separately.
EOF
}

force=0
if [[ "${1:-}" == "--force" ]]; then
  force=1
  shift
fi

if [[ $# -ne 1 ]]; then
  usage >&2
  exit 2
fi

target="$(cd "$1" 2>/dev/null && pwd)" || {
  echo "Target project does not exist: $1" >&2
  exit 1
}

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
command_src="$root/.opencode/commands/scopeseed.md"
skill_src="$root/.opencode/skills/scopeseed"
command_dst="$target/.opencode/commands/scopeseed.md"
skill_dst="$target/.opencode/skills/scopeseed"

if [[ ! -f "$command_src" || ! -d "$skill_src" ]]; then
  echo "ScopeSeed source files were not found relative to this installer." >&2
  exit 1
fi

if [[ $force -ne 1 && ( -e "$command_dst" || -e "$skill_dst" ) ]]; then
  echo "ScopeSeed is already present in the target project." >&2
  echo "Re-run with --force to replace the existing ScopeSeed command/skill." >&2
  exit 1
fi

mkdir -p "$target/.opencode/commands" "$target/.opencode/skills"

if [[ $force -eq 1 ]]; then
  rm -f "$command_dst"
  rm -rf "$skill_dst"
fi

cp "$command_src" "$command_dst"
cp -R "$skill_src" "$skill_dst"

cat <<EOF
ScopeSeed installed into:
  $target

Copied:
  .opencode/commands/scopeseed.md
  .opencode/skills/scopeseed/

Next:
  1. Make sure Spec Kit is installed in the target project.
  2. Start OpenCode in the target project.
  3. Run /scopeseed bootstrap (or /scopeseed import-specs specs/ for an existing Spec Kit project).
EOF
