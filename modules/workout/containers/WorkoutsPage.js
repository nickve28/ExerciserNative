import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import gql from "graphql-tag";
import { graphql } from "react-apollo"
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

class WorkoutsPage extends Component {
  render() {
    const { data } = this.props;
    const workouts = data.me && data.me.workouts || [];

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

const query = gql`query fetchRecentWorkouts {
  me {
    workouts {
      id
      description
      workoutDate
    }
  }
}`

export default graphql(query)(WorkoutsPage);