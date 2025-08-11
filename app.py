import os
import json
import base64
import uuid # Para gerar IDs únicos para os arquivos
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configurações do Flask ---
app = Flask(__name__)
CORS(app) # Habilita o CORS para permitir requisições do frontend

# Define as pastas de upload e o arquivo do banco de dados
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'public', 'img')
DB_FILE = 'db.json'

# Garante que a pasta de upload exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# --- Funções para manipulação do db.json ---
def get_produtos_db():
    """Lê o arquivo db.json e retorna os dados."""
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, 'w') as f:
            json.dump({"produtos": []}, f)
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def save_produtos_db(data):
    """Salva os dados no arquivo db.json."""
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

# --- Rotas da API ---

@app.route('/produtos', methods=['POST'])
def add_produto():
    """
    Rota para adicionar um novo produto.
    Recebe os dados via JSON, incluindo a string Base64 da imagem.
    """
    try:
        # Pega os dados JSON do corpo da requisição
        produto = request.get_json()
        base64_string = produto.get('image', '')

        if base64_string:
            # Extrai o tipo de arquivo e a string Base64 pura
            header, base64_data = base64_string.split(',', 1)
            file_extension = header.split(';')[0].split('/')[1]
            
            # Decodifica a string Base64 para dados binários
            decoded_data = base64.b64decode(base64_data)

            # Cria um nome de arquivo único para evitar colisões
            filename = f"{uuid.uuid4().hex}.{file_extension}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            
            # Salva o arquivo na pasta 'public/img'
            with open(filepath, 'wb') as f:
                f.write(decoded_data)
            
            # Atualiza o objeto do produto com o caminho público da imagem
            produto['image'] = f"/img/{filename}"

        # Lê os dados existentes do db.json
        db_data = get_produtos_db()
        
        # Gera um novo ID para o produto
        if db_data['produtos']:
            new_id = max(p.get('id', 0) for p in db_data['produtos']) + 1
        else:
            new_id = 1
        produto['id'] = new_id

        # Adiciona o novo produto e salva o db.json
        db_data['produtos'].append(produto)
        save_produtos_db(db_data)

        # Retorna o produto recém-adicionado com status 201 (Created)
        return jsonify(produto), 201
    
    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({"error": str(e)}), 400

@app.route('/produtos', methods=['GET'])
def get_produtos():
    """
    Rota para buscar todos os produtos.
    """
    db_data = get_produtos_db()
    return jsonify(db_data.get('produtos', []))

# --- Execução da Aplicação ---
if __name__ == '__main__':
    app.run(port=3001, debug=True)