import {   runInAction } from 'mobx';
import { Req } from './Req';

import { makeObservable, observable, action } from "mobx";

class RequestStore {
    Requests: Req[] = []; // מערך רגיל
    baseUrl = process.env.REACT_APP_BASE_URL; // קבלת ה-BASE URL מ-env

    constructor() {
        makeObservable(this, {
            Requests: observable.ref, // מבטיח שהערך יהיה מערך רגיל ולא Proxy
            fetchRequests: action
        });
    }

    fetchRequestById = async (id:number) => {
        try {
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
            const response = await fetch(`${this.baseUrl}/Requests/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const request = await response.json();
            console.log("Updated Requests:", this.Requests);
            console.log("res spes...");
            console.log(request);
            return request;
        } catch (error) {
            console.error("Error fetching requests:", error);
            return null;
        }
    };
    fetchDocumentsByRequestId = async (id:number) => {
        try {
            //return this.http.get<{ fileName: string, downloadUrl: string }[]>(`${this.apiUrl}/Document/request-files/${requestId}`);
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
            const response = await fetch(`${this.baseUrl}/Document/request-files/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const request = await response.json();
            console.log("res spes...");
            console.log(request);
            return request;
        } catch (error) {
            console.error("Error fetching requests:", error);
            return null;
        }
    };
    updateRequest= async (data: any,id:number)=>{
        try {
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
             await fetch(`${this.baseUrl}/Requests/${id}/calculation`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }  
    fetchRequests = async () => {
        try {
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
            const response = await fetch(`${this.baseUrl}/Requests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data: Req[] = await response.json();
    
            runInAction(() => {
                this.Requests = data; // שמירת הנתונים
            });
    
            console.log("Updated Requests:", this.Requests);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };
    // async addRecipe(newRecipe :Req) {
    //         const response = await fetch('http://localhost:3000/api/recipes/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'user-id': newRecipe.authorId.toString()
    //         },
    //         body: JSON.stringify(newRecipe),            
    //     });
    //     if (response.ok) {
    //         this.recipes.push(newRecipe);
    //     } 
    //     else{
    //         if (response.status === 403) {
    //             throw new Error( 'You do not have permission to add this recipe.');
    //         } else {
    //             throw new Error( 'An error occurred while adding the recipe.');
    //         }
            
    //     }
    // }
}
export default new RequestStore();
        
// class RequestStore {
//     Requests: Req[] =[] ;
//     constructor() {
//         makeAutoObservable(this);
//     }

//     fetchRequests = async () => {
//         try {
//             const response = await fetch("https://server-property-tax.onrender.com/api/Requests");
//             const data: Req[] = await response.json();

//             runInAction(() => {
//                 this.Requests =toJS( data);
//             });
//             console.log("Updated Requests:", toJS(this.Requests)); // מדפיס ללא PROX
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//         }
//     };