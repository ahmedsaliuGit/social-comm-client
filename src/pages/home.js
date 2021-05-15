import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import Scream from "../components/screams/Scream";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import ScreamSkeleton from "../utils/ScreamSkeleton";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.screamData;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  screamData: state.data,
});

Home.propTypes = {
  screamData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getScreams })(Home);
