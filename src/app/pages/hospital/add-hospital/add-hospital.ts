import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {EventService} from '../../../services/event/event.service';
import {CustomValidator} from '../../../shared/validators/customvalidators.validator';
import {firstValueFrom} from 'rxjs';
import {NotificationTypeEnum} from '../../../utils/NotificationTypeEnum';
import {CreateHospitalDTO, HospitalService} from '../../../services/hospital/hospital.service';

@Component({
  selector: 'app-add-hospital',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-hospital.html',
  styleUrl: './add-hospital.scss',
  standalone: true
})
export class AddHospital {
  hospitalForm: FormGroup;
  private readonly hospitalService = inject(HospitalService);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private isSubmitting: boolean = false;

  constructor() {
    this.hospitalForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      address: new FormControl<string>(''),
      phone: new FormControl<string>('')
    });
  }

  submitForm(): void {
    if (this.isSubmitting) return;
    if (this.hospitalForm.invalid) {
      this.hospitalForm.markAllAsDirty();
      return;
    }
    this.isSubmitting = true;
    const createHospitalDTO: CreateHospitalDTO = {
      name: this.hospitalForm.get('name')?.value,
      address: this.hospitalForm.get('address')?.value,
      phone: this.hospitalForm.get('phone')?.value,
    };

    firstValueFrom(this.hospitalService.createHospital(createHospitalDTO)).then(success => {
      if (success) {
        this.eventService.emitNotification({
          message: "Doctor created successfully"
        })
        this.router.navigate(["/admin/hospitals"])
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
