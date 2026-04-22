const DEFAULTS = /*EDITMODE-BEGIN*/{
  "neutralKey": "brand-tinted",
  "shiftKey": "refined",
  "mode": "light"
}/*EDITMODE-END*/;

function useThemeState() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('m7ds-settings');
      if (saved) return { ...DEFAULTS, ...JSON.parse(saved) };
    } catch {}
    return DEFAULTS;
  });
  useEffect(() => {
    try { localStorage.setItem('m7ds-settings', JSON.stringify(settings)); } catch {}
  }, [settings]);
  const theme = useMemo(() => window.M7ThemeBuilder.buildTheme(settings), [settings]);
  return { theme, settings, setSettings };
}

function TweaksPanel({ visible, settings, setSettings, theme, onClose }) {
  if (!visible) return null;
  const sp = theme.tokens.spacing;
  const Row = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: sp[2], marginBottom: sp[4] }}>
      <div style={{ ...theme.typography.xSmall, textTransform: 'uppercase', letterSpacing: '0.06em', color: theme.tokens.text.muted, fontWeight: 600 }}>{label}</div>
      {children}
    </div>
  );
  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: `${sp[2]} ${sp[3]}`, borderRadius: theme.tokens.radius.sm,
      border: `1px solid ${active ? theme.palette.primary.main : theme.tokens.border.default}`,
      background: active ? theme.palette.primary.lighter : theme.tokens.surfaces.panel,
      color: active ? theme.palette.primary.dark : theme.tokens.text.primary,
      ...theme.typography.small, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize',
    }}>{children}</button>
  );

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, width: 320, zIndex: 100,
      background: theme.tokens.surfaces.panel, border: `1px solid ${theme.tokens.border.default}`,
      borderRadius: theme.tokens.radius.lg, boxShadow: theme.tokens.shadow.xl, padding: sp[5] }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: sp[4] }}>
        <div style={{ ...theme.typography.h6, color: theme.tokens.text.primary }}>Tweaks</div>
        <span onClick={onClose} style={{ cursor: 'pointer', color: theme.tokens.text.muted, display: 'flex' }}>{Icon.close()}</span>
      </div>
      <Row label="Neutral scale">
        <div style={{ display: 'flex', gap: sp[2], flexWrap: 'wrap' }}>
          {['brand-tinted', 'cool', 'warm'].map(k => (
            <Pill key={k} active={settings.neutralKey === k} onClick={() => {
              const next = { ...settings, neutralKey: k };
              setSettings(next);
              window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { neutralKey: k } }, '*');
            }}>{k}</Pill>
          ))}
        </div>
      </Row>
      <Row label="Shift color set">
        <div style={{ display: 'flex', gap: sp[2] }}>
          {['refined', 'legacy'].map(k => (
            <Pill key={k} active={settings.shiftKey === k} onClick={() => {
              const next = { ...settings, shiftKey: k };
              setSettings(next);
              window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { shiftKey: k } }, '*');
            }}>{k}</Pill>
          ))}
        </div>
      </Row>
      <Row label="Mode">
        <div style={{ display: 'flex', gap: sp[2] }}>
          {['light', 'dark'].map(k => (
            <Pill key={k} active={settings.mode === k} onClick={() => {
              const next = { ...settings, mode: k };
              setSettings(next);
              window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { mode: k } }, '*');
            }}>{k}</Pill>
          ))}
        </div>
      </Row>
      <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, marginTop: sp[3], lineHeight: 1.5 }}>
        Changes regenerate the theme snippet in the Handoff section.
      </div>
    </div>
  );
}

