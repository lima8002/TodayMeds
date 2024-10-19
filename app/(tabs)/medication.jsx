import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../components/ui/CustomHeader";
import MedsCard from "../../components/home/MedsCard";
import DetailsButton from "../../components/medication/DetailsButton";

const medication = () => {
  return (
    <View>
      <CustomHeader title={"Medication"} />

      {/* <ScrollView style={{ height: "100%" }}> */}
        <DetailsButton />
        {/* Meds info */}
        <MedsCard />
      {/* </ScrollView> */}
    </View>
  );
};

export default medication;

const styles = StyleSheet.create({});
