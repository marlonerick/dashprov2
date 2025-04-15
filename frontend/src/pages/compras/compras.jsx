import { Sidebar } from "../../components/sidebar/sidebar";
import TabelaCompras from "../../components/tabelaCompras/tabelaCompras";

export function Compras() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full text-center overflow-y-auto">
          <div className="m-4">
            <h className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-black py-1">
              COMPRAS
            </h>
            <hr class="w-full h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <TabelaCompras />
          </div>
        </div>
      </div>
    </>
  );
}
