// bidding.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  private backendUrl = environment.backendUrl; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  placeBid(body:any): Observable<any> {
    const url = `${this.backendUrl}/submit_bid`;

    return this.http.post(url, body, { withCredentials: true });
  }
  

  getMaxBid(listingId: number): Observable<any> {
    const url = `${this.backendUrl}/get_max_bid/${listingId}`;

    return this.http.get(url,{withCredentials:true});
  }

  getRecentUserBid(listingId:number,userId:number):Observable<any>{
    const url = `${this.backendUrl}/get_recent_user_bid/${listingId}/${userId}`;
    
    return this.http.get(url,{withCredentials:true}).pipe(
      tap(data => console.log('getRecentUserBid response:', data))
    );
  }

  getUserBidListings(userId:number):Observable<any>{
    const url = `${this.backendUrl}/get_user_bid_listings/${userId}`;
    return this.http.get<any[]>(url,{withCredentials:true});
  }

}
