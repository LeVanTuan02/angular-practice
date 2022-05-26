import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToppingType } from 'src/app/models/topping.model';
import { ToppingService } from 'src/app/services/topping.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-topping-list',
  templateUrl: './admin-topping-list.component.html',
  styleUrls: ['./admin-topping-list.component.css']
})
export class AdminToppingListComponent implements OnInit {

  formModalTopping!: FormGroup;
  toppingList: ToppingType[] = [];
  @ViewChild('btnDismiss') btnDismiss!: ElementRef
  @ViewChild('btnOpen') btnOpen!: ElementRef
  modalName: string = "add";
  id?: number;

  constructor(
    private toppingService: ToppingService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getToppings();

    this.formModalTopping = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required)
    })
  }

  getToppings() {
    this.toppingService.getAll().subscribe(res => this.toppingList = res);
  }

  handleFormTopping() {
    if (this.formModalTopping.valid) {
      if (this.modalName === "add") {
        this.toppingService
        .add(this.formModalTopping.value)
        .subscribe(response => {
          this.toastr.success("Thêm Topping thành công");
          this.toppingList = [...this.toppingList, response];
          this.btnDismiss.nativeElement.click();
        })
      } else {
        this.toppingService
        .update({
          ...this.formModalTopping.value,
          id: this.id
        })
        .subscribe(response => {
          this.toastr.success("Cập nhật Topping thành công");
          this.toppingList = this.toppingList.map(item => item.id == response.id ? response : item);
          this.btnDismiss.nativeElement.click();
        })
      }
    } else {
      console.log("Invalid");
    }
  }

  handleAdd() {
    this.formModalTopping.reset()
    this.modalName = "add";
    this.btnOpen.nativeElement.click();
  }

  handleEdit(id?: number) {
    this.modalName = "edit";
    this.id = id;

    this.toppingService
    .get(id)
    .subscribe(response => {
      this.formModalTopping.setValue({
        name: response.name,
        price: response.price
      })
      this.btnOpen.nativeElement.click();
    })
  }

  handleRemove(id?: number) {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?");

    if (isConfirm) {
      this.toppingService
      .remove(id)
      .subscribe(() => {
        this.toastr.success("Xóa Topping thành công");
        this.toppingList = this.toppingList.filter(item => item.id !== id);
      })
    }
  }

}
