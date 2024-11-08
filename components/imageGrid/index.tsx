import {AspectRatio, Icon, Text} from "@prismane/core";
import Image, {StaticImageData} from "next/image";
import Style from "./style.module.scss";
import {Trash} from "@phosphor-icons/react";

interface Props {
    title: string;
    image: StaticImageData;
    statusDelete: boolean;
    id: number;
    deleteFile: (id: number) => void;
}

export default function ImageGrid({ title, image, statusDelete, id, deleteFile }: Props)
{
    return (
        <AspectRatio w={'100%'} ratio="16/9">
            <div className={Style.ImageGrid}>
                <div>
                    <div>
                        {statusDelete && (
                            <button onClick={() => deleteFile(id)}>
                                <Icon size={'sm'}>
                                    <Trash/>
                                </Icon>
                            </button>
                        )}
                    </div>
                    <Text w={'100%'} fs={'sm'}>{title}</Text>
                </div>
                <Image style={{width: '100%', height: '100%'}} src={image} alt={title}/>
            </div>
        </AspectRatio>
    )
}