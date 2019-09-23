import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'currencyConverter';
}
