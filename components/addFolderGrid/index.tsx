import {AspectRatio, Icon, PRISMANE_COLORS, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {Folder} from "@phosphor-icons/react";
import {ChangeEvent} from "react";
import {foldersType} from "@/pagesClient/download";
import buildFileTreeArray from "@/utils/buildFileTree/array";
import {unzipFile} from "@/components/FormDownload";

interface Props {
    addFolder: (newFolder: foldersType) => void;
    statusDelete: boolean;
}

export default function AddFolderGrid({addFolder, statusDelete}: Props) {
    const { theme } = usePrismaneTheme();

    const handleFolderChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files;
            if (files) {
                const allowedExtensions = ['.tif', '.jfif', '.jpeg', '.tiff', '.jpg', '.png', '.pjpeg', '.zip'];
                const filteredFilesArray = Array.from(files).filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    return allowedExtensions.includes(fileExtension);
                });

                const allFiles: { path: string, file: File }[] = [];

                for (const file of filteredFilesArray) {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

                    if (fileExtension === '.zip') {
                        const extractedFiles = await unzipFile(file, file.webkitRelativePath ? file.webkitRelativePath + "/" : "");
                        allFiles.push(...extractedFiles);
                    } else {
                        allFiles.push({ path: file.webkitRelativePath || file.name, file });
                    }
                }

                const fileTree = buildFileTreeArray(allFiles);
                addFolder(fileTree[0]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const red = {...PRISMANE_COLORS.ruby};

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddFolderGrid} style={{backgroundColor: statusDelete ? theme.colors.primary['700'] : red['700']}}>
                <input name={'file'} type="file"
                        // @ts-ignore
                       webkitdirectory="true"
                       disabled={!statusDelete}
                       onChange={handleFolderChange}/>
                <div>
                    <div>
                        <Icon size={'lg'}>
                            <Folder/>
                        </Icon>
                    </div>
                </div>
                <Text w={'100%'} fs={'sm'}>Добавить папку</Text>
            </div>
        </AspectRatio>
    )
}