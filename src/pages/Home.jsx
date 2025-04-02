import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection.jsx';
import ArticleSection from '../components/ArticleSection.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <div className='font-[Poppins]'>
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default Home;


