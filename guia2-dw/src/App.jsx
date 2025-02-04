import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { db } from './data/db';
import { Guitar } from './components/Guitar';

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart]=useState([])

  function addToCart(guitar){
    const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    if(itemIndex===-1){//Esa articulo aun no existe en el carrito
      guitar.quantity=1;
      setCart([...cart,guitar])
    }
    else{//si la guitarra ya se habia aniadido al carrito
      const updatedGuitar=[...cart]//Creando una copia de la variable de estado
      updateCart[itemIndex].quantity++;
      setCart(updatedGuitar);


    }

  }

  return (
    <>


      <Header  cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}

        </div>
      </main>
      <Footer />


    </>
  )
}

export default App;
