import {AspectRatio, Center, Flex, Grid, usePrismaneTheme} from '@prismane/core';
import Image from "next/image";
import {useEffect, useState} from "react";
import getImageDimensions from "@/utils/getImageDimensions";

interface Props {
    images: File[]
}

export default function Editor({images}: Props) {
    const { theme } = usePrismaneTheme();
    const [imagesTable, setImagesTable] = useState<({status: 'loading'} | {status: 'ok', width: number, height: number, src: string})[]>(images.map(() => ({ status: 'loading' })));

    useEffect(() => {
        async function downloadImage() {
            const array: ({status: 'loading'} | {status: 'ok', width: number, height: number, src: string})[] = [];
            for (let i = 0; i < images.length; i++) {
                const buffer = await getImageDimensions(images[i]);
                array.push({ status: 'ok', width: buffer.width, height: buffer.height, src: buffer.src });
            }
            setImagesTable(array);
        }

        downloadImage();
    }, []);


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
                            <Grid.Item key={"grid_item_"+index} w={'100%'}>
                                <AspectRatio w={'100%'} ratio="16/9">

                                </AspectRatio>
                            </Grid.Item>
                                ) : (
                             <Grid.Item key={"grid_item_"+index} w={'100%'}>
                                <AspectRatio w={'100%'} ratio="16/9">
                                    <Center w={'100%'} h={'100%'}>
                                        <Image style={{width: '100%', height: '100%'}} src={{src: elem.src, width: elem.width, height: elem.height}} alt={images[index].name}/>
                                    </Center>
                                </AspectRatio>
                            </Grid.Item>
                        ))}
                    </Grid>
                </Flex>
                <Flex w={'25%'} direction={'column'} justify={'start'} align={'start'} gap={'1rem'} pt={'2rem'} bg={theme.colors.base['700']} br={'base'}>

                </Flex>
            </Flex>
        </Flex>
    );
}

/*<Flex direction={'column'} w={'100%'} gap={'0.5rem'} justify={'start'} align={'start'}>
            <Text as={'h4'}>Время клипов в секундах</Text>
            <Radio.Group name="answer" value={timeRadio} onChange={(e: ChangeEvent<HTMLInputElement>) => setTimeRadio(e.target.value)}>
              <Radio value="true" label="Произвольное кол-во" />
              <Radio value="false" label="Заданное кол-во" />
            </Radio.Group>
            <NumberField disabled={timeRadio === 'true'} value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </Flex>*/