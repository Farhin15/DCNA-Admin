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
    Typography,
    Select,
    MenuItem
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
import { fetchALLTemplates, fetchTemplateById, saveNewTemplate, updateTemplate } from 'store/reducers/templateSlice';
import { showSuccess } from 'store/reducers/snackbarSlice';

// ============================|| FIREBASE - REGISTER ||============================ //

const Communication = ({ close }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let data = null;
    const [initValues, setInitValues] = useState(null)
    const [templateList, setTemplateList] = useState([])

    const addTemplate = (val) => {
        // dispatch(saveNewTemplate(val))
        //     .unwrap()
        //     .then(() => {
        //         dispatch(showSuccess("Template Added Successfully!"));
        //         navigate("/templates");
        //     });
    };

    useEffect(() => {
        setInitValues({
            templatedeId: '',
            templateText: '',
        })
        dispatch(fetchALLTemplates()).unwrap()
            .then((res) => {
                console.log(res);
                setTemplateList(res)
            })
    }, [data])

    return (
        <>
            {initValues && <Formik
                initialValues={initValues}
                validationSchema={Yup.object().shape({
                    // templatename: Yup.string().max(255).required('Template Name is required'),
                    // templatedescription: Yup.string().max(255).required('Template Description is required'),
                    // templateBody: Yup.string().max(255).required('Template Body is required'),
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    // password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(JSON.stringify(values));
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
                                    <InputLabel htmlFor="templatedeId-signup">Template</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="templatedeId"
                                        value={values.templatedeId}
                                        onChange={handleChange}
                                    >
                                        {templateList.map((item, index) => {
                                            return (<MenuItem key={index} value={item._id}>{item.name}</MenuItem>)
                                        })}
                                    </Select>
                                    {touched.templatedeId && errors.templatedeId && (
                                        <FormHelperText error id="standard-weight-helper-text-categoryId">
                                            {errors.templatedeId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="templateText-signup">Template Text</InputLabel>
                                    <OutlinedInput
                                        id="templateText-login"
                                        type="templateText"
                                        minRows={3}
                                        multiline={true}
                                        value={values.templateText}
                                        name="templateText"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        fullWidth
                                        error={Boolean(touched.templateText && errors.templateText)}
                                    />
                                    {touched.templateText && errors.templateText && (
                                        <FormHelperText error id="helper-text-templateText-signup">
                                            {errors.templateText}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
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
                                                onClick={() => close()}
                                            >
                                                Cancel
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
                                                Submit
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik >}
        </>
    );
};

export default Communication;
