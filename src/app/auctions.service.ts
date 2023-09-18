import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  private backendUrl = environment.backendUrl;  // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getAuctions(): Observable<any> {
    const url = `${this.backendUrl}/auctions`;

    return this.http.get(url, {withCredentials: true });  // Use http.get for a GET request
  }

  getAuctionById(auctionId:number):Observable<any>{
    const url = `${this.backendUrl}/auctions/${auctionId}`;

    return this.http.get(url,{withCredentials:true});
  }

  getNumOfListings(auctionId:number):Observable<any>{
    const url = `${this.backendUrl}/count_listings_by_auction/${auctionId}`;
    return this.http.get(url,{withCredentials:true})
  }

  getAuctionByListingId(listingCode:number):Observable<any>{
    const url = `${this.backendUrl}/get_auction_details_by_listing/${listingCode}`;
    return this.http.get(url,{withCredentials:true})
  }

  getAuctionStatus(auctionId:number):Observable<any>{
    const url = `${this.backendUrl}/get_auction_status/${auctionId}`;
    return this.http.get(url,{withCredentials:true})
  }


}
