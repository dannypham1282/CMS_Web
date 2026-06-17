import { Component } from '@angular/core';
import { FileExplorer } from '../filemanager/file-explorer/file-explorer';

@Component({
  selector: 'app-manage-document',
    standalone: true,
  imports: [FileExplorer],
  templateUrl: './manage-document.html',
  styleUrl: './manage-document.css',
})
export class ManageDocument {}
