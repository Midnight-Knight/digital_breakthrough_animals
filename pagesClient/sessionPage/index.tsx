'use client';
import { useEffect, useState } from "react";
import list_packages from "@/api/list_packages";
import get_package from "@/api/get_package";
import { packageType } from "@/pagesClient/archive";
import {
    Button,
    Card,
    Circle,
    Flex,
    Grid,
    Link,
    PRISMANE_COLORS,
    Progress,
    Text,
    usePrismaneTheme
} from "@prismane/core";
import ArchiveImageGrid from "@/components/archiveImageGrid";

interface Props {
    id: string;
}

interface ImageData {
    id: string;
    title: string;
    path: string;
    url: string;
    width: number;
    height: number;
    mlResult: {
        isDetected: boolean;
        detections: {
            xc: number;
            yc: number;
            w: number;
            h: number;
            class: number;
        }[]
    }
}

interface foldersType {
    folderPath: string;
    files: ImageData[];
    children: foldersType[];
}

function buildFolderStructure(images: ImageData[]): foldersType[] {
    const folderMap: { [path: string]: foldersType } = {};

    images.forEach(image => {
        const pathParts = image.path.split('/');
        let currentPath = '';
        let currentFolder: foldersType | undefined;

        pathParts.forEach((part, index) => {
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            if (!folderMap[currentPath]) {
                folderMap[currentPath] = { folderPath: currentPath, files: [], children: [] };

                if (index > 0) {
                    const parentPath = pathParts.slice(0, index).join('/');
                    folderMap[parentPath].children.push(folderMap[currentPath]);
                }
            }

            currentFolder = folderMap[currentPath];
        });

        currentFolder?.files.push(image);
    });

    return Object.values(folderMap).filter(folder => !folder.folderPath.includes('/'));
}

