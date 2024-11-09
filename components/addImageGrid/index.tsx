import {AspectRatio, Icon, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {FileArrowDown} from "@phosphor-icons/react";
import {ChangeEvent} from "react";
import {foldersType} from "@/pagesClient/download";

interface Props {
    addImages: (newImages: foldersType) => void;
}

export default function AddImageGrid({addImages}: Props) {
    const { theme } = usePrismaneTheme();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files || null;
            if (files) {
                const fileArray = Array.from(files);
                addImages({folderPath: '', children: [], files: fileArray});
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddImageGrid} style={{backgroundColor: theme.colors.primary['700']}}>
                <input name={'file'} type="file"
                       accept=".tif, .jfif, .jpeg, .tiff, .jpg, .webp, .png,  .pjpeg, .zip, .rar, .7z"
                       multiple={true}
                       onChange={handleFileChange}/>
                <div>
                    <div>
                        <Icon size={'lg'}>
                            <FileArrowDown/>
                        </Icon>
                    </div>
                </div>
                <Text w={'100%'} fs={'sm'}>Добавить изображения/архивы</Text>
            </div>
        </AspectRatio>
    )
}