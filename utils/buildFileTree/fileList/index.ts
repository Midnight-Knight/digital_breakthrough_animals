import {foldersType} from "@/pagesClient/download";

const buildFileTreeFileList = (files: FileList): foldersType[] => {
    const root: foldersType[] = [];
    const folderMap = new Map<string, foldersType>();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const pathParts = file.webkitRelativePath.split('/');
        let currentLevel = root;
        let currentPath = '';

        for (let j = 0; j < pathParts.length - 1; j++) { // Проходим до предпоследней части пути
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

export default buildFileTreeFileList;