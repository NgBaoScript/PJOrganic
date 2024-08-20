import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent {
  userId: string = '';
  newPassword: string = '';

  constructor(private userService: AuthService) {}

  changePassword() {
    if (this.userId && this.newPassword) {
      this.userService.changePassword(this.userId, this.newPassword).subscribe(
        (response) => {
          console.log('Password changed successfully.');
        },
        (error) => {
          console.log('Error: Password change failed.');
        }
      );
    } else {
      console.log('Please enter a user ID and a new password.');
    }
  }

}
