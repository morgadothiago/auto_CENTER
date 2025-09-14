import { useState } from "react"
import { useForm } from "react-hook-form"
import "./styles.css"

interface FormData {
  nome: string
  email: string
  telefone: string
  veiculo: string
  placa: string
  servico: string
  data: string
  horario: string
  observacoes: string
}

const servicos = [
  { id: "revisao", name: "Revisão Geral", icon: "🔧", description: "Verificação completa do veículo" },
  { id: "oleo", name: "Troca de Óleo", icon: "🛢️", description: "Troca de óleo e filtros" },
  { id: "alinhamento", name: "Alinhamento e Balanceamento", icon: "⚖️", description: "Alinhamento de direção e balanceamento" },
  { id: "freios", name: "Freios", icon: "🛑", description: "Sistema de freios completo" },
  { id: "suspensao", name: "Suspensão", icon: "🔩", description: "Sistema de suspensão" },
  { id: "ar", name: "Ar Condicionado", icon: "❄️", description: "Sistema de climatização" },
  { id: "bateria", name: "Bateria", icon: "🔋", description: "Bateria e sistema elétrico" },
  { id: "pneus", name: "Pneus", icon: "🛞", description: "Pneus e rodas" },
  { id: "embreagem", name: "Embreagem", icon: "⚙️", description: "Sistema de embreagem" },
  { id: "motor", name: "Motor", icon: "🔧", description: "Motor e sistema de propulsão" },
  { id: "outros", name: "Outros", icon: "🔨", description: "Outros serviços" }
]

const horarios = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00"
]

const steps = [
  { id: 1, title: "Dados Pessoais", description: "Informações de contato" },
  { id: 2, title: "Veículo", description: "Dados do seu veículo" },
  { id: 3, title: "Serviço", description: "Escolha o serviço" },
  { id: 4, title: "Agendamento", description: "Data e horário" },
  { id: 5, title: "Confirmação", description: "Revise e confirme" }
]

