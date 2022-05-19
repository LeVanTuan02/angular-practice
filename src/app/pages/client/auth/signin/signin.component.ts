import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  formSignin!: FormGroup

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formSignin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  handleSignin() {
    if (this.formSignin.valid) {
      this.authService.signin(this.formSignin.value)
      .subscribe(
        response => {
          this.toastr.success("Đăng nhập thành công");
          localStorage.setItem('auth', JSON.stringify(response.user));

          if (response.user.role) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.toastr.error(error.error);
        }
      )
    }
  }

}
