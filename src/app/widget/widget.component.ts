import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  form: FormGroup;
  currencyType = ['CAD', 'USD', 'EUR'];
  selectedType1 = 'CAD';
  selectedType2 = 'USD';
  rates: {[key: string]: number};
  isFailed = false;
  errorMessage: string;
  API_URL = "http://data.fixer.io/api/latest?access_key=afef6c6644c59765f0cf29d1602f5fae";  //Fixer API URL

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    //Initialising the reactive form
    this.form = new FormGroup({
      currency: new FormControl(1),
      curType: new FormControl(),
      convertedCurrency: new FormControl(null),
      conCurType: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    //HTTP GET request to fixer API
    this.http
      .get<{ success: boolean; timestamp: number, base: string, date: string, rates: any}>(this.API_URL)
      .subscribe(response => {
        // Assigning the rates object from response to rates variable
        this.rates = {...response.rates};

        //Initiating the calculation
        this.onModify();
    },(err: HttpErrorResponse) => {
      //Error handling
      this.isFailed = true;
      this.errorMessage = "Sorry!!! Widget is down due to HTTP failure."
    });

  }

  // Function which will do the conversion
  onModify() {
    this.form.controls['curType'].setValue(this.form.value.curType, {onlySelf: true});
    this.form.controls['conCurType'].setValue(this.form.value.conCurType, {onlySelf: true});
    
    this.form.controls['currency'].setValue(this.form.value.currency, {onlySelf: true});

    //if form is invalid
    if (this.form.invalid) {
      console.log("invalid");
      return;
    }
    if(this.form.value.currency === ''){
      this.form.value.convertedCurrency.reset();
    }
    //Conversion  formula
    this.form.value.convertedCurrency = (this.form.value.currency / this.rates[this.form.value.curType]) * this.rates[this.form.value.conCurType];

    //Limiting the decimal point
    this.form.value.convertedCurrency = Math.round(this.form.value.convertedCurrency * 100) / 100;

    this.form.controls['convertedCurrency'].setValue(this.form.value.convertedCurrency, {onlySelf: true});
  }

}
