# Version Management System

This project uses a centralized version management system that automatically keeps all version references synchronized.

## Version Format

The version system follows this pattern:

- **Foundry Compatibility**: `v12` (FoundryVTT version)
- **Module Major**: `0` (Breaking changes)
- **Module Minor**: `0` (New features, backward compatible)
- **Module Patch**: `0` (Bug fixes, backward compatible)

### Examples

- `v12.0.0` = FoundryVTT 12, Module version 0.0.0
- `v12.1.12` = FoundryVTT 12, Module version 1.12.0
- `v12.2.5` = FoundryVTT 12, Module version 2.5.0

## Files Updated Automatically

The version manager updates these files:

- `version.json` - Central configuration
- `package.json` - NPM package version
- `static/module.json` - FoundryVTT module manifest
- Download URLs in module.json

## Usage

### Show Current Versions

```bash
npm run version:show
```

### Update All Version Files

```bash
npm run version:update
```

### Bump Versions

```bash
npm run version:bump-patch  # 0.0.0 → 0.0.1
npm run version:bump-minor  # 0.0.1 → 0.1.0
npm run version:bump-major  # 0.1.0 → 1.0.0
```

### Build with Version Sync

```bash
npm run build  # Automatically runs version:update first
```

## Version Bumping Rules

- **Patch**: Bug fixes, small improvements
- **Minor**: New features, backward compatible
- **Major**: Breaking changes, major refactoring

When bumping a higher version, lower versions are reset to 0:

- Bumping major resets minor and patch to 0
- Bumping minor resets patch to 0

## FoundryVTT Compatibility

To update FoundryVTT compatibility:

1. Edit `version.json`
2. Update `foundry.major`, `foundry.minimum`, `foundry.verified`, `foundry.maximum`
3. Run `npm run version:update`

## Pre-commit Hook

If using Husky, the pre-commit hook automatically:

1. Synchronizes all version files
2. Stages version changes for commit

## Manual Override

You can manually edit `version.json` and run `npm run version:update` to sync all files.
