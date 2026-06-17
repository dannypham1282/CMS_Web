import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.css',
})
export class ContextMenu {

  @Input() x = 0;
  @Input() y = 0;
  @Input() visible = false;

  @Output() rename = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
