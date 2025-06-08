# UV/UVX Terminal Formatting Issue Fix

## Problem Description

When running `uv --help` or `uvx --help` commands, the help text displays in an extremely narrow column format instead of using the full terminal width. This makes the help output difficult to read and navigate.

### Symptoms
- Help text wraps at approximately 40-50 characters
- Options and descriptions appear in very narrow vertical columns
- Normal terminal commands display correctly
- Issue affects only `uv` and `uvx` help formatting

### Example of Bad Formatting
```
Options:
      --from <FROM>                            Use
                                               the
                                               given
                                               package
                                               to
                                               provide
                                               the
                                               command
```

### Example of Good Formatting (After Fix)
```
Options:
      --from <FROM>                            Use the given package to provide the command
      --with <WITH>                            Run with the given packages installed
```

## Root Cause

The issue occurs because `uv` and `uvx` are not correctly detecting the terminal width in certain environments. This is a known issue with how these tools handle terminal width detection.

## Solution

### Simple One-Line Fix

Add the following line to your `~/.bashrc` file:

```bash
export COLUMNS=120
```

### Implementation Steps

1. **Add to shell configuration:**
   ```bash
   echo 'export COLUMNS=120' >> ~/.bashrc
   ```

2. **Apply to current session:**
   ```bash
   export COLUMNS=120
   ```

3. **Test the fix:**
   ```bash
   uvx --help | head -10
   uv --help | head -10
   ```

4. **For new terminal sessions:**
   ```bash
   source ~/.bashrc
   ```

### Alternative Column Widths

You can adjust the width based on your terminal size:
- For smaller terminals: `export COLUMNS=100`
- For wider terminals: `export COLUMNS=140`
- For ultra-wide: `export COLUMNS=160`

## Verification

After applying the fix, help commands should display properly formatted text that uses the full width of your terminal.

### Before and After Comparison

**Before (Broken):**
```bash
$ uvx --help
Options:
      --from <FROM>                            Use
                                               the
                                               given
                                               package
```

**After (Fixed):**
```bash
$ uvx --help
Options:
      --from <FROM>                            Use the given package to provide the command
      --with <WITH>                            Run with the given packages installed
```

## Technical Details

- **Issue Type:** Terminal width detection
- **Affected Commands:** `uv --help`, `uvx --help`, and other uv help subcommands
- **Environment:** Linux terminals (possibly others)
- **Solution Type:** Environment variable override

## Why This Works

The `COLUMNS` environment variable tells CLI applications how wide the terminal is. By explicitly setting this value, we override whatever incorrect width detection `uv`/`uvx` is performing.

## Troubleshooting

### If the fix doesn't work:

1. **Check if the variable is set:**
   ```bash
   echo $COLUMNS
   ```

2. **Try different values:**
   ```bash
   export COLUMNS=100
   uvx --help | head -5
   ```

3. **Verify shell configuration:**
   ```bash
   tail -5 ~/.bashrc
   ```

### For other shells:

**Zsh:**
```bash
echo 'export COLUMNS=120' >> ~/.zshrc
```

**Fish:**
```bash
echo 'set -x COLUMNS 120' >> ~/.config/fish/config.fish
```

## Alternative Solutions Considered

### Wrapper Scripts (Not Recommended)
We initially considered creating wrapper scripts, but this adds unnecessary complexity for a simple environment variable fix.

### Terminal Resizing (Not Reliable)
Resizing the terminal window might temporarily fix the issue but doesn't address the root cause.

## Related Issues

This fix may also help with other CLI tools that have similar terminal width detection problems.

## Installation Context

This issue was encountered after installing `uv` version 0.7.12 using the official installer:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Date Documented
June 7, 2025

## References
- [UV Official Documentation](https://docs.astral.sh/uv/)
- [Terminal width detection issues in CLI tools](https://github.com/astral-sh/uv/issues)
