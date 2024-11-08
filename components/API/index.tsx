'use client';
import { Box, usePrismaneTheme, Text, Flex } from '@prismane/core';

export default function ApiBlock() {
    const { theme } = usePrismaneTheme();

    return (
        <Flex w={'100%'} mih={'70vh'} p={'16px'} bg={theme.colors.base['800']} br={'base'} direction={'column'} gap={'3rem'}>
            <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
                <Text as={'h3'}>1. Генерация id ключа | JS/TS</Text>
                <Text as={'h3'}>Пока тут пусто</Text>
                <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                </Box>
                <Flex direction={'row'} gap={'1.5rem'}>
                    <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
                        <Text as={'h4'}>Данные ответа</Text>
                        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
                <Text as={'h3'}>2. Отправка изображений на обработку | JS/TS</Text>
                <Text as={'h3'}>Пока тут пусто</Text>
                <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                </Box>
                <Flex direction={'row'} gap={'1.5rem'}>
                    <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
                        <Text as={'h4'}>Данные</Text>
                        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
                <Text as={'h3'}>3. Получение данных с обработки | JS/TS</Text>
                <Text as={'h3'}>Пока тут пусто</Text>
                <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                </Box>
                <Flex direction={'row'} gap={'1.5rem'}>
                    <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
                        <Text as={'h4'}>Ответ в случае успеха</Text>
                        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={'100%'} direction={'column'} gap={'0.5rem'}>
                <Text as={'h3'}>4. Получение всех fileId | JS/TS</Text>
                <Text as={'h3'}>Пока тут пусто</Text>
                <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                </Box>
                <Flex direction={'row'} gap={'1.5rem'}>
                    <Flex w={'100%'} direction={'column'} gap={'0.25rem'}>
                        <Text as={'h4'}>Ответ в случае успеха</Text>
                        <Box w={'100%'} p={'8px'} bg={theme.colors.base['700']} br={'base'}>

                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

/*
<code style={{ whiteSpace: 'pre-line' }}>
                        {"const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/videoId', {\n" +
                            "ㅤmethod: 'GET',\n" +
                            '});\n' +
                            '\n' +
                            'const { videoId } = await response.json();'}
                    </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤvideoId: string\n}'}</code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>
                        {'const formData = new FormData();\n\n' +
                            "          formData.append('video', file); // видео\n" +
                            "          formData.append('clipsCount', String(quantity)); // кол-во клипов\n" +
                            "          formData.append('title', file.name); // название файла\n" +
                            "          formData.append('id', fileId); // id файла\n\n" +
                            "          const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/postVideo', {\n" +
                            "          ㅤmethod: 'POST',\n" +
                            '          ㅤbody: formData,\n' +
                            '      });\n'}
                    </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>
                                {'{\nㅤvideo: File,\n' + 'ㅤclipsCount: number | null,\n' + 'ㅤtitle: string,\n' + 'ㅤid: string,\n}'}
                            </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>
                        {"const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/getVideo?videoId=' + fileId, {\n" +
                            "      ㅤmethod: 'GET',\n" +
                            '    });' +
                            '\n\nconst data = await response.json();'}
                    </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>
                                {"{\nㅤstatus: 'Ready' | 'DownloadingToBackend' | 'ProcessingInMl',\n" +
                                    'ㅤlink: string,\n' +
                                    'ㅤtitle: string,\n' +
                                    'ㅤhighlights: {\n' +
                                    'ㅤㅤfile: string,\n' +
                                    'ㅤㅤvirality: number,\n' +
                                    'ㅤㅤstart: number,\n' +
                                    'ㅤㅤend: number,\n' +
                                    'ㅤㅤtranscriptions: {\n' +
                                    'ㅤㅤㅤstart: number,\n' +
                                    'ㅤㅤㅤend: number,\n' +
                                    'ㅤㅤㅤtext: string,\n' +
                                    'ㅤㅤ}[],\nㅤ}[]' +
                                    'ㅤ\n}'}
                            </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>
                        {"const response = await fetch('https://graciously-direct-hoopoe.cloudpub.ru/api/listVideos', {\n" +
                            "      ㅤmethod: 'GET',\n" +
                            '    });' +
                            '\n\nconst { videos } = await response.json();'}
                    </code>
 */

/*
<code style={{ whiteSpace: 'pre-line' }}>{'{\nㅤvideos: string[]\n}'}</code>
 */