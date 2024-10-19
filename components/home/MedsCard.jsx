import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { useGlobalContext } from "../../context/GlobalProvider";

const MedsCard = () => {
  const { medsDB } = useGlobalContext();

  console.log(JSON.stringify(medsDB));

  const MedsCardDetail = () => {
    const Item = ({
      id,
      email,
      name,
      quantity,
      intake,
      startTime,
      startDate,
      instructions,
      photoMed,
    }) => {
      return (
        <Grid style={styles.containerItem}>
          <Col size={1} style={styles.containerItemFields}>
            <Text style={styles.containerItemFieldsStyle}>
              Medication: {name}
            </Text>
            <Text style={styles.containerItemFieldsStyle}>
              Quantity: {quantity}
            </Text>
            <Text style={styles.containerItemFieldsStyle}>
              Intake dosage: {intake}
            </Text>
            <Text style={styles.containerItemFieldsStyle}>
              Start time: {startTime}
            </Text>
            <Text style={styles.containerItemFieldsStyle}>
              Start date: {startDate}
            </Text>
            <Text style={styles.containerItemFieldsStyle}>
              Instructions: {instructions}
            </Text>
          </Col>
        </Grid>
      );
    };
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity onPress={() => {}}>
          <Item
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            intake={item.intake}
            time={item.time}
            startTime={item.startTime}
            startDate={item.startDate}
            instructions={item.instructions}
            photoMed={item.photo}
          />
        </TouchableOpacity>
      </View>
    );
    if (medsDB) {
      return (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            data={medsDB}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      );
    } else {
      return null;
    }
  };

  return MedsCardDetail();
};

export default MedsCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  notFound: {
    flex: 1,
    padding: "15%",
    alignSelf: "center",
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
  flatlist: {
    backgroundColor: "#f2F4f5",
    padding: 10,
  },
  containerItem: {
    borderColor: "#f2F4f5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  imageItem: {
    width: 100,
    height: 90,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f2F4f5",
  },
  containerItemFields: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  containerItemFieldsStyle: {
    fontSize: 14,
    color: "black",
  },
});
