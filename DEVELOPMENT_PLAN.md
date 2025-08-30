# WWN Contract Builder - Development Plan

A FoundryVTT module for generating and voting on mission contracts using RollTables and Fate currency.

## Project Overview

This module allows GMs to generate polls of mission contracts (default 3, max 5) assembled from six RollTables. Players can vote on contracts and spend Fate currency to boost votes or reroll contract fields. The winning contract is logged to a journal.

## Current State Analysis

### Available Resources

- **Main Project**: `wwn-random-contract-manager` (clean template, needs implementation)
- **Reference Project**: `wwn-contract-builder-kiro` (advanced implementation, non-Vite UI)
- **Dependencies Available**: libWrapper, socketlib, ui-extender, VTTColorSettings

### Key Requirements

- FoundryVTT v12 compatibility (updating from v13 template)
- Vite-based UI components
- TypeScript with strict typing
- Socket-based multiplayer functionality
- RollTable integration for content generation

## Incremental Development Plan

### Phase 1: Foundation Setup (Days 1-2)

**Goal**: Establish project structure and dependencies

#### Step 1.1: Project Configuration

- [x] Update `package.json` with correct module name and dependencies
- [x] Update `module.json` for v12 compatibility and proper module ID
- [x] Configure Vite build system for UI components
- [x] Set up TypeScript configuration for strict typing

#### Step 1.2: Dependency Type Definitions

- [x] Create TypeScript definitions for socketlib
- [x] Create TypeScript definitions for ui-extender (if needed)
- [x] Create TypeScript definitions for VTTColorSettings (if needed)
- [x] Verify libWrapper types are working correctly

#### Step 1.3: Core Module Structure

- [ ] Set up basic module entry point (`src/ts/module.ts`)
- [ ] Implement settings system with all required settings
- [ ] Create constants file with required table names and labels
- [ ] Set up error handling system

**Deliverable**: Module loads in FoundryVTT without errors, settings appear in module settings

### Phase 2: RollTable Integration (Days 3-4)

**Goal**: Implement contract generation from RollTables

#### Step 2.1: RollTable Validation

- [ ] Port and adapt `RollTableValidator` from kiro project
- [ ] Implement validation for all six required tables
- [ ] Add user-friendly error messages for missing tables

#### Step 2.2: Contract Generation

- [ ] Port and adapt `ContractGenerator` from kiro project
- [ ] Implement result parsing (main text, variants, tags)
- [ ] Add duplicate handling with variant fallback
- [ ] Test contract generation with sample RollTables

#### Step 2.3: Text Processing

- [ ] Port and adapt `TextGenerator` for player-facing briefs
- [ ] Implement fantasy-tone text generation
- [ ] Add tag-based contract labeling (holy → "Sacred Charge", etc.)

**Deliverable**: GM can generate contracts via console/macro, contracts display properly formatted text

### Phase 3: Socket Communication (Days 5-6)

**Goal**: Implement multiplayer communication system

#### Step 3.1: Socket Setup

- [ ] Integrate socketlib dependency
- [ ] Set up socket namespace (`world.wwn-contract-builder`)
- [ ] Implement basic socket handler registration

#### Step 3.2: Socket Actions

- [ ] Implement vote action handling
- [ ] Implement boost action handling
- [ ] Implement reroll action handling
- [ ] Implement poll close action handling

#### Step 3.3: Security Model

- [ ] Ensure only GMs can mutate world data
- [ ] Validate all socket payloads
- [ ] Implement proper error handling for socket failures

**Deliverable**: Multiple users can interact with polls via socket communication

### Phase 4: Fate Currency System (Days 7-8)

**Goal**: Implement Fate tracking and spending

#### Step 4.1: Fate Storage

- [ ] Implement world settings storage for per-user Fate
- [ ] Add default Fate value (1) for new users
- [ ] Create Fate getter/setter functions with validation

#### Step 4.2: Fate Spending

- [ ] Implement boost functionality (spend 1 Fate for +1 vote)
- [ ] Implement reroll functionality (spend 1 Fate to reroll field)
- [ ] Add cost validation and insufficient funds handling

