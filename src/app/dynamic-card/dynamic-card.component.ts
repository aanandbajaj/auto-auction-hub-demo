import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.scss']
})
export class DynamicCardComponent {
  @Input() cardType!: string;

  // Info Card Inputs
  @Input() iconClass!: string;
  @Input() iconSize!: string;
  @Input() iconColor!: string;
  @Input() title!: string;
  @Input() description!: string;

  // Auction Card Inputs
  @Input() date!: string;
  @Input() location!: string;
  @Input() numVehicles!: string;
  @Input() auctionId!: string;

  // Listing Card Inputs
  @Input() carName!: string;
  @Input() auctionPrice!: string;
  @Input() imageUrl!: string;
}
