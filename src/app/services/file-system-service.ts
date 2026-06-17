import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileNode } from '../entities/file-node';

@Injectable({
    providedIn: 'root'
})
export class FileSystemService {
    fileTree = signal<FileNode[]>([
        {
            id: '1',
            name: 'Documents',
            type: 'folder',
            expanded: true,
            level: 0,
            children: [
                {
                    id: '2',
                    name: 'Resume.docx',
                    type: 'file',
                    level: 1
                },
                 {
                    id: '6',
                    name: 'TestFile.pdf',
                    type: 'file',
                    level: 1
                },
                {
                    id: '3',
                    name: 'Projects',
                    type: 'folder',
                    level: 1,
                    children: [
                        {
                            id: '4',
                            name: 'AngularApp',
                            type: 'folder',
                            level: 2
                        }
                    ]
                }
            ]
        },
        {
            id: '5',
            name: 'Pictures',
            type: 'folder',
            level: 0
        }
    ]); // Initialize as an empty array

    selectedNode = signal<FileNode | null>(null);

    selectNode(node: FileNode) {
        this.selectedNode.set(node);
    }

    toggleFolder(node: FileNode) {
        if (node.type === 'folder') {
            node.expanded = !node.expanded;
            this.fileTree.set([...this.fileTree()]);
        }
    }

    renameNode(node: FileNode, newName: string) {
        node.name = newName;
        this.fileTree.update(v => [...v]);
    }

    deleteNode(nodeId: string, nodes = this.fileTree()): FileNode[] {
        return nodes
            .filter(n => n.id !== nodeId)
            .map(n => ({
                ...n,
                children: n.children
                    ? this.deleteNode(nodeId, n.children)
                    : undefined
            }));
    }
    removeNode(node: FileNode) {
        this.fileTree.set(this.deleteNode(node.id));
    }
}