import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/helper/customValidators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formSignup!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.formSignup = new FormGroup(
    //   {
    //     name: new FormControl('', Validators.required),
    //     email: new FormControl('', [Validators.required, Validators.email]),
    //     password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //     confirm: new FormControl('', Validators.required),
    //     avatar: new FormControl(environment.defaultImage),
    //     role: new FormControl(0),
    //     address: new FormControl(''),
    //   }
    // )
    this.formSignup = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirm: ['', Validators.required],
        avatar: [environment.defaultImage],
        role: [0],
        address: [''],
      },
      {
        validator: MustMatch('password', 'confirm')
      }
    )
  }

  onSignup() {
    if (this.formSignup.valid) {
      const { confirm, ...data } = this.formSignup.value;
      this.authService.signup(data).subscribe(() => {
        this.toastr.success("Đăng ký thành công");
        this.router.navigate(['/signin']);
      })
    } else {
      console.log("Invalid");
    }
  }

}
