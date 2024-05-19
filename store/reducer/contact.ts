import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState } from '../index';
import ContactService from '../../services/contact';
import { setContacts, setContact, setContactError, setContactLoad, setContactAlert } from '../actions/contact'
import { Contact, CreateContact } from '../../interfaces/contact'


export interface Alert {
    title: string;
    text: string;
    icon: string;
    showAlert: boolean;
}

export interface ContactState {
    contacts: Contact[];
    contact: Contact | null;
    error: any;
    loading: boolean;
    alert: Alert;
}

export interface Action<T = any> {
    type: string;
    payload: T;
}

const initialState: ContactState = {
    contacts: [],
    contact: null,
    error: null,
    loading: false,
    alert: {
        title: "",
        text: "",
        icon: "",
        showAlert: false
    },
};

export default function contactReducer(state: ContactState = initialState, action: Action): ContactState {
    switch (action.type) {
        case 'SET_CONTACTS':
            return { ...state, contacts: action.payload };
        case 'SET_CONTACT':
            return { ...state, contact: action.payload };
        case 'SET_CONTACT_ERROR':
            return { ...state, error: action.payload };
        case 'SET_CONTACT_LOAD':
            return { ...state, loading: action.payload };
        case 'SET_CONTACT_ALERT':
            return { ...state, alert: { ...state.alert, ...action.payload } };
        default:
            return state;
    }
}

const contactService = new ContactService();

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;


export const fetchingContacts = (): AppThunk => async (dispatch) => {
    dispatch(setContactLoad(true));
    try {
        const getData:any = await contactService.getContacts();
        if (getData.data) {
            dispatch(setContacts(getData.data));
        } else {
            throw getData;
        }
    } catch (error) {
        dispatch(setContactError(JSON.stringify(error)));
    } finally {
        dispatch(setContactLoad(false));
    }
};


export const fetchingContact = (contactId: string): AppThunk => async (dispatch) => {
    dispatch(setContactLoad(true));
    try {
        const getData: any = await contactService.getContact(contactId);
        if (getData.data) {
            dispatch(setContact(getData.data));
        } else {
            throw getData;
        }
    } catch (error) {
        dispatch(setContactError(JSON.stringify(error)));
    } finally {
        dispatch(setContactLoad(false));
    }
};

export const addContact = (payload: CreateContact): AppThunk => async (dispatch) => {
    dispatch(setContactLoad(true));
    try {
        const getData:any = await contactService.addContact(payload);
        if (getData.message === 'Success!') {
            const alertPayload = {
                title: 'Success',
                text: 'add contact',
                icon: 'success',
                showAlert: true
            };
            dispatch(setContactAlert(alertPayload));
            dispatch(fetchingContacts());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload = {
            title: 'Oops',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setContactAlert(alertPayload));
        dispatch(setContactError(JSON.stringify(error)));
    } finally {
        dispatch(setContactLoad(false));
    }

    setTimeout(() => {
        dispatch(setContactAlert({ 
            title: '',
            text: '',
            icon: '',
            showAlert: false 
        }));
    }, 3000);
};

export const updatingContact = (payload: Contact): AppThunk => async (dispatch) => {
    dispatch(setContactLoad(true));
    try {
        const getData:any = await contactService.updateContact(payload);
        if (getData.message === 'Success!') {
            const alertPayload = {
                title: 'Success',
                text: 'update contact',
                icon: 'success',
                showAlert: true
            };
            dispatch(setContactAlert(alertPayload));
            dispatch(fetchingContacts());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload = {
            title: 'Oops',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setContactAlert(alertPayload));
        dispatch(setContactError(JSON.stringify(error)));
    } finally {
        dispatch(setContactLoad(false));
    }

    setTimeout(() => {
        dispatch(setContactAlert({ 
            title: '',
            text: '',
            icon: '',
            showAlert: false 
        }));
    }, 3000);
};

export const deletingContact = (contactId: string): AppThunk => async (dispatch) => {
    dispatch(setContactLoad(true));
    try {
        const getData:any = await contactService.deleteContact(contactId);
        if (getData.data) {
            const alertPayload = {
                title: 'Success',
                text: 'delete contact',
                icon: 'success',
                showAlert: true
            };
            dispatch(setContactAlert(alertPayload));
            dispatch(fetchingContacts());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload = {
            title: 'Oops',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setContactAlert(alertPayload));
        dispatch(setContactError(JSON.stringify(error)));
    } finally {
        dispatch(setContactLoad(false));
    }

    setTimeout(() => {
        dispatch(setContactAlert({ 
            title: '',
            text: '',
            icon: '',
            showAlert: false 
        }));
    }, 3000);
};
