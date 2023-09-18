import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ContactFormService{
    private backendUrl = environment.backendUrl;

    constructor(private http: HttpClient){}

    sendContactForm(formData:any){
        const url = `${this.backendUrl}/send_email`;

        return this.http.post(url,formData,{withCredentials:true});
    }
}