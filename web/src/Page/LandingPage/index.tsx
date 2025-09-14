import { Link } from "react-router-dom"
import Header from "../../components/header"
import Carousel from "../../components/carrousel"
import { items } from "../../Utils/carrouselImg"

export default function LandingPage() {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Sobre", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ]

  const services = [
    { icon: "🔧", title: "Revisão Geral", description: "Verificação completa do veículo" },
    { icon: "🛢️", title: "Troca de Óleo", description: "Troca de óleo e filtros" },
    { icon: "⚖️", title: "Alinhamento", description: "Alinhamento e balanceamento" },
    { icon: "🛑", title: "Freios", description: "Sistema de freios completo" },
    { icon: "🔩", title: "Suspensão", description: "Sistema de suspensão" },
    { icon: "❄️", title: "Ar Condicionado", description: "Sistema de climatização" }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header
        slug="Auto Center"
        menuItem={menuItems}
        className="fixed w-full backdrop-blur-md bg-black/50 text-white py-4 px-8 z-20"
      />

      {/* Hero Carousel */}
      <main className="relative h-screen">
        <Carousel images={items} />
      </main>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Oferecemos serviços automotivos de alta qualidade com tecnologia de ponta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sobre Nós
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Com mais de 10 anos de experiência no mercado automotivo, oferecemos 
                serviços de qualidade superior com tecnologia de ponta e profissionais 
                altamente qualificados.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Nossa missão é garantir a segurança e o desempenho do seu veículo, 
                proporcionando uma experiência única e confiável.
              </p>
              <Link 
                to="/agendar"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Agendar Serviço
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-white mb-4">Qualidade Garantida</h3>
              <p className="text-blue-100">
                Trabalhamos apenas com peças originais e oferecemos garantia em todos os serviços
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Estamos prontos para atender você. Agende seu serviço ou tire suas dúvidas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-lg font-semibold text-white mb-2">Telefone</h3>
              <p className="text-gray-300">(11) 99999-9999</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="text-lg font-semibold text-white mb-2">E-mail</h3>
              <p className="text-gray-300">contato@autocenter.com</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-white mb-2">Endereço</h3>
              <p className="text-gray-300">Rua das Flores, 123</p>
            </div>
          </div>
          
          <Link 
            to="/agendar"
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Agendar Serviço Agora
            <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
