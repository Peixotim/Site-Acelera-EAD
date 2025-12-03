import ExplainerPage from "@/components/ExplainerPage";
import CalculadoraPage from "@/components/Calculadora";
import Header from "@/components/Header";

export default function App() {
  return (
    <main>
      <div className="pt-4">
    <Header/>
      </div>
       <ExplainerPage />

       <CalculadoraPage /> 
    </main>
  )
}