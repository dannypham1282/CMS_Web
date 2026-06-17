import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class httpService {
    constructor(private http: HttpClient) {
        // You can initialize your service here if needed
    }       
    private apiUrl = 'https://localhost:44314'; // Replace with your actual API endpoint

    getJsonData(path: string): Observable<any> {
     
        console.log('API URL:', `${this.apiUrl}/${path}`); // Log the full API URL for debugging
        return this.http.get(`${this.apiUrl}/${path}`); 
    }
}