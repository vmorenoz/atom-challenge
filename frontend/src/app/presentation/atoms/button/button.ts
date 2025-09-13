import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {

  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  loading = input<boolean>(false);
  label = input<string>('');
  icon = input<string>('');
  color = input<'default' | 'primary' | 'secondary' | 'accent'>('default');
  variant = input<'ghost' | 'default' | 'soft' | 'outline' | 'link'>('default');

  get buttonClasses(){
    return {
      'btn-block': this.fullWidth(),
      'opacity-70 cursor-not-allowed': this.loading(),
      '': this.color() === 'default' && this.variant() === 'default',
      'btn-primary': this.color() === 'primary' && this.variant() === 'default',
      'btn-secondary': this.color() === 'secondary' && this.variant() === 'default',
      'btn-accent': this.color() === 'accent' && this.variant() === 'default',
      'btn-outline': this.color() === 'default' && this.variant() === 'outline',
      'btn-outline-primary': this.color() === 'primary' && this.variant() === 'outline',
      'btn-outline-secondary': this.color() === 'secondary' && this.variant() === 'outline',
      'btn-outline-accent': this.color() === 'accent' && this.variant() === 'outline',
      'btn-soft': this.color() === 'default' && this.variant() === 'soft',
      'btn-soft-primary': this.color() === 'primary' && this.variant() === 'soft',
      'btn-soft-secondary': this.color() === 'secondary' && this.variant() === 'soft',
      'btn-soft-accent': this.color() === 'accent' && this.variant() === 'soft',
      'btn-ghost': this.variant() === 'ghost',
      'btn-link': this.variant() === 'link',
    };
  }

}
