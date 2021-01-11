import { merge } from "lodash";

const colors = {
  text: "#C4C4C4",

  darker: "#021933",
  primary: "#002754",
  lighter: "#024088",
  outline: "#002754",

  dark100: "#C7C8D9",
  dark200: "#8E90A6",
  dark300: "#555770",
  dark400: "#28293D",
  dark500: "#000000",

  gray100: "#FFFFFF",
  gray200: "#FAFAFC",
  gray300: "#F2F2F5",
  gray400: "#EBEBF0",
  gray500: "#E3E4EB",

  secondary: "#1B4758",
};

const theme = {
  breakpoints: [32, 48, 64, 96, 128].map((w) => `${w}em`),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [0, 10, 12, 14, 16, 20, 24, 28, 32, 40, 56, 64],
  initialColorModeName: "light",
  useColorSchemeMediaQuery: true,
  colors: {
    ...colors,
    text: colors.dark500,
    background: colors.gray100,
    elevated: colors.gray200,
    sheet: colors.gray300,
    sunken: colors.gray400,
    border: colors.gray200,
    placeholder: colors.gray300,
    secondary: colors.darker,
    primary: colors.primary,
    muted: colors.gray400,
    accent: colors.lighter,
    // modes: {
    //   dark: {
    //     text: colors.gray100,
    //     background: colors.dark400,
    //     elevated: colors.darkless,
    //     sheet: colors.darkless,
    //     sunken: colors.darker,
    //     border: colors.darkless,
    //     placeholder: colors.slate,
    //     secondary: colors.muted,
    //     muted: colors.muted,
    //     accent: colors.cyan,
    //   },
    // },
  },

  inputBox: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    bg: "gray100",
    p: [4],
    outline: "none",
    ":hover": {
      backgroundColor: "gray400",
    },
    cursor: "pointer",
  },

  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },

    balmain: {
      borderRadius: "extra",
      width: "auto",
      height: "auto",
    },
  },
  fonts: {
    heading:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SF Mono", "Roboto Mono", Menlo, Consolas, monospace',
  },
  lineHeights: {
    display1: "77px",
    display2: "68px",
    headline1: "54px",
    headline2: "44px",
    headline3: "42px",
    headline4: "36px",
    headline5: "28px",
    headline6: "22px",
    lead: "24px",
    body: "24px",
    smallBody: "24px",
    blockquote: "28px",
    capitalized: "17px",
    smallText: "15px",
    tinyText: "12px",
    tinyText: "14px",
    mediumlabel: "18px",
    textLabel: "17px",
  },
  fontWeights: {
    normal: "normal",
    bold: "bold",
    heading: 700,
    label: 500,
    quote: 600,
  },
  letterSpacings: {
    title: "-0.009em",
    headline: "0.009em",
  },
  sizes: {
    widePlus: 2048,
    wide: 1536,
    layoutPlus: 1200,
    layout: 1024,
    copyUltra: 980,
    copyPlus: 768,
    copy: 680,
    narrowPlus: 600,
    narrow: 512,
  },
  radii: {
    small: 4,
    default: 8,
    extra: 12,
    ultra: 16,
    circle: 99999,
  },
  shadows: {
    inputDepth: "inset 0px 0.5px 4px rgba(96, 97, 112, 0.32)",
    buttonPressed:
      "0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)",
    button:
      "0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16)",
    navigation:
      "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
    hover:
      "0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)",
    picker:
      "0px 2px 8px rgba(40, 41, 61, 0.04), 0px 16px 24px rgba(96, 97, 112, 0.16)",
    modal:
      "0px 2px 8px rgba(40, 41, 61, 0.08), 0px 20px 32px rgba(96, 97, 112, 0.24)",
  },
  text: {
    display1: {
      fontSize: [9, 11],
      fontWeight: "bold",
      lineHeight: ["headline1", "display1"],
    },
    display2: {
      fontSize: [10],
      fontWeight: "bold",
      lineHeight: "display2",
    },
    headline1: {
      fontSize: [8, 9],
      fontWeight: "bold",
      lineHeight: ["headline2", "headline1"],
    },
    headline2: {
      fontSize: [8],
      fontWeight: "bold",
      lineHeight: "headline2",
    },
    headline3: {
      fontSize: [7],
      fontWeight: "bold",
      lineHeight: "headline3",
    },
    headline4: {
      fontSize: [6],
      fontWeight: "bold",
      lineHeight: "headline4",
    },
    headline5: {
      fontSize: [5],
      fontWeight: "bold",
      lineHeight: "headline5",
    },
    headline6: {
      fontSize: [4],
      fontWeight: "bold",
      lineHeight: "headline6",
    },
    lead: {
      fontSize: [3],
      fontWeight: "bold",
      lineHeight: "lead",
    },
    body: {
      fontSize: [4],
      fontWeight: "normal",
      lineHeight: "body",
    },
    smallBody: {
      fontSize: [3],
      fontWeight: "normal",
      lineHeight: "smallBody",
    },
    blockquote: {
      fontSize: [5],
      fontWeight: "quote",
      lineHeight: "blockquote",
    },
    blockquote: {
      fontSize: [5],
      fontWeight: "quote",
      lineHeight: "blockquote",
    },
    capitalized: {
      fontSize: [3],
      fontWeight: "quote",
      lineHeight: "capitalized",
    },
    smallText: {
      fontSize: [2],
      fontWeight: "normal",
      lineHeight: "smallText",
    },
    tinyText: {
      fontSize: [1],
      fontWeight: "quote",
      lineHeight: "tinyText",
    },
    smallLabel: {
      fontSize: [1],
      fontWeight: "quote",
      lineHeight: "smallLabel",
    },
    // subtitle: {
    //   mt: 3,
    //   fontSize: [2, 3],
    //   fontWeight: "body",
    //   letterSpacing: "headline",
    //   lineHeight: "subheading",
    // },
    // headline: {
    //   variant: "text.heading",
    //   letterSpacing: "headline",
    //   lineHeight: "heading",
    //   fontSize: 4,
    //   mt: 3,
    //   mb: 3,
    // },
    // subheadline: {
    //   variant: "text.heading",
    //   letterSpacing: "headline",
    //   fontSize: 2,
    //   mt: 0,
    //   mb: 3,
    // },
    // eyebrow: {
    //   color: "muted",
    //   fontSize: [3, 4],
    //   fontWeight: "heading",
    //   letterSpacing: "headline",
    //   lineHeight: "subheading",
    //   textTransform: "uppercase",
    //   mt: 0,
    //   mb: 2,
    // },
    // lead: {
    //   fontSize: [2, 3],
    //   my: [2, 3],
    // },
    // caption: {
    //   color: "muted",
    //   fontWeight: "medium",
    //   letterSpacing: "headline",
    //   lineHeight: "caption",
    // },
    // small: {
    //   fontSize: [1],
    //   fontWeight: "medium",
    //   letterSpacing: "headline",
    //   lineHeight: "caption",
    // },
    display_1: {
      // fontSize: 64,
    },
  },
  alerts: {
    primary: {
      borderRadius: "default",
      bg: "orange",
      color: "background",
      fontWeight: "body",
    },
  },
  badges: {
    pill: {
      borderRadius: "circle",
      px: 3,
      py: 1,
      // fontSize: 1,
    },
    outline: {
      variant: "badges.pill",
      bg: "transparent",
      border: "1px solid",
      borderColor: "currentColor",
      fontWeight: "body",
    },
  },
  buttons: {
    icon: {
      "&:focus": {
        borderColor: "primary",
        outline: "none",
      },
    },
    primary: {
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: "normal",
      borderRadius: "circle",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "card",
      letterSpacing: "headline",
      WebkitTapHighlightColor: "transparent",
      transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
      height: "40px",
      px: 4,
      ":focus,:hover": {
        boxShadow: "elevated",
        transform: "scale(1.0625)",
        outline: "none",
      },
      svg: { ml: -1, mr: 2 },
    },
    lg: {
      // variant: "buttons.primary",
      fontSize: 3,
      lineHeight: "title",
      px: 4,
      py: 3,
    },
    outlineRounded: {
      variant: "buttons.primary",
      bg: "transparent",
      color: "primary",
      border: "2px solid currentColor",
    },
    outlineRoundedLg: {
      variant: "buttons.outlineRounded",
      height: "50px",
    },
    rounded: {
      variant: "buttons.primary",
      bg: "primary",
      color: "gray100",
      border: "none",
    },
    roundedLg: {
      variant: "buttons.rounded",
      height: "50px",
    },
    textButton: {
      border: "none",
      background: "none",
      color: "primary",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "headline",
      cursor: "pointer",
    },
    roundIconButton: {
      variant: "buttons.textButton",
      p: [3],
      ":hover": {
        backgroundColor: "gray100",
        boxShadow: "picker",
        transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
        borderRadius: "circle",
      },
    },
  },
  cards: {
    primary: {
      bg: "elevated",
      color: "text",
      p: [3, 4],
      borderRadius: "extra",
      boxShadow: "card",
      overflow: "hidden",
    },
    sunken: {
      bg: "sunken",
      p: [3, 4],
      borderRadius: "extra",
    },
    detailCard: {
      bg: "gray100",
      borderRadius: "extra",
      borderColor: "dark100",
      borderWidth: "1px",
      boxShadow: "card",
      overflow: "hidden",
      borderStyle: "solid",
      cursor: "pointer",
      transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
      ":hover,:focus": {
        transform: "scale(1.0625)",
        boxShadow: "elevated",
      },
    },
    infoCard: {
      bg: "gray100",
      borderRadius: "extra",
      borderColor: "dark100",
      borderWidth: "1px",
      boxShadow: "card",
      overflow: "hidden",
      borderStyle: "solid",
    },
    interactive: {
      variant: "cards.primary",
      textDecoration: "none",
      WebkitTapHighlightColor: "transparent",
      transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
      ":hover,:focus": {
        transform: "scale(1.0625)",
        boxShadow: "elevated",
      },
    },
    translucent: null,
    translucentDark: null,
  },
  forms: {
    input: {
      bg: "elevated",
      color: "text",
      fontFamily: "inherit",
      borderRadius: "base",
      border: 0,
      "::-webkit-input-placeholder": { color: "placeholder" },
      "::-moz-placeholder": { color: "placeholder" },
      ":-ms-input-placeholder": { color: "placeholder" },
      '&[type="search"]::-webkit-search-decoration': { display: "none" },
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
    },
    inputBgMedium: {
      variant: "forms.input",
      bg: "dark100",
      color: "dark400",
      "::-webkit-input-placeholder": { color: "dark300" },
      "::-moz-placeholder": { color: "dark300" },
      ":-ms-input-placeholder": { color: "dark300" },
    },

    textarea: { variant: "forms.input" },
    select: { variant: "forms.input" },
    label: {
      color: "text",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      lineHeight: "caption",
      // fontSize: 2,
    },
    labelHoriz: {
      color: "text",
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      lineHeight: "caption",
      // fontSize: 2,
      svg: { color: "muted" },
    },
    slider: {
      color: "primary",
    },
    hidden: {
      position: "absolute",
      height: "1px",
      width: "1px",
      overflow: "hidden",
      clip: "rect(1px, 1px, 1px, 1px)",
      whiteSpace: "nowrap",
    },
  },
  layout: {
    container: {
      maxWidth: ["layout", null, "layoutPlus"],
      width: "100%",
      mx: "auto",
      px: 3,
    },
    wide: {
      variant: "layout.container",
      maxWidth: ["layout", null, "wide"],
    },
    copy: {
      variant: "layout.container",
      maxWidth: ["copy", null, "copyPlus"],
    },
    narrow: {
      variant: "layout.container",
      maxWidth: ["narrow", null, "narrowPlus"],
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      color: "text",
      margin: 0,
      minHeight: "100vh",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    //   h1: {
    //     variant: "text.heading",
    //     // fontSize: 5,
    //   },
    //   h2: {
    //     variant: "text.heading",
    //     fontSize: 4,
    //   },
    //   h3: {
    //     variant: "text.heading",
    //     fontSize: 3,
    //   },
    //   h4: {
    //     variant: "text.heading",
    //     fontSize: 2,
    //   },
    //   h5: {
    //     variant: "text.heading",
    //     fontSize: 1,
    //   },
    //   h6: {
    //     variant: "text.heading",
    //     fontSize: 0,
    //   },
    p: {
      color: "text",
      fontWeight: "body",
      lineHeight: "body",
      my: 3,
    },
    img: {
      maxWidth: "100%",
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "border",
    },
    a: {
      color: "primary",
      textDecoration: "underline",
      textUnderlinePosition: "under",
      ":focus,:hover": {
        textDecorationStyle: "wavy",
      },
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "sunken",
      overflow: "auto",
      borderRadius: "default",
      code: {
        color: "inherit",
        mx: 0,
        // ...prism
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
      color: "accent",
      bg: "sunken",
      borderRadius: "small",
      mx: 1,
      px: 1,
    },
    "p > code, li > code": {
      color: "accent",
      fontSize: 1,
    },
    li: {
      my: 2,
    },
    table: {
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "border",
        borderBottomStyle: "solid",
      },
    },
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px",
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px",
    },
  },
  util: Object.create(null),
};

