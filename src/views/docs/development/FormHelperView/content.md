# Form Helper

This is a tool to assist when working with Formik (forms),
used to track states changes.

---

```js
import Helper from 'src/utils/helperFormik';

// ----------------------------------------------------------------------

const formik = useFormik({
  initialValues: {
    title: '',
    description: '',
    content: '',
    cover: null
  },
  validationSchema: ///,
  onSubmit: ///
});

<Helper formik={formik} />;
```

#### Result

![img](https://res.cloudinary.com/trinhmai/image/upload/v1611557267/upload_minimal/docs/form_helper.jpg)
