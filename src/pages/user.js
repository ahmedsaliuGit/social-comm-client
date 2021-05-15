import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Grid } from "@material-ui/core";
import Scream from "../components/screams/Scream";
import StaticProfile from "../components/profile/StaticProfile";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import ScreamSkeleton from "../utils/ScreamSkeleton";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      screamIdParam: null,
    };
  }

  async componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });
    this.props.getUserData(handle);

    try {
      const res = await axios.get(`/user/${handle}`);

      this.setState({ profile: res.data.user });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { screams, loading } = this.props.screamData;
    const { profile, screamIdParam } = this.state;

    let userScreamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams.length === 0 ? (
      <p>No scream for this user.</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        } else {
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        }
      })
    );

    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {userScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <p>Loading...</p>
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  screamData: state.data,
});

User.propTypes = {
  screamData: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUserData })(User);
