import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData: any = []
  currency : string = "INR"
  // table properties
  dataSource:any
  displayedColumns:string[] = ['symbol','current_price','name','market_cap']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router:Router, private currencyService :CurrencyService) {
    
   }

  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
    this.currencyService.getCurrency().subscribe((val :any)=>{
      this.currency = val
      this.getAllData()
      this.getBannerData()
    })
  }
  getBannerData() {
    this.api.getTrendingCurrency(this.currency)
      .subscribe((result) => {
        this.bannerData = result;
        console.log(this.bannerData);
        
      },
        (error) => {
          console.log(error);

        })
  }

  getAllData() {
    this.api.getCurrencyData(this.currency)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToDetails(row:any){
    this.router.navigate(['coin-detail',row.id])
  }
}
