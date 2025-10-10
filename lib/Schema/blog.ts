import * as Yup from 'yup';
export const initialPostValues = {
  title: '',
  slug: '',
  content: '',
  featuredImage: '',
  status: 'draft',
  allowComments: true,
  tags: [], // Array of tag ObjectIds (as strings)
  ownerId: '',     // This should be set programmatically (e.g., logged-in user)
  categoryId: '',  // Will come from dropdown/select input
};


export const postValidationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required("Title is required."),

  slug: Yup
    .string()
    .min(10, "Slug must be at least 10 characters.")
    .required("Slug is required."),

  content: Yup
    .string()
    .min(50, "Content must be at least 50 characters.")
    .required("Content is required."),

  featuredImage: Yup
    .string()
    .url("Featured image must be a valid URL.")
    .notRequired(),

  status: Yup
    .string()
    .oneOf(['draft', 'private', 'public'], "Status must be draft, private, or public.")
    .required("Status is required."),

  allowComments: Yup
    .boolean()
    .default(true),

  tags: Yup
    .array()
    .of(Yup.string().required("Tag ID is required."))
    .notRequired(),

  ownerId: Yup
    .string()
    .required("Owner ID is required."),

  categoryId: Yup
    .string()
    .required("Category is required."),
});

