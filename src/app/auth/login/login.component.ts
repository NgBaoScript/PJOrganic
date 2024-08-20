import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  result: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) {
    sessionStorage.clear();
  }

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.router.navigate(['home', this.result.id]);
            this.toastr.success('Đăng Nhập Thành Công')
          } else {
            this.toastr.error('Vui lòng liên hệ với Admin', 'User không hoạt động');
          }
        } else {
          this.toastr.error('Thông tin không hợp lệ');
        }
      });
    } else {
      this.toastr.warning('Vui lòng nhập dữ liệu hợp lệ')
    }
  }
}
