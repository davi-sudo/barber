import { useState, useMemo } from 'react'
import './index.css'

const services = [
  ['01', 'Hidratação de cabelo', 'Hidratação profunda e nutrição capilar.', 35.00, '30 min'],
  ['02', 'Limpeza de pele', 'Esfoliação e hidratação profunda.', 65.00, '45 min'],
  ['03', 'Corte de Cabelo', 'Corte masculino tradicional ou moderno.', 58.00, '30 min'],
  ['04', 'Barba / Barboterapia', 'Toalha quente e cuidados especiais.', 58.00, '30 min'],
  ['05', 'Combo Cabelo e Barba', 'Corte + barbearia completos.', 116.00, '60 min'],
  ['06', 'Corte VIP com Guerreiro', 'Corte exclusivo assinado Guerreiro.', 70.00, '40 min'],
  ['07', 'Barba VIP com Guerreiro', 'Barba premium com acabamento Guerreiro.', 70.00, '40 min'],
  ['08', 'Combo VIP (Cabelo + Barba)', 'Corte VIP + Barba VIP.', 140.00, '80 min'],
  ['09', 'Depilação Nariz e Orelhas', 'Limpeza nasal e de orelhas.', 40.00, '10 min'],
]

const schedule = {
  seg: { open: '09:00', close: '18:40' },
  ter: { open: '09:00', close: '18:40' },
  qua: { open: '09:00', close: '18:40' },
  qui: { open: '09:00', close: '18:40' },
  sex: { open: '09:00', close: '18:40' },
  sab: { open: '07:30', close: '17:00' },
  dom: null,
}

const dayLabels = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

