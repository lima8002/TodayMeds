import React from "react";
import { Platform, OpaqueColorValue, StyleProp, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Only import SymbolView if we're on iOS
let SymbolView: any;
if (Platform.OS === "ios") {
  SymbolView = require("expo-symbols").SymbolView;
}

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  "house.fill": "home",
  "plus.circle.fill": "add-circle",
  gear: "settings",
  calendar: "event",
  pill: "local-pharmacy",
  "list.bullet": "list",
  xmark: "close",
};

export type IconSymbolName = keyof typeof MAPPING;

interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}

function IconSymbolIOS({ name, size = 24, color, style }: IconSymbolProps) {
  return (
    <SymbolView
      weight="regular"
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  if (Platform.OS === "ios") {
    return (
      <IconSymbolIOS name={name} size={size} color={color} style={style} />
    );
  } else {
    return (
      <MaterialIcons
        name={MAPPING[name]}
        size={size}
        color={color}
        style={style}
      />
    );
  }
}
