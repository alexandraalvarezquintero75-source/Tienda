import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../products/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/components/models/product.models';
import { Category } from '../../shared/components/models/category.model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lading-page',
  standalone: true,
  imports: [ProductCardComponent, MatChipsModule, MatIconModule, CommonModule],
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.scss',
})
export class LadingPageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (err) => {
        this.toastr.error('No se pudieron cargar las categorias');
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.toastr.error('Error al cargar los productos');
      },
    });
  }

  filterByCategory(id: number): void {
    this.categoryService.getProductsByCategory(id).subscribe({
      next: (data: Product[]) => (this.products = data),
    });
  }
}
