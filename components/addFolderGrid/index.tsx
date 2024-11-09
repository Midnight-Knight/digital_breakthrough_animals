import {AspectRatio, Icon, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {Folder} from "@phosphor-icons/react";
import {ChangeEvent} from "react";
import {foldersType} from "@/pagesClient/download";
import {buildFileTree} from "@/components/FormDownload";

interface Props {
    addFolder: (newFolder: foldersType) => void;
}

export default function AddFolderGrid({addFolder}: Props) {
    const { theme } = usePrismaneTheme();

    const handleFolderChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files;
            if (files) {
                const allowedExtensions = ['.tif', '.jfif', '.jpeg', '.tiff', '.jpg', '.webp', '.png', '.pjpeg'];

                // Convert FileList to an array and filter based on allowed extensions
                const filteredFilesArray = Array.from(files).filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    return allowedExtensions.includes(fileExtension);
                });

                // Create a DataTransfer object to convert the array back to a FileList
                const dataTransfer = new DataTransfer();
                filteredFilesArray.forEach(file => dataTransfer.items.add(file));

                // Get the FileList from the DataTransfer object
                const filteredFiles = dataTransfer.files;

                const fileTree = buildFileTree(filteredFiles);
                addFolder(fileTree[0]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddFolderGrid} style={{backgroundColor: theme.colors.primary['700']}}>
                <input name={'file'} type="file"
                        // @ts-ignore
                       webkitdirectory="true"
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