import React, { Component }  from "react";
import WorkoutsPage from "../modules/workout/containers/WorkoutsPage";

const pages = {
  workouts: WorkoutsPage
};

class LoggedInApp extends Component {
  state = { 
    page: "workouts"
  };
  
  render() { 
    const { onLogoutClick } = this.props;
    const { page } = this.state;

    const Component = pages[page] || pages.workouts;

    return <Component onLogoutClick={onLogoutClick} />;
  }
};

export default LoggedInApp;
