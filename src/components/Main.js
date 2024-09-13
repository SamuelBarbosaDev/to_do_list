import './Main.css'
import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa'
import { FaEdit, FaWindowClose } from 'react-icons/fa'


export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [
            'Estudar Javascript',
            'Treinar',
            'Ler a Bíblia',
            'Estudar Espanhol',
            'Fazer alongamentos',
            'Fazer Barra',
            'Elevação de pernas na barra'
        ],
        index: -1
    };

    componentDidMount(){
        const tarefas = JSON.parse(localStorage.getItem('tarefas'))

        if(!tarefas) return;

        this.setState({ tarefas });
    }

    componentDidUpdate(prevProps, prevState){
        const { tarefas } = this.state;

        if (tarefas === prevState.tarefas) return;

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    handleChange = (e) =>{
        this.setState({
            novaTarefa: e.target.value
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        if(index === -1){
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
            });
        }
        else{
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [ ...novasTarefas ],
                index: -1,
            })
        }
    }

    handleEdit = (e, index) => {
        const { tarefas } = this.state;

        this.setState({
            index,
            novaTarefa: tarefas[index]
        })
    }

    handleDelete = (e, index) => {
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];

        novasTarefas.splice(index, 1);

        this.setState({
            tarefas: [...novasTarefas],
        })
    }

    render(){
        const { novaTarefa, tarefas } = this.state;

        return (
            <main>
                <section className='main-content'>
                    <h1>Lista de Tarefas</h1>

                    <form onSubmit={this.handleSubmit} action='#' className='form'>
                        <input onChange={this.handleChange} type='text' value={novaTarefa}/>
                        <button type='submit'><FaPlus /></button>
                    </form>
                    <ul className='tasks'>
                        {tarefas.map((tarefa, index) => (
                            <li key={tarefa}>
                                {tarefa}
                                <div className='task-buttons'>
                                    <FaEdit
                                    className='task-button-edit'
                                    onClick={(e) => this.handleEdit(e, index)}
                                    />
                                    <FaWindowClose
                                    className='task-button-delete'
                                    onClick={(e) => this.handleDelete(e, index)}
                                    />
                                </div>
                            </li>
                        )) }
                    </ul>
                </section>
            </main>
        )
    }
}
