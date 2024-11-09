import { AspectRatio, Flex, Grid, usePrismaneTheme, Text } from '@prismane/core';
import {useEffect, useState} from "react";
import getImageDimensions from "@/utils/getImageDimensions";
import ImageGrid from "@/components/imageGrid";
import AddImageGrid from "@/components/addImageGrid";
import {foldersType} from "@/pagesClient/download";
import AddFolderGrid from "@/components/addFolderGrid";

interface Props {
    images: foldersType[],
    deleteFile: (targetFolderPath: string, fileName: string) => void;
    addImages: (newImages: foldersType) => void;
    addFolder: (newFolder: foldersType) => void;
}

interface imageFile {
    folderPath: string,
    files: ({ status: 'loading', title: string } | { status: 'ok', width: number, height: number, src: string, title: string })[],
    children: imageFile[]
}

export default function Editor({ images, deleteFile, addImages, addFolder }: Props) {
    const { theme } = usePrismaneTheme();
    const [statusDelete] = useState(true);
    const [imagesTable, setImagesTable] = useState<imageFile[]>([]);

    async function downloadImage() {
        async function processFolder(folder: foldersType): Promise<any> {
            // Преобразуем файлы в массив со статусом загрузки и загружаем их по мере обработки
            const files = await Promise.all(
                folder.files.map(async (file) => {
                    const buffer = await getImageDimensions(file);
                    return {
                        status: 'ok',
                        width: buffer.width,
                        height: buffer.height,
                        src: buffer.src,
                        title: file.name
                    };
                })
            );

            // Обрабатываем подкаталоги рекурсивно
            const children = await Promise.all(folder.children.map(child => processFolder(child)));

            return {
                folderPath: folder.folderPath,
                files,
                children,
            };
        }

        const result = await Promise.all(images.map(folder => processFolder(folder)));
        setImagesTable(result);
    }


    useEffect(() => {
        if (images.length > 0) {
            downloadImage();
        } else {
            setImagesTable([]); // очищаем imagesTable, если images пустой
        }
    }, [images]);

    function renderFolder(folder: imageFile) {
        return folder.folderPath !== '' ? (
            <Flex direction={'row'} w={'100%'} gap={'0.5rem'} key={folder.folderPath}>
                <Flex w={'0.5rem'} bg={theme.colors.base['700']} br="base"/>
                <Flex direction="column" w="100%" gap="1rem">
                    <Text as="h3">{folder.folderPath}</Text>
                    <Grid templateColumns={4} w="100%" gap="0.5rem">
                        {folder.files.map((file: any, index: number) =>
                            file.status === 'loading' ? (
                                <Grid.Item key={"loading_" + index} w="100%">
                                    <AspectRatio w="100%" ratio="16/9">
                                        {/* Иконка или индикатор загрузки */}
                                    </AspectRatio>
                                </Grid.Item>
                            ) : (
                                <Grid.Item key={"file_" + index} w="100%">
                                    <ImageGrid
                                        deleteFile={() => deleteFile(folder.folderPath, file.title)}
                                        image={{ src: file.src, width: file.width, height: file.height }}
                                        title={file.title}
                                        statusDelete={statusDelete}
                                    />
                                </Grid.Item>
                            )
                        )}
                    </Grid>
                    {folder.children.map((child: any) => renderFolder(child))}
                </Flex>
            </Flex>
        ) : <></>;
    }

    function renderFile(folder: imageFile) {
        return (
            <Flex direction={'row'} w={'100%'} gap={'0.5rem'} key={'images'}>
                <Flex direction="column" w="100%" gap="1rem">
                    <Grid templateColumns={4} w="100%" gap="0.5rem">
                        {folder.files.map((file: any, index: number) =>
                            file.status === 'loading' ? (
                                <Grid.Item key={"loading_" + index} w="100%">
                                    <AspectRatio w="100%" ratio="16/9">
                                        {/* Иконка или индикатор загрузки */}
                                    </AspectRatio>
                                </Grid.Item>
                            ) : (
                                <Grid.Item key={"file_" + index} w="100%">
                                    <ImageGrid
                                        deleteFile={() => deleteFile(folder.folderPath, file.title)}
                                        image={{ src: file.src, width: file.width, height: file.height }}
                                        title={file.title}
                                        statusDelete={statusDelete}
                                    />
                                </Grid.Item>
                            )
                        )}
                    </Grid>
                </Flex>
            </Flex>
        );
    }

    function getFolderPathOrEmptyArray(imagesTable: imageFile[]): imageFile | null {
        const foundElement = imagesTable.find(image => image.folderPath === "");
        return foundElement ? foundElement : null
    }

    return (
        <Flex
            w="100%"
            mih="70vh"
            p="16px"
            bg={theme.colors.base['800']}
            br="base"
            direction="column"
            gap="3rem"
            justify="start"
            align="start"
        >
            <Flex w="100%" h="100%" direction="row" justify="start" align="start" gap="2rem">
                <Flex w="75%" direction="column" gap="2rem">
                    {getFolderPathOrEmptyArray(imagesTable) ? (<>
                        <Text as="h2">Изображения</Text>
                        {renderFile(getFolderPathOrEmptyArray(imagesTable) || {folderPath: '', files: [], children: []})}
                    </>) : <></>}
                    {(imagesTable.length !== 1 || imagesTable[0].folderPath !== '') && <Text as="h2">Папки/Архивы</Text>}
                    {imagesTable.map(folder => (<>
                        {renderFolder(folder)}
                    </>))}
                </Flex>
                <Flex
                    w="25%"
                    direction="column"
                    justify="start"
                    align="start"
                    gap="1rem"
                    p="1rem"
                    bg={theme.colors.base['700']}
                    br="base"
                >
                    <Text as="h2">Панель управления</Text>
                    <AddImageGrid addImages={addImages}/>
                    <AddFolderGrid addFolder={addFolder}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
