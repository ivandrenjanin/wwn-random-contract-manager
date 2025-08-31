# WWN Contract Builder

A FoundryVTT module for generating and voting on mission contracts using RollTables and Fate currency.

## Overview

This module allows GMs to generate polls of mission contracts assembled from six RollTables. Players can vote on contracts and spend Fate currency to boost votes or reroll contract fields. The winning contract is automatically logged to a journal.

### Core Features

- **Contract Generation**: Assembles missions from six required RollTables
- **Interactive Voting**: Chat-based voting interface with real-time updates
- **Fate Currency**: Meta-currency for boosting votes and rerolling fields
- **Journal Logging**: Automatic logging of winning contracts
- **GM Tools**: Fate management and poll control

### Required RollTables

- `CE: World (d12)`
- `CE: Hook (d20)`
- `CE: Primary Danger (d20)`
- `CE: Complication (d20)`
- `CE: Bonus Objective (d20)`
- `CE: Fallout (d20)`

## Development Status

**🚧 IN DEVELOPMENT** - This module is currently being built following the incremental plan in [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md).

### Current Phase: Foundation Setup

- [ ] Project configuration and dependencies
- [ ] TypeScript definitions for dependencies
- [ ] Core module structure and settings

## Quick Start

1. **Create Required RollTables**: Set up the six required RollTables with appropriate content
2. **Install Module**: Install and activate the WWN Contract Builder module
3. **Generate Poll**: Use the GM macro or API to start a contract poll
4. **Vote**: Players vote and spend Fate currency as desired
5. **Close Poll**: GM closes the poll to determine the winner and log to journal

## Development

This project uses:

- **TypeScript** with strict typing and FoundryVTT v12 types
- **Vite** for building and hot reloading
- **SCSS** for styling
- **socketlib** for multiplayer communication
- **libWrapper** for safe function hooking

### Building

```bash
npm install
npm run build        # Production build
npm run dev          # Development build
npm run watch        # Development build with file watching
```

## Dependencies

### Required

- **FoundryVTT v12+**
- **socketlib**: For multiplayer socket communication
- **libWrapper**: For enhanced compatibility
- **ui-extender**: For enhanced UI components
- **VTTColorSettings**: For color customization

## Attribution

This project is built upon the FoundryVTT module template by [DFreds](https://github.com/DFreds).

## License

MIT License - see [LICENSE](./LICENSE) for details.
