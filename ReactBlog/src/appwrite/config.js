import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
     client=new Client();
     databses;
     bucket;

     constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databses=new Databases(this.client);

     }

     async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            
            return this.databses.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                )

        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
        
     }
     async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databses.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
                )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);

        }
     }
     async deletePost(slug){
        try {
            this.databses.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }
     }

     async getPost(slug){
        try {
            return this.databses.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)

        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false;
        }
     }

     //get all those post which have status as active
     //database->we can use queries only if we have indexing 

     async getPosts(queries=[Query.equal("status","active")]){
        try {
            
            return this.databses.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)

        } catch (error) {
            console.log("Appwrite Service :: deletePosts :: error", error);
            return false;
        }
     }
     //file upload service

     async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
        }

     }
     async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service=new Service()
export default service
