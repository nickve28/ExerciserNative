import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Header from "../../../components/Header";
import Page from "../../../components/Page";
import Container from "../../../components/Container";

class WorkoutsPage extends Component {
  render() {
    alert(JSON.stringify(this.props.fetchRecentworkouts))
    return (
      <View>
        <Text>{"123"}</Text>
      </View>
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