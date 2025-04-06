import { GraficosAcoes } from "./components/estatisticaAcao/estatisticaAcao.jsx";
import { EstatisticaCompras } from "./components/estatisticaCompras/estatisticaCompras.jsx";
import { LucroAnalise } from "./components/estatisticasLucro/estatisticasLucro.jsx";
import { EstatisticaVendas } from "./components/estatisticaVendas/estatisticaVendas.jsx";
import { Sidebar } from "./components/sidebar/sidebar.jsx";

export function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Dashboard rolável */}
      <div className="w-full text-center overflow-y-auto">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black py-1">
          DASHBOARD{" "}
        </h1>
        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <LucroAnalise />
        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex justify-center">
          <EstatisticaVendas />
          <EstatisticaCompras />
        </div>
        <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <GraficosAcoes />

      </div>
    </div>
  );
}

export default App;
