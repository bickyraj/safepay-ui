import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {HospitalService} from "../../services/hospital/hospital.service";
import {MxTableComponent, PaginationDetails} from "../../common/mx-table/mx-table.component";
import {HospitalModel} from "../../model/HospitalModel";
import {Observable, of, Subject, takeUntil} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-hospital',
  imports: [
    MxTableComponent,
  ],
  templateUrl: './hospital.html',
  styleUrl: './hospital.scss',
  standalone: true
})
export class Hospital implements OnInit, OnDestroy {

  private readonly  hospitalService = inject(HospitalService);
  public readonly columns: (keyof Partial<HospitalModel>)[] = ['id', 'name'];
  public dataList = signal<HospitalModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.hospitalService.getList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
