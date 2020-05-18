import { Component, OnInit } from '@angular/core';
import { CovidDetailsService } from '../services/covid-details.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  confirmed: number;
  active: number;
  recovered: number;
  death: number;
  loader: boolean;
  confirmIncrease: string;
  recoverIncrease: string;
  deathIncrease: string;
  activeIncrease: string;
  tableData = [];
  displayedColumns: string[];
  public dataSource = new MatTableDataSource();
  constructor(private covidDetailService: CovidDetailsService) { }

  ngOnInit(): void {
    this.getWorldReportJson();
    this.displayedColumns = ['country', 'confirmed', 'active', 'recover', 'death'];
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  getWorldReportJson() {
    this.loader = true;
    this.covidDetailService.getWorldReport().subscribe((response) => {
    console.log(response);
    let wordReport = response["Global"];
    this.confirmed = wordReport["TotalConfirmed"];
    this.death = wordReport["TotalDeaths"];
    this.recovered = wordReport["TotalRecovered"];
    this.active = wordReport["TotalConfirmed"] - (wordReport["TotalDeaths"] + wordReport["TotalRecovered"]);
    this.confirmIncrease = "[+"+wordReport["NewConfirmed"]+"]";
    this.recoverIncrease = "[+"+wordReport["NewRecovered"]+"]";
    this.deathIncrease = "[+"+wordReport["NewDeaths"]+"]";
    let newActive = wordReport["NewConfirmed"] - (wordReport["NewDeaths"] + wordReport["NewRecovered"]);
    this.activeIncrease = "[+"+newActive+"]";
    let countryTableDetails = {};
    for(let details of response["Countries"]) {
      countryTableDetails = {};
      countryTableDetails["country"] = details["Country"];
      countryTableDetails["confirmed"] = details["TotalConfirmed"];
      countryTableDetails["death"] = details["TotalDeaths"];
      countryTableDetails["recover"] = details["TotalRecovered"];
      countryTableDetails["active"] = details["TotalConfirmed"] - (details["TotalRecovered"] + details["TotalDeaths"]);
      this.tableData.push(countryTableDetails);
    }
    console.log(this.tableData);
    this.loader = false;
    // for (var i = 0; i < this.airports.length; i++) {
    // this.cityName.push(this.airports[i].cityName + ( + this.airports[i].airportCode + ));
    // // this.ff = this.cityName.split(,);
    // }
    },
    error => {
    this.loader = false;
    this.errorMessage = 'Unable to load world report data';
    // this.toast.error(this.errorMessage, error.headers.get('errormessage'));
    if (error.status === 401) {
    } else
    if (error.status == 409 ) {
    // this.toast.error(error.headers.get('errormessage'), '');
    } else {
    console.log(error);
    }
    }
    );
    }

}
export interface UserData {
  country: string;
  confirmed: string;
  active: string;
  recover: string;
  death: string;
}
