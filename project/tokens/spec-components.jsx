const { useState, useMemo, useEffect } = React;

function Section({ id, title, eyebrow, description, children, theme }) {
  const t = theme;
  return (
    <section id={id} style={{ padding: `${t.tokens.spacing[16]} ${t.tokens.spacing[10]}`, borderBottom: `1px solid ${t.tokens.border.subtle}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {eyebrow && <div style={{ ...t.typography.overline, color: t.palette.primary.main, marginBottom: t.tokens.spacing[3] }}>{eyebrow}</div>}
        <h2 style={{ ...t.typography.h2, color: t.tokens.text.primary, margin: 0, marginBottom: description ? t.tokens.spacing[3] : t.tokens.spacing[10] }}>{title}</h2>
        {description && <p style={{ ...t.typography.body1, color: t.tokens.text.secondary, maxWidth: 720, marginTop: 0, marginBottom: t.tokens.spacing[10] }}>{description}</p>}
        {children}
      </div>
    </section>
  );
}

function TokenLabel({ name, value, theme }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ ...theme.typography.xSmall, color: theme.tokens.text.primary, fontFamily: 'ui-monospace, monospace' }}>{name}</span>
      <span style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{value}</span>
    </div>
  );
}

function Swatch({ color, name, value, theme, large, onBrand }) {
  const size = large ? 120 : 72;
  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: size, background: color, borderRadius: theme.tokens.radius.md, border: `1px solid ${theme.tokens.border.subtle}`, position: 'relative', overflow: 'hidden' }}>
        {onBrand && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: onBrand, ...theme.typography.smallBold }}>Aa</div>}
      </div>
      <div style={{ marginTop: theme.tokens.spacing[2] }}>
        <div style={{ ...theme.typography.small, color: theme.tokens.text.primary, fontWeight: 500 }}>{name}</div>
        <div style={{ ...theme.typography.xSmall, color: theme.tokens.text.muted, fontFamily: 'ui-monospace, monospace' }}>{value}</div>
      </div>
    </div>
  );
}

function Button({ variant = 'contained', color = 'primary', size = 'medium', disabled, children, startIcon, endIcon, theme, fullWidth, style, onClick }) {
  const pal = theme.palette[color] || theme.palette.primary;
  const heights = { small: 30, medium: 36, large: 42 };
  const px = { small: 10, medium: 16, large: 22 };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: heights[size], padding: `0 ${px[size]}px`,
    borderRadius: theme.tokens.radius.sm,
    fontFamily: theme.typography.fontFamily, fontSize: size === 'small' ? '0.8125rem' : '0.875rem', fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer', textTransform: 'none',
    transition: `all ${theme.tokens.motion.duration.fast} ${theme.tokens.motion.ease.standard}`,
    border: '1px solid transparent', opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined, whiteSpace: 'nowrap', ...style,
  };
  const variants = {
    contained: { background: pal.main, color: pal.contrastText, boxShadow: theme.tokens.shadow.sm },
    outlined: { background: 'transparent', color: pal.main, borderColor: pal.main },
    text: { background: 'transparent', color: pal.main },
    soft: { background: pal.lighter || theme.tokens.surfaces.subtle, color: pal.dark || pal.main },
  };
  const iconSize = size === 'small' ? 10 : size === 'large' ? 16 : 14;
  const iconWrap = (slot) => slot ? (
    <span style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit',
      // SVG children inherit via currentColor in stroke/fill attrs
    }} aria-hidden="true">{slot}</span>
  ) : null;
  return (
    <button style={{ ...base, ...variants[variant] }} disabled={disabled} onClick={onClick}>
      {iconWrap(startIcon)}{children}{iconWrap(endIcon)}
    </button>
  );
}

const Icon = {
  plus: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  arrowRight: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m-4-4l4 4-4 4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3L13 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  close: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  search: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={c} strokeWidth="1.6"/><path d="M10.5 10.5L14 14" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  warn: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l7 12H1L8 2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 7v3M8 12v.01" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  info: (c='currentColor') => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.6"/><path d="M8 7v4M8 5v.01" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
};

function Chip({ label, color = 'default', variant = 'filled', size = 'medium', onDelete, theme, icon }) {
  const palMap = {
    default: { bg: theme.tokens.surfaces.subtle, fg: theme.tokens.text.primary, border: theme.tokens.border.default },
    primary: { bg: theme.palette.primary.lighter, fg: theme.palette.primary.dark, border: theme.palette.primary.light },
    success: { bg: theme.palette.success.lighter, fg: theme.palette.success.dark, border: theme.palette.success.light },
    warning: { bg: theme.palette.warning.lighter, fg: theme.palette.warning.dark, border: theme.palette.warning.light },
    error:   { bg: theme.palette.error.lighter,   fg: theme.palette.error.dark,   border: theme.palette.error.light },
    info:    { bg: theme.palette.info.lighter,    fg: theme.palette.info.dark,    border: theme.palette.info.light },
  };
  const p = palMap[color] || palMap.default;
  const h = size === 'small' ? 22 : 28;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: h, padding: `0 ${size === 'small' ? 8 : 10}px`,
      borderRadius: theme.tokens.radius.pill,
      background: variant === 'outlined' ? 'transparent' : p.bg,
      color: p.fg, border: variant === 'outlined' ? `1px solid ${p.border}` : '1px solid transparent',
      ...theme.typography.small, fontSize: size === 'small' ? '0.75rem' : '0.8125rem', fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {icon}{label}
      {onDelete && <span style={{ cursor: 'pointer', display: 'flex', opacity: 0.7 }}>{Icon.close(p.fg)}</span>}
    </span>
  );
}

function TextField({ label, placeholder, value, helperText, error, disabled, theme, startAdornment, endAdornment, fullWidth, size = 'medium' }) {
  const [focused, setFocused] = useState(false);
  const h = size === 'small' ? 36 : 42;
  const borderColor = error ? theme.palette.error.main : focused ? theme.palette.primary.main : theme.tokens.border.default;
  return (
    <div style={{ width: fullWidth ? '100%' : 240 }}>
      {label && <label style={{ ...theme.typography.small, color: theme.tokens.text.secondary, display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: h, padding: '0 12px',
        background: disabled ? theme.tokens.surfaces.subtle : theme.tokens.surfaces.panel,
        border: `1px solid ${borderColor}`, borderRadius: theme.tokens.radius.sm,
        boxShadow: focused ? `0 0 0 3px ${theme.palette.primary.main}20` : 'none',
        transition: `all ${theme.tokens.motion.duration.fast} ${theme.tokens.motion.ease.standard}`, opacity: disabled ? 0.6 : 1,
      }}>
        {startAdornment}
        <input defaultValue={value} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: theme.typography.fontFamily, fontSize: '0.875rem', color: theme.tokens.text.primary, minWidth: 0 }}
        />
        {endAdornment}
      </div>
      {helperText && <div style={{ ...theme.typography.xSmall, color: error ? theme.palette.error.main : theme.tokens.text.muted, marginTop: 6 }}>{helperText}</div>}
    </div>
  );
}

function Switch({ checked: initial = false, disabled, theme, label }) {
  const [checked, setChecked] = useState(initial);
  const on = checked && !disabled;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span onClick={() => !disabled && setChecked(!checked)} style={{
        width: 36, height: 20, borderRadius: 999,
        background: on ? theme.palette.primary.light : theme.tokens.border.strong, position: 'relative',
        transition: `background ${theme.tokens.motion.duration.fast} ${theme.tokens.motion.ease.standard}`,
      }}>
        <span style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: 999,
          background: on ? theme.palette.primary.main : '#fff', boxShadow: theme.tokens.shadow.sm,
          transition: `left ${theme.tokens.motion.duration.fast} ${theme.tokens.motion.ease.standard}` }}/>
      </span>
      {label && <span style={{ ...theme.typography.small, color: theme.tokens.text.primary }}>{label}</span>}
    </label>
  );
}

function Checkbox({ checked: initial = false, disabled, theme, label }) {
  const [checked, setChecked] = useState(initial);
  const on = checked && !disabled;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span onClick={() => !disabled && setChecked(!checked)} style={{
        width: 18, height: 18, borderRadius: theme.tokens.radius.xs,
        background: on ? theme.palette.primary.main : 'transparent',
        border: `1.5px solid ${on ? theme.palette.primary.main : theme.tokens.border.strong}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: `all ${theme.tokens.motion.duration.fast} ${theme.tokens.motion.ease.standard}`,
      }}>
        {on && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3L13 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label && <span style={{ ...theme.typography.small, color: theme.tokens.text.primary }}>{label}</span>}
    </label>
  );
}

