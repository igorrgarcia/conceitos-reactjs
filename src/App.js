import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setrepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setrepositories(response.data)
      
    })
  }, [repositories])

  async function handleAddRepository() {
    api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "https://github.com/igorrgarcia/desafio-conceitos-node",
      techs: ["Nodejs", "Javascript", "Express"]
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
                </button>
              </li>
            )
        })}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
