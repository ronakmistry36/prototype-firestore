import {Repository} from "./Repository";
import * as firebaseAdmin from "firebase-admin";

export abstract class FirestoreAbstractRepository<Entity> implements Repository<Entity> {

    private readonly entityFirestore;

    protected constructor(entityName: string) {
        this.entityFirestore = firebaseAdmin.firestore().collection(entityName);
    }

    delete(entity: Entity): void {
        try {
            this.entityFirestore.doc(entity).delete();
        } catch (error) {
            console.log(error);
        }
    }

    deleteById(id: string): void {
        try {
            this.entityFirestore.doc(id).delete();
        } catch (error) {
            console.log(error);
        }
    }

    findAll(): Promise<Entity[]> {
        return new Promise<Entity[]>(async (resolve, reject) => {
            try {
                const documents = await this.entityFirestore.get();
                let entities = [];
                documents.forEach((document) => {
                    entities.push({id: document.id, ...document.data()});
                });
                resolve(entities);
            } catch (error) {
                reject(error);
            }
        });
    }

    findById(id: string): Promise<Entity> {
        return new Promise<Entity>(async (resolve, reject) => {
            try {
                const document = await this.entityFirestore.doc(id).get();
                resolve({
                    id: document.id,
                    ...document.data()
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    save(entity: Entity): void {
        try {
            this.entityFirestore.doc().set(entity);
        } catch (error) {
            console.log(error);
        }
    }
}
