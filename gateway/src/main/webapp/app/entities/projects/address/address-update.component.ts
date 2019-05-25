import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAddress, Address } from 'app/shared/model/projects/address.model';
import { AddressService } from './address.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
  address: IAddress;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    streetName: [null, [Validators.required]],
    apartmentOrHouseNumber: [],
    city: [null, [Validators.required]],
    zipcode: [null, [Validators.required]],
    state: [],
    country: []
  });

  constructor(protected addressService: AddressService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);
      this.address = address;
    });
  }

  updateForm(address: IAddress) {
    this.editForm.patchValue({
      id: address.id,
      streetName: address.streetName,
      apartmentOrHouseNumber: address.apartmentOrHouseNumber,
      city: address.city,
      zipcode: address.zipcode,
      state: address.state,
      country: address.country
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    const entity = {
      ...new Address(),
      id: this.editForm.get(['id']).value,
      streetName: this.editForm.get(['streetName']).value,
      apartmentOrHouseNumber: this.editForm.get(['apartmentOrHouseNumber']).value,
      city: this.editForm.get(['city']).value,
      zipcode: this.editForm.get(['zipcode']).value,
      state: this.editForm.get(['state']).value,
      country: this.editForm.get(['country']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
    result.subscribe((res: HttpResponse<IAddress>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
