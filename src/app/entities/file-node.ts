export interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    expanded?: boolean;
    size?: number;
    level?: number; // Optional: to track the depth in the tree
}