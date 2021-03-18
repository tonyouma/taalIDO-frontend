# Components

#### [Overview](/app/components)

---

Custom components inside `src/theme/core/overrides`

```sh
overrides/
  ├── Accordion
  ├── Alert
  ├── Autocomplete
  ├── Avatar
  ├── Backdrop
  ├── ...
...
```

Custom components based on [https://material-ui.com/customization/globals/#default-props](https://material-ui.com/customization/globals/#default-props)

If you customize in file `overrides/Accordion`
you can match with [/app/components/accordion](/app/components/accordion) to see the change.

if you customize in file `overrides/Alert`
you can match with [/app/components/alert](/app/components/alert) to see the change.

> The change will apply globally.

> This helps you to deeply customize your style, to suit your design.

---

### Extending components

**Components extend based on Material-UI.**

Inside the folder `src/theme/@material-extend` you can add and edit more components based on Material-UI.

**Example:**

```jsx
<Button variant="contained" color="inherit">Default</Button>
<Button variant="contained">Primary</Button>
<MButton variant="contained" color="info">Info</MButton>
<MButton variant="contained" color="success">Success</MButton>
<MButton variant="contained" color="warning">Warning </MButton>
<MButton variant="contained" color="error">Error </MButton>
```

![img](https://res.cloudinary.com/trinhmai/image/upload/v1614509447/upload_minimal/docs/button.png)

**Currently support for the following components:**

- [Avatar](/app/components/avatars)
- [Badge](/app/components/badges)
- [Breadcrumbs](/app/components/breadcrumbs)
- [Buttons](/app/components/buttons)
- [Chip](/app/components/chips)
- [Icon](/app/foundations/icons)
- [Label](/app/COMPONENTS/labels)
- [Progress](/app/components/progress)
- [Selection Controls](/app/components/selection-controls)
- [Timeline](/app/components/timeline)

All have checks with **PropTypes**:

```jsx
<MButton variant="contained" color="info">
  Info
</MButton>;

MButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'white'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string
  ])
};
```
