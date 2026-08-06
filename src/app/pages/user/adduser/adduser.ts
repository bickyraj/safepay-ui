import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CreateUserDTO, UserService} from '../../../services/user/user.service';
import {firstValueFrom} from 'rxjs';
import {EventService} from '../../../services/event/event.service';
import {NotificationTypeEnum} from '../../../utils/NotificationTypeEnum';
import {CustomValidator} from '../../../shared/validators/customvalidators.validator';

@Component({
  selector: 'app-adduser',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './adduser.html',
  styleUrl: './adduser.scss',
  standalone: true
})
export class Adduser {
  userForm: FormGroup;
  private readonly userService = inject(UserService);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.userForm = new FormGroup({
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string | null>(''),
      username: new FormControl<string>('', [Validators.required, CustomValidator.username()]),
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required
      ]),
      address: new FormControl<string>(''),
      phone: new FormControl<string>('')
    });
  }

  submitUser(): void {
    if (this.isSubmitting) return;
    if (this.userForm.invalid) {
      this.userForm.markAllAsDirty();
      return;
    }
    this.isSubmitting = true;
    const createUserDTO: CreateUserDTO = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      username: this.userForm.get('username')?.value,
      phone: this.userForm.get('phone')?.value,
    };

    firstValueFrom(this.userService.createUser(createUserDTO)).then(success => {
      if (success) {
        this.eventService.emitNotification({
          message: "User created successfully"
        })
        this.router.navigate(["/admin/users"])
      } else {
        this.isSubmitting = false;
      }
    }).catch(error => {
      this.eventService.emitNotification({
        message: error.message,
        type: NotificationTypeEnum.ERROR
      });
      this.isSubmitting = false;
    });
  }
}
