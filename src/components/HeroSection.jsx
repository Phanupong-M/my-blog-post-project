import HeroImage from '../assets/images/hero-image.jpg'; 


function HeroSection() { 
 return (
    <main className="container px-4 py-8 mx-auto">
    <div className = "flex flex-col items-center md:flex-row md:gap-[60px]">
        <div className="mb-8">
            <h1 className = "text-[40px] text-center mb-4">
                    TIME TO ADVENTURE
            </h1>
            <div>
                Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
            </div>

        </div>

        <img src= {HeroImage} alt="Mountain" className="h-[470px] object-cover rounded-lg mb-8" />

        <div>
            <h2 className="text-xl font-semibold mb-2">-Author</h2>
            <h3 className="text-2xl font-bold mb-4">Phanupong M.</h3>
            <p className="text-gray-500 mb-4">
                    I am a pet enthusiast and freelance writer who specializes in animal
                    behavior and care. Width a deep love for cats, I enjoy sharing
                    insights on feline companionship and wellness.
            </p>
            <p className="text-gray-500">
                    When I&apos;m not writing, I spend time volunteering at my local
                    animal shelter, helping cats find loving homes.
            </p>
        </div>
        </div> 
    </main>
 )
}

export default HeroSection