import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) {}

  portfolioApis = `${environment.baseurl}/portfolio`;


  postportfolio(portfolioData: FormData) {
    return this.http.post<any>(this.portfolioApis, portfolioData);
  }

  getportfolio() {
    return this.http.get<any>(this.portfolioApis);
  }
  getportfoliobyId(portfolioId: string) {
    return this.http.get<any>(`${this.portfolioApis}/${portfolioId}`);
  }

  updateportfolio(portfolioId: string, portfolioData: any) {
    return this.http.put<any>(`${this.portfolioApis}/${portfolioId}`, portfolioData);
  }
  getportfoliocategory() {
    return this.http.get<any>(`${this.portfolioApis}/categories`);
  }

   getportfolioByCategory(category: string) {
    const encoded = encodeURIComponent(category);
    return this.http.get<any>(`${this.portfolioApis}/category/${encoded}`);
  }
}
