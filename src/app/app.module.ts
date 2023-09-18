import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { DynamicCardComponent } from './dynamic-card/dynamic-card.component';
import { ListingsComponent } from './listings/listings.component';
import { AuctionListingComponent } from './auction-listing/auction-listing.component';
import { ListingService } from './listing.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthService } from './auth.service';
import { AuctionsService } from './auctions.service';
import { BiddingService } from './bidding.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuctionsComponent,
    DynamicCardComponent,
    ListingsComponent,
    AuctionListingComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    ContactFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ListingService,
    AuthService,
    AuctionsService,
    BiddingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
