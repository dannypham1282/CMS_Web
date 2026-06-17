import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../../entities/file-node';

@Component({
  selector: 'app-file-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-tree-node.html',
  styleUrl: './file-tree-node.css',
})
export class FileTreeNode {
  @Input() node!: FileNode;
  @Input() selectedId?: string;
  @Output() nodeClick = new EventEmitter<FileNode>();
  @Output() nodeRightClick = new EventEmitter<{
    event: MouseEvent;
    node: FileNode;
  }>();
  toggle(event: MouseEvent) {
    event.stopPropagation();
    if (this.node.type === 'folder') {
      this.node.expanded = !this.node.expanded;
    }
  }
}
