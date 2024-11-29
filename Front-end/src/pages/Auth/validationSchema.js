import * as Yup from "yup";

export const passwordSchema = Yup.string()
    .required("Required")
    .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,14}$/,
        "Password must be 6 - 14 characters and has numeric characters"
    );

export const usernameSchema = Yup.string()
    .required("Required")
    .min(4, "Must be 4 characters or more");

export const notJustNumber = Yup.string()
    .required("Required")
    .matches(/^(?![0-9]+$).*/, "Title should not be just numbers");

export const loginSchema = Yup.object().shape({
    username: usernameSchema,
    password: passwordSchema,
});

export const registerSchema = Yup.object().shape({
    username: usernameSchema,
    displayName: notJustNumber,
    password: passwordSchema,
});
