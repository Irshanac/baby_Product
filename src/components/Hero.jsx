import React from 'react';
import Slider from 'react-slick';

const Hero = () => {
    const imageList = [
        {
            id: 1,
            img: "https://cdn.cdnparenting.com/articles/2017/10/418461847-H.webp",
            title: "Easy to Purchase",
            desc: "Don't waste your time",
        },
        {
            id: 2,
            img: "https://t4.ftcdn.net/jpg/02/64/65/99/360_F_264659979_rg2vbYP9ZJu2TmM8QOEuZk3B5EgNraaZ.jpg",
            title: "Easy to Purchase",
            desc: "Don't waste your time",
        },
        {
            id: 3,
            img: "https://media.istockphoto.com/id/1460330514/photo/young-couple-in-baby-shop.jpg?s=612x612&w=0&k=20&c=t8esEWogBBKWh5FCh9FuItGba_NaW8b49LZEjIyF2O8=",
            title: "Easy to Purchase",
            desc: "Don't waste your time",
        },
    ];

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1, // Ensure only one slide is shown at a time
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <div className="relative overflow-hidden main-h-[250px] sm:min-h-[350px] bg-gray-100 flex justify-center items-center duration-200">
            <div className="h-[500px] w-[500px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-9"></div>
            <div className="container pb-8 sm:pb-0">
                <Slider {...settings}>
                    {imageList.map((data) => (
                        <div key={data.id} className="flex flex-col sm:flex-row items-center">
                            {/* Text Container - Align Left */}
                            <div className="flex-1 mx-auto text-left sm:pr-8"> {/* Keep this as text-left */}
                                <h1 className="text-2xl sm:text-3xl">{data.title}</h1>
                                <p className="text-sm">{data.desc}</p>
                            </div>
                            {/* Image Container - Align Right */}
                            <div className="flex-1 mx-auto flex justify-end">
                                <img
                                    src={data.img}
                                    alt={data.title}
                                    className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Hero;
