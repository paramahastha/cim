import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloseIcon from '@material-ui/icons/Close';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import { Field, Form, Formik } from 'formik';
import { fieldToTextField, TextField } from 'formik-material-ui';
import { DatePicker } from 'material-ui-pickers';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import {
  createCompany,
  getCompany,
  listCompanies,
  removeCompany,
} from '../../actions/company';
import { createOffice } from '../../actions/office';
import Loader from '../../components/Loader/Loader';
import MySnackbarContent from '../../components/MySnackbarContent/MySnackbarContent';
import { countryCode } from '../../helpers/data/countryCode';

const OfficeManagement = lazy(() =>
  import('./OfficeManagement/OfficeManagement'),
);

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(768 + theme.spacing.unit * 3 * 2)]: {
      width: 768,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  companyItems: {
    maxHeight: 600,
    overflowY: 'auto',
    overflowX: 'none',
  },
  cardContent: { cursor: 'pointer' },
  card: {
    maxWidth: '100%',
  },
  titlePaper: {
    maxWidth: 150,
    background: 'linear-gradient(45deg, #00a3cc 15%, #80e5ff 90%)',
    border: 0,
    padding: 10,
    margin: '0 auto',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(95, 175, 255, .3)',
  },
  formPaper: {
    minHeight: 400,
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
  },
  paper: {
    minHeight: '90vh',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  btnClose: {
    padding: theme.spacing.unit / 2,
  },
  btnCreate: {
    background: 'linear-gradient(45deg, #00a3cc 15%, #80e5ff 90%)',
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(95, 175, 255, .3)',
  },
});

const CompanySelect = props => (
  <MuiTextField
    select
    {...fieldToTextField(props)}
    onChange={e => {
      props.form.setFieldValue(props.field.name, e.target.value);
    }}
  >
    {props.companylist.map((item, index) => (
      <MenuItem key={index} value={item._id}>
        {item.name}
      </MenuItem>
    ))}
  </MuiTextField>
);

class View extends Component {
  state = {
    companyDialog: false,
  };

  toggleCompanyDialog = () => {
    this.setState({ companyDialog: !this.state.companyDialog });
  };

  componentDidMount() {
    this.props.listCompanies();
  }

