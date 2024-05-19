import { Contact } from '@/interfaces/contact';
import { Dispatch } from 'redux';
import { Alert } from '../reducer/contact';


export const SET_CONTACTS = 'SET_CONTACTS';
export const SET_CONTACT = 'SET_CONTACT';
export const SET_CONTACT_ERROR = 'SET_CONTACT_ERROR';
export const SET_CONTACT_LOAD = 'SET_CONTACT_LOAD';
export const SET_CONTACT_ALERT = 'SET_CONTACT_ALERT';


interface SetContactsAction {
    type: typeof SET_CONTACTS;
    payload: Contact[];
}

interface SetContactAction {
    type: typeof SET_CONTACT;
    payload: Contact;
}

interface SetContactErrorAction {
    type: typeof SET_CONTACT_ERROR;
    payload: any; // Adjust the type as per your error structure
}

interface SetContactLoadAction {
    type: typeof SET_CONTACT_LOAD;
    payload: boolean;
}

interface SetContactAlertAction {
    type: typeof SET_CONTACT_ALERT;
    payload: Alert;
}

export type ContactActionTypes =
    | SetContactsAction
    | SetContactAction
    | SetContactErrorAction
    | SetContactLoadAction
    | SetContactAlertAction;


export function setContacts(payload: Contact[]): (dispatch: Dispatch<ContactActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_CONTACTS,
            payload
        });
    };
}

export function setContact(payload: Contact): (dispatch: Dispatch<ContactActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_CONTACT,
            payload
        });
    };
}

export function setContactError(payload: any): (dispatch: Dispatch<ContactActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_CONTACT_ERROR,
            payload
        });
    };
}

export function setContactLoad(payload: boolean): (dispatch: Dispatch<ContactActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_CONTACT_LOAD,
            payload
        });
    };
}

export function setContactAlert(payload: Alert): (dispatch: Dispatch<ContactActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_CONTACT_ALERT,
            payload
        });
    };
}
