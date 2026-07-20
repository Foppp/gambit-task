# Gambit Task

Prerequisites: Node.js 20 or newer, npm 10 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What was built

`/` lets you browse, search, filter, and sort the mock resource set (served through a real `/api/resources` HTTP API), with filters and sort synced to the URL so a view can be bookmarked, shared, or refreshed without losing state. Selecting resources and clicking "Create application" opens a dialog that groups them into a new Application, with a success screen linking straight to it. `/applications` lists everything created so far, and `/applications/[id]` visualizes one as a hub-and-spoke graph. Navigation is a sidebar on desktop and a full-screen animated menu on mobile.

## What's next

Applications live in memory for the session only — no persistence, so a reload clears them. The resource table renders every row directly since the mock dataset is small; a real dataset would need pagination. At hundreds or thousands of resources, filtering would move further server-side with real pagination, and the table would need virtualization. Test coverage is intentionally minimal (one reducer test, one filtering test, one create-flow test), and there's no way to edit or delete an Application once created.

## Where AI was used

As a Frontend Engineer, I use an AI coding agent to compress the distance between a fully-specified decision and working code — not to make the decisions themselves.

Against a detailed architecture spec I wrote first. The split:

What I decided, before any code was written:
* How to split the state: TanStack Query for data that comes from outside the app (the resources), and Context with useReducer for data that only exists inside it (the Applications you create). I skipped Zustand or Redux here — this state is small, has one action, and is only read by two pages, so a plain reducer is easy to follow without adding another library.
* How the API should work: a Route Handler that serves mock data but behaves like a real API. That way, plugging in a real backend later means changing one function, not rewriting the app.
* Which libraries to use, and which to skip: Radix UI for the dialog, select, checkbox, so I didn't have to build focus-trapping and keyboard handling myself; plain SVG for the graph, since a library like React Flow would be overkill for a dozen nodes; and a simple mocked fetch in the tests instead of pulling in MSW.
* What to leave out for now: saving Applications permanently, handling large numbers of resources, and writing more tests than these four — all on purpose, not things I forgot.

What the agent did, based on that plan:
* Wrote the html components, basic styling, and wired everything together.
* Wrote the four tests I specified.
* Handled the repetitive parts — routing, types generated from the schemas, page metadata.
Once it was done, I checked the result against the requirements and the decisions above.