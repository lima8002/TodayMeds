import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/ui/CustomButton";
import MedsDetail from "./MedsDetail";

const DetailsButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{paddingHorizontal:20, paddingVertical:10}}>
      <CustomButton
        text="Add medication"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <MedsDetail setModalVisible={setModalVisible} />
      </Modal>
    </View>
  );
};

export default DetailsButton;