const formatPrice = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`

const generateTimeSlots = (dayKey) => {
  const sched = schedule[dayKey]
  if (!sched) return []
  const slots = []
  const [openH, openM] = sched.open.split(':').map(Number)
  const [closeH, closeM] = sched.close.split(':').map(Number)
  let current = openH * 60 + openM
  const end = closeH * 60 + closeM
  while (current < end) {
    const h = String(Math.floor(current / 60)).padStart(2, '0')
    const m = String(current % 60).padStart(2, '0')
    slots.push(`${h}:${m}`)
    current += 60
  }
  return slots
}

const contactInfo = {
  email: 'lucasguerreiro@yahoo.com.br',
  whatsapp: 'https://wa.me/5519992066753',
  address: 'Av. Tiradentes, 804 - Vila Mac Knight, Santa Bárbara d\'Oeste - SP, CEP 13450-850',
  maps: 'https://www.google.com/maps/search/?api=1&query=Av.+Tiradentes,+804+Vila+Mac+Knight,+Santa+Barbara+d%27Oeste+-+SP',
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  const timeSlots = useMemo(() => {
    if (!date) return []
    const dayIndex = new Date(`${date}T12:00:00`).getDay()
    return generateTimeSlots(dayLabels[dayIndex])
  }, [date])

  const selectedServicesData = useMemo(
    () => services.filter((s) => selectedServices.includes(s[0])),
    [selectedServices]
  )

  const totalPrice = useMemo(
    () => selectedServicesData.reduce((sum, s) => sum + s[3], 0),
    [selectedServicesData]
  )

  const openBooking = (preSelectId) => {
    if (preSelectId) toggleService(preSelectId)
    setBookingOpen(true)
  }

  const buildWhatsAppMessage = () => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(`${date}T12:00:00`))
    const servicesList = selectedServicesData.map((s) => `- ${s[1]} (${formatPrice(s[3])})`).join('%0A')
    return `Olá! Quero agendar os seguintes serviços:%0A${servicesList}%0A%0ATotal: ${formatPrice(totalPrice)}%0AData: ${formattedDate}%0AHorário: ${time}%0A%0AConfirma disponibilidade?`
  }

  const confirmBooking = () => {
    if (selectedServices.length === 0 || !date || !time) return
    const message = buildWhatsAppMessage()
    window.open(`${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const isReady = selectedServices.length > 0 && date && time

  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top">GUERREIRO</a>
        <nav aria-label="Navegação principal">
          <a href="#services">Serviços</a>
          <a href="#atelier">Atendimento</a>
          <a href="#contact">Contato</a>
        </nav>
        <button className="header-book" onClick={() => openBooking()}>Agendar <span>→</span></button>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Santa Bárbara d'Oeste <i /> Desde 2023</p>
          <h1>GUERREIRO<br /><em>BARBERSHOP</em></h1>
          <p className="intro">Cuidado pessoal com a excelência que você merece. Cortes precisos, barba impecável e serviços de qualidade.</p>
          <div className="hero-actions">
            <button className="button-solid" onClick={() => openBooking()}>Agendar agora <span>→</span></button>
            <a className="text-link" href={contactInfo.whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp <span>→</span></a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/0f786e709_generated_image.png" alt="Modelo com corte de cabelo preciso" />
          <p className="image-caption">[ Forma / Função ]</p>
        </div>
        <p className="scroll-note">Role para o ritual <span>↓</span></p>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <div><p className="eyebrow">01 / Serviços Disponíveis</p><h2>NOSSA TABELA</h2></div>
          <p>Escolha o serviço desejado para mais detalhes.</p>
        </div>
        <div className="service-list">
          {services.map((item) => (
            <article className="service-card" key={item[0]}>
              <div className="service-image"><img src="https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/fc1302d42_generated_image.png" alt="" /></div>
              <div className="service-main"><span className="service-number">{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></div>
              <div className="service-meta"><strong>{formatPrice(item[3])}</strong><span>{item[4]}</span></div>
              <button onClick={() => openBooking(item[0])}>Agendar <span>→</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="atelier-section" id="atelier">
        <div className="atelier-image">
          <img src="https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/2a5dda9c7_generated_image.png" alt="Navalha de barbear em composição escura" />
        </div>
        <div className="atelier-content">
          <p className="eyebrow">02 / Atendimento</p>
          <h2>NOSSO HORÁRIO</h2>
          <p className="atelier-intro">Atendemos de segunda a sábado, com horários diferenciados para sua conveniência.</p>
          <div className="hours-list">
            {Object.entries(schedule).map(([day, sched]) => (
              <div key={day} className="hour-item">
                <span>{day.toUpperCase()}: </span>
                {sched ? (
                  <>
                    <span>{sched.open}</span> – <span>{sched.close}</span>
                  </>
                ) : (
                  <span>Fechado</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-content">
          <div className="footer-about">
            <p className="footer-title">GUERREIRO BARBERSHOP</p>
            <p><strong>Categoria:</strong> Beleza, cosméticos e cuidados pessoais</p>
            <p><strong>Endereço:</strong> {contactInfo.address}</p>
            <a className="footer-map" href={contactInfo.maps} target="_blank" rel="noreferrer">Ver no Google Maps</a>
          </div>
          <div className="footer-contact">
            <p><strong>E-mail:</strong> {contactInfo.email}</p>
            <a className="footer-whatsapp" href={contactInfo.whatsapp} target="_blank" rel="noreferrer">
              <span>WhatsApp</span> (19) 99206-6753
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Guerreiro Barbershop</span>
          <span>Cuidado masculino com padrão.</span>
        </div>
      </footer>

      <button className="reserve-tab" onClick={() => openBooking()}>AGENDAR <span>→</span></button>
      <a className="whatsapp-float" href={contactInfo.whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp">↗</a>

      {bookingOpen && (
        <div className="booking-layer" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <button className="booking-backdrop" aria-label="Fechar" onClick={() => setBookingOpen(false)} />
          <aside className="booking-panel">
            <div className="booking-top">
              <div>
                <p className="eyebrow">Agendamento</p>
                <h2 id="booking-title">AGENDAR SERVIÇO</h2>
              </div>
              <button onClick={() => setBookingOpen(false)}>Fechar <span>×</span></button>
            </div>

            <div className="booking-field">
              <p className="field-label">01 / Serviços</p>
              <div className="booking-services">
                {services.map((item) => (
                  <label key={item[0]} className={`service-checkbox ${selectedServices.includes(item[0]) ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(item[0])}
                      onChange={() => toggleService(item[0])}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="service-name">{item[1]}</span>
                    <strong className="service-price">{formatPrice(item[3])}</strong>
                  </label>
                ))}
              </div>
            </div>

            <div className="booking-field">
              <label className="field-label" htmlFor="booking-date">02 / Data</label>
              <input
                id="booking-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  setTime('')
                }}
              />
            </div>

            <div className="booking-field">
              <p className="field-label">03 / Horário</p>
              {timeSlots.length === 0 ? (
                <p className="field-help">Selecione uma data para ver os horários disponíveis.</p>
              ) : (
                <div className="hours">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className={time === slot ? 'selected' : ''}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="booking-summary">
              <p className="field-label">Resumo</p>
              {isReady ? (
                <>
                  <p>
                    {selectedServicesData.map((s) => s[1]).join(', ')}
                    <br />
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))} • {time}
                  </p>
                  <p className="total-price">Total: {formatPrice(totalPrice)}</p>
                </>
              ) : (
                <p>Selecione serviços, data e horário</p>
              )}
            </div>

            <button className="button-solid confirm" disabled={!isReady} onClick={confirmBooking}>
              Confirmar no WhatsApp <span>→</span>
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default App