export default function FormAgendarServico() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger
  } = useForm<FormData>()

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1: return ['nome', 'email', 'telefone']
      case 2: return ['veiculo', 'placa']
      case 3: return ['servico']
      case 4: return ['data', 'horario']
      default: return []
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Dados do agendamento:", data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
      setCurrentStep(1)
    }, 3000)
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatPlate = (value: string) => {
    return value.replace(/[^A-Z0-9]/g, '').toUpperCase()
  }

  if (isSubmitted) {
    return (
      <div className="form-success-container">
        <div className="form-success">
          <div className="success-icon">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="success-title">Agendamento Confirmado!</h3>
          <p className="success-message">
            Seu agendamento foi enviado com sucesso. Entraremos em contato em breve para confirmar os detalhes.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="multistep-form-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-steps flex flex-wrap gap-4 justify-center">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`progress-step  ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-number">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content">
        <form onSubmit={handleSubmit(onSubmit)} className="multistep-form">
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Dados Pessoais</h2>
                <p className="step-subtitle">Precisamos de suas informações de contato</p>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nome" className="form-label">
                    Nome Completo *
                  </label>
                  <input
                    {...register("nome", { 
                      required: "Nome é obrigatório",
                      minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" }
                    })}
                    type="text"
                    id="nome"
                    className={`form-input ${errors.nome ? 'error' : ''}`}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.nome && <span className="error-message">{errors.nome.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    E-mail *
                  </label>
                  <input
                    {...register("email", { 
                      required: "E-mail é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail inválido"
                      }
                    })}
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="telefone" className="form-label">
                    Telefone *
                  </label>
                  <input
                    {...register("telefone", { 
                      required: "Telefone é obrigatório",
                      pattern: {
                        value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                        message: "Formato: (11) 99999-9999"
                      }
                    })}
                    type="tel"
                    id="telefone"
                    className={`form-input ${errors.telefone ? 'error' : ''}`}
                    placeholder="(11) 99999-9999"
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      e.target.value = formatted
                    }}
                  />
                  {errors.telefone && <span className="error-message">{errors.telefone.message}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados do Veículo */}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Dados do Veículo</h2>
                <p className="step-subtitle">Informações sobre seu veículo</p>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="veiculo" className="form-label">
                    Veículo *
                  </label>
                  <input
                    {...register("veiculo", { 
                      required: "Veículo é obrigatório",
                      minLength: { value: 3, message: "Modelo deve ter pelo menos 3 caracteres" }
                    })}
                    type="text"
                    id="veiculo"
                    className={`form-input ${errors.veiculo ? 'error' : ''}`}
                    placeholder="Ex: Honda Civic 2020"
                  />
                  {errors.veiculo && <span className="error-message">{errors.veiculo.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="placa" className="form-label">
                    Placa *
                  </label>
                  <input
                    {...register("placa", { 
                      required: "Placa é obrigatória",
                      pattern: {
                        value: /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/,
                        message: "Formato: ABC1234 ou ABC1D23"
                      }
                    })}
                    type="text"
                    id="placa"
                    className={`form-input ${errors.placa ? 'error' : ''}`}
                    placeholder="ABC1234"
                    onChange={(e) => {
                      const formatted = formatPlate(e.target.value)
                      e.target.value = formatted
                    }}
                  />
                  {errors.placa && <span className="error-message">{errors.placa.message}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Escolha do Serviço */}
          {currentStep === 3 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Escolha o Serviço</h2>
                <p className="step-subtitle">Selecione o tipo de serviço que precisa</p>
              </div>
              
              <div className="services-grid">
                {servicos.map((servico) => (
                  <label key={servico.id} className="service-card">
                    <input
                      {...register("servico", { required: "Selecione um serviço" })}
                      type="radio"
                      value={servico.id}
                      className="service-radio"
                    />
                    <div className="service-content">
                      <div className="service-icon">{servico.icon}</div>
                      <div className="service-info">
                        <h3 className="service-name">{servico.name}</h3>
                        <p className="service-description">{servico.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.servico && <span className="error-message">{errors.servico.message}</span>}
            </div>
          )}

          {/* Step 4: Agendamento */}
          {currentStep === 4 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Data e Horário</h2>
                <p className="step-subtitle">Escolha quando deseja agendar</p>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="data" className="form-label">
                    Data *
                  </label>
                  <input
                    {...register("data", { required: "Data é obrigatória" })}
                    type="date"
                    id="data"
                    min={getMinDate()}
                    className={`form-input ${errors.data ? 'error' : ''}`}
                  />
                  {errors.data && <span className="error-message">{errors.data.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="horario" className="form-label">
                    Horário *
                  </label>
                  <select
                    {...register("horario", { required: "Selecione um horário" })}
                    id="horario"
                    className={`form-select ${errors.horario ? 'error' : ''}`}
                  >
                    <option value="">Selecione o horário</option>
                    {horarios.map((horario) => (
                      <option key={horario} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                  {errors.horario && <span className="error-message">{errors.horario.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="observacoes" className="form-label">
                  Observações
                </label>
                <textarea
                  {...register("observacoes")}
                  id="observacoes"
                  rows={4}
                  className="form-textarea"
                  placeholder="Descreva qualquer problema específico ou observação adicional..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Confirmação */}
          {currentStep === 5 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Confirmação</h2>
                <p className="step-subtitle">Revise seus dados antes de confirmar</p>
              </div>
              
              <div className="confirmation-card">
                <div className="confirmation-section">
                  <h3 className="confirmation-title">Dados Pessoais</h3>
                  <div className="confirmation-data">
                    <p><strong>Nome:</strong> {watch('nome')}</p>
                    <p><strong>E-mail:</strong> {watch('email')}</p>
                    <p><strong>Telefone:</strong> {watch('telefone')}</p>
                  </div>
                </div>

                <div className="confirmation-section">
                  <h3 className="confirmation-title">Veículo</h3>
                  <div className="confirmation-data">
                    <p><strong>Modelo:</strong> {watch('veiculo')}</p>
                    <p><strong>Placa:</strong> {watch('placa')}</p>
                  </div>
                </div>

                <div className="confirmation-section">
                  <h3 className="confirmation-title">Serviço</h3>
                  <div className="confirmation-data">
                    <p><strong>Tipo:</strong> {servicos.find(s => s.id === watch('servico'))?.name}</p>
                    <p><strong>Data:</strong> {watch('data')}</p>
                    <p><strong>Horário:</strong> {watch('horario')}</p>
                    {watch('observacoes') && <p><strong>Observações:</strong> {watch('observacoes')}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button
              type="button"
              onClick={prevStep}
              className="btn-secondary"
              disabled={currentStep === 1 || isSubmitting}
            >
              Anterior
            </button>
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
                disabled={isSubmitting}
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    Agendando...
                  </div>
                ) : (
                  "Confirmar Agendamento"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
