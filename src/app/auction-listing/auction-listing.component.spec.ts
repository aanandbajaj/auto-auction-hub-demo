import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionListingComponent } from './auction-listing.component';

describe('AuctionListingComponent', () => {
  let component: AuctionListingComponent;
  let fixture: ComponentFixture<AuctionListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionListingComponent]
    });
    fixture = TestBed.createComponent(AuctionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