export default function SessionPage({ id }: Props) {
    const { theme } = usePrismaneTheme();
    const [dataSession, setDataSession] = useState<packageType | null>(null);
    const [goodImages, setGoodImages] = useState<foldersType[]>([]);
    const [badImages, setBadImages] = useState<foldersType[]>([]);
    const [undetectedImages, setUndetectedImages] = useState<foldersType[]>([]);

    useEffect(() => {
        async function response() {
            const session: packageType[] = await list_packages();
            session.forEach((elem: packageType) => {
                if (elem.id === id) {
                    setDataSession(elem);
                }
            });

            const data = await get_package(id);
            setGoodImages(buildFolderStructure(data.goodImages));
            setUndetectedImages(buildFolderStructure(data.undetectedImages));
            setBadImages(buildFolderStructure(data.badImages));
        }

        response();
    }, []);

    useEffect(() => {
        console.log(goodImages);
    }, [goodImages]);

    useEffect(() => {
        console.log(badImages);
    }, [badImages]);

    useEffect(() => {
        console.log(undetectedImages);
    }, [undetectedImages]);

    const style = {
        w: '100%',
        gap: '3rem',
        pt: '6rem',
        p: '3rem',
    };

    const red = { ...PRISMANE_COLORS.ruby };
    const green = { ...PRISMANE_COLORS.emerald };
    const yellow = { ...PRISMANE_COLORS.yellow };

    function renderFolder(folder: foldersType, status: 'falseDetected' | 'trueDetected' | 'nullDetected') {
        return folder.folderPath !== '' ? (
            <Flex direction={'row'} w={'100%'} gap={'0.5rem'} key={folder.folderPath}>
                <Flex w={'0.5rem'} bg={theme.colors.base['700']} br="base"/>
                <Flex direction="column" w="100%" gap="1rem">
                    <Text as="h3">{folder.folderPath.split('/').pop()}</Text>
                    <Grid templateColumns={4} w="100%" gap="0.5rem">
                        {folder.files.map((file: ImageData, index: number) =>
                            (
                                <Grid.Item key={"file_" + index} w="100%">
                                    <ArchiveImageGrid
                                        detections={file.mlResult.isDetected ? file.mlResult.detections : []}
                                        status={status}
                                        image={{ src: file.url, width: file.width, height: file.height }}
                                        title={file.title}
                                    />
                                </Grid.Item>
                            )
                        )}
                    </Grid>
                    {folder.children.map((child: any) => (<>{renderFolder(child, status)}</>))}
                </Flex>
            </Flex>
        ) : <></>;
    }

    function renderFiles(folder: foldersType, status: 'falseDetected' | 'trueDetected' | 'nullDetected') {
        return folder.folderPath === '' ? (
            <Flex direction={'row'} w={'100%'} gap={'0.5rem'} key={folder.folderPath}>
                <Flex direction="column" w="100%" gap="1rem">
                    <Grid templateColumns={4} w="100%" gap="0.5rem">
                        {folder.files.map((file: ImageData, index: number) =>
                            (
                                <Grid.Item key={"file_" + index} w="100%">
                                    <ArchiveImageGrid
                                        detections={file.mlResult.isDetected ? file.mlResult.detections : []}
                                        status={status}
                                        image={{ src: file.url, width: file.width, height: file.height }}
                                        title={file.title}
                                    />
                                </Grid.Item>
                            )
                        )}
                    </Grid>
                    {folder.children.map((child: any) => (<>{renderFolder(child, status)}</>))}
                </Flex>
            </Flex>
        ) : <></>;
    }

    return (
        <Flex {...style} direction="column" justify={'start'} align={'start'}>
            {dataSession && (
                <Card p={'2rem'} px={'3rem'} gap={'1rem'}>
                    <Text fw="bold" fs="3xl" cl="white">
                        Сессия от: {new Date(dataSession.time).toLocaleString()}
                    </Text>
                    <Text>Кол-во обработанных изображений: {dataSession.mappedPictures}</Text>
                    <Progress value={0}
                        // @ts-ignore
                              label={"100%"} />
                    <Flex direction={'row'} justify={'start'} align={'center'} gap="0.5rem">
                        <Circle size={24} bg={dataSession.goodDetections !== 0 ? green['700'] : theme.colors.base['600']} />
                        <Text fw="normal" fs="base" cl="white">
                            Кол-во пригодных изображений животных: {dataSession.goodDetections}
                        </Text>
                    </Flex>
                    <Flex direction={'row'} justify={'start'} align={'center'} gap="0.5rem">
                        <Circle size={24} bg={dataSession.badDetections !== 0 ? yellow['700'] : theme.colors.base['600']} />
                        <Text fw="normal" fs="base" cl="white">
                            Кол-во вспомогательных изображений животных: {dataSession.badDetections}
                        </Text>
                    </Flex>
                    <Card.Footer justify="between">
                        <Link href={`https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_report?packageId=${dataSession.id}`} download underline="none">
                            <Button variant="primary">Скачать CSV отчёт</Button>
                        </Link>
                    </Card.Footer>
                </Card>
            )}
            {goodImages.length > 0 && (
                <Card w={'100%'} p={'2rem'} px={'3rem'} gap={'1rem'}>
                    <Text fw="bold" fs="3xl" cl="white">
                        Пригодные изображения
                    </Text>
                    <Progress value={0}
                        // @ts-ignore
                              label={"100%"} />
                    {goodImages.map((elem) => (<>{elem.folderPath === '' && (<Text as="h2">{'Изображения'}</Text>)}{renderFiles(elem, 'trueDetected')}</>))}
                    {(goodImages.length !== 1 || goodImages[0].folderPath !== '') && <Text as="h2">Папки/Архивы</Text>}
                    {goodImages.map((elem) => (<>{renderFolder(elem, 'trueDetected')}</>))}
                </Card>
            )}
            {badImages.length > 0 && (
                <Card w={'100%'} p={'2rem'} px={'3rem'} gap={'1rem'}>
                    <Text fw="bold" fs="3xl" cl="white">
                        Вспомогательные изображения
                    </Text>
                    <Progress value={0}
                        // @ts-ignore
                              label={"100%"} />
                    {badImages.map((elem) => (<>{elem.folderPath === '' && (<Text as="h2">{'Изображения'}</Text>)}{renderFiles(elem, 'nullDetected')}</>))}
                    {(badImages.length !== 1 || badImages[0].folderPath !== '') && <Text as="h2">Папки/Архивы</Text>}
                    {badImages.map((elem) => (<>{renderFolder(elem, 'nullDetected')}</>))}
                </Card>
            )}
            {undetectedImages.length > 0 && (
                <Card w={'100%'} p={'2rem'} px={'3rem'} gap={'1rem'}>
                    <Text fw="bold" fs="3xl" cl="white">
                        Непригодные изображения
                    </Text>
                    <Progress value={0}
                              // @ts-ignore
                              label={"100%"} />
                    {undetectedImages.map((elem) => (<>{elem.folderPath === '' && (<Text as="h2">{'Изображения'}</Text>)}{renderFiles(elem, 'falseDetected')}</>))}
                    {(undetectedImages.length !== 1 || undetectedImages[0].folderPath !== '') && <Text as="h2">Папки/Архивы</Text>}
                    {undetectedImages.map((elem) => (<>{renderFolder(elem, 'falseDetected')}</>))}
                </Card>
            )}
        </Flex>
    );
}
