# VS Code CSS Linter Configuration

## Fixing "Unknown at rule @theme" and "@utility" Warnings

The warnings you're seeing are because VS Code's CSS linter doesn't recognize Tailwind CSS v4's new directives (`@theme`, `@utility`). These are **not errors** - your app works perfectly! But here's how to remove the warnings:

### Option 1: Update VS Code Settings (Recommended)

1. Open VS Code Settings (File → Preferences → Settings or `Ctrl+,`)
2. Search for "css lint unknown"
3. Find **CSS > Lint: Unknown At Rules**
4. Change from "warning" to **"ignore"**

OR add this to your User Settings JSON (`Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"):

```json
{
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore"
}
```

### Option 2: Install Tailwind CSS IntelliSense Extension

1. Open Extensions (`Ctrl+Shift+X`)
2. Search for "Tailwind CSS IntelliSense"
3. Install the extension by Brad Cornes
4. Reload VS Code

This extension provides:

- ✅ Autocomplete for Tailwind classes
- ✅ Syntax highlighting
- ✅ Linting support for Tailwind directives
- ✅ Hover previews of classes

### Option 3: Workspace Settings (Already Created)

I've created a `css_custom_data.json` file that defines Tailwind v4 directives. To use it:

1. Create `.vscode/settings.json` in your project (it's gitignored)
2. Add this content:

```json
{
  "css.lint.unknownAtRules": "ignore",
  "css.customData": ["./css_custom_data.json"]
}
```

## Why These Warnings Appear

- Tailwind CSS v4 introduced new CSS-based configuration using `@theme` and `@utility`
- VS Code's built-in CSS linter hasn't been updated to recognize these yet
- The warnings are **cosmetic only** - they don't affect your app's functionality
- Your Tailwind styles are being processed correctly by the Vite plugin

## Verification

After applying any of the above options:

1. Reload VS Code (`Ctrl+Shift+P` → "Developer: Reload Window")
2. Open `src/index.css`
3. The warnings should be gone! ✅

---

**Note:** I've already created `.vscode/extensions.json` which will prompt you to install the Tailwind CSS IntelliSense extension when you open this project.
