'use client';
import {
    Card,
    Flex,
    Grid,
    PRISMANE_COLORS,
    Text,
    Circle,
    usePrismaneTheme,
    Button,
    Link,
    Progress
} from "@prismane/core";
import Typewriter from "typewriter-effect";
import {useEffect, useState} from "react";
import list_packages from "@/api/list_packages";

export interface packageType {
    id: string;
    time: number;
    mappedPictures: number;
    goodDetections: number;
    badDetections: number;
}

export default function ArchivePage() {
    const { theme } = usePrismaneTheme();
    const [packages, setPackages] = useState<packageType[]>([]);

    useEffect(() => {
        async function response()
        {
            const data = await list_packages();
            console.log(data);
            setPackages(data);
        }

        response();
    }, [])

    const style = {
        w: '100%',
        gap: '3rem',
        pt: '6rem',
        p: '3rem',
    };

    const red = {...PRISMANE_COLORS.ruby};
    const green = {...PRISMANE_COLORS.emerald};
    const yellow = {...PRISMANE_COLORS.yellow};

    return (
        <Flex {...style} direction="column" justify={'start'} align={'start'}>
            <Text cl={() => ['primary', 500]} fs={'3xl'} ta={'left'} w={'75%'} fw={'bold'}>
                <Typewriter
                    options={{
                        delay: 75,
                        loop: false,
                    }}
                    onInit={(typewriter) => {
                        typewriter.typeString('Архив обработанных изображений').start();
                    }}
                />
            </Text>
            <Grid templateColumns={3} w={"100%"} gap="0.5rem">
                {packages.map((elem, index) => (
                    <Grid.Item key={"session_" + index}>
                        <Card w="100%" p={"1rem"} gap={'1rem'}>
                            <Text fw="bold" fs="lg" cl="white">
                                Сеcсия от: {new Date(elem.time).toLocaleString()}
                            </Text>
                            <Text fw="normal" fs="base" cl="white">
                                Кол-во обработанных изображений: {elem.mappedPictures}
                            </Text>
                            <Progress value={0}
                                // @ts-ignore
                                label={"100%"} />
                            <Flex direction={'row'} justify={'start'} align={'center'} gap="0.5rem">
                                <Circle size={24} bg={elem.goodDetections !== 0 ? green['700'] : theme.colors.base['600']} />
                                <Text fw="normal" fs="base" cl="white">
                                    Кол-во пригодных изображений животных: {elem.goodDetections}
                                </Text>
                            </Flex>
                            <Flex direction={'row'} justify={'start'} align={'center'} gap="0.5rem">
                                <Circle size={24}  bg={elem.badDetections !== 0 ? yellow['700'] : theme.colors.base['600']} />
                                <Text fw="normal" fs="base" cl="white">
                                    Кол-во вспомогательных изображений животных: {elem.badDetections}
                                </Text>
                            </Flex>
                            <Card.Footer justify="between">
                                <Link href={'/archive/'+elem.id} underline="none">
                                    <Button variant="primary">Подробнеe</Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Grid.Item>
                ))}
            </Grid>
        </Flex>
    )
}