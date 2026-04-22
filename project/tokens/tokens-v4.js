// ============================================================================
// M7 Design System — Design Tokens
// ============================================================================

const neutralScales = {
  'brand-tinted': {
    0:'#FFFFFF',25:'#FBFAFD',50:'#F7F6FB',100:'#EFEDF5',150:'#E5E3EC',
    200:'#D9D7E2',300:'#BCBAC8',400:'#8F8D9E',500:'#6B6979',600:'#4F4D5B',
    700:'#38363F',800:'#22212A',900:'#141319',1000:'#0A0910',
  },
  'cool': {
    0:'#FFFFFF',25:'#FCFCFD',50:'#F7F8FA',100:'#EEF0F3',150:'#E3E6EB',
    200:'#D5D9E0',300:'#B6BAC3',400:'#898F99',500:'#666B74',600:'#4A4E55',
    700:'#34373C',800:'#1F2125',900:'#121316',1000:'#09090B',
  },
  'warm': {
    0:'#FFFFFF',25:'#FCFBFA',50:'#F8F7F5',100:'#F0EFEB',150:'#E6E4DF',
    200:'#D8D5CE',300:'#BBB7AE',400:'#908C82',500:'#6C6860',600:'#4F4C46',
    700:'#383631',800:'#23221F',900:'#141413',1000:'#09090A',
  },
};

const brand = {
  purple: { 50:'#F4F1FC',100:'#E6DFF8',200:'#CEC1F0',300:'#B09CE4',400:'#8A72D3',500:'#5B43AC',600:'#4C378F',700:'#3C2B72',800:'#2D2056',900:'#1E163A',950:'#120C24' },
  // Tertiary — derived from $brandGreen #CAF036 (sits at the 400 stop as the brand anchor)
  green: { 50:'#FAFDE8',100:'#F2FBC2',200:'#E6F78C',300:'#D8F35A',400:'#CAF036',500:'#A8CE1D',600:'#86A516',700:'#647B14',800:'#465411',900:'#2D3609',950:'#1A1F05' },
  purpleLight: '#A4ADED',
};

const semantics = {
  // Light mode — main is the darker, saturated tone for strong contrast on white
  success: { lighter:'#E7F5E5', light:'#BFD1A4', main:'#2E7D32', dark:'#1F5622', contrastText:'#FFFFFF' },
  warning: { lighter:'#FFF4E5', light:'#FFC179', main:'#E59A04', dark:'#8A5A00', contrastText:'#321800' },
  error:   { lighter:'#FFDBDB', light:'#EBB9B9', main:'#D32F2F', dark:'#991C1C', contrastText:'#FFFFFF' },
  info:    { lighter:'#D6F0FF', light:'#8DCDF5', main:'#1B82C2', dark:'#0F5A88', contrastText:'#FFFFFF' },
};

// Dark mode — main is ~2 stops lighter for lift against dark surfaces.
// `lighter` flips to a deep tinted background that works under colored text.
// `dark` inverts — in dark mode, hover/pressed gets LIGHTER, not darker.
const semanticsDark = {
  success: { lighter:'#1A3A1E', light:'#2E7D32', main:'#7FC27F', dark:'#B4DDB4', contrastText:'#0A1F0C' },
  warning: { lighter:'#3A2A05', light:'#8A5A00', main:'#F5C062', dark:'#FFDBA3', contrastText:'#2A1C00' },
  error:   { lighter:'#3D1515', light:'#991C1C', main:'#EB8080', dark:'#F5B3B3', contrastText:'#1F0808' },
  info:    { lighter:'#0B2A3D', light:'#0F5A88', main:'#7BC4EB', dark:'#B5DEF3', contrastText:'#081825' },
};

const shiftColorSets = {
  legacy: {
    day:{bg:'#FFEBB8',fg:'#5C4200',accent:'#FFD059'},
    night:{bg:'#EBEAFD',fg:'#2D2056',accent:'#B4B2D3'},
    block:{bg:'#FFDBDB',fg:'#5C1F1F',accent:'#D79F9F'},
    vacation:{bg:'#F1FFDB',fg:'#2B4210',accent:'#C4D9A0'},
    education:{bg:'#C4ECE2',fg:'#0F4033',accent:'#7FC7B5'},
    school:{bg:'#E7B3F4',fg:'#4A1858',accent:'#C98CD8'},
    floated:{bg:'#FFB8ED',fg:'#5A1B49',accent:'#E689C9'},
  },
  refined: {
    day:{bg:'#FCE6AC',fg:'#4A3400',accent:'#E8B744'},
    night:{bg:'#E4E2F7',fg:'#2A1E5E',accent:'#9A97C8'},
    block:{bg:'#F9D2D2',fg:'#631B1B',accent:'#C48686'},
    vacation:{bg:'#E6F4C8',fg:'#2E4512',accent:'#A7C283'},
    education:{bg:'#BEE2D6',fg:'#113E32',accent:'#73B8A5'},
    school:{bg:'#DDA8EF',fg:'#441353',accent:'#B17AC1'},
    floated:{bg:'#F5A8E0',fg:'#58163F',accent:'#D274B6'},
  },
};

