import HeroImage from '../assets/images/hero-image.jpg'; 


function HeroSection() { 
 return (
    <main className="container px-4 py-8 mx-auto">
    <div className = "flex flex-col items-center md:flex-row md:gap-[60px]">
        <div className="mb-8">
            <h1 className = "text-[40px] text-center font-bold mb-4">
                    TIME TO ADVENTURE
            </h1>
            <div>
                Explore the great outdoors, find new trails, and immerse yourself in the beauty of nature. Let each adventure inspire and refresh your spirit
            </div>

        </div>

        <img src= {HeroImage} alt="Mountain" className="h-[470px] object-cover rounded-lg mb-8" />

        <div>
            <h2 className="text-xl font-semibold mb-2">-Author</h2>
            <h3 className="text-2xl font-bold mb-4">Phanupong M.</h3>
            <p className="text-gray-500 mb-4">
                I'm an avid hiker and outdoor enthusiast, passionate about discovering new trails and sharing my experiences in the wilderness. I believe in the power of nature to refresh the soul and challenge the body
            </p>
            <p className="text-gray-500">
                I love sharing my adventures and offering helpful tips to fellow explorers seeking their next outdoor journey.
            </p>
        </div>
        </div> 
    </main>
 )
}

export default HeroSection