import { Divider, Grid, Typography, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCompany } from '../../../actions/company';
import { removeOffice, getOffice } from '../../../actions/office';

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
  titlePaper: {
    maxWidth: 150,
    background: 'linear-gradient(45deg, #00a3cc 15%, #80e5ff 90%)',
    border: 0,
    padding: 10,
    margin: '0 auto',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(95, 175, 255, .3)',
  },
  officeItems: {
    maxHeight: 400,
    overflowY: 'auto',
    overflowX: 'none',
  },
  card: {
    maxWidth: '100%',
  },
  btnBack: {
    background: 'linear-gradient(45deg, #00a3cc 15%, #80e5ff 90%)',
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(95, 175, 255, .3)',
  },
});

class OfficeManagement extends Component {
  state = {
    officeDialog: false,
  };

  toggleOfficeDialog = () => {
    this.setState({ officeDialog: !this.state.officeDialog });
  };

  componentDidMount() {
    this.props.getCompany(this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { company, offices } = this.props.company.companyData;
    const { officeData } = this.props.office;

    return (
      <React.Fragment>
        <Grid container direction="column" spacing={16}>
          <Grid item md={12}>
            <Typography variant="h4">{company.name}</Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="body1" color="textPrimary">
              Address :
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {company.address}
            </Typography>
            <br />
            <Typography variant="body1" color="textPrimary">
              Revenue :
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {company.revenue}
            </Typography>
            <br />
            <Grid container direction="row">
              <Grid item xs={12} sm={6} md={6}>
                <Typography variant="body1" color="textPrimary">
                  Phone No :
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  ({company.phone_code}) {company.phone_number}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} align="right">
                <Button
                  className={classes.btnBack}
                  onClick={() => this.props.history.push('/company')}
                >
                  Back to Overview
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <Paper className={classes.titlePaper}>
          <Typography variant="button" color="inherit">
            Offices
          </Typography>
        </Paper>
        <br />
        <br />
        <Grid
          container
          direction="row"
          spacing={16}
          className={classes.officeItems}
        >
          {offices.length > 0 ? (
            offices.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          this.props
                            .getOffice(item._id)
                            .then(() => this.toggleOfficeDialog());
                        }}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    }
                    title={item.name}
                  />
                  <CardContent>
                    <Typography color="textPrimary">Location :</Typography>
                    <Typography color="textSecondary">
                      LAT - {item.latitude}
                    </Typography>
                    <Typography color="textSecondary">
                      LOG - {item.longitude}
                    </Typography>
                    <br />
                    <Typography color="textPrimary">
                      Office Start Date :
                    </Typography>
                    <Typography color="textSecondary">
                      {moment(item.office_start_date).format('DD/MM/YYYY')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item md={12}>
              <Typography color="textSecondary" align="center">
                there is no office created yet
              </Typography>
            </Grid>
          )}
        </Grid>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.officeDialog}
          onClose={this.toggleOfficeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Confirmation'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Want to remove <b>{officeData.name}</b> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleOfficeDialog} color="default">
              cancel
            </Button>
            <Button
              onClick={() => {
                this.props
                  .removeOffice(officeData._id)
                  .then(() => this.props.getCompany(this.props.match.params.id))
                  .then(() => this.toggleOfficeDialog());
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

const mapStateToProps = state => {
  return {
    company: state.company,
    office: state.office,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompany: id => dispatch(getCompany(id)),
    getOffice: id => dispatch(getOffice(id)),
    removeOffice: id => dispatch(removeOffice(id)),
  };
};

export default withMobileDialog()(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(styles)(OfficeManagement)),
  ),
);
