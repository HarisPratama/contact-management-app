interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
}

interface CreateContact {
    firstName: string;
    lastName: string;
    age: string;
    photo: string;
}

export {
    Contact,
    CreateContact
}