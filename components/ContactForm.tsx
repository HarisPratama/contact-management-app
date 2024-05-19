// src/components/ContactForm.tsx
import { Contact, CreateContact } from '@/interfaces/contact';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ContactFormProps {
  onSubmit: (formData: CreateContact) => void;
  payload: Contact | null
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, payload }) => {
  const [formData, setFormData] = useState<CreateContact>({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  useEffect(() => {
    if (payload?.id) {
        setFormData({
            firstName: payload.firstName,
            lastName: payload.lastName,
            age: payload.age.toString(),
            photo: payload.photo,
        })
    }
  }, [])

  const handleChange = (name: keyof CreateContact, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          placeholder="Enter first name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          placeholder="Enter last name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="Enter age"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Photo URL:</Text>
        <TextInput
          style={styles.input}
          value={formData.photo}
          onChangeText={(text) => handleChange('photo', text)}
          placeholder="Enter photo URL"
        />
      </View>
      <Button title={`${payload?.id ? 'Update' : 'Add'} Contact`} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
    },
});

export default ContactForm;
