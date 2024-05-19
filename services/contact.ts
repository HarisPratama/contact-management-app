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

    updateContact(payload: any) {
        return new Promise((resolve, reject) => {
            const updatedPayload = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                age: payload.age,
                photo: payload.photo,
            }
            fetch(`${env.API_URL}/${payload.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedPayload)
            })
                .then((res) => {
                    console.log(res.status, '<< res 1');
                    if (res.status === 200 || res.status === 201) {
                        return res.json()
                    } else {
                        reject(res)
                    }
                })
                .then((resp) => {
                    resolve(resp)
                    console.log(resp, '<<< resp');
                })
                .catch((err) => {
                    console.log(err, '<<< err');
                    reject(err)
                })
        })
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
