import { Component, OnInit, signal } from '@angular/core';
import { Book } from '../../models/book';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  imports: [RouterModule],
  selector: 'app-books',
  styleUrl: './books.css',
  templateUrl: './books.html',
})
export class Books implements OnInit {

  books = signal<Book[]>([]);   // ← tiene que ser signal

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books.set(data);     // ← .set()
      console.log(this.books());
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }

  irADetalles(id: string) {
    this.router.navigate(['/books', id]);
  }

  irAEditar(id: string) {
    this.router.navigate(['/edit', id]);
  }
}