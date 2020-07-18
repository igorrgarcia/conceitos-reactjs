import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [projects])

  async function handleAddRepository() {
    api.post('projects', {
      title: 'Repositório ' + Date.now(),
      owner: 'Author'
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`projects/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => {
            return (
              <li key={project.id}>
                {project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>
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
