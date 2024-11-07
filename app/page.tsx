import AppPage from "@/pagesClient/app";
import Provider from "@/provider";

export default function Home() {
  return (
      <Provider>
        <AppPage/>
      </Provider>
  );
}