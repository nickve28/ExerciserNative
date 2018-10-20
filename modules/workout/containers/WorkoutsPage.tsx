import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import gql from "graphql-tag";
import get from "lodash.get";
import { graphql, OptionProps } from "react-apollo"
import Header from "../../../components/Header";
import Page from "../../../components/Page";
import Container from "../../../components/Container";

const styles = StyleSheet.create({
  content: {
    flex: 2,
    position: "relative"
  },
  logoutButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  }
});

interface Workout {
  id: string,
  description: string
};

interface Props {
  loading: boolean,
  workouts: Array<Workout>,
  onLogoutClick(): void
};

class WorkoutsPage extends Component<Props> {
  render() {
    const { workouts } = this.props;

    return (
      <Page>
        <Header>
          <Text>Workouts</Text>
        </Header>
        <Container>
          <View style={styles.content}>
            {workouts.map(workout =>
              <Text key={workout.id}>{`${workout.id}-${workout.description}`}</Text>
            )}
            <View style={styles.logoutButton}>
              <Button title="Logout" onPress={this.props.onLogoutClick}>Log out</Button>
            </View>
          </View>
        </Container>
      </Page>
    );
  }
}

const mapProps = ({ data }: OptionProps<{}, {}, {}>) => ({
  loading: get(data, "fetchRecentWorkouts.loading"),
  workouts: get(data , "fetchRecentWorkouts.me.workouts", [])
});

const query = gql`query fetchRecentWorkouts {
  me {
    workouts {
      id
      description
      workoutDate
    }
  }
}`;

const opts = {
  props: mapProps
};
export default graphql(query, opts)(WorkoutsPage);