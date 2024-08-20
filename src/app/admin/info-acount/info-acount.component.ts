import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Role } from 'src/app/model/user/role';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-info-acount',
  templateUrl: './info-acount.component.html',
  styleUrls: ['./info-acount.component.css']
})
export class InfoAcountComponent implements OnInit {
  userList: User[] = []
  roleList: Role[] = []
  registerform: FormGroup;
  users: User
  userId: any

  constructor(
    private userService: AuthService,
    private builder: FormBuilder,
    private active: ActivatedRoute
  ) {
    this.registerform = this.builder.group({
      id: [''],
      firstname: [''],
      name: [''],
      password: [''],
      email: [''],
      role: ['', Validators.required],
      isactive: []
    });
  }

  ngOnInit(): void {
    this.userService.Getall().subscribe(data => {
      this.userList = data;
    });

    this.userService.getuserrole().subscribe(data => {
      this.roleList = data;
    })

    this.active.params.subscribe(params => {
      this.userId = params['id'];
    })

  }

  openModal(id: string){
    this.userService.GetIdRole(id).subscribe((data: any) =>{
      this.users =data
      this.registerform.patchValue({
        id: data.id,
        firstname: data.firstname,
        name: data.name,
        password: data.password,
        email: data.email,
        role: data.role,
        isactive: data.isactive,
      })
    })
  }

  edit(){
    this.userService.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res =>{
      this.ngOnInit()
    })
  }

  FormatActive(is){
    if (is == true){
      return 'Đang hoạt động'
    } else{
      return 'Đã tắt hoạt động'
    }
  }

  FormatColorActive(iss){
    if (iss == false){
      return 'red'
    }else{
      return 'rgb(72,157,114)'
    }
  }

}

