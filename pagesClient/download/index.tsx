'use client';
import { Flex, Text } from '@prismane/core';
import { useEffect, useState} from 'react';
import FormDownload from '@/components/FormDownload';
import Editor from '@/components/Editor';
import Typewriter from "typewriter-effect";

export interface foldersType {
    folderPath: string,
    files: File[],
    children: foldersType[],
}

export default function DownloadPage() {
    const [value, setValue] = useState('form');
    const [images, setImages] = useState<foldersType[] | null>(null);

    const style = {
        w: '100%',
        gap: '3rem',
        pt: '6rem',
        p: '3rem',
    };

    function addFolder(newFolder: foldersType) {
        if(images) {
            const index = images.findIndex(image => image.folderPath === newFolder.folderPath);

            if (index !== -1) {
                const rootFolder = images[index];

                rootFolder.files = newFolder.files;

                const updatedImages = [...images];
                updatedImages[index] = rootFolder;

                setImages(updatedImages);
            } else {
                setImages([...images, newFolder]);
            }
        }
    };

    function addFiles(newImages: foldersType[]) {
        if (images) {
            const index = images.findIndex(image => image.folderPath === "");

            if (index !== -1) {
                const rootFolder = images[index];

                rootFolder.files.push(...newImages[index].files);

                const arrayNew = [];
                if (newImages.length > 1) {
                    for (let i = 0; i < newImages.length; i++) {
                        if (i !== index)
                        {
                            arrayNew.push(newImages[i]);
                        }
                    }
                }

                const updatedImages = [...images, ...arrayNew];
                updatedImages[index] = rootFolder;

                setImages(updatedImages);
            } else {
                setImages([...images, ...newImages]);
            }
        }
    }

    function deleteFileInNode(
        folderTree: foldersType[],
        targetFolderPath: string,
        fileName: string
    ): foldersType[] {
        return folderTree
            .map(folder => {
                if (folder.folderPath === targetFolderPath) {
                    const updatedFiles = folder.files.filter(file => file.name !== fileName);

                    if (updatedFiles.length === 0 && folder.children.length === 0) {
                        return null;
                    }

                    return {
                        ...folder,
                        files: updatedFiles,
                    };
                }

                const updatedChildren = deleteFileInNode(folder.children, targetFolderPath, fileName);

                if (updatedChildren.every(child => child === null) && folder.files.length === 0) {
                    return null;
                }

                return {
                    ...folder,
                    children: updatedChildren.filter(child => child !== null),
                };
            })
            .filter(folder => folder !== null);
    }

    function handleDeleteFile(targetFolderPath: string, fileName: string) {
        if (images) {
            const updatedImages = deleteFileInNode(images, targetFolderPath, fileName);
            setImages(updatedImages);
        }
    }


    useEffect(() => {
        if (images && images.length === 0)
        {
            setImages(null);
        }
        console.log(images);
    }, [images]);

    return (
        <Flex {...style} direction="column" justify={'start'} align={'start'}>
            <Text cl={() => ['primary', 500]} fs={'3xl'} ta={'left'} w={'75%'} fw={'bold'}>
                <Typewriter
                    options={{
                        delay: 75,
                        loop: false,
                    }}
                    onInit={(typewriter) => {
                        typewriter.typeString('Обработка изображений').start();
                    }}
                />
            </Text>
            {value === 'form' && (images ? <Editor addFolder={addFolder} addImages={addFiles} deleteFile={handleDeleteFile} images={images} /> : <FormDownload setImages={setImages} />)}
        </Flex>
    );
}

/*
<SegmentedField
                size={'md'}
                placeholder="Выбор вариант обработки изображений"
                label="Выбор вариант обработки изображений:"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                options={[
                    { element: 'Форма', value: 'form' },
                    { element: 'API', value: 'api' },
                ]}
            />
{value === 'api' && <ApiBlock />}
 */


