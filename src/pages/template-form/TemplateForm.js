import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Editor from 'components/Editor';

// ============================|| FIREBASE - REGISTER ||============================ //

const Template = () => {
    const navigate = useNavigate();

    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    templatename: '',
                    templatedescription: '',
                    email: '',
                    company: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    templatename: Yup.string().max(255).required('Template Name is required'),
                    templatedescription: Yup.string().max(255).required('Template Description is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="templatename-signup">Template Name*</InputLabel>
                                    <OutlinedInput
                                        id="templatename-login"
                                        type="templatename"
                                        value={values.templatename}
                                        name="templatename"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.templatename && errors.templatename)}
                                    />
                                    {touched.templatename && errors.templatename && (
                                        <FormHelperText error id="helper-text-templatename-signup">
                                            {errors.templatename}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="templatedescription-signup">Template Description*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.templatedescription && errors.templatedescription)}
                                        id="templatedescription-signup"
                                        type="templatedescription"
                                        value={values.templatedescription}
                                        name="templatedescription"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.templatedescription && errors.templatedescription && (
                                        <FormHelperText error id="helper-text-templatedescription-signup">
                                            {errors.templatedescription}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Template Body</InputLabel>
                                    <Editor />
                                    {/* <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="company-signup"
                                        value={values.company}
                                        name="company"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Demo Inc."
                                        inputProps={{}}
                                    /> */}
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item>
                                <Grid container columnSpacing={0.5} alignItems="center" justifyContent="start">
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    borderRadius: '100px'
                                                }}
                                                disableElevation
                                                fullWidth
                                                size="medium"
                                                type="reset"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => navigate('/templates', { replace: true })}
                                            >
                                                Back
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    borderRadius: '100px'
                                                }}
                                                disableElevation
                                                fullWidth
                                                size="medium"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Template
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Template;
