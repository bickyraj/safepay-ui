import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EventService} from '../../../services/event/event.service';
import {Router, RouterLink} from '@angular/router';
import {CustomValidator} from '../../../shared/validators/customvalidators.validator';
import {firstValueFrom} from 'rxjs';
import {NotificationTypeEnum} from '../../../utils/NotificationTypeEnum';
import {CreateDoctorDTO, DoctorService} from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-add-doctor',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.scss',
  standalone: true
})
export class AddDoctor {
  doctorForm: FormGroup;
  private readonly doctorService = inject(DoctorService);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private isSubmitting: boolean = false;

  constructor() {
    this.doctorForm = new FormGroup({
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

  submitForm(): void {
    if (this.isSubmitting) return;
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsDirty();
      return;
    }
    this.isSubmitting = true;
    const createDoctorDTO: CreateDoctorDTO = {
      firstName: this.doctorForm.get('firstName')?.value,
      lastName: this.doctorForm.get('lastName')?.value,
      email: this.doctorForm.get('email')?.value,
      username: this.doctorForm.get('username')?.value,
      phone: this.doctorForm.get('phone')?.value,
    };

    firstValueFrom(this.doctorService.createDoctor(createDoctorDTO)).then(success => {
      if (success) {
        this.eventService.emitNotification({
          message: "Doctor created successfully"
        })
        this.router.navigate(["/admin/doctors"])
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