const type = {
  fontFamily: {
    body: '"Inter", "Roboto", system-ui, -apple-system, sans-serif',
    display: '"Inter Tight", "Inter", system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, "SF Mono", "Menlo", monospace',
  },
  scale: {
    displayLg:{size:4.5,lh:1.02,ls:-0.04,w:500,family:'display'},
    displayMd:{size:3.375,lh:1.05,ls:-0.035,w:500,family:'display'},
    displaySm:{size:2.5,lh:1.1,ls:-0.03,w:500,family:'display'},
    h1:{size:2.25,lh:1.15,ls:-0.022,w:600,family:'body'},
    h2:{size:1.875,lh:1.2,ls:-0.02,w:600,family:'body'},
    h3:{size:1.5,lh:1.25,ls:-0.015,w:600,family:'body'},
    h4:{size:1.25,lh:1.3,ls:-0.01,w:600,family:'body'},
    h5:{size:1.125,lh:1.35,ls:-0.005,w:600,family:'body'},
    h6:{size:1.0,lh:1.4,ls:0,w:600,family:'body'},
    subtitle1:{size:1.0,lh:1.5,ls:0,w:500,family:'body'},
    subtitle2:{size:0.875,lh:1.5,ls:0,w:500,family:'body'},
    body1:{size:1.0,lh:1.55,ls:0,w:400,family:'body'},
    body1bold:{size:1.0,lh:1.55,ls:0,w:600,family:'body'},
    body1SemiBold:{size:1.0,lh:1.55,ls:0,w:500,family:'body'},
    body2:{size:0.875,lh:1.55,ls:0,w:400,family:'body'},
    small:{size:0.875,lh:1.45,ls:0,w:400,family:'body'},
    smallBold:{size:0.875,lh:1.45,ls:0,w:600,family:'body'},
    shy:{size:0.875,lh:1.45,ls:0,w:500,family:'body'},
    xSmall:{size:0.75,lh:1.4,ls:0.005,w:400,family:'body'},
    caption:{size:0.75,lh:1.4,ls:0.01,w:400,family:'body'},
    overline:{size:0.6875,lh:1.3,ls:0.08,w:600,family:'body'},
    button:{size:0.875,lh:1.2,ls:0,w:500,family:'body'},
  },
};

const spacing = { 0:'0px',0.5:'2px',1:'4px',1.5:'6px',2:'8px',3:'12px',4:'16px',5:'20px',6:'24px',8:'32px',10:'40px',12:'48px',16:'64px',20:'80px',24:'96px' };
const radius = { none:'0px',xs:'2px',sm:'4px',md:'8px',lg:'12px',xl:'16px',pill:'999px',circle:'50%' };
const shadow = {
  none:'none',
  sm:'0 1px 2px 0 rgb(20 19 25 / 0.05)',
  md:'0 2px 6px -1px rgb(20 19 25 / 0.08), 0 1px 3px -1px rgb(20 19 25 / 0.06)',
  lg:'0 8px 24px -4px rgb(20 19 25 / 0.12), 0 3px 6px -2px rgb(20 19 25 / 0.06)',
  xl:'0 24px 48px -12px rgb(20 19 25 / 0.18), 0 8px 16px -4px rgb(20 19 25 / 0.08)',
  focus:'0 0 0 3px rgb(91 67 172 / 0.25)',
};
const motion = {
  duration:{ instant:'0ms',fast:'120ms',base:'200ms',slow:'320ms',slower:'500ms' },
  ease:{
    standard:'cubic-bezier(0.2, 0, 0, 1)',
    emphasized:'cubic-bezier(0.2, 0, 0, 1.2)',
    out:'cubic-bezier(0, 0, 0, 1)',
    in:'cubic-bezier(0.3, 0, 1, 1)',
    linear:'linear',
  },
};

window.M7Tokens = { neutralScales, brand, semantics, semanticsDark, shiftColorSets, type, spacing, radius, shadow, motion };
