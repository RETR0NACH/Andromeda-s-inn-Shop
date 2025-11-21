import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/blog.css'

function BlogPage(){
    return(
        <div className='blog-page-container'>

            {/* Encabezado del blog */}
            <header className='blog-header'>
                <h1>Un rincón sobre nosotros: El blog de Andromeda's Inn</h1>
                <p className='blog-subtitle'>Compartiendo nuestro gusto sobre humos y sabores</p>
            </header>

            {/* Artículo principal */}
            <article className='blog-post'>
                <h2>Todo comenzó con una estrategia sobre lo que a la gente le gusta, a su vez lo
                    que a nosotros nos gusta también... y salió Andromeda </h2> 

            </article>


                
            

        </div>
    )
}