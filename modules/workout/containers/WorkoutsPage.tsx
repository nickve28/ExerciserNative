import React, { Component } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import gql from "graphql-tag";
import get from "lodash.get";
import { graphql, OptionProps } from "react-apollo"
import Header from "../../../components/Header";
import Page from "../../../components/Page";
import FullWidthContainer from "../../../components/FullWidthContainer";
import Container from "../../../components/Container";

const horizontalContentPadding = 5;

const styles = StyleSheet.create({
  content: {
    flex: 2,
    position: "relative"
  },
  logout: {
    flex: 2,
    position: "relative"
  },
  logoutButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  },
  workout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingLeft: horizontalContentPadding,
    paddingRight: horizontalContentPadding,
    height: 50
  }
});

interface Workout {
  id: string,
  description: string,
  workoutDate?: Date
};

interface Props {
  loading: boolean,
  workouts: Array<Workout>,
  onLogoutClick(): void
};

const addReactKey = (entities: Workout[]) => entities.map(entity => ({ ...entity, key: entity.id }));

class WorkoutsPage extends Component<Props> {
  render() {
    const { workouts, loading } = this.props;

    if (loading) return null;

    return (
      <Page>
        <Header>
          <Text>Workouts</Text>
        </Header>
        <FullWidthContainer>
          <FlatList data={addReactKey(workouts)} renderItem={({ item: workout }) =>
            <View style={styles.workout}>
              <Text>{workout.description}</Text>
              <Text>{workout.workoutDate}</Text>
            </View>
          } />
        </FullWidthContainer>
        <Container>
          <View style={styles.logout}>
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
  loading: get(data, "loading"),
  workouts: get(data, "me.workouts", [])
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