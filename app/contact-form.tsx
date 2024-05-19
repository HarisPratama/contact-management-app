// src/screens/ContactFormScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ContactForm from '../components/ContactForm';
import { RootStackParamList } from "@/interfaces/params";
import { useDispatch, useSelector } from 'react-redux';
import { ContactState, addContact, updatingContact } from '@/store/reducer/contact';
import { Contact, CreateContact } from '@/interfaces/contact';
import { AppDispatch } from '@/store';
import CustomAlert from '@/components/CustomAlert';
import BackNav from '@/components/BackNav';
import { Colors } from '@/constants/Colors';


type ContactFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'contact-form'>;
type ContactFormScreenRouteProp = RouteProp<RootStackParamList, 'contact-form'>;

type Props = {
  route: ContactFormScreenRouteProp;
};

type ParamList = {
    contact: {
      payload: Contact | null;
    };
};

const ContactFormScreen: React.FC<Props> = () => {
    const route = useRoute<RouteProp<ParamList, 'contact'>>();
    const { payload } = route.params;
    const navigation = useNavigation()

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const contactAlert = useSelector((state: {contact: ContactState}) => state.contact.alert);

    useEffect(() => {
        if (contactAlert?.showAlert) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [contactAlert, visible])

    const handleSubmit = (formData: CreateContact) => {
        if (payload?.id) {
            const updatedData:Contact = {
                ...formData,
                id: payload.id,
                age: +formData.age
            }
            dispatch(updatingContact(updatedData))
        } else {
            dispatch(addContact(formData))
        }
    };

    return (
        <SafeAreaView style={styles.saveArea}>
            <View style={styles.absoluteBg}>                
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
                    <BackNav/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{payload ? 'Edit' : 'Create'} Contact</Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.container}>
                <View>
                    <ContactForm onSubmit={handleSubmit} payload={payload} />
                    <CustomAlert
                        visible={visible && contactAlert.title.length > 0}
                        title={contactAlert.title}
                        message={contactAlert.text}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
        position: 'relative'
    },
    absoluteBg: {
        position: 'absolute',
        top: -150,
        left: '-24%',
        height: '50%',
        width: '150%',
        backgroundColor: Colors.green_darner_tail.background,
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        marginHorizontal: 'auto',
    },
    header: {
        padding: 16,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        textAlign:'center', 
        flex: 2,
        fontSize: 24,
        color: Colors.light.background
    },
    navBack: {
        flex: 1,
    },
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center'
    },
});

export default ContactFormScreen;
