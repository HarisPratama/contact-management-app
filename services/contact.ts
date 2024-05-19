import { Contact } from '@/interfaces/contact'
import env from '../env'

class ContactService {
    getContacts() {
        return new Promise((resolve, reject) => {
            fetch(env.API_URL)
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getContact(contactId: string) {
        return new Promise((resolve, reject) => {
            fetch(`${env.API_URL}/${contactId}`)
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    addContact(payload: any) {
        return new Promise((resolve, reject) => {
            fetch(env.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload)
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        return res.json()
                    } else {
                        reject(res)
                    }
                })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    updateContact(payload: Contact) {
        return new Promise((resolve, reject) => {
            const updatedPayload = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                age: payload.age,
                photo: payload.photo,
            };
    
            console.log(updatedPayload, '<<< payload 1');
            console.log(`${env.API_URL}/${payload.id}`, ' <<<<');
            
            fetch(`${env.API_URL}/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(updatedPayload)
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    return res.json();
                } else {
                    reject(res);
                }
            })
            .then((resp) => {
                resolve(resp);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
    

    deleteContact(contactId: string) {
        return new Promise((resolve, reject) => {
            fetch(`${env.API_URL}/${contactId}`, {
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        return res.json()
                    } else {
                        reject(res)
                    }
                })
                .then((resp) => {
                    console.log(resp, '<<< resp');
                    resolve(resp)
                })
                .catch((err) => {
                    console.log(err, '<<< err');
                    reject(err)
                })
        })
    }
}

export default ContactService
