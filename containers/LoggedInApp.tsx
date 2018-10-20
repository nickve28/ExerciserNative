import React, { Component }  from "react";
import WorkoutsPage from "../modules/workout/containers/WorkoutsPage";

const pages = {
  workouts: WorkoutsPage
};

export interface Props {
  onLogoutClick: Function
};

interface State {
  page: string
};

class LoggedInApp extends Component<Props, State> {
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
