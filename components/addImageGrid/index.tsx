import {AspectRatio, Icon, PRISMANE_COLORS, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {FileArrowDown} from "@phosphor-icons/react";
import {ChangeEvent} from "react";
import {foldersType} from "@/pagesClient/download";
import buildFileTreeArray from "@/utils/buildFileTree/array";
import {unzipFile} from "@/components/FormDownload";

interface Props {
    addImages: (newImages: foldersType[]) => void;
    statusDelete: boolean;
}

export default function AddImageGrid({addImages, statusDelete}: Props) {
    const { theme } = usePrismaneTheme();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files || null;
            if (files) {
                console.log(files);
                const fileArray = Array.from(files);
                const zipFiles: File[] = [];
                const zipTree: foldersType[] = [];


                const nonArchiveFiles = fileArray.filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    if (fileExtension === '.zip') {
                        zipFiles.push(file);
                        return false;
                    }
                    return true;
                });

                for (let i = 0; i < zipFiles.length; i++) {
                    buildFileTreeArray(await unzipFile(zipFiles[i], zipFiles[i].name + "/")).map((elem => {
                        zipTree.push(elem);
                    }))
                }

                addImages([{folderPath: '', children: [], files: nonArchiveFiles}, ...zipTree]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const red = {...PRISMANE_COLORS.ruby};

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddImageGrid} style={{backgroundColor: statusDelete ? theme.colors.primary['700'] : red['700']}}>
                <input name={'file'} type="file"
                       accept=".tif, .jfif, .jpeg, .tiff, .jpg, .webp, .png,  .pjpeg, .zip, .rar, .7z"
                       multiple={true}
                       disabled={!statusDelete}
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