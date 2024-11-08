import {AspectRatio, Icon, Text} from "@prismane/core";
import Style from "./style.module.scss";
import {PlusCircle} from "@phosphor-icons/react";
import {ChangeEvent} from "react";

interface Props {
    addImages: (newImages: File[]) => void;
}

export default function AddImageGrid({addImages}: Props) {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = event.target.files || null;
            if (files) {
                const fileArray = Array.from(files);
                addImages([...fileArray]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AspectRatio w={'100%'} ratio="16/9">
            <div className={Style.AddImageGrid}>
                <input name={'file'} type="file"
                       accept="image/*"
                       multiple={true}
                       onChange={handleFileChange}/>
                <div>
                    <div>
                        <Icon size={'lg'}>
                            <PlusCircle/>
                        </Icon>
                    </div>
                </div>
                <Text w={'100%'} fs={'sm'}>Добавить изображения</Text>
            </div>
        </AspectRatio>
    )
}