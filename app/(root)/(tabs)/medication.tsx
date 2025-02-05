// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { Colors } from "@/constants/Colors";
// import CustomHeader from "@/components/ui/CustomHeader";
// import { useGlobalContext } from "@/context/GlobalProvider";
// import { router } from "expo-router";
// import { MedsDB } from "@/constants/Types";
// import CustomFloatButton from "@/components/ui/CustomFloatButton";

// const MedicationScreen = () => {
//   const { medications } = useGlobalContext();

//   const renderMedItem = ({ item }: { item: MedsDB }) => (
//     <TouchableOpacity
//       style={styles.medicationItem}
//       onPress={() => router.push(`/(modals)/details/${item.id}`)}
//     >
//       <Text style={styles.medicationName}>{item.name}</Text>
//       <Text style={styles.medicationDetails}>Dosage: {item.dosage}</Text>
//       <Text style={styles.medicationDetails}>Frequency: {item.frequency}</Text>

//       <Image
//         source={require("@/assets/icons/>.png")}
//         tintColor={Colors.PRIMARY}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <CustomHeader title="Medication" />
//       <CustomFloatButton type="ADD2" />
//       <FlatList
//         data={medications}
//         renderItem={(item) => renderMedItem(item)}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   medicationItem: {
//     backgroundColor: "white",
//     padding: 15,
//     marginVertical: 5,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   medicationName: {
//     fontSize: 18,
//     color: Colors.PRIMARY,
//     fontFamily: "outfit-bold",
//     marginBottom: 5,
//   },
//   medicationDetails: {
//     fontSize: 14,
//     color: "#000",
//     marginTop: 2,
//     fontFamily: "outfit",
//   },
// });

// export default MedicationScreen;

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import CustomHeader from "@/components/ui/CustomHeader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { MedsDB } from "@/constants/Types";
import CustomFloatButton from "@/components/ui/CustomFloatButton";

const MedicationScreen = () => {
  const { medications } = useGlobalContext();

  const renderMedItem = ({ item }: { item: MedsDB }) => (
    <TouchableOpacity
      style={styles.medicationItem}
      onPress={() => router.push(`/(modals)/details/${item.id}`)}
    >
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>Dosage: {item.dosage}</Text>
        <Text style={styles.medicationDetails}>
          Frequency: {item.frequency}
        </Text>
        <Text style={styles.medicationDetails}>Quantity: {item.quantity}</Text>
        <Text style={styles.medicationDetails}>
          Taken with food/water: {item.withFoodWater ? "Yes" : "No"}
        </Text>
        <Text style={styles.medicationDetails}>
          Active: {item.active ? "Yes" : "No"}
        </Text>
      </View>
      <Image
        source={require("@/assets/icons/>.png")}
        style={styles.icon}
        tintColor={Colors.PRIMARY}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Medication" />
      <CustomFloatButton type="ADD2" />
      <FlatList
        data={medications}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default MedicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  medicationItem: {
    backgroundColor: Colors.BACKGROUND_100,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: +2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    color: Colors.TEXT_TITLE,
    fontFamily: "outfit-bold",
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "outfit",
    marginVertical: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    tintColor: Colors.PRIMARY,
  },
});
