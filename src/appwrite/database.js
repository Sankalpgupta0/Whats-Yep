import envImport from "../envImport";
import { Client, Databases, ID, Query } from "appwrite";

export class DataBaseService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(envImport.appwriteUrl)
        .setProject(envImport.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    //  for users
    async createUserDatabase(userId, Name, userPassword, userName, image){
        try{
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                userId,
                {
                    name: Name,
                    ID: userId,
                    password: userPassword,
                    username: userName,
                    avatar: image
                }
            )
        } catch(error){
            console.log("Appwrite serive :: createUserDatabase :: error", error);
        }
    }

    async getAllUsers(){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
            )
        } catch (error) {
            console.log("Appwrite serive :: getAllUsers :: error", error);
            return false
        }
    }

    async getUser(id){
        try {
            return await this.databases.getDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                id          
            )
        } catch (error) {
            console.log("Appwrite serive :: getUser :: error", error);
            return false
        }
    }

    // for messages
    async createMessage(message,userId,userTo){
        try {
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId1,
                ID.unique(),
                {
                    message,
                    userId,
                    userTo
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }


    async getMessages(offset){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId1,
                [
                    Query.limit(500),
                    Query.offset(offset)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getMessages :: error", error);
            return false
        }
    }
}

const dataBaseService = new DataBaseService()
export default dataBaseService