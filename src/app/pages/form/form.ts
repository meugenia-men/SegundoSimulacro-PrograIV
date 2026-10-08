import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../models/book';

@Component({
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})

export class Form implements OnInit {

  formulario!: FormGroup;
  bookId?: string;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: ['', Validators.required]
    });

    this.bookId = this.route.snapshot.params['id'];

    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => this.formulario.patchValue(book),
        error: (e) => console.error('Error al cargar el libro:', e)
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    if (this.bookId) {
      // Editar
      const bookData: Book = { id: this.bookId, ...this.formulario.value };

      this.bookService.updateBook(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (e) => console.error(e)
      });
    } else {
      // Agregar
      const bookData = this.formulario.value;

      this.bookService.addBook(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (e) => console.error(e)
      });
    }
  }
}