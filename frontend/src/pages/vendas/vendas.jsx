import { Sidebar } from "../../components/sidebar/sidebar";
import TabelaVendas from "../../components/tabelaVendas/tabelaVendas";

export function Vendas() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="w-full text-center overflow-y-auto">

          <div className="m-4">
          <h className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-black py-1">VENDAS</h>
          <hr class="w-full h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <TabelaVendas />
          </div>
        </div>
      </div>
    </>
  );
}
