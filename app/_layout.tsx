import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

import { ListaContexto } from "@/contexts/ListaContexto";

export default function RootLayout() {
  return (
    <ListaContexto>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#e8f1f2",
          tabBarActiveBackgroundColor: "#006494",
          tabBarInactiveTintColor: "#006494",
          tabBarInactiveBackgroundColor: "#c9f0ff",
          headerStyle: {
            backgroundColor: "#006494",
          },
          headerTintColor: "#c9f0ff",
          sceneStyle: {
            backgroundColor: "#ebf9ff",
          },
        }}
      >
        <Tabs.Screen
          name="compras"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="shoppingcart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lista"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="despensa"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name="inbox" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ListaContexto>
  );
}
