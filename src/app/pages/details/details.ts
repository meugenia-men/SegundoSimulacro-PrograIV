import { Component, OnInit, signal } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details implements OnInit {

  book = signal<Book | null>(null);   // signal que puede ser Book o null

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getSelectedBook(id);
  }

  getSelectedBook(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book.set(data);          // usamos .set()
        console.log('Libro cargado:', this.book());
      },
      error: (e) => {
        console.error('Error al cargar el libro:', e);
        this.book.set(null);
      }
    });
  }
}