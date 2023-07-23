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
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById, saveNewUser, updateUser } from 'store/reducers/userSlice';
import { showError, showSuccess } from 'store/reducers/snackbarSlice';

// ============================|| FIREBASE - REGISTER ||============================ //

const User = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let data = null;
    const [initValues, setInitValues] = useState(null)

    const addUser = (val) => {
        if (id) {
            dispatch(updateUser({ data: val, id: id }))
                .unwrap()
                .then(() => {
                    dispatch(showSuccess("User Updated successfully!"));
                    navigate("/users");
                })
                .catch((error) => dispatch(showError(error?.message)));
        } else {
            dispatch(saveNewUser(val))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        dispatch(showSuccess("User Added successfully!"));
                        navigate("/users");
                    } else {
                        dispatch(showError(res?.message))
                    }
                    console.log("then", res)
                })
                .catch((error) => dispatch(showError(error?.message)));
        }
    };

    useEffect(() => {
        setInitValues(null)
        if (id) {
            if (data) {
                setInitValues(data);
            } else {
                dispatch(fetchUserById(id))
                    .unwrap()
                    .then((res) => {
                        data = res.user;
                        // let fetchData = {
                        //     first_name: data.name,
                        //     templatedescription: data.description,
                        //     templateBody: data.content
                        // }
                        setInitValues(data);
                    })
                    .catch(error => console.log(error));
            }
        } else {
            setInitValues({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                address: '',
                password: ''
            })
        }
    }, [data])

    return (
        <>
            {initValues && <Formik
                initialValues={initValues}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('User Name is required'),
                    first_name: Yup.string().max(255).required('First Name is required'),
                    last_name: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    address: Yup.string().max(255).required('Last Name is required'),
                    // password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(JSON.stringify(values));
                    try {
                        addUser(values)
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
                                    <InputLabel htmlFor="username">User Name*</InputLabel>
                                    <OutlinedInput
                                        id="username"
                                        type="username"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="User Name"
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="helper-text-username-user">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="first_name">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="first_name"
                                        type="first_name"
                                        value={values.first_name}
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        fullWidth
                                        error={Boolean(touched.first_name && errors.first_name)}
                                    />
                                    {touched.first_name && errors.first_name && (
                                        <FormHelperText error id="helper-text-first_name-user">
                                            {errors.first_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                                    <OutlinedInput
                                        id="last_name"
                                        type="last_name"
                                        value={values.last_name}
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        fullWidth
                                        error={Boolean(touched.last_name && errors.last_name)}
                                    />
                                    {touched.last_name && errors.last_name && (
                                        <FormHelperText error id="helper-text-last_name-user">
                                            {errors.last_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email">Email*</InputLabel>
                                    <OutlinedInput
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-user">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password">Password*</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type="password"
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-user">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address">Address*</InputLabel>
                                    <OutlinedInput
                                        id="address"
                                        type="address"
                                        value={values.address}
                                        name="address"
                                        multiline={true}
                                        minRows={3}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-text-address-user">
                                            {errors.address}
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
                                                onClick={() => navigate('/users', { replace: true })}
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
                                                {id ? 'Update' : 'Add'} User
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>}
        </>
    );
};

export default User;
