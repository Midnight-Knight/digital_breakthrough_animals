import {AspectRatio, Icon, PRISMANE_COLORS, Text, usePrismaneTheme, Modal, Link} from "@prismane/core";
import Image, {StaticImageData} from "next/image";
import Style from "./style.module.scss";
import {Info, Download} from "@phosphor-icons/react";
import {useState} from "react";
import {detectionsType} from "@/components/Editor";

interface Props {
    status: 'falseDetected' | 'trueDetected' | 'nullDetected';
    title: string;
    image: StaticImageData;
    detections: detectionsType[];
}

interface NormalizedCoords {
    xc: number;
    yc: number;
    w: number;
    h: number;
    class: number
}

interface CssCoords {
    top: string;
    left: string;
    width: string;
    height: string;
    class: number
}

function convertToCssCoords(normalizedCoords: NormalizedCoords): CssCoords {
    const { xc, yc, w, h } = normalizedCoords;

    const top = (yc - h / 2) * 100;
    const left = (xc - w / 2) * 100;

    const width = w * 100;
    const height = h * 100;


    return {
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        class: normalizedCoords.class,
    };
}

export default function ArchiveImageGrid({ title, image, status, detections }: Props)
{
    const { theme } = usePrismaneTheme();
    const [open, setOpen] = useState(false);
    const dataCords = detections.map((elem) => convertToCssCoords(elem))

    const red = {...PRISMANE_COLORS.ruby};
    const green = {...PRISMANE_COLORS.emerald};
    const yellow = {...PRISMANE_COLORS.yellow};

    return (
        <>
            <Modal w={'90%'} h={'90%'} gap={'1rem'} open={open} onClose={() => setOpen(false)} closable>
                <Modal.Header>
                    <Text
                        fw="bold"
                        fs="2xl"
                    >
                        {title}
                    </Text>
                </Modal.Header>
                <div className={Style.Status}>
                    {status === 'falseDetected' && (
                        <div>
                            <div style={{backgroundColor: red['700']}}/>
                            <Text>Непригодное изображение</Text>
                        </div>
                    )}
                    {dataCords.some((elem: CssCoords) => elem.class === 1) && (
                        <div>
                            <div style={{backgroundColor: green['700']}}/>
                            <Text>Пригодные изображения животных</Text>
                        </div>
                    )}
                    {dataCords.some((elem: CssCoords) => elem.class === 0) && (
                        <div>
                            <div style={{backgroundColor: yellow['700']}}/>
                            <Text>Вспомогательные изображения животных</Text>
                        </div>
                    )}
                </div>
                <div className={Style.Modal}>
                    <div>
                        {dataCords.map((detection, index) => (
                            <div key={index} style={{zIndex: 1, left: detection.left, top: detection.top, width: detection.width, height: detection.height, outlineColor: detection.class ? green['700'] : yellow['700']}}/>
                        ))}
                    </div>
                    <Image style={{width: '100%', height: '100%'}} src={image} alt={title}/>
                </div>
            </Modal>
            <AspectRatio w={'100%'} ratio="16/9">
                <div className={Style.ImageGrid} style={{outlineColor: status === 'falseDetected' ? red['700'] : status === 'trueDetected' ? green['700'] : status === 'nullDetected' ? yellow['700'] : theme.colors.base['700']}}>
                    <div>
                        <div>
                            <Link href={image.src} download>
                                <Icon size={'sm'}>
                                    <Download/>
                                </Icon>
                            </Link>
                            <button onClick={() => setOpen(true)}>
                                <Icon size={'sm'}>
                                    <Info/>
                                </Icon>
                            </button>
                        </div>
                        <Text w={'100%'} fs={'sm'}>{title}</Text>
                    </div>
                    <Image style={{width: '100%', height: '100%'}} src={image} alt={title}/>
                </div>
            </AspectRatio>
        </>
    )
}