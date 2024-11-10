import Provider from '@/provider';
import SessionPage from "@/pagesClient/sessionPage";


export default function Page({ params }: { params: { package: string } }) {
    return (
        <Provider>
            <SessionPage id={params.package} />
        </Provider>
    );
}