'use client';
import { Flex, Text, usePrismaneTheme } from '@prismane/core';
import { FileArrowDown, Folder } from '@phosphor-icons/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Typewriter from 'typewriter-effect';
import {foldersType} from "@/pagesClient/download";

interface Props {
    setImages: Dispatch<SetStateAction<foldersType[] | null>>;
}

export const buildFileTree = (files: FileList): foldersType[] => {
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

            // Проверяем, есть ли уже узел для текущего пути в карте
            let existingNode = folderMap.get(currentPath);

            if (!existingNode) {
                existingNode = { folderPath: currentPath, files: [], children: [] };
                folderMap.set(currentPath, existingNode); // Добавляем в карту, чтобы избежать дублирования
                currentLevel.push(existingNode); // Добавляем в текущий уровень
            }

            currentLevel = existingNode.children; // Переходим на следующий уровень
        }

        // Обрабатываем сам файл, добавляя его в нужную папку
        const parentFolderPath = currentPath;
        let parentFolder = folderMap.get(parentFolderPath);

        if (!parentFolder) {
            parentFolder = { folderPath: parentFolderPath, files: [], children: [] };
            folderMap.set(parentFolderPath, parentFolder);
            currentLevel.push(parentFolder);
        }

        parentFolder.files.push(file); // Добавляем файл в папку
    }

    return root;
};



export default function FormDownload({ setImages }: Props) {
    const { theme } = usePrismaneTheme();

    const handleFolderChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files;
            if (files) {
                const allowedExtensions = ['.tif', '.jfif', '.jpeg', '.tiff', '.jpg', '.webp', '.png', '.pjpeg'];

                // Convert FileList to an array and filter based on allowed extensions
                const filteredFilesArray = Array.from(files).filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    return allowedExtensions.includes(fileExtension);
                });

                // Create a DataTransfer object to convert the array back to a FileList
                const dataTransfer = new DataTransfer();
                filteredFilesArray.forEach(file => dataTransfer.items.add(file));

                // Get the FileList from the DataTransfer object
                const filteredFiles = dataTransfer.files;

                const fileTree = buildFileTree(filteredFiles);
                setImages(fileTree);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files || null;
            if (files) {
                const fileArray = Array.from(files);
                setImages([{folderPath: '', files: fileArray, children: []}]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Flex w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'} direction={'row'} gap={'16px'}>
            <Flex pos={'relative'} w={'100%'} h={'100%'} br={'base'} bg={theme.colors.base['700']} justify={'center'} align={'center'}>
                <input
                    name={'file'}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                    }}
                    type="file"
                    // @ts-ignore
                    webkitdirectory="true"
                    onChange={handleFolderChange}
                />
                <Flex direction={'column'} justify={'center'} align={'center'} gap={'1rem'} w={'50%'}>
                    <Folder size={64}/>
                    <Text as={'h3'}>
                        <Typewriter
                            options={{
                                delay: 75,
                                loop: false,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Загрузите папку').start();
                            }}
                        />
                    </Text>
                </Flex>
            </Flex>
            <Flex pos={'relative'} w={'100%'} h={'100%'} br={'base'} bg={theme.colors.base['700']} justify={'center'} align={'center'}>
                <input
                    name={'file'}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                    }}
                    type="file"
                    accept=".tif, .jfif, .jpeg, .tiff, .jpg, .webp, .png,  .pjpeg"
                    multiple={true}
                    onChange={handleFileChange}
                />
                <Flex direction={'column'} justify={'center'} align={'center'} gap={'1rem'} w={'50%'}>
                    <FileArrowDown size={64}/>
                    <Text as={'h3'} ta={'center'}>
                        <Typewriter
                            options={{
                                delay: 75,
                                loop: false,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Загрузите изображения или архивы (zip, rar, 7z)').start();
                            }}
                        />
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

// .zip, .rar, .7z