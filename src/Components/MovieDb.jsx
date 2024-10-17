import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const MovieDb = () => {
  let [api, setApi] = useState([]);
  let [search, setSearch] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?&api_key=67d677534400e8f77ddab93fff4be1d8&language=en-US')
      .then((response) => response.json())
      .then(data => setApi(data.results))
      .catch(err => console.error('error', err));
  }, []);

  function handleSearch() {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=67d677534400e8f77ddab93fff4be1d8`)
      .then(res => res.json())
      .then(data => setApi(data.results))
      .catch(err => console.error('error', err));
  }

  return (
    <div>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="#">Movie Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Options" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action2">Another Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action3">Something Else</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-light" onClick={handleSearch}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel className="carousel-custom">
        {api.map((movie, index) => (
          <div key={index}>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <p className="legend">{movie.title}</p>
            <p>Overview: {movie.overview}</p>
          </div>
        ))}
      </Carousel>
      <section className="card-container">
        {api.map((movie, index) => (
          <Card key={movie.id} className="movie-card">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Button variant="primary" onClick={() => navigate("/movie", { state: { movie } })}>
                More Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default MovieDb;
