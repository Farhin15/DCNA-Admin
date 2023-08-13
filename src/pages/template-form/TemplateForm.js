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
import { fetchTemplateById, saveNewTemplate, updateTemplate } from 'store/reducers/templateSlice';
import { showError, showSuccess } from 'store/reducers/snackbarSlice';
import { hide, show } from 'store/reducers/loaderSlice';

// ============================|| FIREBASE - REGISTER ||============================ //

const Template = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let data = null;
    const [initValues, setInitValues] = useState(null)

    const addTemplate = (val) => {
        dispatch(show());
        if (id) {
            dispatch(updateTemplate({ data: val, id: id }))
                .unwrap()
                .then(() => {
                    dispatch(hide());
                    dispatch(showSuccess("Template Updated Successfully!"));
                    navigate("/templates");
                })
                .catch(err => {
                    dispatch(hide());
                    dispatch(showError(err.message?.includes('409') ? 'Template name is already exits' : 'Something went wrong!')
                    )
                })
        } else {
            dispatch(saveNewTemplate(val))
                .unwrap()
                .then(() => {
                    dispatch(hide());
                    dispatch(showSuccess("Template Added Successfully!"));
                    navigate("/templates");
                })
                .catch(err => {
                    dispatch(hide());
                    dispatch(showError(err.message?.includes('409') ? 'Template name is already exits' : 'Something went wrong!'))
                });
        }
    };

    useEffect(() => {
        setInitValues(null)
        if (id) {
            if (data) {
                setInitValues(data);
            } else {
                dispatch(show());
                dispatch(fetchTemplateById(id))
                    .unwrap()
                    .then((res) => {
                        dispatch(hide());
                        data = res.template;
                        let fetchData = {
                            templatename: data.name,
                            templatedescription: data.description,
                            templateBody: data.content
                        }
                        setInitValues(fetchData);
                    })
                    .catch(error => {
                        dispatch(hide());
                        dispatch(showError('Something went wrong!'))
                    });
            }
        } else {
            setInitValues({
                templatename: '',
                templatedescription: '',
                templateBody: ''
            })
        }
    }, [data])

    return (
        <>
            {initValues && <Formik
                initialValues={initValues}
                validationSchema={Yup.object().shape({
                    templatename: Yup.string().max(255).required('Template Name is required'),
                    templatedescription: Yup.string().max(255).required('Template Description is required'),
                    templateBody: Yup.string().max(255).required('Template Body is required'),
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    // password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        addTemplate(values)
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
                                        placeholder="Name"
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
                                        placeholder="Description"
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
                                    <InputLabel htmlFor="company-signup">Template Body*</InputLabel>
                                    <Editor
                                        handleChange={handleChange} templateBody={values.templateBody} />
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
                                    {touched.templateBody && errors.templateBody && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.templateBody}
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
                                                {id ? 'Update' : 'Add'} Template
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

export default Template;
