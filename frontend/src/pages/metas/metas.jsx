import { Sidebar } from "../../components/sidebar/sidebar";
import TabelaMetas from "../../components/tabelaMetas/tabelaMetas";

export function Metas() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full text-center">
          <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black py-1">
            DASHBOARD <span class="text-black dark:text-black">FAMILIA</span>{" "}
          </h1>
          <hr class="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="m-4">

            <TabelaMetas />
          </div>
        </div>
      </div>
    </>
  );
}
