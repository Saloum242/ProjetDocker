import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(18)]],
      lastName: ['', [Validators.required, Validators.maxLength(18)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          this.message = 'Succès : Utilisateur ajouté !';
          this.isSuccess = true; // L'opération a réussi
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error adding user', error);
          this.message = 'Erreur : Utilisateur non ajouté !';
          this.isSuccess = false; // L'opération a échoué
        }
      });
    }
  }
}
