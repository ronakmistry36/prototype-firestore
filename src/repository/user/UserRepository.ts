import * as firebaseAdmin from "firebase-admin";

export class UserRepository {

    private readonly userFireStore;

    constructor() {
        this.userFireStore = firebaseAdmin.firestore().collection("users");
    }

    public async findAll() {
        const documents = await this.userFireStore.get();
        let users = [];
        documents.forEach((document) => {
            users.push({
                id: document.id,
                ...document.data()
            })
        })

        return users;
    }
}