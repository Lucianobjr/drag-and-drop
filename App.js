import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from "react-native-draggable-flatlist";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default function App() {
  const ref = useRef(null);
  const [data, setData] = useState([
    {
      key: "1",
      label: "Sujeito Programador",
      height: 100,
      backgroundColor: "#121212",
    },
    {
      key: "2",
      label: "Luciano junior",
      height: 100,
      backgroundColor: "#ff0000",
    },
    {
      key: "3",
      label: "HakkinDev",
      height: 100,
      backgroundColor: "#3c96d3",
    },
  ]);

  const renderItem = ({ item, drag }) => {
    const { isActive } = useOnCellActiveAnimation();

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              activeOpacity={1}
              style={[
                styles.rowItem,
                {
                  height: item.height,
                  backgroundColor: item.backgroundColor,
                  elevation: isActive ? 30 : 0,
                },
              ]}
            >
              <Animated.View>
                <Text style={styles.text}>{item.label}</Text>
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
