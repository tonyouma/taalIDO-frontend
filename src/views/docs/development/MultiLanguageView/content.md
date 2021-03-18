# Multi Language

#### [Multi language demo](/app/extra-components/multi-language)

---

#### 1.Add content

- in folder `public/locales/en`

```json
{
  "heading": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  "nested": {
    "nested1": "nested En"
  }
}
```

- in folder `public/locales/fr`

```json
{
  "heading": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression",
  "nested": {
    "nested1": "nested Fr"
  }
}
```

#### 2.Usage

```js
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/static/icons/ic_flag_fr.svg'
  }
];

function MultiLanguage() {
  const { i18n, t } = useTranslation();

  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage);

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return (
    <div>
      <RadioGroup
        row
        value={currentLang.value}
        onChange={(e) => handleChangeLanguage(e.target.value)}
      >
        {LANGS.map((lang) => (
          <FormControlLabel
            key={lang.label}
            value={lang.value}
            label={lang.label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      <Typography variant="h2">{t('heading')}</Typography>
      <Typography variant="body2">{t('nested.nested1')}</Typography>
    </div>
  );
}
```
