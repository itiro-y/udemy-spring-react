import React, {useState, useEffect} from "react";
import './styles.css'
import logoImage from '../../assets/logo.svg';
import {Link, useNavigate} from 'react-router-dom';
import {FiPower, FiEdit, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    async function logout(){
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    async function deleteBook(id){
        try{
            await api.delete(`api/book/v1/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBooks(books.filter(book => book.id !== id));
        }catch (err) {
            alert('Error deleting book, try again.');
        }
    }

    async function editBook(id){
        try{
            navigate(`/books/book/new/${id}`);
        }catch (err){
            alert('Error editing book, try again.');
        }
    }

    async function fetchMoreBooks(){
        const response = await api.get('/api/book/v1', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                limit: 4,
                direction: 'ASC'
            }
        });

        setBooks([ ...books, ...response.data._embedded.bookVoes]);
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreBooks();
    }, [])

    return(
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Logo"/>
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>

                < Link className="button" to="book/new/0">Add New Book</Link>

                <button type="button">
                    <FiPower size={18} color="#251FC5" onClick={logout} />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => {
                    return(
                        <li key={book.id}>
                            <strong>Title: </strong>
                            <p>{book.title}</p>

                            <strong>Author: </strong>
                            <p>{book.author}</p>

                            <strong>Price: </strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: "currency", currency: 'BRL'}).format(book.price)}</p>

                            <strong>Release Date: </strong>
                            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                            <button onClick={() => editBook(book.id)} type={"button"}>
                                <FiEdit size={20} color={"#251FC5"}/>
                            </button>

                            <button type={"button"} onClick={() => deleteBook(book.id)}>
                                <FiTrash2 size={20} color={"#251FC5"}/>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <button className={"button"} onClick={fetchMoreBooks} type={"button"}>
                Load More
            </button>
        </div>
    );
}