# Architectural & Engineering Decisions Document

### 1. Data Flow & Normalization Strategy
* **Messy Payloads Handling:** Input dates dynamically map alternate epochs or ISO syntax variables cleanly through conditional parsing blocks inside `normalize.ts`. Stringified count structures are cast explicitly into strict integers (`Number()`). Missing fields default gracefully to fallback placeholders (e.g., `title: task.title || 'Untitled Task'`).
* **Redux Architecture:** Integrated standard `createEntityAdapter` within `taskSlice` which sets an optimal $O(1)$ access structure using entity lookup maps. Memoized filter selections perform atomic normalization checks (e.g., matching inconsistent casing blocks like `.toLowerCase() === status.toLowerCase()`) preventing costly UI recalculation pipelines.

### 2. Streamed Content Security Execution
* **Incremental Text Processing:** The custom stream processor `useTaskSummary` captures partial chunk lines inside standard internal string string-buffers. Using `JSON.parse` translates the unescaped line sequence markers (`\\n`) instantly into standard operating breaks (`\n`), allowing responsive formatting.
* **XSS Sanitization Guard:** To nullify targeted exploit lines (`<script>`, inline `<img>` tags containing malicious `onerror` code blocks), presentation maps pass through a custom layout handler within `<ReactMarkdown>` governed by `isomorphic-dompurify`. Unregistered unsafe HTML properties are completely stripped down at the virtual tree structure level before injection to guarantee secure containment.

### 3. Real-Time Concurrency System
* **WebSocket Management Strategy:** The integration framework routes socket events through a specialized lifecycle client hook (`useTaskFeed`). To preserve atomic structural references, updates execute via selective patches (`updateTask`), preventing complete entity rewrites that could accidentally drop local UI data flags. Uncached rows incoming via event targets are queued or left safely until next fetch validation boundaries sync.

### 4. Code Bug Defect Registry (buggy/TaskTicker.tsx)
* **Bug 1 (Stale Closure):** `setInterval` was accessing an old fixed baseline lexical snapshot of the `tick` reference. *Fix:* Updated parameter loop to execute with a functional updater pattern expression (`setTick(prev => prev + 1)`).
* **Bug 2 (State Mutation via Push):** Arrays were being manipulated in-place (`prev.push`). This breaks React virtual identity tracking checks. *Fix:* Implemented explicit array array-spreading arrays (`[...prev, t]`).
* **Bug 3 (Null Fetch Operations):** Component sent API network requests on component initialization when `selectedId` was completely unassigned (`null`). *Fix:* Injected an active early exit validation block (`if (!selectedId) return`).
* **Bug 4 (Array Sort Side Effect):** Calling `.sort()` directly alters state vectors inline within the component view pipeline. *Fix:* Conducted sorting procedures on a isolated copy (`[...tasks].sort()`).
* **Bug 5 (Index Key Anti-pattern):** Component mapped rows using continuous indices (`key={i}`). *Fix:* Substituted layout mapping targets to reference structural item keys (`key={t.id}`).