import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos la estructura de una categoría
interface Category {
  name: string;
  image: string;
  borderColor: string;    // Color fuerte para el borde
  backgroundColor: string; // Color suave para el fondo
}

@Component({
  selector: 'app-products', // Puedes cambiar esto si quieres
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {

  categories: Category[] = [
    { 
      name: 'Fresh Fruits & Vegetable', 
      image: 'assets/images/fruits.png', // Recuerda poner tus imágenes reales aquí
      borderColor: '#53B175', 
      backgroundColor: 'rgba(83, 177, 117, 0.1)' 
    },
    { 
      name: 'Cooking Oil & Ghee', 
      image: 'assets/images/oil.png', 
      borderColor: '#F8A44C', 
      backgroundColor: 'rgba(248, 164, 76, 0.1)' 
    },
    { 
      name: 'Meat & Fish', 
      image: 'assets/images/meat.png', 
      borderColor: '#F7A593', 
      backgroundColor: 'rgba(247, 165, 147, 0.25)' 
    },
    { 
      name: 'Bakery & Snacks', 
      image: 'assets/images/bakery.png', 
      borderColor: '#D3B0E0', 
      backgroundColor: 'rgba(211, 176, 224, 0.25)' 
    },
    { 
      name: 'Dairy & Eggs', 
      image: 'assets/images/dairy.png', 
      borderColor: '#FDE598', 
      backgroundColor: 'rgba(253, 229, 152, 0.25)' 
    },
    { 
      name: 'Beverages', 
      image: 'assets/images/beverages.png', 
      borderColor: '#B7DFF5', 
      backgroundColor: 'rgba(183, 223, 245, 0.25)' 
    }
  ];

}
