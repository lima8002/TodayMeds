import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import DaysCardInfo from "./DaysCardInfo";
// import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");
const FLATLIST_WIDTH = width;
const ITEM_WIDTH = (width - 40) / 6.4; // Adjust this based on your item width
let datesArray = [];

const DaysCard = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [dates, setDates] = useState([]);
  const refList = useRef(null);

  useEffect(() => {
    let id = 1;
    for (let i = 1; i <= moment().daysInMonth(); i++) {
      let date = moment().date(i);
      if (moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
        setCurrentDate(moment().date(i).format("YYYY-MM-DD"));
        setCurrentDayIndex(i - 1);
      }
      datesArray.push({
        id: id++,
        dayName: date.format("ddd").toUpperCase(),
        dayDate: date.format("D"),
        date: date.format("YYYY-MM-DD"),
      });
    }
    setDates(datesArray);
  }, []);

  const renderItem = (item, index) => {
    return (
      <>
        <View
          style={[
            styles.containerDays,
            index === currentDayIndex ? styles.shadow : null,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentDayIndex(index);
              setCurrentDate(dates[index].date);
              refList.current.scrollToIndex({
                animated: true,
                index: index + 1,
              });
            }}
          >
            <View style={styles.cardTop}>
              <Text style={styles.dayTitle} key={index}>
                {item.dayName}
              </Text>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.dayDate}>{item.dayDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {/* <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
        style={styles.leftFade}
      /> */}
      <FlatList
        ref={refList}
        style={styles.flatlistStyle}
        keyExtractor={(item, index) => index.toString()}
        data={dates}
        horizontal
        // numColumns={7}
        contentContainerStyle={{
          justifyContent: "space-around",
        }}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        renderItem={({ item, index }) => renderItem(item, index)}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={true}
        onLayout={() => {
          refList.current.scrollToIndex({
            animated: true,
            index: currentDayIndex + 1,
            viewPosition: 0.5,
          });
        }}
      />

      {/* <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        style={styles.rightFade}
      /> */}
      <DaysCardInfo selected={currentDayIndex} date={currentDate} />
    </View>
  );
};

export default DaysCard;

const styles = StyleSheet.create({
  flatlistStyle: {
    paddingBottom: 10,
  },
  dayTitle: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  containerDays: {
    paddingRight: 5,
    height: "100%",
  },
  cardTop: {
    backgroundColor: Colors.TERTIARY,
    width: ITEM_WIDTH,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardBottom: {
    backgroundColor: "#fff",
    width: ITEM_WIDTH,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  dayDate: {
    fontFamily: "outfit-medium",
    fontSize: 28,
    color: Colors.PRIMARY,
    alignSelf: "center",
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
  leftFade: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 20, // Adjust based on how wide you want the fade
    zIndex: 1,
  },
  rightFade: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 20, // Adjust based on how wide you want the fade
    zIndex: 1,
  },
});
