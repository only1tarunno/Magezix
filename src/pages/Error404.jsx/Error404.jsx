import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/shared/Container";

const Error404 = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        {" "}
        <div className="text-center min-h-screen flex flex-col justify-center items-center space-y-5">
          <h1 className="text-9xl xl:text-[240px] font-bold  text-[#3c3a4624]">
            404
          </h1>
          <h2 className="text-3xl font-bold lg:text-6xl">
            Oops... It looks like you are lost !
          </h2>
          <p className="text-[#5d6273] text-lg">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <div>
            <Link to="/">
              <Button text={"Go Back Home"}></Button>
            </Link>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Error404;
