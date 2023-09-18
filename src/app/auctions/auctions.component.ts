import { Component, OnInit } from '@angular/core';
import { AuctionsService } from '../auctions.service';
import { error } from 'jquery';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  auctions: any[] = [];
  isLoadingData: boolean = true;

  constructor(private auctionsService: AuctionsService) {

  }

  ngOnInit(): void {
    // Call importAuctions() method from service
    this.auctionsService.getAuctions().subscribe(
      (data) => {
        // Assuming the API response is an object with an "auctions" property
        if (Array.isArray(data.auctions)) {
          this.auctions = data.auctions; // Assign the extracted array to your component property

          console.log(this.auctions);
  
          // Initialize numVehicles property for each auction
          const observables = this.auctions.map((auction) => {
            return this.auctionsService.getNumOfListings(auction.id);
          });
  
          forkJoin(observables).subscribe(
            (responses: any[]) => {
              responses.forEach((response, index) => {
                this.auctions[index].numVehicles = response.count;
              });
              this.isLoadingData = false; // Set loading indicator to false
            },
            (error) => {
              console.error('Error fetching numVehicles:', error);
              this.isLoadingData = false; // Set loading indicator to false even in case of error
            }
          );
        } else {
          console.error('API response does not contain an array of auctions.');
          this.isLoadingData = false; // Set loading indicator to false in case of error
        }
      },
      (error) => {
        console.error('Error fetching auctions:', error);
        this.isLoadingData = false; // Set loading indicator to false in case of error
      }
    );
  }
  

  getNumOfListingsByAuction(auctionId: number) {
    this.auctionsService.getNumOfListings(auctionId).subscribe(
      (data) => {
        // Find the auction object by ID
        const auction = this.auctions.find((auction) => auction.id === auctionId);
        console.log(auction);
        if (auction) {
          auction.numVehicles = data.count; // Update the numVehicles property
          console.log(auction.numVehicles);
        }
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  formatDate(date:string):string{
    const formattedDate = new Date(date).toDateString();
    return formattedDate;
  }
}
