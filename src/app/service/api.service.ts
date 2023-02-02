import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE').set('Access-Control-Allow-Methods', 'Content-Type');
  }

  getCurrencyData(currency: string) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE').set('Access-Control-Allow-Methods', 'Content-Type');
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`, { headers: myHeaders })
  }

  getTrendingCurrency(currency: string) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE').set('Access-Control-Allow-Methods', 'Content-Type');
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`, { headers: myHeaders })
  }

  getGraphData(currency: string, coinId: string, days: number) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE').set('Access-Control-Allow-Methods', 'Content-Type');
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`, { headers: myHeaders })
  }

  getCurrencyById(coinId: string) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE').set('Access-Control-Allow-Methods', 'Content-Type');
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`, { headers: myHeaders })
  }
}
