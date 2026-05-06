# Utils Working Folder

This folder is a working area for utility and prompt-related assets used by the Virus module.

## Purpose

- Keep reusable prompt data and helper assets together.
- Allow rapid iteration on utility files without cluttering action/component folders.
- Provide a stable location for shared prompt-related resources.

## Current contents

- `randomVirus.tsx`: prompt generator logic.
- `virusOutbreak.tsx`: outbreak prompt logic.
- `parseDevice.tsx`: device parsing/update utility thunk.
- `deviceModels.json`: device model lookup data used by `parseDevice.tsx`.

## Notes

- Files in this folder may be imported by runtime code.
- If a utility here becomes broadly reused, consider moving it to a dedicated shared folder later.
