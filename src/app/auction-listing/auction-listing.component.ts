import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../listing.service';
import { AuthService } from '../auth.service';
import { BiddingService } from '../bidding.service';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { AuctionsService } from '../auctions.service';


@Component({
  selector: 'app-auction-listing',
  templateUrl: './auction-listing.component.html',
  styleUrls: ['./auction-listing.component.scss']
})
export class AuctionListingComponent implements OnInit, AfterViewInit {
  listingCode: number;
  carName!: string;
  specificListing: any;
  relatedAuction:any;
  start_time:any;
  end_time:any;
  slideIndex: number;
  imageCount: number;
  imageLinks: any;
  userRecentBid: number;
  isSuccess: boolean | null = null;
  alertMessage: string;
  maxBid: number;
  loading: boolean = true;
  auctionStatus: string;
  


  @ViewChild('userBidAmountInput', { static: false }) userBidAmountInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private authService: AuthService,
    private bidService: BiddingService,
    private auctionsService: AuctionsService

  ) {
    this.listingCode = 0;
    this.slideIndex = 1;
    this.imageCount = 0;
    this.userRecentBid = 0;
    this.maxBid = 0;
    this.alertMessage = '';
    this.auctionStatus = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listingCode = parseInt(params.get('listingCode') || '1');
      forkJoin([
        this.listingService.getListing(this.listingCode),
        this.listingService.getCountofImagesByListing(this.listingCode),
        this.bidService.getRecentUserBid(this.listingCode, this.authService.getLoggedInUserId()),
        this.bidService.getMaxBid(this.listingCode),
        this.auctionsService.getAuctionByListingId(this.listingCode)
      ]).subscribe(([listingData, imageData, recentBidData, maxBidData,auctionData]) => {
        this.specificListing = listingData.listing[0];
        this.carName = this.specificListing.make + ' ' + this.specificListing.model;

        // num of images to cycle through
        this.imageCount = imageData.image_count;

        // actual image links
        this.imageLinks = imageData.image_links
        console.log(this.imageLinks)

        if (recentBidData !== null && recentBidData.hasOwnProperty('amount')) {
          this.userRecentBid = recentBidData.amount;
        }
        this.maxBid = maxBidData.max_bid;
        this.loading = false; // Set loading to false after data is fetched
        this.relatedAuction = auctionData;
        this.start_time = new Date(this.relatedAuction.time);
        this.end_time = new Date(this.relatedAuction.end_time);

        this.auctionsService.getAuctionStatus(this.relatedAuction.id).subscribe((statusData) => {
          this.auctionStatus = statusData.status;
          console.log(this.auctionStatus);
        });
      });
    });

  }
  

  ngAfterViewInit(): void {
    (window as any).plusSlides = (n: number) => this.plusSlides(n);
    (window as any).currentSlide = (n: number) => this.showSlides(n);
  }

  showSlides(n: number): void {
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;

    if (slides) {
      this.slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;

      Array.from(slides).forEach((slide) => {
        slide.style.display = 'none';
      });

      if (slides[this.slideIndex - 1]) {
        slides[this.slideIndex - 1].style.display = 'block';
      }
    }
  }

  plusSlides(n: number): void {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number): void {
    this.showSlides((this.slideIndex = n));
  }

  getImageNumbers(numImages: number): number[] {
    return Array.from({ length: numImages }, (_, index) => index + 1);
  }

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  isUserBid(): boolean {
    return this.userRecentBid !== null;
  }

  submitBid() {
    const inputVal = this.userBidAmountInput.nativeElement.value;
    const bidAmount = parseInt(inputVal, 10);
  
    const body = {
      listing_id: this.listingCode,
      user_id: this.authService.getLoggedInUserId(),
      bid_amount: bidAmount
    };

 
    this.bidService.placeBid(body).subscribe(
      (response) => {
        console.log(response);
        this.userBidAmountInput.nativeElement.value = '';
        this.isSuccess = true;
        this.alertMessage = 'Bid submitted successfully!';

        this.refreshPage()

        setTimeout(() => {
          this.isSuccess = null;
          this.alertMessage = '';
        }, 3000); // Clear success message after 3 seconds

      },
      (error) => {
        console.error(error);
        if (error.status === 400) {
          this.alertMessage = error.error.error; // Display the backend error message
        } else {
          this.alertMessage = 'Error submitting bid.';
        }
        this.isSuccess = false;
      }
    );
  }
  
  refreshPage() {
    this.bidService.getRecentUserBid(this.listingCode, this.authService.getLoggedInUserId())
      .subscribe(data => {
        this.userRecentBid = data.amount; // Update the userRecentBid value
      });
    
      this.bidService.getMaxBid(this.listingCode).subscribe(data=>{
        this.maxBid = data.max_bid;
      });
  }

  formatDate(date: Date | null): string {
    if (!date) {
      return 'N/A'; // Return a default value if date is null
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date'; // Return a message if the date is not valid
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  }
  
}
