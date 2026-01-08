import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../../shared/components/models/product.models';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //creo una signal privada donde almacenare el array de items del carrito
  private _card = signal<CartItem[]>([]);
  cart = this._card.asReadonly();

  //aqui creo una señal que calculla automaticamente el total de items
  //se recalcula automaticamente cada que _cart cambie
  readonly cartCount = computed(() => {
    //sumo todas las cantidades de los productos en el carrito
    return this._card().reduce((acc, item) => acc + item.quantity, 0);
  });

  constructor() {
    //intento recuperar el carrito guardado en localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this._card.set(JSON.parse(savedCart));
    }

    //creo un effect que se ejecuta automaticamente cada vez que _cart cambia
    effect(() => {
      //obtengo el estado actual del carrito
      const currentCart = this._card;

      localStorage.setItem('cart', JSON.stringify(currentCart));
    });
  }

  //metodo para agregar un producto al carrito
  // y aqui es el metodo para agregar un producto al carrito
  addToCart(product: Product): void {
    // Actualizo la señal del carrito usando update
    this._card.update((cartItems) => {
      // Busco si el producto ya existe en el carrito
      const existingItemIndex = cartItems.findIndex((i) => i.id === product.id);

      // Si el producto ya existe (index >= 0)
      if (existingItemIndex >= 0) {
        // Creo una copia del array para mantener inmutabilidad
        const newItems = [...cartItems];
        // Actualizo el item incrementando su cantidad en 1
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        // Retorno el array actualizado
        return newItems;
      }
      // Si el producto no existe, lo agrego al carrito con cantidad 1
      return [...cartItems, { ...product, quantity: 1 }];
    });
  }
}
