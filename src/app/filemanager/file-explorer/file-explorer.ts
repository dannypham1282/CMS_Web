
import {
  Component,
  HostListener,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemService } from '../../services/file-system-service';
import { FileNode } from '../../entities/file-node';
import { FileTreeNode} from '../file-tree-node/file-tree-node';
import { ContextMenu } from '../../context-menu/context-menu';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, FileTreeNode, ContextMenu],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.css',
})
export class FileExplorer {
  constructor(public fs: FileSystemService) { }
  menuVisible = signal(false);
  menuX = signal(0);
  menuY = signal(0);
  menuNode = signal<FileNode | null>(null);
  menufileNode = signal<FileNode | null>(null);
  onselect(node: FileNode) {
    this.fs.selectNode(node);
  }

  ngOnInit() {
    console.log('File Explorer initialized');
     console.log(this.fs.fileTree());
  }

  onRightClick(data: { event: MouseEvent; node: FileNode }) {
    this.fs.selectNode(data.node);
    this.menuVisible.set(true);
    this.menuX.set(data.event.clientX);
    this.menuY.set(data.event.clientY);
    this.menuNode.set(data.node);
  }

  rename() {
    const node = this.menuNode();
      if (!node) return;
    const value = prompt('Enter new name', node.name);
    if (value?.trim()) {
      this.fs.renameNode(node, value.trim());
    }
    this.closeMenu();
  }

  delete() {
    const node = this.menuNode();
      if (!node) return;
    if (confirm(`Are you sure you want to delete "${node.name}"?`)) {
      // Implement delete logic here
     this.fs.removeNode(node);
    }
    this.closeMenu();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeMenu();
  }

  closeMenu() {   
     this.menuVisible.set(false);
    this.menuNode.set(null);
  }

}
