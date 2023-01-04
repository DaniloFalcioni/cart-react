import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import TotalBox from "./components/TotalBox";
import Loading from "./components/Loading";
import { useGlobalContext } from "./context/context";

function App() {
   const { isLoading, products, total } = useGlobalContext();
   if (isLoading) {
      return (
         <div className="App">
            <Navbar />
            <div className=" center-item">
               <Loading />
            </div>
            <Cart />
            {total > 0 && <TotalBox />}
         </div>
      );
   }
   return (
      <div className="App">
         <Navbar />
         {products.length > 0 ? (
            <Cart />
         ) : (
            <div className="center-item">
               <h4>nessun prodotto nel carrello</h4>
            </div>
         )}
         <TotalBox />
      </div>
   );
}

export default App;
