import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Book } from '../models/book';
import { Books } from '../pages/books/books';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private http : HttpClient = inject(HttpClient)
    readonly URL = 'http://localhost:3000/Books'

    getBooks(){
        return this.http.get<Book[]>(this.URL)
    }

    getBookById(id: string){
        return this.http.get<Book>(`${this.URL}/${id}`)
    }

    addBook(b: Book){
        return this.http.post<Books>(this.URL, b)
    }

    updateBook(b: Book){
        return this.http.put<Book>(`${this.URL}/${b.id}`, b)
    }

    deleteBook(id: string){
        return this.http.delete<void>(`${this.URL}/${id}`)
    }
}
