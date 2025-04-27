import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function StopwatchScreen() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          onPress={handleStartStop}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Стоп' : 'Старт'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Скинути</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TimerScreen() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(0);
  };

  return (
    <View style={[styles.container, isFinished && styles.finishedContainer]}>
      {!isRunning && timeLeft === 0 ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Години"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
          />
          <TextInput
            style={styles.input}
            placeholder="Хвилини"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
          <TextInput
            style={styles.input}
            placeholder="Секунди"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={seconds}
            onChangeText={setSeconds}
          />
        </View>
      ) : (
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
      )}

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>Старт</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={() => setIsRunning(false)}
          >
            <Text style={styles.buttonText}>Пауза</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Скинути</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2C2C2C' },
        tabBarActiveTintColor: '#00BCD4',
        tabBarInactiveTintColor: '#aaa',
      }}>
        <Tab.Screen name="Секундомір" component={StopwatchScreen} />
        <Tab.Screen name="Таймер" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  finishedContainer: {
    backgroundColor: '#5C2C2C',
  },
  timeText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '40%',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#607D8B',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
});
