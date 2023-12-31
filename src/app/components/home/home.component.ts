import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user$ = this.authService.currentUser$;

  constructor(public authService: AuthenticationService){
    
  }
}
