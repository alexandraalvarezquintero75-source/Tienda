import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../shared/components/models/product.models';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCard = new EventEmitter<Product>();

  onAddToCard(event: Event) {
    event?.stopPropagation();
    this.addToCard.emit(this.product);
    console.log('producto añadido', this.product.title);
  }
}
