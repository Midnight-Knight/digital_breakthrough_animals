'use client';
import { Button, Flex, Link, Text, usePrismaneTheme } from '@prismane/core';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
    children: ReactNode;
}

export default function Template({ children }: Props): ReactNode {
    const pathname = usePathname();
    const { theme } = usePrismaneTheme();

    const styleBody = {
        w: '100%',
        mih: '100vh',
        bg: theme.colors.base['900'],
        pl: 260,
    };

    const styleAside = {
        w: 250,
        h: '100vh',
        p: '1rem',
        pt: '1.5rem',
        bg: theme.colors.primary['900'],
        gap: '1.5rem',
        t: 0,
        l: 0,
    };

    const styleMain = {
        w: '100%',
        p: '1rem',
    };

    const styleButton = {
        w: '100%',
    };

    return (
        <Flex direction={'row'} {...styleBody}>
            <Flex pos={'fixed'} direction={'column'} justify={'between'} {...styleAside}>
                <Flex gap="1.5rem" direction={'column'}>
                    <Text as={'h1'} cl={theme.colors.base['50']}>
                        RealityFirst
                    </Text>
                    <Flex gap="0.5rem" direction={'column'}>
                        <Link href={'/'} underline="none">
                            <Button
                                size="md"
                                {...styleButton}
                                variant={pathname === '/' ? 'primary' : 'tertiary'}
                                cl={pathname === '/' ? theme.colors.base['50'] : theme.colors.primary['200']}>
                                Главная
                            </Button>
                        </Link>
                        <Link href={'/download'} underline="none">
                            <Button
                                size="md"
                                {...styleButton}
                                variant={pathname === '/download' ? 'primary' : 'tertiary'}
                                cl={pathname === '/download' ? theme.colors.base['50'] : theme.colors.primary['200']}>
                                Обработка
                            </Button>
                        </Link>
                        <Link href={'/clips'} underline="none">
                            <Button
                                size="md"
                                {...styleButton}
                                variant={pathname === '/clips' ? 'primary' : 'tertiary'}
                                cl={pathname === '/clips' ? theme.colors.base['50'] : theme.colors.primary['200']}>
                                Архив
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
                <Flex></Flex>
            </Flex>
            <Flex {...styleMain}>{children}</Flex>
        </Flex>
    );
}