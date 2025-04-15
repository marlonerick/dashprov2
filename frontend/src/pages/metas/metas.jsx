import { Sidebar } from "../../components/sidebar/sidebar";
import TabelaMetas from "../../components/tabelaMetas/tabelaMetas";

export function Metas() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full text-center">
          <div className="m-4">
            <TabelaMetas />
          </div>
        </div>
      </div>
    </>
  );
}
