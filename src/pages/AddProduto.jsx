import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProdutos } from "../context/ProdutosContext";

const AddProduto= () => {

  const {adicionarProduto, setAdicionar} = useProdutos();
 
  const navigate = useNavigate();

  const [novoProduto, setNovoProduto] = useState({
    title: "",
    category: "",
    subcategory: "",
    price: "",
    ingredients: "",
    image: ""
  });

      
  const handleChange = (e) => {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNovoProduto({ ...novoProduto, image: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adicionarProduto(novoProduto);
    setAdicionar(false);
  };

     
  return (
      <div>
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Título"
            value={novoProduto.title}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={novoProduto.category}
            onChange={handleChange}
          >
            <option value="">Selecione a categoria</option>
            <option value="pizza"> Pizza </option>
            <option value="bebida"> Bebida </option>
          </select>


          <select
            name="subcategory"
            value={novoProduto.subcategory}
            onChange={handleChange}
            disabled={!novoProduto.category}
          >
            <option value="">Selecione a subcategoria</option>

            {novoProduto.category === 'pizza' ? (
              <>
                <option value="doce">Doce</option>
                <option value="salgado">Salgado</option>
              </>
            ) : novoProduto.category === 'bebida' ? (
              <>
                <option value="agua">Água</option>
                <option value="vinho">Vinho</option>
                <option value="refrigerante">Refrigerante</option>
              </>
            ) : null}
          </select>

          <input
            name="price"
            placeholder="Preço"
            value={novoProduto.price}
            onChange={handleChange}
          />
          <input
            name="ingredients"
            placeholder="Ingredientes (separados por vírgula)"
            value={novoProduto.ingredients}
            onChange={handleChange}
          />

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "2px dashed gray",
              padding: "20px",
              textAlign: "center",
              marginTop: "10px"
            }}
          >
            {novoProduto.image ? (
              <img
                src={novoProduto.image}
                alt="preview"
                style={{ width: "100px" }}
              />
            ) : (
              "Arraste uma imagem aqui"
            )}
          </div>

          <button type="submit">Salvar</button>

          <button type="button" onClick={() =>  navigate("/admin") }>
            Cancelar
          </button>

        </form>
      </div>
    );
}

export default AddProduto

