import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cat } from './model/cat';
import { CatsService } from './services/cats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  catsList: Cat[] = [];
  catForm: FormGroup;
  title = 'cats-ui';
  isEdit=false;
  catidToEdit="";

  constructor(private fb: FormBuilder, private _catService: CatsService) {
    this.catForm = this.fb.group({
      name: ["", Validators.required]
    })
  }

  ngOnInit() {
    this.getCats()
  }

  getCats() {
    this._catService.getCats().subscribe(data => {
      this.catsList = data
    }, error => {
      console.log(error)
    })
  }

  createCat() {
    const CAT: Cat = {
      name: this.catForm.get("name")?.value
    }

    this._catService.createCat(CAT).subscribe(data => {
      this.getCats()
      this.catForm.reset()
    }, error => {
      console.log(error)
    })
  }

  getCat(id: any) {
    console.log("id",id)
    this._catService.getCat(id).subscribe(data => {
      this.catForm.setValue({
        name: data.name
      })
      this.isEdit = true
      this.catidToEdit = id
    }, error => {
      console.log(error)
    })
  }

  updateCat() {
    const CAT: Cat = {
      name: this.catForm.get("name")?.value
    }

    this._catService.updateCat(this.catidToEdit, CAT).subscribe(data => {
      this.getCats()
      this.catForm.reset()
      this.catidToEdit = ""
    }, error => {
      console.log(error)
    })
  }

  deleteCat(id: any) {
    this._catService.deleteCat(id).subscribe(data => {
      this.getCats()
    }, error => {
      console.log(error)
    })
  }
}
