import { useState } from 'react'
import './index.css'

const services = [
  ['01', 'Hidratação de cabelo', 'Hidratação profunda e nutrição capilar.', 'R$ 35,00', '30 min'],
  ['02', 'Limpeza de pele', 'Esfoliação e hidratação profunda.', 'R$ 65,00', '45 min'],
  ['03', 'Corte de Cabelo', 'Corte masculino tradicional ou moderno.', 'R$ 58,00', '30 min'],
  ['04', 'Barba / Barboterapia', 'Toalha quente e cuidados especiais.', 'R$ 58,00', '30 min'],
  ['05', 'Combo Cabelo e Barba', 'Corte + barbearia completos.', 'R$ 116,00', '60 min'],
  ['06', 'Corte VIP com Guerreiro', 'Corte exclusivo assinado Guerreiro.', 'R$ 70,00', '40 min'],
  ['07', 'Barba VIP com Guerreiro', 'Barba premium com acabamento Guerreiro.', 'R$ 70,00', '40 min'],
  ['08', 'Combo VIP (Cabelo + Barba)', 'Corte VIP + Barba VIP.', 'R$ 140,00', '80 min'],
  ['09', 'Depilação Nariz e Orelhas', 'Limpeza nasal e de orelhas.', 'R$ 40,00', '10 min'],
]

const hours = [
  ['seg', '09:00', '18:40'],
  ['sab', '07:30', '17:00'],
  ['dom', 'Fechado', '']
]

const contactInfo = {
  email: 'lucasguerreiro@yahoo.com.br',
  whatsapp: 'https://wa.me/5519992066753',
  address: 'Av. Tiradentes, 804 - Vila Mac Knight, Santa Bárbara d\'Oeste - SP, CEP 13450-850',
  maps: 'https://www.google.com/maps/search/?api=1&query=Av.+Tiradentes,+804+Vila+Mac+Knight,+Santa+Barbara+d%27Oeste+-+SP',
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const openBooking = (selected) => {
    if (selected) setService(selected)
    setBookingOpen(true)
  }

  const confirmBooking = () => {
    if (!service || !date || !time) return
    window.open(contactInfo.whatsapp, '_blank', 'noopener,noreferrer')
  }

  const hoursAvailable = hours.map((h) => h[1] + ' - ' + h[2]).filter((h) => h !== 'Fechado - ')

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
              <div className="service-meta"><strong>{item[3]}</strong><span>{item[4]}</span></div>
              <button onClick={() => openBooking(item)}>Agendar <span>→</span></button>
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
            {hours.map((h) => (
              <div key={h[0]} className="hour-item">
                <span>{h[0].toUpperCase()}: </span>
                {h[1] !== 'Fechado' ? (
                  <span>{h[1]}</span> - <span>{h[2]}</span>
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

      {bookingOpen && <div className="booking-layer" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="booking-backdrop" aria-label="Fechar" onClick={() => setBookingOpen(false)} />
        <aside className="booking-panel">
          <div className="booking-top"><div><p className="eyebrow">Agendamento</p><h2 id="booking-title">AGENDAR SERVIÇO</h2></div><button onClick={() => setBookingOpen(false)}>Fechar <span>×</span></button></div>
          <div className="booking-field"><p className="field-label">01 / Serviço</p><div className="booking-services">{services.map((item) => <button className={service?.[0] === item[0] ? 'selected' : ''} onClick={() => setService(item)} key={item[0]}><span>{item[1]}</span><strong>{item[3]}</strong></button>)}</div></div>
          <div className="booking-field"><label className="field-label" htmlFor="booking-date">02 / Data</label><input id="booking-date" type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => setDate(event.target.value)} /></div>
          <div className="booking-field"><p className="field-label">03 / Horário</p><div className="hours">{hoursAvailable.map((hour) => <button className={time === hour ? 'selected' : ''} onClick={() => setTime(hour)} key={hour}>{hour}</button>)}</div></div>
          <div className="booking-summary"><p className="field-label">Resumo</p>{service && date && time ? <p>{service[1]}<br />{new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))} · {time}</p> : <p>Selecione serviço, data e horário</p>}</div>
          <button className="button-solid confirm" disabled={!service || !date || !time} onClick={confirmBooking}>Confirmar no WhatsApp <span>→</span></button>
        </aside>
      </div>}
    </main>
  )
}

export default App