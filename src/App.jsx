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
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [createdAt, setCreatedAt] = useState(null)
  const [downloadError, setDownloadError] = useState('')
  const phoneDigits = customerPhone.replace(/\D/g, '')
  const nationalPhone = phoneDigits.length > 11 && phoneDigits.startsWith('55') ? phoneDigits.slice(2) : phoneDigits
  const hasDigits = phoneDigits.length >= 10
  const validPhone = hasDigits && /^[\d\s]+$/.test(customerPhone)
  const validName = customerName.trim().length >= 2
  const bookingReady = Boolean(service && barber && date && time && validName && validPhone)
  const createdLabel = createdAt ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(createdAt) : ''
  const contactPhone = `+55 ${nationalPhone}`

  const openBooking = (selected) => {
    if (selected) setService(selected)
    if (!createdAt) setCreatedAt(new Date())
    setBookingOpen(true)
  }

  const confirmBooking = () => {
    if (!bookingReady) return
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(`${date}T12:00:00`))
    const msg = `Olá! Quero reservar a cadeira.%0ACliente: ${customerName.trim()}%0ATelefone: ${contactPhone}%0AServiço: ${service[1]}%0AProfissional: ${barber[1]}%0AData: ${formattedDate}%0AHorário: ${time}%0AConfirma?`
    window.open(`https://wa.me/5519981864461?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  const downloadBookingCard = () => {
    if (!bookingReady) return
    setDownloadError('')
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(`${date}T12:00:00`))
    const escapeXml = (value) => String(value).replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character])
    const nameLines = customerName.trim().match(/.{1,48}(?:\s|$)|.{1,48}/gu) || []
    const nameText = nameLines.map((line, index) => `<tspan x="78" dy="${index === 0 ? 0 : 28}">${escapeXml(line.trim())}</tspan>`).join('')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000" viewBox="0 0 1200 1000">
      <rect width="1200" height="1000" fill="#0a0a0a"/>
      <rect x="42" y="42" width="1116" height="916" fill="none" stroke="#454545"/>
      <g fill="#efefed" font-family="Arial, sans-serif">
        <text x="78" y="103" font-size="32" font-weight="800" letter-spacing="-2">OBSIDIAN</text>
        <text x="78" y="210" font-size="58" font-weight="800" letter-spacing="-3">SOLICITAÇÃO DE RESERVA.</text>
      </g>
      <g fill="#a5a5a3" font-family="monospace" font-size="20">
        <text x="78" y="260">AGUARDANDO CONFIRMAÇÃO DA BARBEARIA</text>
        <text x="78" y="330">CLIENTE</text>
        <text x="78" y="366" fill="#efefed">${nameText}</text>
        <text x="78" y="468">TELEFONE / WHATSAPP DO CLIENTE</text>
        <text x="78" y="505" fill="#efefed">${escapeXml(contactPhone)}</text>
        <text x="78" y="572">SERVIÇO: ${escapeXml(service[1])}</text>
        <text x="78" y="610">PROFISSIONAL: ${escapeXml(barber[1])}</text>
        <text x="78" y="672" fill="#efefed">ATENDIMENTO: ${escapeXml(formattedDate)} · ${escapeXml(time)}</text>
        <text x="78" y="734">SOLICITAÇÃO CRIADA EM: ${escapeXml(createdLabel)}</text>
        <text x="78" y="810">WHATSAPP DA BARBEARIA: +55 (19) 98186-4461</text>
        <text x="78" y="908" font-size="16">RUA AUGUSTA, 1200 · SÃO PAULO</text>
        <text x="1122" y="908" font-size="16" text-anchor="end">PRECISÃO NÃO É OPCIONAL.</text>
      </g>
      <path d="M78 140H1122 M78 290H1122 M78 855H1122" stroke="#454545"/>
    </svg>`
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    const image = new Image()
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 1200
        canvas.height = 1000
        const context = canvas.getContext('2d')
        if (!context) throw new Error('Canvas indisponível')
        context.drawImage(image, 0, 0)
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'comprovante-obsidian.png'
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch {
        setDownloadError('Não foi possível gerar o PNG. Tente novamente.')
      } finally {
        URL.revokeObjectURL(svgUrl)
      }
    }
    image.onerror = () => {
      URL.revokeObjectURL(svgUrl)
      setDownloadError('Não foi possível gerar o PNG. Tente novamente.')
    }
    image.src = svgUrl
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
          <div className="booking-field">
            <label className="field-label" htmlFor="customer-name">05 / Nome do cliente</label>
            <input id="customer-name" type="text" autoComplete="name" required minLength={2} maxLength={100} value={customerName} onChange={(event) => setCustomerName(event.target.value)} aria-invalid={customerName !== '' && !validName} aria-describedby="customer-name-help" />
            <p className="field-help" id="customer-name-help">Informe seu nome para identificar a solicitação (mínimo de 2 caracteres).</p>
          </div>
          <div className="booking-field">
            <label className="field-label" htmlFor="customer-phone">06 / Telefone e WhatsApp para retorno</label>
            <input id="customer-phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={25} placeholder="(11) 99999-9999" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} aria-invalid={customerPhone !== '' && !validPhone} aria-describedby="customer-phone-help" />
            <p className="field-help" id="customer-phone-help">Informe um número brasileiro com DDD. O código +55 é opcional.</p>
          </div>
          <div className="booking-summary"><p className="field-label">Resumo</p>{bookingReady ? <p>Cliente: {customerName.trim()}<br />Telefone/WhatsApp: {contactPhone}<br />Serviço: {service[1]}<br />Profissional: {barber[1]}<br />Atendimento: {new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))} · {time}<br />Solicitação criada em: {createdLabel}<br />WhatsApp da barbearia: +55 (19) 98186-4461</p> : <p>Selecione serviço, profissional, data e horário e preencha nome e WhatsApp válidos.</p>}</div>
          {bookingReady && <div className="booking-card"><span>Obsidian</span><strong>Solicitação<br />de reserva.</strong><p>Cliente: {customerName.trim()}<br />Telefone/WhatsApp: {contactPhone}<br />Serviço: {service[1]}<br />Profissional: {barber[1]}<br />Atendimento: {new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))} · {time}<br />Solicitação criada em: {createdLabel}<br />WhatsApp da barbearia: +55 (19) 98186-4461</p><p>Aguardando confirmação da barbearia.</p><button onClick={downloadBookingCard}>Baixar card PNG <span>↓</span></button></div>}
          {downloadError && <p className="field-help" role="alert">{downloadError}</p>}
          <button className="button-solid confirm" disabled={!bookingReady} onClick={confirmBooking}>Solicitar pelo WhatsApp <span>→</span></button>
          <p className="field-help">Os dados serão incluídos no card e na mensagem do WhatsApp. O site não armazena reservas; envie a mensagem para solicitar a confirmação.</p>
        </aside>
      </div>}
    </main>
  )
}

export default App
