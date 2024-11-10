import {foldersType} from "@/pagesClient/download";

type FileWithPath = {
    path: string;
    file: File;
}

export const buildFileTreeArray = (files: FileWithPath[]): foldersType[] => {
    const root: foldersType[] = [];
    const folderMap = new Map<string, foldersType>();

    for (let i = 0; i < files.length; i++) {
        const { path, file } = files[i];
        const pathParts = path.split('/');
        let currentLevel = root;
        let currentPath = '';

        for (let j = 0; j < pathParts.length - 1; j++) {
            const part = pathParts[j];
            if (part === "") continue;

            currentPath += (currentPath ? '/' : '') + part;

            let existingNode = folderMap.get(currentPath);

            if (!existingNode) {
                existingNode = { folderPath: currentPath, files: [], children: [] };
                folderMap.set(currentPath, existingNode);
                currentLevel.push(existingNode);
            }

            currentLevel = existingNode.children;
        }

        const parentFolderPath = currentPath;
        let parentFolder = folderMap.get(parentFolderPath);

        if (!parentFolder) {
            parentFolder = { folderPath: parentFolderPath, files: [], children: [] };
            folderMap.set(parentFolderPath, parentFolder);
            currentLevel.push(parentFolder);
        }

        parentFolder.files.push(file);
    }

    return root;
};

export default buildFileTreeArray;