function Nav({ theme, activeId }) {
  const sp = theme.tokens.spacing;
  const groups = [
    { label: 'Foundations', items: [
      { id: 'color', label: 'Color' }, { id: 'type', label: 'Typography' },
      { id: 'spacing', label: 'Spacing · Radius · Shadow' }, { id: 'shift', label: 'Shift colors' },
    ]},
    { label: 'Components', items: [
      { id: 'components-buttons', label: 'Buttons' }, { id: 'components-inputs', label: 'Form controls' },
      { id: 'components-feedback', label: 'Feedback' }, { id: 'components-composite', label: 'Composed patterns' },
    ]},
    { label: 'Handoff', items: [{ id: 'handoff', label: 'theme.ts + migration' }] },
  ];
  return (
    <nav style={{ position: 'sticky', top: 64, alignSelf: 'flex-start', width: 240, padding: sp[5],
      borderRight: `1px solid ${theme.tokens.border.subtle}`, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: sp[6] }}>
          <div style={{ ...theme.typography.overline, color: theme.tokens.text.muted, marginBottom: sp[2] }}>{g.label}</div>
          {g.items.map(it => (
            <a key={it.id} href={`#${it.id}`} style={{
              display: 'block', padding: `${sp[2]} ${sp[3]}`, borderRadius: theme.tokens.radius.sm,
              ...theme.typography.small,
              color: activeId === it.id ? theme.palette.primary.dark : theme.tokens.text.secondary,
              background: activeId === it.id ? theme.palette.primary.lighter : 'transparent',
              fontWeight: activeId === it.id ? 600 : 400, textDecoration: 'none', marginBottom: 2,
            }}>{it.label}</a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function Header({ theme, mode, onModeChange }) {
  const sp = theme.tokens.spacing;
  const ToggleBtn = ({ value, children, title }) => {
    const active = mode === value;
    return (
      <button onClick={() => onModeChange(value)} title={title} aria-label={title} aria-pressed={active} style={{
        width: 32, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: active ? theme.tokens.surfaces.panel : 'transparent',
        color: active ? theme.tokens.text.primary : theme.tokens.text.muted,
        border: 'none', borderRadius: theme.tokens.radius.sm,
        boxShadow: active ? theme.tokens.shadow.sm : 'none',
        cursor: 'pointer', padding: 0,
      }}>{children}</button>
    );
  };
  const SunIcon = (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>);
  const MoonIcon = (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${sp[6]}`,
      background: theme.tokens.surfaces.panel, borderBottom: `1px solid ${theme.tokens.border.subtle}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[3] }}>
        <div style={{ width: 28, height: 28, borderRadius: theme.tokens.radius.sm,
          background: theme.palette.primary.main, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: theme.typography.fontFamily, fontWeight: 700, fontSize: 14 }}>M7</div>
        <div>
          <div style={{ ...theme.typography.smallBold, color: theme.tokens.text.primary }}>Design System</div>
          <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted }}>v1.1 · MUI v5</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[3] }}>
        <div style={{ display: 'inline-flex', gap: 2, padding: 2,
          background: theme.tokens.surfaces.subtle,
          border: `1px solid ${theme.tokens.border.subtle}`,
          borderRadius: theme.tokens.radius.sm }}>
          <ToggleBtn value="light" title="Light mode">{SunIcon}</ToggleBtn>
          <ToggleBtn value="dark" title="Dark mode">{MoonIcon}</ToggleBtn>
        </div>
        <Chip theme={theme} color="primary" variant="outlined" size="small" label="Prototype" />
      </div>
    </header>
  );
}

function Hero({ theme }) {
  const sp = theme.tokens.spacing;
  return (
    <section style={{ padding: `${sp[16]} ${sp[10]}`, borderBottom: `1px solid ${theme.tokens.border.subtle}`, background: theme.tokens.surfaces.canvas }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ ...theme.typography.overline, color: theme.palette.primary.main, marginBottom: sp[3] }}>M7 Design System · v1.1</div>
        <h1 style={{ ...theme.typography.displayMd, color: theme.tokens.text.primary, margin: 0, marginBottom: sp[4], maxWidth: 900 }}>
          A MUI-native component library, tuned to the M7 brand
        </h1>
        <p style={{ ...theme.typography.body1, color: theme.tokens.text.secondary, maxWidth: 720, margin: 0, marginBottom: sp[6] }}>
          Built on top of your current theme in <code style={{ fontFamily: 'ui-monospace, monospace', background: theme.tokens.surfaces.subtle, padding: '2px 6px', borderRadius: 4 }}>frontend/src/common/theming/</code>. Every gap between your custom tokens and MUI v5's design system is filled here. Toggle Tweaks in the toolbar to explore alternatives.
        </p>
        <div style={{ display: 'flex', gap: sp[3] }}>
          <Button theme={theme} variant="contained" endIcon={Icon.arrowRight()}>View foundations</Button>
          <Button theme={theme} variant="outlined" color="secondary">Jump to handoff</Button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const { theme, settings, setSettings } = useThemeState();
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [activeId, setActiveId] = useState('color');

  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.3) setActiveId(e.target.id);
      });
    }, { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.3, 0.6] });
    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.background = theme.tokens.surfaces.canvas;
    document.body.style.color = theme.tokens.text.primary;
  }, [theme]);

  return (
    <div style={{ minHeight: '100vh', background: theme.tokens.surfaces.canvas, color: theme.tokens.text.primary, fontFamily: theme.typography.fontFamily }}>
      <Header theme={theme} mode={settings.mode} onModeChange={(m) => {
        setSettings({ ...settings, mode: m });
        window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { mode: m } }, '*');
      }} />
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        <Nav theme={theme} activeId={activeId} />
        <main>
          <Hero theme={theme} />
          <FoundationsColor theme={theme} />
          <FoundationsType theme={theme} />
          <FoundationsSpacing theme={theme} />
          <FoundationsShift theme={theme} />
          <ComponentsButtons theme={theme} />
          <ComponentsInputs theme={theme} />
          <ComponentsFeedback theme={theme} />
          <ComponentsComposite theme={theme} />
          <HandoffSection theme={theme} currentNeutralKey={settings.neutralKey} currentShiftKey={settings.shiftKey} />
        </main>
      </div>
      <TweaksPanel visible={tweaksVisible} settings={settings} setSettings={setSettings} theme={theme} onClose={() => setTweaksVisible(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
