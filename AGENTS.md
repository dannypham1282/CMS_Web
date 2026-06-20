# AI Agent Instructions for `CMS_Web`

## Purpose
This file helps AI coding agents work productively in the `CMS_Web` Angular application.

## How to run
- `npm install`
- `npm run start:dev` (local development server with proxy)
- `npm run build`
- `npm run test`

## Project overview
- Angular 21.2 application using standalone components.
- The root component is `src/app/app.ts`.
- There is no central `NgModule` file; most components declare `imports` inside `@Component`.
- Routing is not currently used (`src/app/app.routes.ts` is empty).

## Key conventions
- Component folders contain `*.ts`, `*.html`, `*.css`, and `*.spec.ts`.
- Component class names are PascalCase; file names and folders use kebab-case.
- Use `templateUrl` / `styleUrl` rather than inline templates/styles where existing code does.
- Component input binding is common via `@Input()`.
- Dynamic tabs are managed in `src/app/tabgroup/tabgroup.ts` with `NgComponentOutlet`.
- The root `App` component uses `newTabGroup(path)` to instantiate feature components dynamically.
- Keep new UI behavior inside `src/app` unless adding a new shared service or entity type.

## Important code areas
- `src/app/app.ts` — application entry and dynamic tab activation.
- `src/app/tabgroup/tabgroup.ts` — tab state and component outlet management.
- `src/app/sidebar/` and `src/app/sidebar-item/` — menu/navigation structure.
- `src/app/contractvehicles/` — business feature area for contract vehicles and organization.
- `src/app/filemanager/` — file explorer and tree node components.
- `src/app/services/httpService.ts` — currently defined but not wired into the app.

## Testing guidance
- Unit tests use Angular `TestBed` with standalone component imports.
- Example: `TestBed.configureTestingModule({ imports: [App] })`.
- Run tests with `npm run test`.

## What to avoid
- Do not assume classic Angular `NgModule` architecture.
- Do not assume `@angular/router` routes are defined; routing is currently unused.
- Avoid modifying build configuration unless necessary; the project uses `@angular/build` and Bootstrap/FontAwesome assets configured in `angular.json`.

## Documentation links
- `README.md` — project scaffolding and CLI commands.

## Recommended next agent customization
- Add a custom prompt or skill for Angular standalone component creation and `NgComponentOutlet` patterns.
- Add a custom instruction for updating the dynamic tab system when adding new feature components.
