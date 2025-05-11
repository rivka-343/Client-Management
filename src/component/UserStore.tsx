import {   runInAction } from 'mobx';
import { Req } from './Req';

import { makeObservable, observable, action } from "mobx";
import { User } from './User';
import { log } from 'console';

class UserStore {
    Residents: User[] = []; // מערך רגיל
 baseUrl: string|"";
    
    constructor() {
        if (import.meta.env.VITE_BASE_URL) {
            this.baseUrl = import.meta.env.VITE_BASE_URL;
        } else {
            this.baseUrl = ""; // הגדרת baseUrl כברירת מחדל
            console.error("VITE_BASE_URL is not defined", import.meta.env);
        }
    

        makeObservable(this, {
            Residents: observable.ref, // מבטיח שהערך יהיה מערך רגיל ולא Proxy
            fetchUsers: action
        });
    }
    fetchUsers = async () => {
        try {
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
            const response = await fetch(`${this.baseUrl}/Users/Residents`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data: User[] = await response.json();
    
            runInAction(() => {
                this.Residents = data; // שמירת הנתונים                
            });
    
            console.log("Updated Requests:", this.Residents);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };
    fetchDeleteUsers = async (id:number) => {
        try {
            console.log("delete id:",id);
            const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
            const response = await fetch(`${this.baseUrl}/Users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            runInAction(() => {
                this.Residents = this.Residents.filter(user => user.id !== id);
            });
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };
addUser = async (userData:any) => {
    try {
      // Replace with your actual API call
      const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
      const response = await fetch(`${this.baseUrl}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        // Refresh the users list after adding
        this.fetchUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  // Update an existing user
  updateUser = async (id:number, userData:User) => {
    try {
      // Replace with your actual API call
      const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage

      const response = await fetch(`${this.baseUrl}/Users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header

        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        // Refresh the users list after updating
        this.fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
}
export default new UserStore();