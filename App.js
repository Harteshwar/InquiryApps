import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Inquiry submitted!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit inquiry: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Message" onChangeText={setMessage} value={message} multiline />
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title="Submit" onPress={handleSubmit} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
});
