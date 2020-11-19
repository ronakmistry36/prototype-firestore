import {UserEntity} from "../../entity/UserEntity";
import {FirestoreAbstractRepository} from "../FirestoreAbstractRepository";

export class UserRepository extends FirestoreAbstractRepository<UserEntity> {
    constructor() {
        super("users")
    }
}