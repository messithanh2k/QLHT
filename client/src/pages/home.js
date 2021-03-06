import Header from '../components/header';
import Footer from '../components/footer';
import TokenService from '../service/TokenService';
function Home(props) {
    const role = props.role;
    return (
        <div>
            <Header></Header>
            <div>{props.children}</div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
