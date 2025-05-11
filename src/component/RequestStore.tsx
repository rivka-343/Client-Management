import {   runInAction } from 'mobx';
import { Req } from './Req';

import { makeObservable, observable, action } from "mobx";

class RequestStore {
    Requests: Req[] = []; // מערך רגיל
 baseUrl: string|"";
    
    constructor() {
        if (import.meta.env.VITE_BASE_URL) {
            this.baseUrl = import.meta.env.VITE_BASE_URL;
        } else {
            this.baseUrl = ""; // הגדרת baseUrl כברירת מחדל
            console.error("VITE_BASE_URL is not defined", import.meta.env);
        }
    

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
  
}
export default new RequestStore();