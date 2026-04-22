function HandoffSection({ theme, currentNeutralKey, currentShiftKey }) {
  const sp = theme.tokens.spacing;
  const [copied, setCopied] = useState(false);

  const themeSnippet = `// theme.ts — generated from M7 Design System v1.1
// Drop into frontend/src/common/theming/index.ts (MUI v5 compatible)

import { createTheme } from "@mui/material/styles";
import { fontFamily } from "./fonts";

// --- NEUTRAL SCALE (${currentNeutralKey}) -------------------------------------
const neutral = ${JSON.stringify(theme.tokens.neutrals, null, 2)};

// --- BRAND ------------------------------------------------------------------
const brand = {
  purple: { main: "${theme.palette.primary.main}", light: "${theme.palette.primary.light}",
            dark: "${theme.palette.primary.dark}", lighter: "${theme.palette.primary.lighter}" },
};

// --- SEMANTIC ---------------------------------------------------------------
const success = ${JSON.stringify(theme.palette.success, null, 2)};
const warning = ${JSON.stringify(theme.palette.warning, null, 2)};
const error   = ${JSON.stringify(theme.palette.error, null, 2)};
const info    = ${JSON.stringify(theme.palette.info, null, 2)};

// --- SHIFT COLORS (outside palette) -----------------------------------------
export const shiftColors = ${JSON.stringify(theme.tokens.shift, null, 2)};

// --- THEME ------------------------------------------------------------------
export const theme = createTheme({
  palette: {
    mode: "${theme.palette.mode}",
    primary:   { main: brand.purple.main, light: brand.purple.light,
                 dark: brand.purple.dark, contrastText: "#FFFFFF" },
    secondary: { main: "${theme.palette.secondary.main}", contrastText: "${theme.palette.secondary.contrastText}" },
    success, warning, error, info,
    grey: { 50: neutral[50], 100: neutral[100], 200: neutral[200], 300: neutral[300],
            400: neutral[400], 500: neutral[500], 600: neutral[600], 700: neutral[700],
            800: neutral[800], 900: neutral[900] },
    text: {
      primary:   "${theme.tokens.text.primary}",
      secondary: "${theme.tokens.text.secondary}",
      disabled:  "${theme.tokens.text.disabled}",
    },
    background: {
      default: "${theme.tokens.surfaces.canvas}",
      paper:   "${theme.tokens.surfaces.panel}",
    },
    divider: "${theme.tokens.border.subtle}",
  },
  typography: { fontFamily, /* h1–h6, body1/2, subtitle1/2, caption, overline, +customs */ },
  shape:   { borderRadius: 8 },
  spacing: 4,
});
`;

  return (
    <Section id="handoff" eyebrow="Engineering handoff" title="Generated theme.ts" theme={theme}
      description="This prototype is the spec. The code below is the shape of the theme file engineers should drop into the repo. Changes made via Tweaks regenerate this output.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[6], marginBottom: sp[8] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[3] }}>Gaps resolved</h4>
          <ul style={{ ...theme.typography.body2, color: theme.tokens.text.secondary, paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
            <li><b>Primary swap:</b> primary is darkPurple, secondary is black. MUI defaults (Button, Switch) are brand-colored by default.</li>
            <li><b>Neutrals:</b> 10+ overlapping grays collapsed into a 14-stop scale ({currentNeutralKey}).</li>
            <li><b>Semantic roles:</b> success, warning, error, <i>and info</i> each have lighter/light/main/dark + contrastText.</li>
            <li><b>Shift colors:</b> extracted from palette into theme.tokens.shift — categorical, not UI role.</li>
            <li><b>Typography:</b> every variant has explicit size/weight/line-height/letter-spacing.</li>
            <li><b>Spacing:</b> 4px base.</li>
            <li><b>Radius/Shadow:</b> explicit scales + trimmed 5-level shadow set.</li>
            <li><b>Motion:</b> duration + easing tokens mapped onto MUI transitions.</li>
            <li><b>Dark mode:</b> tokens are mode-aware.</li>
          </ul>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[3] }}>Legacy → new alias map</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[2] }}>
            {[
              ['colors.black', 'neutral[900]'],
              ['colors.darkGray', 'neutral[500] · text.muted'],
              ['colors.borderGrey', 'neutral[200] · border.default'],
              ['colors.lightGray', 'neutral[50] · surfaces.subtle'],
              ['colors.seaShell', 'neutral[100] · border.subtle'],
              ['colors.darkPurple', 'primary.main'],
              ['colors.lightPurple', 'primary.light'],
              ['colors.backgroundLightPurple', 'primary.lighter'],
              ['colors.successMain', 'success.main'],
              ['colors.redAlert', 'error.main'],
              ['colors.warning', 'warning.lighter'],
              ['colors.warningText', 'warning.contrastText'],
              ['colors.dayShift', 'shiftColors.day.bg'],
              ['colors.nightShift', 'shiftColors.night.bg'],
            ].map(([from, to]) => (
              <React.Fragment key={from}>
                <span style={{ ...theme.typography.xSmall, fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.muted, textDecoration: 'line-through' }}>{from}</span>
                <span style={{ ...theme.typography.xSmall, fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.primary }}>{to}</span>
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>

      <Card theme={theme} padding={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${sp[3]} ${sp[5]}`, borderBottom: `1px solid ${theme.tokens.border.subtle}`, background: theme.tokens.surfaces.subtle, borderTopLeftRadius: theme.tokens.radius.lg, borderTopRightRadius: theme.tokens.radius.lg }}>
          <span style={{ ...theme.typography.smallBold, color: theme.tokens.text.primary, fontFamily: 'ui-monospace, monospace' }}>theme.ts</span>
          <Button theme={theme} variant="outlined" color="secondary" size="small" onClick={() => {
            navigator.clipboard.writeText(themeSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}>{copied ? 'Copied' : 'Copy'}</Button>
        </div>
        <pre style={{ margin: 0, padding: sp[5], overflow: 'auto', maxHeight: 480,
          background: theme.tokens.neutrals[900], color: theme.tokens.neutrals[100],
          fontSize: 12, lineHeight: 1.55, fontFamily: 'ui-monospace, monospace',
          borderBottomLeftRadius: theme.tokens.radius.lg, borderBottomRightRadius: theme.tokens.radius.lg }}>{themeSnippet}</pre>
      </Card>
    </Section>
  );
}

Object.assign(window, { HandoffSection });
