'use client';
import { Flex, SegmentedField } from '@prismane/core';
import {useEffect, useState} from 'react';
import ApiBlock from '@/components/API';
import FormDownload from '@/components/FormDownload';
import Editor from '@/components/Editor';

export default function DownloadPage() {
    const [value, setValue] = useState('form');
    const [images, setImages] = useState<File[] | null>(null);

    const style = {
        w: '100%',
        gap: '3rem',
        pt: '6rem',
        p: '3rem',
    };

    return (
        <Flex {...style} direction="column" justify={'start'} align={'start'}>
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
            {value === 'form' && (images ? <Editor images={images} /> : <FormDownload setImages={setImages} />)}
        </Flex>
    );
}

// <Box w={'100%'} mih={'70vh'} bg={theme.colors.base['800']} br={'base'}></Box>