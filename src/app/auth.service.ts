/*
THIS IS THE AUTHENTICATION SERVICE
It will handle log in/log out 
*/


// impport injectable decorator
// needed to make this a service
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { environment } from 'src/environments/environment';


// provide this in the root level for all modules to use
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // set logged in to false initially
    private isLoggedIn: boolean = false;
    private userId: number = 0; // Initialize as null
    private backendUrl = environment.backendUrl

    constructor(private http: HttpClient) { }


    login(username: string, password: string) {
        const data = {
            username: username,
            password: password
        };

        const url = `${this.backendUrl}/login`;

        return this.http.post(url, data).pipe(
            tap((response: any) => {
                this.userId = response.userId; // Store the user ID from the response
            })
        );
    }

    signup(signupData: any) {
        const url = `${this.backendUrl}/signup`;

        return this.http.post(url, signupData, { withCredentials: true });
    }


    logout() {
        // Perform logout logic
        this.isLoggedIn = false;
    }

    isUserLoggedIn(): boolean {
        return this.isLoggedIn;
        // return true; //for testing
    }

    setUserLoggedIn(){
        this.isLoggedIn = true;
    }

    getLoggedInUserId(): number {
        return this.userId;
    }
}
