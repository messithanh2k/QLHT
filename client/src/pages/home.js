import Header from '../components/header';
import Footer from '../components/footer';
function Home(props) {
    const role = props.role;
    return (
        <div>
            <Header role={role}></Header>
            <h1>{role}</h1>
            <div>{ props.children }</div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
