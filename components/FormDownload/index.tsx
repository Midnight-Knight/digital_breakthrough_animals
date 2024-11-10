'use client';
import { Flex, Text, usePrismaneTheme } from '@prismane/core';
import { FileArrowDown, Folder } from '@phosphor-icons/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Typewriter from 'typewriter-effect';
import {foldersType} from "@/pagesClient/download";
import JSZip from 'jszip';
import buildFileTreeFileList from "@/utils/buildFileTree/fileList";
import buildFileTreeArray from "@/utils/buildFileTree/array";

interface Props {
    setImages: Dispatch<SetStateAction<foldersType[] | null>>;
}

export async function unzipFile(file: File, path: string) {
    try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file);
        const arrayFiles: {path: string, file: File}[] = [];

        // Создаем массив промисов для всех файлов
        const filePromises: any[] = [];

        zipContent.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) { // Если это не директория
                const filePromise = zipEntry.async('blob').then(fileData => {
                    const pathSegments = relativePath.split('/');
                    arrayFiles.push({path: path + relativePath, file: new File([fileData], pathSegments[pathSegments.length - 1])});
                }).catch(error => {
                    console.error(`Ошибка при извлечении файла ${relativePath}:`, error);
                });

                filePromises.push(filePromise);
            }
        });

        // Дожидаемся завершения всех промисов
        await Promise.all(filePromises);

        return arrayFiles;
    } catch (error) {
        console.error('Ошибка при разархивации:', error);
        return [];
    }
}


export default function FormDownload({ setImages }: Props) {
    const { theme } = usePrismaneTheme();

    const handleFolderChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files;
            if (files) {
                const allowedExtensions = ['.tif', '.jfif', '.jpeg', '.tiff', '.jpg', '.png', '.pjpeg', '.zip'];
                const filteredFilesArray = Array.from(files).filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    return allowedExtensions.includes(fileExtension);
                });

                const allFiles: { path: string, file: File }[] = [];

                for (const file of filteredFilesArray) {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

                    if (fileExtension === '.zip') {
                        // Если это zip-файл, разархивируем его и добавляем файлы с правильной иерархией
                        const extractedFiles = await unzipFile(file, file.webkitRelativePath ? file.webkitRelativePath + "/" : "");
                        allFiles.push(...extractedFiles);
                    } else {
                        // Если это обычный файл, добавляем его с указанием полного пути
                        allFiles.push({ path: file.webkitRelativePath || file.name, file });
                    }
                }

                // Построение дерева файлов с сохранением иерархии
                const fileTree = buildFileTreeArray(allFiles);
                setImages(fileTree);
            }
        } catch (e) {
            console.error(e);
        }
    };


    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files || null;
            if (files) {
                const fileArray = Array.from(files);
                const zipFiles: File[] = [];
                const zipTree: foldersType[] = [];


                const nonArchiveFiles = fileArray.filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    if (fileExtension === '.zip') {
                        zipFiles.push(file);
                        return false;
                    }
                    return true;
                });

                for (let i = 0; i < zipFiles.length; i++) {
                    const buffer = await unzipFile(zipFiles[i], zipFiles[i].name + "/");
                    console.log(buffer.length);
                    buildFileTreeArray(await unzipFile(zipFiles[i], zipFiles[i].name + "/")).map((elem => {
                        console.log(elem);
                        zipTree.push(elem);
                    }))
                }

                setImages([{ folderPath: '', files: nonArchiveFiles, children: [] }, ...zipTree]);
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
                    accept=".tif, .jfif, .jpeg, .tiff, .jpg, .png, .pjpeg, .zip"
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
                                typewriter.typeString('Загрузите изображения или архивы (zip)').start();
                            }}
                        />
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

// .zip, .rar, .7z