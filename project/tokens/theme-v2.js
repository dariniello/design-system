// M7 Design System — Theme Builder (v1.1)
window.M7ThemeBuilder = (function () {
  function buildTypography(T) {
    const s = T.type.scale;
    const fam = T.type.fontFamily;
    const famOf = (k) => k === 'display' ? fam.display : fam.body;
    const pack = (v) => ({
      fontFamily: famOf(v.family),
      fontWeight: v.w,
      fontSize: `${v.size}rem`,
      lineHeight: v.lh,
      letterSpacing: `${v.ls}em`,
    });
    const out = { fontFamily: fam.body, htmlFontSize: 16, fontSize: 14 };
    Object.keys(s).forEach(k => { out[k] = pack(s[k]); });
    out.button = { ...out.button, textTransform: 'none' };
    out.overline = { ...out.overline, textTransform: 'uppercase' };
    return out;
  }

  function buildTheme(opts) {
    const T = window.M7Tokens;
    const { neutralKey = 'brand-tinted', shiftKey = 'refined', mode = 'light' } = opts || {};
    const N = T.neutralScales[neutralKey];
    const S = T.shiftColorSets[shiftKey];
    const isDark = mode === 'dark';

    const surfaces = isDark
      ? { canvas: N[900], panel: N[800], raised: N[700], overlay: 'rgba(10,9,16,0.72)', subtle: N[800], hover: N[700], selected: T.brand.purple[900] }
      : { canvas: N[0], panel: N[0], raised: N[0], overlay: 'rgba(20,19,25,0.48)', subtle: N[50], hover: N[100], selected: T.brand.purple[50] };
    const text = isDark
      ? { primary: N[50], secondary: N[200], muted: N[400], disabled: N[500], inverse: N[900], onBrand: '#FFFFFF' }
      : { primary: N[900], secondary: N[700], muted: N[500], disabled: N[400], inverse: N[0], onBrand: '#FFFFFF' };
    const border = isDark
      ? { subtle: N[700], default: N[600], strong: N[500], brand: T.brand.purple[300], focus: T.brand.purple[300] }
      : { subtle: N[100], default: N[200], strong: N[300], brand: T.brand.purple[500], focus: T.brand.purple[500] };

    // Primary (purple) — main lifts from 500 → 300 in dark; dark flips lighter (tonal inversion)
    const primary = isDark
      ? { lighter: T.brand.purple[900], light: T.brand.purple[200], main: T.brand.purple[300], dark: T.brand.purple[100], contrastText: T.brand.purple[950] }
      : { lighter: T.brand.purple[50],  light: T.brand.purple[300], main: T.brand.purple[500], dark: T.brand.purple[700], contrastText: '#FFFFFF' };

    // Secondary (neutral) — inverts across modes; light in dark, dark in light
    const secondary = isDark
      ? { lighter: N[700], light: N[400], main: N[50],  dark: N[25],   contrastText: N[900] }
      : { lighter: N[100], light: N[300], main: N[900], dark: N[1000], contrastText: '#FFFFFF' };

    // Tertiary (green) — #CAF036 is already high-luminance; desaturate/shade back 1 stop on dark
    // so it doesn't vibrate. lighter flips to a deep tinted background.
    const tertiary = isDark
      ? { lighter: T.brand.green[900], light: T.brand.green[600], main: T.brand.green[300], dark: T.brand.green[100], contrastText: T.brand.green[950] }
      : { lighter: T.brand.green[50],  light: T.brand.green[200], main: T.brand.green[400], dark: T.brand.green[700], contrastText: '#1E163A' };

    const sem = isDark ? T.semanticsDark : T.semantics;

    return {
      palette: {
        mode,
        primary, secondary, tertiary,
        error: sem.error, warning: sem.warning, info: sem.info, success: sem.success,
        grey: { 50:N[50],100:N[100],200:N[200],300:N[300],400:N[400],500:N[500],600:N[600],700:N[700],800:N[800],900:N[900] },
        text: { primary: text.primary, secondary: text.secondary, disabled: text.disabled, muted: text.muted, inverse: text.inverse, main: text.primary },
        background: { default: surfaces.canvas, paper: surfaces.panel },
        divider: border.subtle,
      },
      typography: buildTypography(T),
      shape: { borderRadius: 8 },
      spacing: 4,
      shadows: (() => { const a = ['none', T.shadow.sm, T.shadow.md, T.shadow.lg, T.shadow.xl]; while (a.length < 25) a.push(T.shadow.xl); return a; })(),
      transitions: {
        duration: { shortest: 120, shorter: 120, short: 200, standard: 200, complex: 320, enteringScreen: 200, leavingScreen: 120 },
        easing: { easeInOut: T.motion.ease.standard, easeOut: T.motion.ease.out, easeIn: T.motion.ease.in, sharp: T.motion.ease.emphasized },
      },
      tokens: { neutrals: N, surfaces, text, border, radius: T.radius, shadow: T.shadow, motion: T.motion, spacing: T.spacing, shift: S },
    };
  }

  return { buildTheme };
})();
