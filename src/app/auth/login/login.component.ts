import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() myClick = new EventEmitter<boolean>();
  loginForm!: FormGroup
  loginRequestPayload: LoginRequestPayload
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload={
      username: '',
      password: ''
    }
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.activatedRoute.queryParams
      .subscribe(params=>{
      if(params['registered'] !== undefined && params['registered'] === 'true'){
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = "Please check your inbox for activation email " +
        "activate your account before you Login!";
      }
    })
  }
  onMyClick(){
    this.myClick.emit()
  }
  login(){
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data=>{
      this.isError = false;
      this.router.navigateByUrl('user-profile/' + this.loginRequestPayload.username);
      this.toastr.success('Login Successful');
    }, error=>{
      this.isError = true;
      throwError(() => new Error(error));
    })
  }
  
}
