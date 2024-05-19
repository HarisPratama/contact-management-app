import { Text, View, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppDispatch } from "@/store";
import { ContactState, deletingContact, fetchingContacts } from "@/store/reducer/contact";
import { getRandomColor } from "@/helpers";
import { Contact } from "@/interfaces/contact";
import CustomAlert from "@/components/CustomAlert";
import { RootStackParamList } from "@/interfaces/params";

type ContactScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'contact'>;

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: {contact: ContactState}) => state.contact.contacts);
  const contactAlert = useSelector((state: {contact: ContactState}) => state.contact.alert);

  const [visible, setVisible] = useState(false);
  const [pickContact, setPickContact] = useState<Contact | null>(null);

  const navigation = useNavigation<ContactScreenNavigationProp>();

  useEffect(() => {
    dispatch(fetchingContacts())

    return () => {
      setVisible(false)
    }
  }, [])

  useEffect(() => {
    if (contactAlert?.showAlert) {
        setVisible(true)
    } else {
      setVisible(false)
    }
  }, [contactAlert])

  const onLongPress = (contact: Contact) => () => {
    setVisible(true)
    setPickContact(contact)
  }

  const handleDelete = () => {
    if (pickContact) {
      dispatch(deletingContact(pickContact.id))
      setVisible(false)
    }
  }

  const handlePress = (item: Contact) => () => {
    navigation.navigate('contact', { id: item.id });
  };

  const ProfileImage = ({ src, alt, placeholder }:{src: string, alt: string, placeholder: string}) => {
    const [imgError, setImgError] = useState(false);
  
    return imgError || src === 'N/A' ? (
      <View style={styles.placeHolderImg}>
        <Text style={{ color: getRandomColor().color }}>{placeholder.toUpperCase()}</Text>
      </View>
    ) : (
      <Image
        style={styles.profileImage}
        source={{ uri: src }}
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>Contacts</Text>
      <TouchableOpacity
        style={styles.addContact}
        onPress={() => navigation.navigate('contact-form', {})}
      >
        <Text>Add Contact</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.list}
            onLongPress={onLongPress(item)}
            onPress={handlePress(item)}
          >
            <ProfileImage src={item.photo} alt={item.firstName} placeholder={item.firstName.slice(0, 2)} />
            <View>
              <Text style={{ fontSize: 18 }}>{item.firstName}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>{item.lastName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {contactAlert.showAlert ? 
        <CustomAlert
          visible={visible}
          title={contactAlert.title}
          message={contactAlert.text}
          onConfirm={() => setVisible(false)}
        />
      :
        <CustomAlert
          visible={visible}
          title="Confirmation"
          message="Are you sure you want to delete?"
          cancelText="Delete"
          confirmtext="Edit"
          onCancel={handleDelete}
          onConfirm={() => {
            navigation.navigate('contact-form', { payload: pickContact })
            setVisible(false)
            setPickContact(null)
          }}
          onClose={() => {
            setVisible(false)
            setPickContact(null)
          }}
        />
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50
  },
  addContact: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  placeHolderImg: {
    backgroundColor: getRandomColor().backgroundColor,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  list: {
    padding: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
})

