import {AspectRatio, Icon, Link, PRISMANE_COLORS, Text, usePrismaneTheme} from "@prismane/core";
import Style from "./style.module.scss";
import {FileCsv} from "@phosphor-icons/react";
import {ChangeEvent} from "react";
import {foldersType} from "@/pagesClient/download";
import sessions from "@/api/sessions";

interface Props {
    id: string;
    statusDelete: boolean;
}

export default function CsvSend({id, statusDelete}: Props) {
    const { theme } = usePrismaneTheme();

    const red = {...PRISMANE_COLORS.ruby};

    return (
        <AspectRatio w={'100%'} ratio="16/5">
            <div className={Style.AddFolderGrid} style={{backgroundColor: !statusDelete ? theme.colors.primary['700'] : red['700']}}>
                {!statusDelete && (<Link href={`https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_report?packageId=${id}`} />)}
                <div>
                    <div>
                        <Icon size={'lg'}>
                            <FileCsv/>
                        </Icon>
                    </div>
                </div>
                <Text w={'100%'} fs={'sm'}>Скачать CSV отчёт</Text>
            </div>
        </AspectRatio>
    )
}