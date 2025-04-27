import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HelloWorldScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}

function CounterScreen() {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Збільшити" onPress={increase} color="#555" />
      </View>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Зменшити" onPress={decrease} color="#555" />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#ccc' },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#555',
        }}
      >
        <Tab.Screen name="HelloWorld" component={HelloWorldScreen} />
        <Tab.Screen name="Counter" component={CounterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  countText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
  },
});
