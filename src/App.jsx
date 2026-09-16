import { useState } from 'react'
import './index.css'

const images = {
  hero: 'https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/0f786e709_generated_image.png',
  razor: 'https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/2a5dda9c7_generated_image.png',
  cut: 'https://media.base44.com/images/public/6aab0d9ee868e6126f9add52/fc1302d42_generated_image.png',
}

const services = [
  ['01', 'Degradê Assinatura', 'Degradê preciso, linhas geométricas e acabamento cirúrgico.', 'R$ 80', '45 min', images.cut],
  ['02', 'Ritual da Navalha', 'Barba esculpida à navalha com toalha quente e óleo.', 'R$ 70', '40 min', images.razor],
  ['03', 'Esculpir e Modelar', 'Acabamento, modelagem e finalização premium.', 'R$ 50', '30 min', images.cut],
  ['04', 'Combo Obsidiana', 'Corte assinatura + ritual de barba completos.', 'R$ 130', '80 min', images.razor],
  ['05', 'Renovação da Lâmina', 'Corte + tratamento intensivo e hidratação profunda.', 'R$ 110', '60 min', images.cut],
]

const barbers = [
  ['01', 'Rafael Nogueira', 'Especialista em degradês e linhas geométricas.', images.hero],
  ['02', 'Caio Valente', 'Mestre em navalha e rituais de barba.', images.razor],
  ['03', 'Davi Monteiro', 'Cortes clássicos e acabamento editorial.', images.cut],
]

const hours = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [service, setService] = useState(null)
  const [barber, setBarber] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const openBooking = (selected) => {
    if (selected) setService(selected)
    setBookingOpen(true)
  }

  const confirmBooking = () => {
    if (!service || !barber || !date || !time) return
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(`${date}T12:00:00`))
    const message = `Olá! Quero reservar a cadeira.%0A%0AServiço: ${service[1]}%0AProfissional: ${barber[1]}%0AData: ${formattedDate}%0AHorário: ${time}%0A%0AConfirma disponibilidade?`
    window.open(`https://wa.me/5519981864461?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top">OBSIDIAN</a>
        <nav aria-label="Navegação principal">
          <a href="#services">Serviços</a>
          <a href="#atelier">Atelier</a>
          <a href="#contact">Contato</a>
        </nav>
        <button className="header-book" onClick={() => openBooking()}>Reservar <span>↗</span></button>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">São Paulo <i /> Desde 2019</p>
          <h1>PRECISÃO<br /><em>NÃO É</em><br />OPCIONAL.</h1>
          <p className="intro">A barbearia para quem entende que um corte é uma escultura. Geometria, navalha e silêncio dentro de um refúgio de obsidiana.</p>
          <div className="hero-actions">
            <button className="button-solid" onClick={() => openBooking()}>Reservar a cadeira <span>→</span></button>
            <a className="text-link" href="https://wa.me/5519981864461" target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src={images.hero} alt="Modelo com corte de cabelo preciso" />
          <p className="image-caption">[ Forma / Função ]</p>
        </div>
        <p className="scroll-note">Role para o ritual <span>↓</span></p>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <div><p className="eyebrow">02 <i /> Matriz de Serviços</p><h2>O CATÁLOGO</h2></div>
          <p>Cada serviço é um ritual de precisão.<br />Deslize para explorar.</p>
        </div>
        <div className="service-list">
          {services.map((item) => (
            <article className="service-card" key={item[0]}>
              <div className="service-image"><img src={item[5]} alt="" /></div>
              <div className="service-main"><span className="service-number">{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></div>
              <div className="service-meta"><strong>{item[3]}</strong><span>{item[4]}</span></div>
              <button onClick={() => openBooking(item)}>Reservar <span>→</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="atelier-section" id="atelier">
        <div className="atelier-image"><img src={images.razor} alt="Navalha de barbear em uma composição escura" /></div>
        <div className="atelier-content">
          <p className="eyebrow">03 <i /> Atelier</p>
          <h2>O ESCULTOR<br /><em>DO VAZIO.</em></h2>
          <p className="atelier-intro">Tratamos o ato de aparar como um ritual de alto risco: geometria, autoescultura e silêncio. O espaço negativo emoldura a forma humana como a obra definitiva.</p>
          <div className="principles">
            <div><span>01</span><h3>Geometria</h3><p>Cada linha é projetada antes de ser cortada.</p></div>
            <div><span>02</span><h3>Navalha</h3><p>Ritual à lâmina reta, sem atalhos elétricos.</p></div>
            <div><span>03</span><h3>Silêncio</h3><p>Um vault de obsidiana longe do ruído.</p></div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p className="footer-title">A ARTE<br />DO CORTE</p>
        <div className="footer-grid">
          <div><p className="eyebrow">Obsidian Barber</p><p>Rua Augusta, 1200 — Consolação<br />São Paulo, SP — 01304-001</p></div>
          <div><p className="eyebrow">Horário</p><p>Ter–Sáb · 09:00 — 19:00</p></div>
          <div><p className="eyebrow">Contato</p><a href="mailto:contato@obsidianbarber.com.br">contato@obsidianbarber.com.br</a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Obsidian Barber</span><span>Precisão não é opcional.</span></div>
      </footer>

      <button className="reserve-tab" onClick={() => openBooking()}>RESERVE A CADEIRA <span>→</span></button>
      <a className="whatsapp-float" href="https://wa.me/5519981864461" target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp">↗</a>

      {bookingOpen && <div className="booking-layer" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="booking-backdrop" aria-label="Fechar" onClick={() => setBookingOpen(false)} />
        <aside className="booking-panel">
          <div className="booking-top"><div><p className="eyebrow">Agendamento</p><h2 id="booking-title">RESERVE A<br />CADEIRA</h2></div><button onClick={() => setBookingOpen(false)}>Fechar <span>×</span></button></div>
          <div className="booking-field"><p className="field-label">01 / Serviço</p><div className="booking-services">{services.map((item) => <button className={service?.[0] === item[0] ? 'selected' : ''} onClick={() => setService(item)} key={item[0]}><span>{item[1]}</span><strong>{item[3]}</strong></button>)}</div></div>
          <div className="booking-field"><p className="field-label">02 / Profissional</p><div className="barber-list">{barbers.map((item) => <button className={barber?.[0] === item[0] ? 'selected' : ''} onClick={() => setBarber(item)} key={item[0]}><img src={item[3]} alt="" /><span><strong>{item[1]}</strong><small>{item[2]}</small></span></button>)}</div></div>
          <div className="booking-field"><label className="field-label" htmlFor="booking-date">03 / Data</label><input id="booking-date" type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => setDate(event.target.value)} /></div>
          <div className="booking-field"><p className="field-label">04 / Horário</p><div className="hours">{hours.map((hour) => <button className={time === hour ? 'selected' : ''} onClick={() => setTime(hour)} key={hour}>{hour}</button>)}</div></div>
          <div className="booking-summary"><p className="field-label">Resumo</p>{service && barber && date && time ? <p>{service[1]}<br />{barber[1]}<br />{new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))} · {time}</p> : <p>Selecione serviço, profissional, data e horário</p>}</div>
          <button className="button-solid confirm" disabled={!service || !barber || !date || !time} onClick={confirmBooking}>Confirmar no WhatsApp <span>→</span></button>
        </aside>
      </div>}
    </main>
  )
}

export default App
