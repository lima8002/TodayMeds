import { View, StyleSheet } from "react-native";
import EditProfile from "./EditProfile";
import ChangePhoto from "./ChangePhoto";

const UserCardButtons = () => {
  return (
    <View style={styles.container}>
      {/* Edit Details Button */}
      <EditProfile  />
      {/* Change Photo Button */}
      <ChangePhoto />
    </View>
  );
};

export default UserCardButtons;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
