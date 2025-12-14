# AI Rules & Tech Stack

## Tech Stack

*   **Framework**: React 19 with TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS (via CDN/Script configuration in this environment)
*   **Icons**: `lucide-react`
*   **AI Integration**: Google GenAI SDK (`@google/genai`)
*   **Routing**: React Router (if multiple pages are needed)
*   **Package Manager**: npm

## Development Rules

1.  **Styling**:
    *   Use **Tailwind CSS** for all styling. Avoid writing custom CSS in `.css` files unless absolutely necessary for complex animations or overrides.
    *   Use the custom color palette defined in the Tailwind config (e.g., `bg-x-black`, `text-x-blue`, `border-x-border`).
    *   Ensure all components are responsive, utilizing Tailwind breakpoints (e.g., `hidden xl:block`).

2.  **Components**:
    *   Use functional components with TypeScript interfaces for props.
    *   Prioritize **shadcn/ui** components if available for standard UI elements (buttons, inputs, dialogs).
    *   Keep components small and focused. Refactor into smaller files if a component exceeds ~100 lines significantly.

3.  **State Management**:
    *   Use React hooks (`useState`, `useEffect`, `useRef`) for local state.
    *   Avoid introducing global state libraries (Redux, Zustand) unless state complexity demands it.

4.  **AI Integration**:
    *   All AI logic should reside in `services/`.
    *   Use `services/geminiService.ts` as the pattern for interacting with LLMs.
    *   Always handle API keys securely via environment variables (`process.env.GEMINI_API_KEY`).

5.  **File Structure**:
    *   `src/components/`: Reusable UI components.
    *   `src/pages/`: Page-level components.
    *   `src/services/`: API and logic layers (e.g., AI services).
    *   `types.ts`: Shared TypeScript interfaces and types.

6.  **Icons**:
    *   Exclusively use `lucide-react` for icons to maintain consistency.

7.  **Code Quality**:
    *   No `any` types in TypeScript. Define proper interfaces.
    *   Clean up unused imports.
    *   Follow the existing "X" (Twitter) dark mode aesthetic strictly.