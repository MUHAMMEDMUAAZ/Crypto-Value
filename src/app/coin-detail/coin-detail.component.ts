import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {
  coinData: any
  coinId!: string
  days: number =1
  currency: string = "INR"
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val:any) => {
      this.coinId = val['id'];
    })
    this.getCoinData();
    this.getGraphData(this.days)
    this.currencyService.getCurrency().subscribe((val) =>{
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData()
    })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((result:any) => {
      this.coinData = result;
      console.log(this.coinData);
      if(this.currency === "USD"){
        result.market_data.current_price.inr = result.market_data.current_price.usd
        result.market_data.market_cap.inr = result.market_data.market_cap.usd
      }
      result.market_data.current_price.inr = result.market_data.current_price.inr
        result.market_data.market_cap.inr = result.market_data.market_cap.inr
        this.coinData = result;
    })
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;


  getGraphData(days :number){
    this.days = days;
    this.api.getGraphData(this.currency,this.coinId,this.days)
    .subscribe((res) => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      },300)
      this.lineChartData.datasets[0].data = res.prices.map((a:any) => {
        return a[1]
      })
      this.lineChartData.labels = res.prices.map((a:any) => {
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ? `${date.getHours() -12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }
}
