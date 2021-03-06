import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,private auth: AuthService,private router: Router) {

  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    console.log("sdfdfsdfdddfdsf" +values);
    console.log("cvssd");

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {
        if (data!=undefined){
          this.auth.setToken(data.token);
          this.router.navigate(['/products']);
        }
      });
  }

}
