import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from "@/store";
import { ContactState, fetchingContact } from '@/store/reducer/contact';
import { getRandomColor } from '@/helpers';
import { Colors } from '@/constants/Colors';
import BackNav from '@/components/BackNav';

type ParamList = {
    contact: {
      id: string;
    };
};

const Contact = () => {
    const route = useRoute<RouteProp<ParamList, 'contact'>>();
    const { id } = route.params;

    const navigation = useNavigation();

    const dispatch = useDispatch<AppDispatch>();
    const contact = useSelector((state: {contact: ContactState}) => state.contact.contact);

    useEffect(() => {
        if (id) {
            dispatch(fetchingContact(id))
        }
    }, [id])

    const backNav = () => {
        navigation.goBack()
    }

    const ProfileImage = ({ src, alt, placeholder }:{src: string, alt: string, placeholder: string}) => {
        const [imgError, setImgError] = useState(false);
      
        return imgError || src === 'N/A' ? (
          <View style={styles.placeHolderImg}>
            <Text style={styles.placeHolderText}>{placeholder.toUpperCase()}</Text>
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
        <SafeAreaView style={styles.container}>
            <View style={styles.absoluteBg}>                
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={backNav}>
                    <BackNav/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.spacing}>
                {contact?.id && <View style={styles.profileBg}>
                        <ProfileImage src={contact.photo} alt={contact.firstName} placeholder={contact.firstName.slice(0, 2)} />
                    </View>    
                }
                <View style={styles.contact}>
                    <Text style={styles.contactName}>{contact?.firstName} {contact?.lastName}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        position: 'relative'
    },
    absoluteBg: {
        position: 'absolute',
        top: -150,
        left: '-24%',
        height: '60%',
        width: '150%',
        backgroundColor: Colors.green_darner_tail.background,
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        marginHorizontal: 'auto',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerTitle: {
        textAlign:'center', 
        flex: 1,
        fontSize: 24,
        color: Colors.light.background
    },
    back: {
        flex: 1,
    },
    spacing: {
        padding: 20,
        alignItems: 'center',
        marginTop: 120
    },
    profileBg: {
        backgroundColor: Colors.light.background,
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    placeHolderImg: {
        backgroundColor: getRandomColor().backgroundColor,
        width: 150,
        height: 150,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeHolderText: {
        color: getRandomColor().color,
        fontSize: 24
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    contact: {
        marginTop: 20
    },
    contactName: {
        fontSize: 24
    }
})

export default Contact;