function Radio({ checked, disabled, theme, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 18, height: 18, borderRadius: 999, border: `1.5px solid ${checked ? theme.palette.primary.main : theme.tokens.border.strong}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <span style={{ width: 10, height: 10, borderRadius: 999, background: theme.palette.primary.main }}/>}
      </span>
      {label && <span style={{ ...theme.typography.small, color: theme.tokens.text.primary }}>{label}</span>}
    </label>
  );
}

function Alert({ severity = 'info', title, children, theme, variant = 'standard' }) {
  const map = {
    success: { pal: theme.palette.success, icon: Icon.check },
    warning: { pal: theme.palette.warning, icon: Icon.warn },
    error: { pal: theme.palette.error, icon: Icon.warn },
    info: { pal: theme.palette.info, icon: Icon.info },
  };
  const { pal, icon } = map[severity];
  const filled = variant === 'filled';
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: theme.tokens.radius.md,
      background: filled ? pal.main : pal.lighter, color: filled ? pal.contrastText : pal.dark,
      border: filled ? 'none' : `1px solid ${pal.light}` }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>{icon(filled ? pal.contrastText : pal.dark)}</div>
      <div>
        {title && <div style={{ ...theme.typography.smallBold, marginBottom: 2 }}>{title}</div>}
        <div style={{ ...theme.typography.small }}>{children}</div>
      </div>
    </div>
  );
}

function Card({ children, theme, padding = 16, elevated }) {
  return (
    <div style={{ background: theme.tokens.surfaces.panel, border: `1px solid ${theme.tokens.border.subtle}`,
      borderRadius: theme.tokens.radius.lg, padding, boxShadow: elevated ? theme.tokens.shadow.md : 'none' }}>
      {children}
    </div>
  );
}

function TooltipDemo({ theme, children, label }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
        background: theme.tokens.neutrals[900], color: '#fff', padding: '4px 8px', borderRadius: theme.tokens.radius.xs,
        fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>
        {label}
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0,
          borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${theme.tokens.neutrals[900]}` }}/>
      </div>
    </div>
  );
}

Object.assign(window, { Section, TokenLabel, Swatch, Button, Icon, Chip, TextField, Switch, Checkbox, Radio, Alert, Card, TooltipDemo });
