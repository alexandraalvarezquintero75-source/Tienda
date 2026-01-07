import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/components/models/category.model';
import { Product } from '../../shared/components/models/product.models';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.categoryUrl}/${categoryId}/products`
    );
  }
}
