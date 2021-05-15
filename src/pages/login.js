import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppLogo from "../assets/img/icon.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import memoize from "memoize-one";

// Type checking module
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.global,
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  merrors = memoize((propErrors, stateErrors) => (stateErrors = propErrors));

  handleSubmit = async (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    const { email, password } = this.state;

    // login actions
    this.props.loginUser({ email, password }, this.props.history);
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
    const { email, password } = this.state;
    const errors = this.merrors(this.props.UI.errors, this.state.errors);

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppLogo} alt="App logo" className={classes.image} />
          <Typography variant="h2">Login</Typography>
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
