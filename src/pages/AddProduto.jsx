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
          />
          <input
            name="category"
            placeholder="Categoria"
            value={novoProduto.category}
            onChange={handleChange}
          />
          <input
            name="subcategory"
            placeholder="Subcategoria"
            value={novoProduto.subcategory}
            onChange={handleChange}
          />
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

          <button type="button" onClick={() => { setAdicionar(false); navigate("/admin"); }}>
            Cancelar
          </button>

        </form>
      </div>
    );
}

export default AddProduto

