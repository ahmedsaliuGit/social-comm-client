import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppLogo from "../assets/img/icon.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import memoize from "memoize-one";
// Type checking module
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.global,
});

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  merrors = memoize((propErrors, stateErrors) => (stateErrors = propErrors));

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password, confirmPassword, handle } = this.state;

    this.props.signupUser(
      { email, password, confirmPassword, handle },
      this.props.history
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { email, password, confirmPassword, handle } = this.state;

    const errors = this.merrors(this.props.UI.errors, this.state.errors);

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppLogo} alt="App logo" className={classes.image} />
          <Typography variant="h2">Sign Up</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              type="email"
              name="email"
              id="email"
              label="email"
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              value={email}
              className={classes.textField}
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              id="password"
              label="password"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              value={password}
              className={classes.textField}
              fullWidth
            />

            <TextField
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="confirm Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={this.handleChange}
              value={confirmPassword}
              className={classes.textField}
              fullWidth
            />

            <TextField
              type="text"
              name="handle"
              id="handle"
              label="Handle"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              value={handle}
              className={classes.textField}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
