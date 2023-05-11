import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-thoughts',
  templateUrl: './thoughts.component.html',
  styleUrls: ['./thoughts.component.css']
})
export class ThoughtsComponent implements OnInit {

  form!: FormGroup

  fb: FormBuilder = inject(FormBuilder)

  @Input()
  canShare = false

  @Output()
  onThoughts = new Subject<string>()

  ngOnInit(): void {
    this.form = this.createForm()      
  }

  remove() {
    this.form = this.createForm()
  }

  share() {
    const t = this.form.value['thoughts']
    this.onThoughts.next(t)
    this.form = this.createForm()
  }

  invalidField(control: string): boolean {
    return !!(this.form.get(control)?.invalid && this.form.get(control)?.dirty)
  }

  invalidForm() {
    return this.form.invalid || !this.canShare
  }

  private createForm(): FormGroup {
    return this.fb.group({
      thoughts: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ])
    })
  }

}
