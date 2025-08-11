import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProdutos } from "../context/ProdutosContext";
import { Paper, Box, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduto = ({ onCancel }) => {
  const { adicionarProduto, setAdicionar } = useProdutos();
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
    toast.success('Produto adicionado com sucesso!');
    setTimeout(() => {
      if (onCancel) onCancel();
    }, 1500); };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        Adicionar Produto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="title"
          label="Título"
          value={novoProduto.title}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={novoProduto.category}
            label="Categoria"
            onChange={handleChange}
          >
            <MenuItem value=""><em>Selecione</em></MenuItem>
            <MenuItem value="pizza">Pizza</MenuItem>
            <MenuItem value="bebida">Bebida</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth disabled={!novoProduto.category}>
          <InputLabel id="subcategory-label">Subcategoria</InputLabel>
          <Select
            labelId="subcategory-label"
            name="subcategory"
            value={novoProduto.subcategory}
            label="Subcategoria"
            onChange={handleChange}
          >
            <MenuItem value=""><em>Selecione</em></MenuItem>
            {novoProduto.category === 'pizza' && [
              <MenuItem key="doce" value="doce">Doce</MenuItem>,
              <MenuItem key="salgado" value="salgado">Salgado</MenuItem>
            ]}
            {novoProduto.category === 'bebida' && [
              <MenuItem key="agua" value="agua">Água</MenuItem>,
              <MenuItem key="vinho" value="vinho">Vinho</MenuItem>,
              <MenuItem key="refrigerante" value="refrigerante">Refrigerante</MenuItem>
            ]}
          </Select>
        </FormControl>
        <TextField
          name="price"
          label="Preço"
          value={novoProduto.price}
          onChange={handleChange}
        />
        <TextField
          name="ingredients"
          label="Ingredientes (separados por vírgula)"
          value={novoProduto.ingredients}
          onChange={handleChange}
        />
        <Box
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            border: "2px dashed gray",
            padding: 2,
            textAlign: "center",
            marginTop: 1,
            minHeight: 80
          }}
        >
          {novoProduto.image ? (
            <img src={novoProduto.image} alt="preview" style={{ width: "100px" }} />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Arraste uma imagem aqui
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
      <ToastContainer position="top-right" hideProgressBar={false} />
    </Paper>
  );
};

export default AddProduto;