theme.util = {
  motion: "@media (prefers-reduced-motion: no-preference)",
  reduceMotion: "@media (prefers-reduced-motion: reduce)",
  reduceTransparency: "@media (prefers-reduced-transparency: reduce)",
  supportsClipText: "@supports (-webkit-background-clip: text)",
  supportsBackdrop:
    "@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)",
  cx: null,
  gx: null,
  gxText: null,
};
theme.util.cx = (c) => theme.colors[c] || c;
theme.util.gx = (from, to) => `radial-gradient(
  ellipse farthest-corner at top left,
  ${theme.util.cx(from)},
  ${theme.util.cx(to)}
)`;
theme.util.gxText = (from, to) => ({
  color: theme.util.cx(to),
  [theme.util.supportsClipText]: {
    backgroundImage: theme.util.gx(from, to),
    backgroundRepeat: "no-repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
});

theme.cards.translucent = {
  // variant: 'cards.primary',
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  color: "text",
  boxShadow: "none",
  [theme.util.supportsBackdrop]: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "saturate(180%) blur(20px)",
    WebkitBackdropFilter: "saturate(180%) blur(20px)",
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },
};
theme.cards.translucentDark = {
  // variant: 'cards.primary',
  backgroundColor: "rgba(0, 0, 0, 0.875)",
  color: "white",
  boxShadow: "none",
  [theme.util.supportsBackdrop]: {
    backgroundColor: "rgba(0, 0, 0, 0.625)",
    backdropFilter: "saturate(180%) blur(16px)",
    WebkitBackdropFilter: "saturate(180%) blur(16px)",
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },
};

theme.useColorSchemeMediaQuery = false;

// theme.buttons.primary = merge(theme.buttons.primary, {
//   textTransform: "uppercase",
// });

theme.layout.copy.maxWidth = [null, null, "copyPlus"];

// theme.text.title.fontSize = [5, 6];

export default theme;
