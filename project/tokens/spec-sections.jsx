function FoundationsColor({ theme }) {
  const N = theme.tokens.neutrals;
  const T = window.M7Tokens;
  const purpleStops = [50,100,200,300,400,500,600,700,800,900,950];
  const greenStops  = [50,100,200,300,400,500,600,700,800,900,950];
  const neutralOrder = [0, 25, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const sp = theme.tokens.spacing;

  // Reverse-lookup: given a 4-stop palette and the full scale, find which scale-stop matches each role.
  // Mode-aware — reflects light-shifting (in dark mode, purple.main is stop 300, not 500).
  const roleMapFor = (pal, scale) => {
    const map = {};
    ['lighter', 'light', 'main', 'dark'].forEach(role => {
      const hex = (pal[role] || '').toLowerCase();
      const match = Object.entries(scale).find(([, v]) => String(v).toLowerCase() === hex);
      if (match) map[match[0]] = role;
    });
    return map;
  };

  const FullScale = ({ title, eyebrow, stops, get, roleMap, accent, note }) => (
    <div style={{ marginBottom: sp[10] }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: sp[3], gap: sp[4], flexWrap: 'wrap' }}>
        <div>
          {eyebrow && <div style={{ ...theme.typography.overline, color: accent || theme.tokens.text.muted, marginBottom: 2 }}>{eyebrow}</div>}
          <h3 style={{ ...theme.typography.h4, color: theme.tokens.text.primary, margin: 0 }}>{title}</h3>
        </div>
        {note && <span style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{note}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stops.length}, 1fr)`, gap: sp[2] }}>
        {stops.map(k => {
          const v = get(k);
          const role = roleMap ? roleMap[k] : null;
          const isMain = role === 'main';
          const isRoled = !!role;
          const badgeBg = isMain ? theme.tokens.text.primary : (theme.palette.mode === 'dark' ? theme.tokens.surfaces.raised : theme.tokens.surfaces.panel);
          const badgeFg = isMain ? theme.tokens.surfaces.panel : theme.tokens.text.secondary;
          const badgeBorder = isMain ? theme.tokens.text.primary : theme.tokens.border.strong;
          return (
            <div key={k} style={{ position: 'relative' }}>
              <div style={{ height: 96, background: v, borderRadius: theme.tokens.radius.md,
                border: isMain ? `2px solid ${theme.tokens.text.primary}` : `1px solid ${theme.tokens.border.subtle}`,
                outline: isMain ? `2px solid ${theme.tokens.surfaces.panel}` : 'none', outlineOffset: -4,
                opacity: isRoled || !roleMap ? 1 : 0.92 }} />
              <div style={{ marginTop: sp[2] }}>
                <div style={{ ...theme.typography.small, color: theme.tokens.text.primary, fontWeight: isMain ? 700 : 500, fontFamily: 'ui-monospace, monospace' }}>{k}</div>
                <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{v}</div>
              </div>
              {isRoled && (
                <div style={{ position: 'absolute', top: 6, right: 6, padding: '2px 7px', borderRadius: 999,
                  background: badgeBg, color: badgeFg, border: `1px solid ${badgeBorder}`,
                  fontFamily: theme.typography.fontFamily, fontSize: 10, fontWeight: 600, letterSpacing: 0.4, lineHeight: 1.2 }}>{role}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const FourStopGrid = ({ keys }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: sp[6] }}>
      {keys.map(key => {
        const pal = theme.palette[key];
        return (
          <div key={key}>
            <h4 style={{ ...theme.typography.h6, color: theme.tokens.text.primary, margin: 0, marginBottom: sp[3], textTransform: 'capitalize' }}>{key}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: sp[2] }}>
              <Swatch name="lighter" value={pal.lighter} color={pal.lighter} theme={theme} />
              <Swatch name="light" value={pal.light} color={pal.light} theme={theme} />
              <Swatch name="main" value={pal.main} color={pal.main} theme={theme} onBrand={pal.contrastText} />
              <Swatch name="dark" value={pal.dark} color={pal.dark} theme={theme} onBrand={pal.contrastText} />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Section id="color" eyebrow="Foundations" title="Color" theme={theme}
      description="Full 10-stop scales for the three brand colors (Primary · Tertiary) plus a 14-stop neutral scale. Every branded and semantic role also exposes a 4-stop ramp — lighter / light / main / dark — mapped from the full scales for use in UI tokens.">

      <FullScale title="Primary · Purple" eyebrow="Brand · 10 stops" stops={purpleStops} get={k => T.brand.purple[k]} roleMap={roleMapFor(theme.palette.primary, T.brand.purple)} accent={theme.palette.primary.main} note={theme.palette.mode === 'dark' ? 'dark mode · main lifts to purple.300' : 'main → purple.500 · #5B43AC'} />
      <FullScale title="Tertiary · Green" eyebrow="Brand · 10 stops" stops={greenStops} get={k => T.brand.green[k]} roleMap={roleMapFor(theme.palette.tertiary, T.brand.green)} accent={T.brand.green[600]} note={theme.palette.mode === 'dark' ? 'dark mode · main steps back to green.300' : '$brandGreen #CAF036 → green.400'} />
      <FullScale title="Neutrals" eyebrow="14 stops · 0 → 1000" stops={neutralOrder} get={k => N[k]} accent={theme.tokens.text.muted} note="Linear-inspired · brand-tinted by default" />

      <div style={{ marginBottom: sp[10], display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: sp[6], alignItems: 'stretch' }}>
        <Card theme={theme} padding={sp[6]}>
          <div style={{ ...theme.typography.overline, color: theme.palette.primary.main, marginBottom: sp[2] }}>Pattern · 4 stops</div>
          <h3 style={{ ...theme.typography.h4, margin: 0, marginBottom: sp[3] }}>lighter · light · main · dark</h3>
          <p style={{ ...theme.typography.body2, color: theme.tokens.text.secondary, margin: 0, marginBottom: sp[4] }}>
            Every branded and semantic color role carries four stops so any surface — chip, alert, soft button, badge — can be composed from tokens alone, without one-off hex values. The four stops are sampled from the full 10-stop scales above.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: sp[2], columnGap: sp[4], ...theme.typography.small }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.primary, fontWeight: 600 }}>lighter</span>
            <span style={{ color: theme.tokens.text.secondary }}>Tinted backgrounds — chip fills, alert backgrounds, soft button, hover on colored surfaces.</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.primary, fontWeight: 600 }}>light</span>
            <span style={{ color: theme.tokens.text.secondary }}>Borders and dividers on tinted surfaces. Disabled states of <code style={{ fontFamily: 'ui-monospace, monospace' }}>main</code>.</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.primary, fontWeight: 600 }}>main</span>
            <span style={{ color: theme.tokens.text.secondary }}>The canonical color — filled buttons, icons, active text.</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.primary, fontWeight: 600 }}>dark</span>
            <span style={{ color: theme.tokens.text.secondary }}>Text on <code style={{ fontFamily: 'ui-monospace, monospace' }}>lighter</code> backgrounds (WCAG AA). Hover/pressed state of <code style={{ fontFamily: 'ui-monospace, monospace' }}>main</code>.</span>
          </div>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <div style={{ ...theme.typography.overline, color: theme.palette.warning.dark, marginBottom: sp[2] }}>Custom extension</div>
          <h3 style={{ ...theme.typography.h4, margin: 0, marginBottom: sp[3] }}>MUI v5 only ships 3 stops</h3>
          <p style={{ ...theme.typography.body2, color: theme.tokens.text.secondary, margin: 0, marginBottom: sp[4] }}>
            MUI's <code style={{ fontFamily: 'ui-monospace, monospace' }}>PaletteColor</code> defines <code style={{ fontFamily: 'ui-monospace, monospace' }}>light / main / dark / contrastText</code>. We extend it with <code style={{ fontFamily: 'ui-monospace, monospace' }}>lighter</code> and add <code style={{ fontFamily: 'ui-monospace, monospace' }}>tertiary</code> as a first-class palette role. Both require module augmentation in <code style={{ fontFamily: 'ui-monospace, monospace' }}>theme.ts</code>:
          </p>
          <pre style={{ margin: 0, padding: sp[4], background: theme.tokens.neutrals[900], color: theme.tokens.neutrals[100], borderRadius: theme.tokens.radius.sm, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.55, overflow: 'auto' }}>{`declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}`}</pre>
        </Card>
      </div>

      <div style={{ marginBottom: sp[10] }}>
        <h3 style={{ ...theme.typography.h5, color: theme.tokens.text.primary, margin: 0, marginBottom: sp[4] }}>Branded roles · 4-stop</h3>
        <FourStopGrid keys={['primary', 'secondary', 'tertiary']} />
      </div>

      <div style={{ marginBottom: sp[10] }}>
        <h3 style={{ ...theme.typography.h5, color: theme.tokens.text.primary, margin: 0, marginBottom: sp[4] }}>Semantic roles · 4-stop</h3>
        <FourStopGrid keys={['success', 'warning', 'error', 'info']} />
      </div>
      <Card theme={theme} padding={sp[6]} style={{ marginBottom: sp[10] }}>
        <div style={{ ...theme.typography.overline, color: theme.palette.tertiary.dark, marginBottom: sp[2] }}>Dark mode · Light-shifting</div>
        <h3 style={{ ...theme.typography.h4, margin: 0, marginBottom: sp[3] }}>`main` lifts ~2 stops lighter on dark surfaces</h3>
        <p style={{ ...theme.typography.body2, color: theme.tokens.text.secondary, margin: 0, marginBottom: sp[4], maxWidth: 720 }}>
          Saturated mid-tones muddy against dark backgrounds and fail WCAG AA as text. Following Material 3, Linear, and Primer, every branded and semantic role remaps its 4 stops in dark mode — <code style={{ fontFamily: 'ui-monospace, monospace' }}>main</code> lifts 2 stops, <code style={{ fontFamily: 'ui-monospace, monospace' }}>lighter</code> flips to a deep tinted surface, and <code style={{ fontFamily: 'ui-monospace, monospace' }}>dark</code> inverts so hover/pressed gets <em>lighter</em>, not darker (tonal inversion).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)', rowGap: sp[2], columnGap: sp[3], alignItems: 'center' }}>
          <div />
          {['lighter','light','main','dark'].map(s => <div key={s} style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s}</div>)}
          <div style={{ ...theme.typography.small, color: theme.tokens.text.secondary }}>Primary · light</div>
          {[50,300,500,700].map(k => <div key={k} style={{ height: 40, borderRadius: 6, background: window.M7Tokens.brand.purple[k], border: `1px solid ${theme.tokens.border.subtle}` }} title={`purple.${k}`} />)}
          <div style={{ ...theme.typography.small, color: theme.tokens.text.secondary }}>Primary · dark</div>
          {[900,200,300,100].map((k,i) => <div key={i} style={{ height: 40, borderRadius: 6, background: window.M7Tokens.brand.purple[k], border: `1px solid ${theme.tokens.border.subtle}` }} title={`purple.${k}`} />)}
          <div style={{ ...theme.typography.small, color: theme.tokens.text.secondary, marginTop: sp[2] }}>Tertiary · light</div>
          {[50,200,400,700].map(k => <div key={k} style={{ height: 40, borderRadius: 6, background: window.M7Tokens.brand.green[k], border: `1px solid ${theme.tokens.border.subtle}`, marginTop: sp[2] }} title={`green.${k}`} />)}
          <div style={{ ...theme.typography.small, color: theme.tokens.text.secondary }}>Tertiary · dark</div>
          {[900,600,300,100].map((k,i) => <div key={i} style={{ height: 40, borderRadius: 6, background: window.M7Tokens.brand.green[k], border: `1px solid ${theme.tokens.border.subtle}` }} title={`green.${k}`} />)}
        </div>
        <p style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, marginTop: sp[4], marginBottom: 0 }}>
          Toggle mode in the Tweaks panel to see it applied across every role (primary, secondary, tertiary, success, warning, error, info).
        </p>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp[6] }}>
        <Card theme={theme} padding={sp[5]}>
          <h4 style={{ ...theme.typography.h6, margin: 0, marginBottom: sp[3] }}>Surfaces</h4>
          {Object.entries(theme.tokens.surfaces).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
              <div style={{ width: 40, height: 24, background: v, border: `1px solid ${theme.tokens.border.subtle}`, borderRadius: 4 }} />
              <div style={{ flex: 1 }}><TokenLabel name={k} value={v} theme={theme} /></div>
            </div>
          ))}
        </Card>
        <Card theme={theme} padding={sp[5]}>
          <h4 style={{ ...theme.typography.h6, margin: 0, marginBottom: sp[3] }}>Text</h4>
          {Object.entries(theme.tokens.text).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
              <span style={{ ...theme.typography.body1bold, color: v, minWidth: 40 }}>Aa</span>
              <div style={{ flex: 1 }}><TokenLabel name={k} value={v} theme={theme} /></div>
            </div>
          ))}
        </Card>
        <Card theme={theme} padding={sp[5]}>
          <h4 style={{ ...theme.typography.h6, margin: 0, marginBottom: sp[3] }}>Borders</h4>
          {Object.entries(theme.tokens.border).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
              <div style={{ width: 40, height: 24, border: `2px solid ${v}`, borderRadius: 4 }} />
              <div style={{ flex: 1 }}><TokenLabel name={k} value={v} theme={theme} /></div>
            </div>
          ))}
        </Card>
      </div>
    </Section>
  );
}

function FoundationsType({ theme }) {
  const sp = theme.tokens.spacing;
  const rows = [
    ['displayLg', 'Display Large', 'The future of staffing'],
    ['displayMd', 'Display Medium', 'The future of staffing'],
    ['displaySm', 'Display Small', 'The future of staffing'],
    ['h1', 'Heading 1', 'Shift management, reimagined'],
    ['h2', 'Heading 2', 'Shift management, reimagined'],
    ['h3', 'Heading 3', 'Shift management, reimagined'],
    ['h4', 'Heading 4', 'Shift management, reimagined'],
    ['h5', 'Heading 5', 'Shift management, reimagined'],
    ['h6', 'Heading 6', 'Shift management, reimagined'],
    ['subtitle1', 'Subtitle 1', 'Section header text'],
    ['subtitle2', 'Subtitle 2', 'Section header text'],
    ['body1', 'Body 1', 'Standard paragraph text for long-form content.'],
    ['body1SemiBold', 'Body 1 Semibold', 'Standard paragraph text, emphasized.'],
    ['body1bold', 'Body 1 Bold', 'Standard paragraph text, bold.'],
    ['body2', 'Body 2', 'Secondary paragraph text.'],
    ['small', 'Small', 'Compact body size used widely in the app.'],
    ['smallBold', 'Small Bold', 'Compact size, emphasized.'],
    ['shy', 'Shy', 'Metadata-like text.'],
    ['caption', 'Caption', 'Helper text, captions.'],
    ['xSmall', 'Extra Small', 'Dense table cells.'],
    ['overline', 'Overline', 'CATEGORY LABEL'],
    ['button', 'Button', 'Button label'],
  ];
  return (
    <Section id="type" eyebrow="Foundations" title="Typography" theme={theme}
      description="Inter for body, Inter Tight for display. Every variant is explicit: size · weight · line-height · letter-spacing.">
      <div style={{ border: `1px solid ${theme.tokens.border.subtle}`, borderRadius: theme.tokens.radius.lg, overflow: 'hidden' }}>
        {rows.map(([key, name, sample], i) => {
          const v = theme.typography[key];
          return (
            <div key={key} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 320px', gap: sp[6], padding: `${sp[5]} ${sp[6]}`, borderTop: i === 0 ? 'none' : `1px solid ${theme.tokens.border.subtle}`, alignItems: 'baseline' }}>
              <div>
                <div style={{ ...theme.typography.smallBold, color: theme.tokens.text.primary }}>{name}</div>
                <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>typography.{key}</div>
              </div>
              <div style={{ ...v, color: theme.tokens.text.primary }}>{sample}</div>
              <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{v.fontSize} · {v.fontWeight} · lh {v.lineHeight} · ls {v.letterSpacing}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function FoundationsSpacing({ theme }) {
  const sp = theme.tokens.spacing;
  const radii = theme.tokens.radius;
  const shadows = theme.tokens.shadow;
  const motion = theme.tokens.motion;
  return (
    <Section id="spacing" eyebrow="Foundations" title="Spacing, Radius, Shadow, Motion" theme={theme}
      description="4px-base spacing scale. Trimmed radius and shadow sets. Motion tokens with durations and easing curves.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: sp[6], marginBottom: sp[8] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Spacing · 4px base</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp[2] }}>
            {Object.entries(sp).map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr', alignItems: 'center', gap: sp[3] }}>
                <span style={{ ...theme.typography.small, fontFamily: 'ui-monospace, monospace' }}>spacing.{k}</span>
                <span style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{v}</span>
                <div style={{ height: 8, width: v, background: theme.palette.primary.main, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Radius</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: sp[4] }}>
            {Object.entries(radii).map(([k, v]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, margin: '0 auto', background: theme.palette.primary.lighter, border: `1.5px solid ${theme.palette.primary.light}`, borderRadius: v }} />
                <div style={{ ...theme.typography.small, fontFamily: 'ui-monospace, monospace', marginTop: sp[2] }}>{k}</div>
                <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: sp[6] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Shadow</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: sp[4] }}>
            {Object.entries(shadows).map(([k, v]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, margin: '0 auto', background: theme.tokens.surfaces.panel, border: `1px solid ${theme.tokens.border.subtle}`, borderRadius: radii.md, boxShadow: v === 'none' ? 'none' : v }} />
                <div style={{ ...theme.typography.small, fontFamily: 'ui-monospace, monospace', marginTop: sp[2] }}>{k}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Motion</h4>
          <div style={{ marginBottom: sp[4] }}>
            <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Duration</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: sp[2] }}>
              {Object.entries(motion.duration).map(([k, v]) => (
                <div key={k} style={{ padding: sp[2], borderRadius: radii.sm, background: theme.tokens.surfaces.subtle, textAlign: 'center' }}>
                  <div style={{ ...theme.typography.xSmall, fontFamily: 'ui-monospace, monospace' }}>{k}</div>
                  <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Easing</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp[1] }}>
              {Object.entries(motion.ease).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: sp[3] }}>
                  <span style={{ ...theme.typography.xSmall, fontFamily: 'ui-monospace, monospace', minWidth: 72 }}>{k}</span>
                  <span style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function FoundationsShift({ theme }) {
  const sp = theme.tokens.spacing;
  const shift = theme.tokens.shift;
  return (
    <Section id="shift" eyebrow="Foundations · Domain" title="Shift colors" theme={theme}
      description="Categorical color set for shift types. These live outside the MUI palette in a dedicated shiftColors token group — accessed via theme.tokens.shift.day, etc.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: sp[4] }}>
        {Object.entries(shift).map(([k, v]) => (
          <Card key={k} theme={theme} padding={0}>
            <div style={{ background: v.bg, padding: `${sp[5]} ${sp[5]}`, borderTopLeftRadius: theme.tokens.radius.lg, borderTopRightRadius: theme.tokens.radius.lg }}>
              <div style={{ ...theme.typography.smallBold, color: v.fg, textTransform: 'capitalize' }}>{k} shift</div>
              <div style={{ ...theme.typography.xSmall, color: v.fg, opacity: 0.8 }}>7:00 AM — 7:00 PM</div>
            </div>
            <div style={{ padding: sp[4], display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['bg','fg','accent'].map(prop => (
                <div key={prop} style={{ display: 'flex', gap: sp[2], alignItems: 'center' }}>
                  <div style={{ width: 16, height: 16, background: v[prop], borderRadius: 3, border: `1px solid ${theme.tokens.border.subtle}` }} />
                  <span style={{ ...theme.typography.xSmall, fontFamily: 'ui-monospace, monospace', color: theme.tokens.text.muted }}>{prop}  {v[prop]}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ComponentsButtons({ theme }) {
  const sp = theme.tokens.spacing;
  return (
    <Section id="components-buttons" eyebrow="Components" title="Buttons" theme={theme}
      description="Contained, outlined, text, and soft variants. Three sizes. Icons inherit the button's text color via currentColor — the same contrast token applied to the label.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: sp[5] }}>
        {['primary', 'secondary', 'error', 'success'].map(color => (
          <Card key={color} theme={theme} padding={sp[5]}>
            <div style={{ ...theme.typography.smallBold, textTransform: 'capitalize', marginBottom: sp[3], color: theme.tokens.text.muted }}>{color}</div>
            <div style={{ display: 'flex', gap: sp[3], flexWrap: 'wrap', alignItems: 'center', marginBottom: sp[3] }}>
              <Button theme={theme} color={color} variant="contained">Contained</Button>
              <Button theme={theme} color={color} variant="outlined">Outlined</Button>
              <Button theme={theme} color={color} variant="text">Text</Button>
              <Button theme={theme} color={color} variant="soft">Soft</Button>
              <Button theme={theme} color={color} variant="contained" disabled>Disabled</Button>
              <Button theme={theme} color={color} variant="contained" size="small">Small</Button>
              <Button theme={theme} color={color} variant="contained" size="large">Large</Button>
            </div>
            <div style={{ display: 'flex', gap: sp[3], flexWrap: 'wrap', alignItems: 'center' }}>
              <Button theme={theme} color={color} variant="contained" startIcon={Icon.plus()}>Add</Button>
              <Button theme={theme} color={color} variant="outlined" startIcon={Icon.plus()}>Add</Button>
              <Button theme={theme} color={color} variant="text" endIcon={Icon.arrowRight()}>Continue</Button>
              <Button theme={theme} color={color} variant="soft" startIcon={Icon.check()}>Confirm</Button>
              <Button theme={theme} color={color} variant="contained" size="small" startIcon={Icon.plus()}>Small</Button>
              <Button theme={theme} color={color} variant="contained" size="large" endIcon={Icon.arrowRight()}>Large</Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ComponentsInputs({ theme }) {
  const sp = theme.tokens.spacing;
  return (
    <Section id="components-inputs" eyebrow="Components" title="Form controls" theme={theme}
      description="Text fields, switches, checkboxes, and radios. Focus and error states wired to semantic tokens.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[5] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Text field</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp[4] }}>
            <TextField theme={theme} label="Full name" placeholder="Dr. Jane Smith" fullWidth />
            <TextField theme={theme} label="Facility" placeholder="Search facilities" startAdornment={Icon.search(theme.tokens.text.muted)} fullWidth />
            <TextField theme={theme} label="Email" value="jane@m7health.com" helperText="Invalid email address" error fullWidth />
            <TextField theme={theme} label="Read only" value="Disabled value" disabled fullWidth />
          </div>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Selection</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp[4] }}>
            <div>
              <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Switch</div>
              <div style={{ display: 'flex', gap: sp[5], flexWrap: 'wrap' }}>
                <Switch theme={theme} checked label="Auto-approve requests" />
                <Switch theme={theme} label="Notifications" />
                <Switch theme={theme} checked disabled label="Locked on" />
              </div>
            </div>
            <div>
              <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Checkbox</div>
              <div style={{ display: 'flex', gap: sp[5], flexWrap: 'wrap' }}>
                <Checkbox theme={theme} checked label="Day shifts" />
                <Checkbox theme={theme} label="Night shifts" />
                <Checkbox theme={theme} disabled label="Call shifts" />
              </div>
            </div>
            <div>
              <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Radio</div>
              <div style={{ display: 'flex', gap: sp[5], flexWrap: 'wrap' }}>
                <Radio theme={theme} checked label="Full-time" />
                <Radio theme={theme} label="Per diem" />
                <Radio theme={theme} label="Contract" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ComponentsFeedback({ theme }) {
  const sp = theme.tokens.spacing;
  return (
    <Section id="components-feedback" eyebrow="Components" title="Feedback" theme={theme}
      description="Alerts, chips, and tooltips across semantic states.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[5] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Alerts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp[3] }}>
            <Alert theme={theme} severity="success" title="Schedule published">All 24 shifts assigned for June.</Alert>
            <Alert theme={theme} severity="info">3 staff have pending PTO requests.</Alert>
            <Alert theme={theme} severity="warning" title="Coverage gap">Night shift Friday is understaffed.</Alert>
            <Alert theme={theme} severity="error" title="Publish failed">Unable to publish schedule.</Alert>
          </div>
        </Card>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Chips</h4>
          <div style={{ display: 'flex', gap: sp[2], flexWrap: 'wrap', marginBottom: sp[4] }}>
            <Chip theme={theme} label="Default" />
            <Chip theme={theme} color="primary" label="Primary" />
            <Chip theme={theme} color="success" label="Approved" />
            <Chip theme={theme} color="warning" label="Pending" />
            <Chip theme={theme} color="error" label="Rejected" />
            <Chip theme={theme} color="info" label="Info" />
          </div>
          <div style={{ display: 'flex', gap: sp[2], flexWrap: 'wrap', marginBottom: sp[4] }}>
            <Chip theme={theme} variant="outlined" label="Outlined" />
            <Chip theme={theme} variant="outlined" color="primary" label="ICU" />
            <Chip theme={theme} variant="outlined" color="success" label="On duty" />
            <Chip theme={theme} color="primary" label="Dismissable" onDelete />
          </div>
          <div style={{ ...theme.typography.smallBold, marginBottom: sp[2] }}>Tooltip</div>
          <div style={{ paddingTop: 32 }}>
            <TooltipDemo theme={theme} label="This action is permanent">
              <Button theme={theme} variant="outlined" color="secondary">Hover me</Button>
            </TooltipDemo>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ComponentsComposite({ theme }) {
  const sp = theme.tokens.spacing;
  const shift = theme.tokens.shift;
  return (
    <Section id="components-composite" eyebrow="Components" title="Composed patterns" theme={theme}
      description="How the tokens and primitives come together in real product surfaces.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[6] }}>
        <Card theme={theme} padding={sp[6]}>
          <h4 style={{ ...theme.typography.h5, margin: 0, marginBottom: sp[4] }}>Shift tiles</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: sp[2] }}>
            {[['day', '7A – 7P'], ['night', '7P – 7A'], ['vacation', 'PTO'], ['education', 'In-service']].map(([kind, label]) => (
              <div key={kind} style={{ background: shift[kind].bg, color: shift[kind].fg, borderLeft: `3px solid ${shift[kind].accent}`, padding: `${sp[3]} ${sp[4]}`, borderRadius: theme.tokens.radius.sm }}>
                <div style={{ ...theme.typography.smallBold, textTransform: 'capitalize' }}>{kind}</div>
                <div style={{ ...theme.typography.xSmall, opacity: 0.85 }}>{label}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card theme={theme} padding={0} elevated>
          <div style={{ padding: sp[5], borderBottom: `1px solid ${theme.tokens.border.subtle}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...theme.typography.h5, color: theme.tokens.text.primary }}>Approve PTO request</div>
            <span style={{ cursor: 'pointer', color: theme.tokens.text.muted }}>{Icon.close()}</span>
          </div>
          <div style={{ padding: sp[5] }}>
            <div style={{ ...theme.typography.body2, color: theme.tokens.text.secondary, marginBottom: sp[4] }}>
              Maria Chen requested <b>3 days off</b> (June 12–14). Approving triggers coverage checks.
            </div>
            <Alert theme={theme} severity="warning">This overlaps with 2 scheduled shifts.</Alert>
          </div>
          <div style={{ padding: sp[5], borderTop: `1px solid ${theme.tokens.border.subtle}`, display: 'flex', gap: sp[2], justifyContent: 'flex-end' }}>
            <Button theme={theme} variant="text" color="secondary">Cancel</Button>
            <Button theme={theme} variant="contained">Approve</Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}

Object.assign(window, { FoundationsColor, FoundationsType, FoundationsSpacing, FoundationsShift, ComponentsButtons, ComponentsInputs, ComponentsFeedback, ComponentsComposite });
