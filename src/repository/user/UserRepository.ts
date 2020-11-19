import * as firebaseAdmin from "firebase-admin";
import {UserEntity} from "../../entity/UserEntity";

export class UserRepository {

    private readonly userFireStore;

    constructor() {
        this.userFireStore = firebaseAdmin.firestore().collection("users");
    }

    public async findAll() {
        const documents = await this.userFireStore.get();
        let users: UserEntity[] = [];
        documents.forEach((document) => {
            users.push({
                id: document.id,
                ...document.data()
            })
        })

        return users;
    }

    public async findById(id: string) {
        const document = await this.userFireStore.doc(id).get();
        return {
            id: document.id,
            ...document.data()
        }
    }

    public async save(userEntity: UserEntity) {
        console.log({ userEntity });
        return await this.userFireStore.doc().set({
            ...userEntity
        });
    }
}