#### Step 4.3: GM Fate Management

- [ ] Create GM dialog for adjusting player Fate
- [ ] Support single player and "all players" adjustments
- [ ] Add validation to prevent negative Fate values

**Deliverable**: Fate system works end-to-end with spending and GM management

### Phase 5: Chat UI with Vite (Days 9-11)

**Goal**: Create interactive chat-based voting interface

#### Step 5.1: Vite UI Setup

- [ ] Configure Vite for UI component building
- [ ] Set up SCSS styling system
- [ ] Create base chat card template structure

#### Step 5.2: Poll Card Components

- [ ] Create header component (title, Fate display, voter list)
- [ ] Create contract section component (brief, buttons, tallies)
- [ ] Create footer component (GM close button)
- [ ] Implement responsive design for different screen sizes

#### Step 5.3: Interactive Elements

- [ ] Implement vote buttons with real-time updates
- [ ] Implement boost buttons with Fate validation
- [ ] Implement reroll dropdown menus
- [ ] Add proper button states (disabled when voting closed)

#### Step 5.4: Real-time Updates

- [ ] Implement chat message updates via socket
- [ ] Update vote tallies in real-time
- [ ] Handle multiple concurrent polls gracefully

**Deliverable**: Full interactive chat UI with real-time voting and Fate spending

### Phase 6: Journal Integration (Days 12-13)

**Goal**: Implement winner logging system

#### Step 6.1: Journal Management

- [ ] Auto-create "Mission Log" journal if missing
- [ ] Create default "Log" page in journal
- [ ] Handle journal access permissions properly

#### Step 6.2: Log Entry Creation

- [ ] Format winner entries with timestamp
- [ ] Include full contract brief HTML
- [ ] Add vote/boost tally summary
- [ ] Implement proper HTML formatting with dividers

#### Step 6.3: Poll Closing

- [ ] Calculate winner by total votes + boosts
- [ ] Handle tie-breaking (first contract wins)
- [ ] Lock poll state and disable all buttons
- [ ] Trigger journal logging automatically

**Deliverable**: Poll winners are automatically logged to journal with full details

### Phase 7: Public API (Days 14-15)

**Goal**: Expose module functionality for macros and other modules

#### Step 7.1: API Structure

- [ ] Create public API interface
- [ ] Implement `startPoll(count?)` function
- [ ] Implement `getFate(userId)` function
- [ ] Implement `addFate(userId, delta)` function

#### Step 7.2: API Integration

- [ ] Expose API via `game.modules.get("wwn-contract-builder").api`
- [ ] Add proper error handling for API calls
- [ ] Create example macro for GM use

#### Step 7.3: Documentation

- [ ] Document all API functions with examples
- [ ] Create macro examples for common use cases
- [ ] Add troubleshooting guide

**Deliverable**: Module API is fully functional and documented

### Phase 8: Testing & Polish (Days 16-18)

**Goal**: Comprehensive testing and bug fixes

#### Step 8.1: Functional Testing

- [ ] Test all voting scenarios (single vote, vote changes)
- [ ] Test Fate spending (boosts, rerolls, insufficient funds)
- [ ] Test poll closing and winner calculation
- [ ] Test journal logging functionality
- [ ] Test GM Fate management dialog

#### Step 8.2: Edge Case Testing

- [ ] Test with missing RollTables
- [ ] Test with empty RollTables
- [ ] Test with malformed RollTable results
- [ ] Test socket disconnection scenarios
- [ ] Test multiple concurrent polls

#### Step 8.3: UI/UX Polish

- [ ] Improve error message display
- [ ] Add loading states for async operations
- [ ] Implement proper accessibility features
- [ ] Test on different screen sizes and browsers

#### Step 8.4: Performance Optimization

- [ ] Optimize chat message updates
- [ ] Minimize socket traffic
- [ ] Test with large numbers of players
- [ ] Profile memory usage and optimize

**Deliverable**: Fully tested, polished module ready for release

### Phase 9: Documentation & Release (Days 19-20)

