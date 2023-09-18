import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../listing.service';
import { AuctionsService } from '../auctions.service';
import { BiddingService } from '../bidding.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  auctionId: number = 1;
  listings: any[] = [];
  title!: string;
  date!: string;
  isLoading: boolean = true;

  constructor(
    private listingService: ListingService,
    private auctionService: AuctionsService,
    private bidService: BiddingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in route parameters
    this.route.paramMap.subscribe(params => {
      // Get auctionId from route parameters
      this.auctionId = parseInt(params.get('auctionId') || '1');

      // Create observables for auction details and listings
      const auctionDetails$ = this.auctionService.getAuctionById(this.auctionId);
      const listings$ = this.listingService.getListingsByAuction(this.auctionId);

      // Fetch auction details and listings concurrently
      forkJoin([auctionDetails$, listings$]).subscribe(
        ([auctionData, listingsData]) => {
          // Extract and format auction details
          console.log(auctionData);
          this.title = auctionData.towing_company;
          const date = new Date(auctionData.time);
          const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
          this.date = formattedDate;

          // Store listings data
          this.listings = listingsData.listings;

          // Create combined observables for image and bid data for each listing
          const combinedObservables = this.listings.map((listing: any) =>
            forkJoin([
              this.listingService.getCountofImagesByListing(listing.listingCode),
              this.bidService.getMaxBid(listing.listingCode)
            ])
          );

          // Fetch image and bid data concurrently for all listings
          forkJoin(combinedObservables).subscribe((combinedData: any[]) => {
            // Process combined data and assign to listings
            combinedData.forEach(([imageData, bidData], index) => {
              this.listings[index].imageCount = imageData.image_count;
              this.listings[index].maxBid = bidData.max_bid;
              this.listings[index].previewImageLink = imageData.image_links[0];
            });

            // Loading is complete
            this.isLoading = false;
          }, (error) => {
            console.log('Error:', error);
            this.isLoading = false; // Handle error and stop loading
          });
        },
        (error) => {
          console.log('Error:', error);
          this.isLoading = false; // Handle error and stop loading
        }
      );
    });
  }

  // ngOnInit(): void {
  //   // Get auctionId from route parameters
  //   this.auctionId = this.route.snapshot.params['auctionId'];
  //   console.log(this.auctionId);
  
  //   // Get auction details
  //   this.auctionService.getAuctionById(this.auctionId).subscribe((auctionData) => {
  //     this.title = auctionData.towing_company;
  //     const date = new Date(auctionData.time);
  //     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  //     this.date = date.toLocaleDateString('en-US', options);
  //     console.log(auctionData);
  //   });
  
  //   // Get listings
  //   this.listingService.getListingsByAuction(this.auctionId).subscribe((listingsData) => {
  //     this.listings = listingsData.listings;
  //     console.log(listingsData);
  
  //     // For each listing, get image count and max bid
  //     this.listings.forEach((listing) => {
  //       this.listingService.getCountofImagesByListing(listing.listingCode).subscribe((imageData) => {
  //         listing.imageCount = imageData.image_count;
  //         console.log(imageData)
  //         listing.previewImageLink = imageData.image_links[0];
  //         console.log(listing.previewImageLink);
  //       });
  
  //       this.bidService.getMaxBid(listing.listingCode).subscribe((bidData) => {
  //         listing.maxBid = bidData.max_bid;
  //         console.log(bidData);
  //       });
  //     });
  
  //     // Loading is complete
  //     this.isLoading = false;
  //   });
  // }
  
}
