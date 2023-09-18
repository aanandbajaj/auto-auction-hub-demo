import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../listing.service';
import { AuthService } from '../auth.service';
import { BiddingService } from '../bidding.service';
import { AuctionsService } from '../auctions.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userBidListings: any[] = [];
  isLoading: boolean = true;
  completedRequests: number = 0; // Counter for completed API requests

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private authService: AuthService,
    private bidService: BiddingService,
    private auctionsService: AuctionsService
  ) {}

  ngOnInit(): void {
    console.log(this.isLoading)
    const userId = this.authService.getLoggedInUserId() || 0;

    this.bidService.getUserBidListings(userId).subscribe(
      (listings: any[]) => {
        this.userBidListings = (listings as any).bid_listings;
        console.log(this.userBidListings);

        // Loop through the listings
        this.userBidListings.forEach((listing) => {
          this.auctionsService.getAuctionStatus(listing.auction_id).subscribe(
            (response) => {
              listing.status = response.status;
              this.checkAllRequestsCompleted(); // Check if all requests are completed
              console.log(this.isLoading)
            },
            (error) => {
              console.error('Error fetching auction status', error);
              this.checkAllRequestsCompleted(); // Check if all requests are completed
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching user bid listings', error);
        this.checkAllRequestsCompleted(); // Check if all requests are completed
      }
    );
  }

  // Function to check if all API requests are completed
  private checkAllRequestsCompleted() {
    this.completedRequests++;
    console.log(this.completedRequests)
    console.log(this.userBidListings.length)

    if (this.completedRequests == this.userBidListings.length) {
      // +1 for the initial getUserBidListings request
      this.isLoading = false;
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Not Started':
        return 'badge bg-secondary';
      case 'Active':
        return 'badge bg-success';
      case 'Ended':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
}
