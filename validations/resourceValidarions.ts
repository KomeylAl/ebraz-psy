import * as yup from "yup";

export const resourceSchema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  type: yup.string().required("انتخاب نوع منبع الزامی است"),
  description: yup.string().nullable(),
  link: yup.string().when("type", {
    is: "link",
    then: (schema) => schema.required("لینک الزامی است"),
    otherwise: (schema) => schema.notRequired(),
  }),

  file: yup.mixed().when("type", {
    is: "file",
    then: (schema) => schema.required("فایل الزامی است"),
  }),
});
