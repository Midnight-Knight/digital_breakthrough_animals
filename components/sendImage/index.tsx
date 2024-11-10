import {AspectRatio, Icon, PRISMANE_COLORS, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {UploadSimple} from "@phosphor-icons/react";
import sessions from "@/api/sessions";

interface Props {
    setId: (id: string) => void;
    statusDelete: boolean;
}

export default function SendImage({setId, statusDelete}: Props) {
    const { theme } = usePrismaneTheme();

    async function send() {
        setId(await sessions());
    }

    const red = {...PRISMANE_COLORS.ruby};

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddFolderGrid} style={{backgroundColor: statusDelete ? theme.colors.primary['700'] : red['700']}}>
                <button disabled={!statusDelete} onClick={() => send()}></button>
                <div>
                    <div>
                        <Icon size={'lg'}>
                            <UploadSimple/>
                        </Icon>
                    </div>
                </div>
                <Text w={'100%'} fs={'sm'}>Обработать</Text>
            </div>
        </AspectRatio>
    )
}