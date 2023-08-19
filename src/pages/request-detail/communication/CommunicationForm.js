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
    MenuItem,
    Paper
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
import { showError, showSuccess } from 'store/reducers/snackbarSlice';
import { saveNewCommunication } from 'store/reducers/communicationSlice';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { hide, show } from 'store/reducers/loaderSlice';
// ============================|| FIREBASE - REGISTER ||============================ //

const Communication = ({ close, requestDetail }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let data = null;
    const [initValues, setInitValues] = useState(null)
    const [templateList, setTemplateList] = useState([])
    const [isDisabled, setisDisabled] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const addCommunication = (val) => {
        if (val.message || val.template_id) {
            dispatch(show());

            dispatch(saveNewCommunication(val))
                .unwrap()
                .then(() => {
                    dispatch(hide());

                    dispatch(showSuccess("Message Sent Successfully!"));
                    close(true);
                    setTimeout(() => {
                        close(false);
                    }, 500);
                })
                .catch(() => {
                    dispatch(hide());
                    dispatch(showError('Something went wrong!'))
                });
        } else {
            dispatch(showError('Select template or atleast write a message.'))
        }
    };

    useEffect(() => {
        setInitValues({
            request_id: id,
            template_id: '',
            message: '',
            recipient_name: `${localStorage.getItem('userName')}`
        })
        dispatch(show());

        dispatch(fetchALLTemplates()).unwrap()
            .then((res) => {
                dispatch(hide());
                setTemplateList(res)
            })
            .catch(() => {
                dispatch(hide());
                dispatch(showError('Something went wrong!'))
            })
    }, [data])

    return (
        <>
            {initValues && <Formik
                initialValues={initValues}
                // validationSchema={Yup.object().shape({
                // templatename: Yup.string().max(255).required('Template Name is required'),
                // templatedescription: Yup.string().max(255).required('Template Description is required'),
                // templateBody: Yup.string().max(255).required('Template Body is required'),
                // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                // password: Yup.string().max(255).required('Password is required')
                // })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        addCommunication(values)
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
                                    <InputLabel htmlFor="template_id-signup">Template</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="template_id"
                                        value={values.template_id}
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setSelectedTemplate(templateList.filter(x => x._id === e.target.value)[0])
                                                values.message = '';
                                                setisDisabled(true)
                                            } else {
                                                setSelectedTemplate(null)
                                                setisDisabled(false)
                                            }
                                            handleChange(e)
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>Select Category</em>
                                        </MenuItem>
                                        {templateList.map((item, index) => {
                                            return (<MenuItem key={index} value={item._id}>{item.name}</MenuItem>)
                                        })}
                                    </Select>
                                    {touched.template_id && errors.template_id && (
                                        <FormHelperText error id="standard-weight-helper-text-categoryId">
                                            {errors.template_id}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {!isDisabled ? <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="message-signup">Template Text</InputLabel>
                                    <OutlinedInput
                                        id="message-login"
                                        type="message"
                                        minRows={3}
                                        multiline={true}
                                        value={values.message}
                                        name="message"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        fullWidth
                                        disabled={isDisabled}

                                        error={Boolean(touched.message && errors.message)}
                                    />
                                    {touched.message && errors.message && (
                                        <FormHelperText error id="helper-text-message-signup">
                                            {errors.message}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid> : <>
                                <Grid item xs={12} md={12}>
                                    <Stack>
                                        <Paper variant="outlined">
                                            <Card>
                                                <CardContent>
                                                    {/* <Grid item> */}
                                                    <Typography gutterBottom variant="h4" component="h3">
                                                        {selectedTemplate?.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="textSecondary" component="p">
                                                        {selectedTemplate?.description ?? ""}
                                                    </Typography>
                                                    <Grid item >
                                                        <span dangerouslySetInnerHTML={{ __html: selectedTemplate?.content }}></span >
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    </Stack>
                                </Grid>
                            </>}
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
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => close(false)}
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
                                                color="secondary"
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
