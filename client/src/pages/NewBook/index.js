import React, {useState, useEffect} from "react";
import './styles.css';
import logoImage from '../../assets/logo.svg';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

export default function NewBook() {

    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState('');

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const { bookId } = useParams();

    useEffect(() => {
        if(bookId === '0') return;
        else loadBook();
    }, {bookId})

    async function loadBook(){
        try{
            const response = await api.get(`/api/book/v1/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let adjustedDate = response.data.launchDate.split("T", 10)[0];
            setId(response.data.id);
            setAuthor(response.data.author);
            setLaunchDate(adjustedDate);
            setPrice(response.data.price);
            setTitle(response.data.title);

        } catch(err){
            alert('Error recovering book, try again.');
            navigate('/books');
        }
    }


    async function saveOrUpdate(e){
        e.preventDefault();
        const data = {
            author,
            launchDate,
            price,
            title
        }
        try{
            if(bookId === '0'){
                await api.post('/api/book/v1', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else{
                data.id = id;
                await api.put('/api/book/v1', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            navigate('/books');
        }catch (err){
            alert('Error creating book, try again.');
        }
    }
    return(
        <div className={"new-book-container"}>
            <div className={"content"}>
                <section className={"form"}>
                    <img src={logoImage} alt={"Logo"} />
                    <h1>{bookId === '0' ? "Add":"Update"} New Book</h1>
                    <p>Enter the book information and click on {bookId === '0' ? "Add":"Update"}!</p>
                    <Link className={"back-link"} to={"/books"}>
                        <FiArrowLeft size={16} color={"#251FC5"} />
                        Back to Book
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder={"Title"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        placeholder={"Author"}
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input
                        type={"date"}
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />
                    <input
                        placeholder={"Price"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <button className={"button"} type={"submit"}>
                        {(bookId === '0') ? 'Add' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}