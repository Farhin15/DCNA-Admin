import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
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
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { showError, showSuccess } from 'store/reducers/snackbarSlice';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthResetPassword = () => {
    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin = (event, { setErrors, setStatus, setSubmitting }) => {
        // localStorage.setItem('Y_TOKEN', JSON.stringify(true));
        // navigate('/')
        axios
            .post(
                process.env.REACT_APP_API_BASE_URL + 'reset-password/',
                // {
                //     "new_password": "userOne",
                //     "password": "User@123"
                // },
                event,
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            )
            .then((response) => {
                setStatus({ success: false });
                setSubmitting(false);
                dispatch(showSuccess('Password reset successfully!'))
                console.log(response);
                navigate('/login')
                event.email = '';
            })

            .catch((err) => {
                dispatch(showError('Something went wrong!'))
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    otp: '',
                    new_password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    otp: Yup.string().max(255).required('OTP is required')
                        .matches(
                            /^(?=.*[0-9])/,
                            "Must be a valid OTP"
                        ),
                    new_password: Yup.string().max(255).required('New Password is required')
                        .matches(
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                        ),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values, setErrors, setStatus, setSubmitting);
                    try {
                        handleLogin(values, { setErrors, setStatus, setSubmitting })
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Email</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@username.com"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="otp-login">OTP</InputLabel>
                                    <OutlinedInput
                                        id="otp-login"
                                        type="string"
                                        value={values.otp}
                                        name="otp"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="OTP"
                                        fullWidth
                                        error={Boolean(touched.otp && errors.otp)}
                                    />
                                    {touched.otp && errors.otp && (
                                        <FormHelperText error id="standard-weight-helper-text-otp-login">
                                            {errors.otp}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="new_password-login">New Password</InputLabel>
                                    <OutlinedInput
                                        id="new_password-login"
                                        type="password"
                                        value={values.new_password}
                                        name="new_password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        fullWidth
                                        error={Boolean(touched.new_password && errors.new_password)}
                                    />
                                    {touched.new_password && errors.new_password && (
                                        <FormHelperText error id="standard-weight-helper-text-new_password-login">
                                            {errors.new_password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthResetPassword;
