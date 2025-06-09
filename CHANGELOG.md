# QBem Changelog

## [4.0.0] - 2025-06-09

### Changed

- bumped version to update stale README

## [4.0.0] - 2025-06-09

### Added

- switch compilation from webpack & ts to `tsup`
- Prettier config for code formatting
- ESLint + TypeScript rules replacing deprecated TSLint

### Changed

- Jest config updated to use `ts-jest` for native TypeScript support
- Internal helper logic cleaned up (e.g. modifier fallback returns `base`)
- `package.json` modernized with `exports`, `sideEffects`, and new scripts

### Removed

- Webpack, Babel, TSLint, and ts-loader

### Breaking

- Internal build pipeline replaced; output paths and formats changed
- Deep imports may need to be updated by consumers
