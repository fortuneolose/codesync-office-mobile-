# CodeSync Office Mobile

CodeSync Office Mobile is a focused React Native and TypeScript productivity app for reviewing notes, tasks, and documents from a notes API. It was built as a compact portfolio project that demonstrates mobile UI composition, typed API integration, offline fallback behavior, and unit-tested domain logic without hiding key decisions behind unnecessary framework complexity.

## Project Summary

The app presents an office-style workspace with:

- a searchable list of notes, tasks, and documents
- segmented filters by content type
- loading, offline, and error states
- local cache fallback using AsyncStorage
- a configurable API boundary for an existing notes service
- pure business logic covered by unit tests

The implementation is intentionally scoped to one polished workflow: open the app, sync workspace items, search or filter the list, and continue seeing useful cached content when the API cannot be reached.

## Key Skills Showcased

### React Native Application Development

The UI is built with React Native primitives and Expo. The screen is composed from small, focused components rather than a single large component:

- `App.tsx` wires together the page-level experience.
- `SearchToolbar` handles text search input.
- `FilterTabs` provides segmented note/task/document filtering.
- `StatePanel` renders loading, offline, and error feedback.
- `WorkspaceList` and `WorkspaceItemRow` render the productivity list.

This demonstrates component decomposition, responsive mobile layout, platform-friendly styling, and practical use of Expo for fast development.

### TypeScript Modeling

The app uses explicit TypeScript types for the core domain:

- `WorkspaceItem`
- `WorkspaceItemKind`
- `WorkspaceItemStatus`
- `WorkspaceFilter`
- `SyncState`
- `RemoteWorkspaceItem`

These types keep API payload handling, state transitions, and UI props clear. The project runs with strict TypeScript settings so missing or unsafe assumptions are caught early.

### API Integration Boundary

The API integration is isolated in `src/api/notesClient.ts`. Components do not call `fetch` directly and do not know about raw backend response shapes.

The app calls:

```text
GET {EXPO_PUBLIC_NOTES_API_URL}/notes
```

It accepts either a direct array:

```json
[
  {
    "id": "1",
    "kind": "note",
    "title": "Meeting notes",
    "body": "Decision log",
    "status": "active",
    "tags": ["planning"],
    "updatedAt": "2026-06-18T10:00:00.000Z"
  }
]
```

or a wrapped response:

```json
{ "items": [] }
```

The normalizer also supports common alternate fields such as `type`, `content`, `text`, `updated_at`, and `due_at`. That makes the frontend adaptable to realistic API differences while keeping the rest of the app stable.

### Offline and Error Handling

The app uses a repository-style loader in `src/domain/workspaceRepository.ts`:

1. Try to load fresh items from the notes API.
2. Write successful responses to AsyncStorage.
3. If the API fails, read cached items.
4. If no cache exists, show a clear error state while keeping sample data visible.

This demonstrates graceful degradation and a realistic mobile-first approach where network access cannot be assumed.

### Search and Filtering Logic

Filtering is implemented as pure domain logic in `src/domain/filterItems.ts`. The search checks:

- title
- body
- status
- kind
- tags

Results are sorted newest-first by `updatedAt`. Keeping this logic outside React makes it simple to test and reuse.

### Unit Testing

Vitest tests cover the important non-visual behavior:

- filtering by item type
- full-text search
- newest-first sorting
- counts for segmented filters
- network success with cache write
- API failure with cached fallback
- API failure with empty fallback

The tests focus on the logic most likely to regress and avoid brittle snapshot testing for visual components.

## Tech Stack

- React Native
- Expo
- TypeScript
- AsyncStorage
- Vitest
- React Native Web for browser preview

## Project Structure

```text
.
├── App.tsx
├── app.json
├── package.json
├── src
│   ├── api
│   │   └── notesClient.ts
│   ├── components
│   │   ├── FilterTabs.tsx
│   │   ├── SearchToolbar.tsx
│   │   ├── StatePanel.tsx
│   │   ├── WorkspaceItemRow.tsx
│   │   └── WorkspaceList.tsx
│   ├── domain
│   │   ├── filterItems.ts
│   │   ├── filterItems.test.ts
│   │   ├── workspaceRepository.ts
│   │   └── workspaceRepository.test.ts
│   ├── fixtures
│   │   └── sampleItems.ts
│   ├── state
│   │   └── useWorkspaceItems.ts
│   ├── storage
│   │   └── offlineCache.ts
│   ├── config.ts
│   ├── theme.ts
│   └── types.ts
└── vitest.config.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the native Expo development server:

```bash
npm run start
```

Run the browser preview:

```bash
npm run web
```

Run unit tests:

```bash
npm run test
```

Run TypeScript verification:

```bash
npm run typecheck
```

## Configuration

Set the notes API base URL before starting Expo.

PowerShell:

```powershell
$env:EXPO_PUBLIC_NOTES_API_URL="http://localhost:8000/api"
$env:EXPO_PUBLIC_NOTES_API_TOKEN="<optional bearer token>"
```

Bash:

```bash
export EXPO_PUBLIC_NOTES_API_URL="http://localhost:8000/api"
export EXPO_PUBLIC_NOTES_API_TOKEN="<optional bearer token>"
```

If no environment variable is provided, the app defaults to:

```text
http://localhost:8000/api
```

## State Management

The project uses local React state because the product scope is deliberately focused on a single workspace screen. `useWorkspaceItems` owns:

- fetched items
- active query
- active item type filter
- sync state
- last successful sync timestamp
- user-facing error message

This keeps state flow easy to inspect while still separating reusable logic into pure domain modules.

## Tradeoffs

- Expo was chosen to reduce setup friction and make the project easy to run on mobile or web.
- Local React state was chosen over a global store because the current workflow does not need cross-screen coordination.
- AsyncStorage provides offline read support, but the app does not implement background sync, write queues, or conflict resolution.
- The API boundary is flexible enough for a real notes API, but the app intentionally does not include a backend implementation.
- Unit tests focus on core behavior rather than visual snapshots, which keeps the test suite stable and meaningful.

## Verification

Current checks used during development:

```bash
npx expo install --check
npm run typecheck
npm run test
```

Expected test coverage:

```text
2 test files
7 tests
```
