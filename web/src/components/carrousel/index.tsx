import React from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"

interface CarouselProps {
  images: Array<{ id: number; src: string; alt: string; title?: string; subtitle?: string }>
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="relative w-full h-full group">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{
          el: '.swiper-pagination-custom',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop
        speed={800}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="relative">
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/70 md:via-black/40 md:to-transparent" />
              <div className="absolute inset-0 bg-black/30 md:hidden" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center md:justify-start">
                <div className="max-w-2xl px-4 md:px-8 lg:px-16 text-white text-center md:text-left">
                  <div className="space-y-4 md:space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Auto Center Premium
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {image.title || `Serviços de Qualidade ${index + 1}`}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg mx-auto md:mx-0 leading-relaxed">
                      {image.subtitle || "Oferecemos os melhores serviços automotivos com tecnologia de ponta e profissionais especializados."}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center md:justify-start">
                      <Link 
                        to="/agendar"
                        className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm md:text-base text-center"
                      >
                        Agendar Serviço
                      </Link>
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-full transition-all duration-300 text-sm md:text-base">
                        Ver Serviços
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
          <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
