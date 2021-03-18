# Shadows

#### [Foundations - shadows](/app/foundations/shadows)

---

Custom shadows inside `src/theme/core/shadows.js`

```js
const BASE_LIGHT = Palette.light.grey[500]; // Color shadow in Light mode
const BASE_DARK = '#000000'; // Color shadow in Dark mode

const onLight1 = alpha(BASE_LIGHT, 0.2);
const onLight2 = alpha(BASE_LIGHT, 0.14);
const onLight3 = alpha(BASE_LIGHT, 0.12);

const onDark1 = alpha(BASE_DARK, 0.2);
const onDark2 = alpha(BASE_DARK, 0.14);
const onDark3 = alpha(BASE_DARK, 0.12);
```

This is apply for **24** shadow default form Material UI

#### Customizing or adding shadows

```js
0: 'none',
1: `0px 2px 1px -1px ${onLight1},0px 1px 1px 0px ${onLight2},0px 1px 3px 0px ${onLight3}`,
2: `0px 3px 1px -2px ${onLight1},0px 2px 2px 0px ${onLight2},0px 1px 5px 0px ${onLight3}`,
3: `0px 3px 3px -2px ${onLight1},0px 3px 4px 0px ${onLight2},0px 1px 8px 0px ${onLight3}`,
4: `0px 2px 4px -1px ${onLight1},0px 4px 5px 0px ${onLight2},0px 1px 10px 0px ${onLight3}`,
5: `0px 3px 5px -1px ${onLight1},0px 5px 8px 0px ${onLight2},0px 1px 14px 0px ${onLight3}`,
6: `0px 3px 5px -1px ${onLight1},0px 6px 10px 0px ${onLight2},0px 1px 18px 0px ${onLight3}`,
7: `0px 4px 5px -2px ${onLight1},0px 7px 10px 1px ${onLight2},0px 2px 16px 1px ${onLight3}`,
8: `0px 5px 5px -3px ${onLight1},0px 8px 10px 1px ${onLight2},0px 3px 14px 2px ${onLight3}`,
9: `0px 5px 6px -3px ${onLight1},0px 9px 12px 1px ${onLight2},0px 3px 16px 2px ${onLight3}`,
10: `0px 6px 6px -3px ${onLight1},0px 10px 14px 1px ${onLight2},0px 4px 18px 3px ${onLight3}`,
11: `0px 6px 7px -4px ${onLight1},0px 11px 15px 1px ${onLight2},0px 4px 20px 3px ${onLight3}`,
12: `0px 7px 8px -4px ${onLight1},0px 12px 17px 2px ${onLight2},0px 5px 22px 4px ${onLight3}`,
13: `0px 7px 8px -4px ${onLight1},0px 13px 19px 2px ${onLight2},0px 5px 24px 4px ${onLight3}`,
14: `0px 7px 9px -4px ${onLight1},0px 14px 21px 2px ${onLight2},0px 5px 26px 4px ${onLight3}`,
15: `0px 8px 9px -5px ${onLight1},0px 15px 22px 2px ${onLight2},0px 6px 28px 5px ${onLight3}`,
16: `0px 8px 10px -5px ${onLight1},0px 16px 24px 2px ${onLight2},0px 6px 30px 5px ${onLight3}`,
17: `0px 8px 11px -5px ${onLight1},0px 17px 26px 2px ${onLight2},0px 6px 32px 5px ${onLight3}`,
18: `0px 9px 11px -5px ${onLight1},0px 18px 28px 2px ${onLight2},0px 7px 34px 6px ${onLight3}`,
19: `0px 9px 12px -6px ${onLight1},0px 19px 29px 2px ${onLight2},0px 7px 36px 6px ${onLight3}`,
20: `0px 10px 13px -6px ${onLight1},0px 20px 31px 3px ${onLight2},0px 8px 38px 7px ${onLight3}`,
21: `0px 10px 13px -6px ${onLight1},0px 21px 33px 3px ${onLight2},0px 8px 40px 7px ${onLight3}`,
22: `0px 10px 14px -6px ${onLight1},0px 22px 35px 3px ${onLight2},0px 8px 42px 7px ${onLight3}`,
23: `0px 11px 14px -7px ${onLight1},0px 23px 36px 3px ${onLight2},0px 9px 44px 8px ${onLight3}`,
24: `0px 11px 15px -7px ${onLight1},0px 24px 38px 3px ${onLight2},0px 9px 46px 8px ${onLight3}`,
// Custom
{
  z1: `0 1px 2px 0 ${alpha(BASE_LIGHT, 0.24)}`,
  z8: `0 8px 16px 0 ${alpha(BASE_LIGHT, 0.24)}`,
  z12: `0 0 2px 0 ${alpha(BASE_LIGHT, 0.24)}, 0 12px 24px 0 ${alpha(
    BASE_LIGHT,
    0.24
  )}`,
  z16: `0 0 2px 0 ${alpha(BASE_LIGHT, 0.24)}, 0 16px 32px -4px ${alpha(
    BASE_LIGHT,
    0.24
  )}`,
  z20: `0 0 2px 0 ${alpha(BASE_LIGHT, 0.24)}, 0 20px 40px -4px ${alpha(
    BASE_LIGHT,
    0.24
  )}`,
  z24: `0 0 4px 0 ${alpha(BASE_LIGHT, 0.24)}, 0 24px 48px 0 ${alpha(
    BASE_LIGHT,
    0.24
  )}`,
 primary : `0 8px 16px 0 ${alpha(Palette.light.primary.main, 0.24)}`;
 info : `0 8px 16px 0 ${alpha(Palette.light.info.main, 0.24)}`;
 success : `0 8px 16px 0 ${alpha(Palette.light.success.main, 0.24)}`;
 warning : `0 8px 16px 0 ${alpha(Palette.light.warning.main, 0.24)}`;
 error : `0 8px 16px 0 ${alpha(Palette.light.error.main, 0.24)}`;
}
```

#### Usage

```scss
boxShadow: theme.shadows[2],
 /* Output: 0px 3px 1px -2px rgba(0,0,0,0.2),
 0px 2px 2px 0px rgba(0,0,0,0.14),
 0px 1px 5px 0px rgba(0,0,0,0.12) */

boxShadow: theme.shadows[24],
 /* Output: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12) */

boxShadow: theme.shadows[25].z8,
/* 0 8px 16px 0 rgba(145, 158, 171, 0.24) */

boxShadow: theme.shadows[25].primary,
/* 0 8px 16px 0 rgba(0, 171, 85, 0.24) */
```

---

###### You can match with [/app/foundations/shadows](/app/components/shadows) to see the change.