  render() {
    const { classes, company } = this.props;

    return (
      <React.Fragment>
        <Grid container direction="row" spacing={16}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.formPaper}>
              <Paper className={classes.titlePaper}>
                <Typography
                  component="h1"
                  variant="button"
                  align="center"
                  color="inherit"
                >
                  Create Company
                </Typography>
              </Paper>
              <Formik
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    this.props.createCompany(values).then(() => {
                      this.props.toggleNotif();
                      this.props.listCompanies();
                      resetForm({
                        name: '',
                        address: '',
                        revenue: '',
                        phone_code: '',
                        phone_number: '',
                      });
                    });
                  }, 500);
                }}
                initialValues={{
                  name: '',
                  address: '',
                  revenue: '',
                  phone_code: '',
                  phone_number: '',
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Required'),
                  address: Yup.string().required('Required'),
                  revenue: Yup.number()
                    .positive()
                    .required('Required'),
                  phone_number: Yup.number()
                    .positive()
                    .required('Required'),
                })}
                validate={values => {
                  const errors = {};

                  if (!values.phone_code) {
                    errors.phone_number = 'Required';
                  }

                  return errors;
                }}
                render={({
                  submitForm,
                  isSubmitting,
                  values,
                  setFieldValue,
                }) => (
                  <Form className="signin-form">
                    <Field
                      id="name"
                      name="name"
                      label="Name"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <Field
                      id="address"
                      name="address"
                      label="Address"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <Field
                      id="revenue"
                      name="revenue"
                      label="Revenue"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <Field
                      id="phone_number"
                      name="phone_number"
                      label="Phone"
                      component={TextField}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MuiTextField
                              select
                              id="phone_code"
                              name="phone_code"
                              margin="none"
                              value={values.phone_code}
                              onChange={e => {
                                setFieldValue(e.target.name, e.target.value);
                              }}
                              required
                            >
                              {countryCode.map((item, index) => (
                                <MenuItem key={index} value={item.dial_code}>
                                  (+
                                  {item.dial_code}) {item.name}
                                </MenuItem>
                              ))}
                            </MuiTextField>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      required
                    />
                    <br />
                    <br />
                    <Button
                      size="medium"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.btnCreate}
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Create
                    </Button>
                  </Form>
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.formPaper}>
              <Paper className={classes.titlePaper}>
                <Typography
                  component="h1"
                  variant="button"
                  align="center"
                  color="inherit"
                >
                  Create Office
                </Typography>
              </Paper>
              <Formik
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    this.props.createOffice(values).then(() => {
                      resetForm({
                        name: '',
                        latitude: '',
                        longitude: '',
                        office_start_date: new Date(),
                        company: '',
                      });
                      this.props.history.push(
                        `/company/detail/${values.company}`,
                      );
                    });
                  }, 500);
                }}
                initialValues={{
                  name: '',
                  latitude: '',
                  longitude: '',
                  office_start_date: new Date(),
                  company: '',
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Required'),
                  latitude: Yup.number()
                    .positive()
                    .required('Required'),
                  longitude: Yup.number()
                    .positive()
                    .required('Required'),
                  office_start_date: Yup.date().required('Required'),
                  company: Yup.number().required('Required'),
                })}
                render={({
                  submitForm,
                  isSubmitting,
                  values,
                  setFieldValue,
                }) => (
                  <Form className="signin-form">
                    <Field
                      id="name"
                      name="name"
                      label="Name"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      required
                    />

                    <Grid container spacing={16}>
                      <Grid item md={6}>
                        <Field
                          id="latitude"
                          name="latitude"
                          placeholder="Latitude"
                          label="Location"
                          component={TextField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Field
                          id="longitude"
                          name="longitude"
                          label=" "
                          placeholder="Longitude"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          component={TextField}
                          margin="normal"
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                    <Field
                      id="office_start_date"
                      name="office_start_date"
                      label="Office Start Date"
                      component={DatePicker}
                      mask={value =>
                        value
                          ? [
                              /\d/,
                              /\d/,
                              '/',
                              /\d/,
                              /\d/,
                              '/',
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                            ]
                          : []
                      }
                      disableOpenOnEnter
                      keyboard
                      format="DD/MM/YYYY"
                      margin="normal"
                      value={values.office_start_date}
                      onChange={date => {
                        setFieldValue('office_start_date', date);
                      }}
                      fullWidth
                      required
                    />
                    <Field
                      id="company"
                      name="company"
                      label="Company"
                      companylist={company.companyList}
                      component={CompanySelect}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <br />
                    <br />
                    <Button
                      size="medium"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      className={classes.btnCreate}
                    >
                      Create
                    </Button>
                  </Form>
                )}
              />
            </Paper>
          </Grid>
        </Grid>
        <br />
        <br />
        <Paper className={classes.titlePaper}>
          <Typography variant="button" color="inherit">
            Companies
          </Typography>
        </Paper>
        <br />
        <br />
        <Grid
          container
          direction="row"
          spacing={16}
          className={classes.companyItems}
        >
          {company.companyList.length > 0 ? (
            company.companyList.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          this.props
                            .getCompany(item._id)
                            .then(() => this.toggleCompanyDialog());
                        }}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    }
                    title={item.name}
                  />
                  <CardContent
                    className={classes.cardContent}
                    onClick={() =>
                      this.props.history.push(`/company/detail/${item._id}`)
                    }
                  >
                    <Typography color="textPrimary">Address :</Typography>
                    <Typography color="textSecondary">
                      {item.address}
                    </Typography>
                    <br />
                    <Typography color="textPrimary">Revenue :</Typography>
                    <Typography color="textSecondary">
                      {item.revenue}
                    </Typography>
                    <br />
                    <Typography color="textPrimary">Phone No :</Typography>
                    <Typography color="textSecondary">
                      ({item.phone_code}) {item.phone_number}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item md={12}>
              <Typography color="textSecondary" align="center">
                there is no companies created yet
              </Typography>
            </Grid>
          )}
        </Grid>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.companyDialog}
          onClose={this.toggleCompanyDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Confirmation'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Want to remove <b>{company.companyData.company.name}</b> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleCompanyDialog} color="default">
              cancel
            </Button>
            <Button
              onClick={() => {
                this.props
                  .removeCompany(company.companyData.company._id)
                  .then(() => this.props.listCompanies())
                  .then(() => this.toggleCompanyDialog());
              }}
              color="default"
              autoFocus
            >
              remove
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

class CompanyManagement extends Component {
  state = {
    notif: false,
  };

  toggleNotif = () => {
    this.setState({ notif: !this.state.notif });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Grid container direction="column">
            <Paper className={classes.paper}>
              <Switch>
                <Route
                  exact
                  path="/company"
                  name="Company"
                  render={() => (
                    <View
                      {...this.props}
                      {...this.state}
                      toggleNotif={this.toggleNotif}
                    />
                  )}
                />
                <Route
                  path="/company/detail/:id"
                  name="Company Detail"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <OfficeManagement />
                    </Suspense>
                  )}
                />
              </Switch>
            </Paper>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.notif}
            autoHideDuration={3000}
            onClose={this.toggleNotif}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.btnClose}
                onClick={this.toggleNotif}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          >
            <MySnackbarContent
              onClose={this.toggleNotif}
              variant={this.props.company.notif.level}
              message={this.props.company.notif.message}
            />
          </Snackbar>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.company,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listCompanies: () => dispatch(listCompanies()),
    getCompany: id => dispatch(getCompany(id)),
    createCompany: payload => dispatch(createCompany(payload)),
    createOffice: payload => dispatch(createOffice(payload)),
    removeCompany: id => dispatch(removeCompany(id)),
  };
};

export default withMobileDialog()(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(styles)(CompanyManagement)),
  ),
);
