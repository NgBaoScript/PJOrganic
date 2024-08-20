import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerform: FormGroup;

  constructor(
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerform = new FormGroup(
      {
        id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')])),
        firstname: new FormControl('', Validators.compose([Validators.required])),
        name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(40),
        Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùỳýúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÝÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])),
        email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        role: new FormControl('user'),
        isactive: new FormControl(true)
      }
    );
  }

  validation_messages = {
    id: [
      { type: 'required', message: 'Vui lòng nhập tên tài khoản.' },
      { type: 'pattern', message: 'Không được nhập ký tự đặt biệt.' },
      { type: 'minLength', message: 'Tên phải lớn hơn 6 ký tự.' }
    ],
    name: [
      { type: 'required', message: 'Vui lòng nhập tên.' },
      { type: 'maxLength', message: 'Tên phải bé hơn 40 ký tự' },
      { type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số.' }
    ],
    password: [
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' },
      { type: 'minLength', message: 'Mật khẩu phải từ 6 - 15 ký tự.' },
      { type: 'maxLength', message: 'Mật khẩu phải từ 6 - 15 ký tự.' },
    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập Email.' },
      { type: 'pattern', message: 'Email tuân thủ theo format ex: abc@gmail.com' }
    ]
  }

  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Đăng ký thành công')
        this.router.navigate([''])
      });
    } else {
      this.toastr.warning('Vui lòng nhập dữ liệu hợp lệ.')
    }
  }

}
