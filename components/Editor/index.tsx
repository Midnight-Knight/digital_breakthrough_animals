import { AspectRatio, Flex, Grid, usePrismaneTheme, Text } from '@prismane/core';
import { useEffect, useState } from "react";
import getImageDimensions from "@/utils/getImageDimensions";
import ImageGrid from "@/components/imageGrid";
import AddImageGrid from "@/components/addImageGrid";

interface Props {
    images: File[],
    deleteFile: (id: number) => void;
    addImages: (newImages: File[]) => void;
}

export default function Editor({ images, deleteFile, addImages }: Props) {
    const { theme } = usePrismaneTheme();
    const [statusDelete] = useState(true);
    const [imagesTable, setImagesTable] = useState<({status: 'loading'} | {status: 'ok', width: number, height: number, src: string})[]>([]);

    async function downloadImage() {
        const array: ({status: 'loading'} | {status: 'ok', width: number, height: number, src: string})[] = [];
        for (let i = 0; i < images.length; i++) {
            const buffer = await getImageDimensions(images[i]);
            array.push({ status: 'ok', width: buffer.width, height: buffer.height, src: buffer.src });
        }
        setImagesTable(array);
    }

    useEffect(() => {
        if (images.length > 0) {
            downloadImage();
        } else {
            setImagesTable([]); // очищаем imagesTable, если images пустой
        }
    }, [images]);

    return (
        <Flex
            w={'100%'}
            mih={'70vh'}
            p={'16px'}
            bg={theme.colors.base['800']}
            br={'base'}
            direction={'column'}
            gap={'3rem'}
            justify={'start'}
            align={'start'}>
            <Flex w={'100%'} h={'100%'} direction={'row'} justify={'start'} align={'start'} gap={'2rem'}>
                <Flex w={'75%'}>
                    <Grid templateColumns={4} w="100%" gap={'0.5rem'}>
                        {imagesTable.map((elem, index) => elem.status === 'loading' ? (
                            <Grid.Item key={"grid_item_" + index} w={'100%'}>
                                <AspectRatio w={'100%'} ratio="16/9">
                                    {/* Загрузка */}
                                </AspectRatio>
                            </Grid.Item>
                        ) : (
                            <Grid.Item key={"grid_item_" + index} w={'100%'}>
                                {images[index] && (
                                    <ImageGrid
                                        deleteFile={deleteFile}
                                        id={index}
                                        image={{ src: elem.src, width: elem.width, height: elem.height }}
                                        title={images[index].name}
                                        statusDelete={statusDelete}
                                    />
                                )}
                            </Grid.Item>
                        ))}
                        <AddImageGrid addImages={addImages} />
                    </Grid>
                </Flex>
                <Flex w={'25%'} direction={'column'} justify={'start'} align={'start'} gap={'1rem'} p={'1rem'} bg={theme.colors.base['700']} br={'base'}>
                    <Text as={'h2'}>Панель управления</Text>
                    <Text as={'h4'}>Кол-во изображений: {images.length}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
