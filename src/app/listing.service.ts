import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListingService {
    private backendUrl = environment.backendUrl;

    constructor(private http: HttpClient) { }

    getListingsByAuction(auctionId: number): Observable<any> {
        const url = `${this.backendUrl}/listings/${auctionId}`;

        return this.http.get(url, {withCredentials: true });  // Use http.get for a GET request
    }

    getCountofImagesByListing(listingId: number): Observable<any> {
        const url = `${this.backendUrl}/count_listing_images/${listingId}`;

        return this.http.get(url, {withCredentials: true });  // Use http.get for a GET request
    }

    getListing(listingId:number):Observable<any>{
        const url = `${this.backendUrl}/get_listing_by_id/${listingId}`;
        return this.http.get(url, {withCredentials: true });  // Use http.get for a GET request
    }


}
