import './Main.css'
import Form from './Form'
import Task from './Task'
import React, { Component } from 'react';

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
                    <Form
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        novaTarefa={novaTarefa}
                    />
                    <Task
                        tarefas={tarefas}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                    />
                </section>
            </main>
        )
    }
}