**Goal**: Prepare for public release

#### Step 9.1: User Documentation

- [ ] Create comprehensive user guide
- [ ] Document RollTable format requirements
- [ ] Create setup instructions for GMs
- [ ] Add troubleshooting section

#### Step 9.2: Developer Documentation

- [ ] Document module architecture
- [ ] Create API reference
- [ ] Add contribution guidelines
- [ ] Document build and development process

#### Step 9.3: Release Preparation

- [ ] Create release build pipeline
- [ ] Test installation from zip file
- [ ] Prepare release notes
- [ ] Set up GitHub releases

**Deliverable**: Module ready for public distribution

## Technical Architecture

### Core Components

- **ContractGenerator**: RollTable integration and contract creation
- **SocketHandler**: Multiplayer communication via socketlib
- **FateManager**: Currency tracking and spending validation
- **ChatRenderer**: Vite-based UI components for chat cards
- **JournalLogger**: Winner logging to Mission Log journal
- **PollManager**: State management for active polls

### Dependencies

- **libWrapper**: Safe function hooking (optional enhancement)
- **socketlib**: Simplified socket communication
- **ui-extender**: Enhanced UI components (if needed)
- **VTTColorSettings**: Color customization (optional)

### Data Flow

1. GM calls `startPoll(N)` → Generate N contracts from RollTables
2. Post chat message with poll state in flags
3. Players interact via buttons → Socket actions to GM
4. GM processes actions → Updates poll state and re-renders
5. GM closes poll → Calculate winner → Log to journal

### File Structure

```
src/ts/
├── module.ts              # Entry point and module initialization
├── api.ts                 # Public API implementation
├── constants.ts           # Module constants and table names
├── settings.ts            # World settings configuration
├── types.ts               # TypeScript type definitions
├── services/
│   ├── contract-generator.ts    # RollTable integration
│   ├── socket-handler.ts        # Socket communication
│   ├── fate-manager.ts          # Fate currency system
│   ├── chat-renderer.ts         # Vite UI components
│   ├── journal-logger.ts        # Winner logging
│   └── poll-manager.ts          # Poll state management
├── ui/
│   ├── components/              # Vite UI components
│   └── styles/                  # SCSS styling
└── hooks/
    ├── init.ts                  # Foundry init hook
    └── ready.ts                 # Foundry ready hook
```

## Success Criteria

### Core Features ✅

- [ ] Table validation with clear error messages
- [ ] Contract generation with fantasy prose output
- [ ] Real-time voting with vote changes
- [ ] Fate spending for boosts and rerolls
- [ ] Poll closing with winner calculation
- [ ] Journal logging with full contract details
- [ ] GM Fate management tools

### Technical Requirements ✅

- [ ] FoundryVTT v12 compatibility
- [ ] TypeScript strict mode compliance
- [ ] Vite-based UI components
- [ ] Socket-based multiplayer support
- [ ] Proper error handling and recovery
- [ ] Performance optimization for multiple users

### User Experience ✅

- [ ] Intuitive chat-based interface
- [ ] Clear visual feedback for all actions
- [ ] Accessible design with proper ARIA labels
- [ ] Responsive design for different screen sizes
- [ ] Comprehensive documentation and examples

## Risk Mitigation

### Technical Risks

- **RollTable API Changes**: Use defensive programming and version checks
- **Socket Reliability**: Implement retry logic and graceful degradation
- **UI Complexity**: Start with simple components, iterate based on feedback
- **Performance**: Profile early and optimize incrementally

### User Experience Risks

- **Complex Interface**: Prioritize clarity over features
- **Learning Curve**: Provide clear examples and documentation
- **Compatibility**: Test with popular game systems and modules

## Next Steps

1. **Start with Phase 1**: Set up the basic project structure
2. **Create Sample RollTables**: Build test tables for development
3. **Set up Development Environment**: Configure hot reloading and debugging
4. **Begin Implementation**: Follow the phase-by-phase plan

This plan provides a clear roadmap from the current template to a fully functional WWN Contract Builder module, with each phase building on the previous one and delivering tangible progress.
