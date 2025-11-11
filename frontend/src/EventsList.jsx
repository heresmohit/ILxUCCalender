import React, { useMemo } from 'react'
import events from './output.json'
import './EventsList.css'

function parseLocal(dateStr) {
  // input: "YYYY-MM-DD HH:MM:SS" -> create a Date or null if invalid
  if (!dateStr) return null
  const iso = dateStr.replace(' ', 'T')
  const d = new Date(iso)
  if (isNaN(d)) return null
  return d
}

function shortText(text, n = 140) {
  if (!text) return ''
  const cleaned = text.replace(/\s+/g, ' ').trim()
  return cleaned.length > n ? cleaned.slice(0, n).trim() + '…' : cleaned
}

export default function EventsList() {
  // no per-card expansion — Learn more links to underline.center

  const now = useMemo(() => new Date(), [])

  // Filter out events whose start date exists and is in the past.
  // Then sort by start date ascending; items without a valid date go to the end.
  const visible = useMemo(() => {
    const copy = (events || []).slice()
    return copy
      .filter(ev => {
        const d = parseLocal(ev.event_starts_at)
        if (!d) return true // include if no valid date
        return d.getTime() >= now.getTime()
      })
      .sort((a, b) => {
        const da = parseLocal(a.event_starts_at)
        const db = parseLocal(b.event_starts_at)
        if (da && db) return da.getTime() - db.getTime()
        if (da && !db) return -1
        if (!da && db) return 1
        return 0
      })
  }, [now])

  // expansion removed per user request

  return (
    <main className="events-root">
      <header className="events-header">
        <h1>Improvlore Events</h1>
        <p className="subtitle">Upcoming Improvlore shows — tap Buy Ticket or Learn more for details.</p>
      </header>

      <section className="events-list">
        {visible.map((ev, i) => {
          const key = ev.slug || i
          const start = parseLocal(ev.event_starts_at)
          const startText = start ? start.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : ''
          const dateLabel = start ? (start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })) : ''
          // Prefer larger thumbnails (index 0 or 1) to get wide photos
          const thumb = (ev.thumbnails && ev.thumbnails[0] && ev.thumbnails[0].url) || (ev.thumbnails && ev.thumbnails[1] && ev.thumbnails[1].url) || ev.image_url || ''
          const buyUrl = ev.url || '#'
          // Derive a 1-sentence tagline from the excerpt (first sentence) as a fallback
          const tagline = (ev.excerpt && ev.excerpt.split(/[\.\!\?]\s/)[0]) || ''
          // We'll show the excerpt as a single paragraph (shortened unless expanded)
          const excerpt = ev.excerpt || ''
          const isExpanded = false

          return (
            <article className={"event-row" + (isExpanded ? ' expanded' : '')} key={key}>
              {thumb ? (
                <div className="event-media">
                  <img src={thumb} alt={ev.title} className="event-photo" />
                </div>
              ) : null}

              <div className="event-content">
                <div className="event-head">
                  <h2 className="event-title">{ev.title}</h2>
                  {dateLabel ? <div className="event-datetime">{dateLabel} • {ev.location || 'Underline center, Indiranagar'}</div> : <div className="event-datetime">{startText}</div>}
                </div>

                

                <p className="event-excerpt">{shortText(excerpt, 180)}</p>

                <div className="event-cta">
                  <a className="btn primary" href={buyUrl} target="_blank" rel="noopener noreferrer">Buy Ticket</a>
                    <a
                      className="btn ghost learn-more"
                      href={ev.slug ? `https://underline.center/t/${ev.slug}` : 'https://underline.center'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <div className="social-footer">
        <p className="social-lead">Stay in the loop</p>
        <div className="social-actions">
          <a className="social-btn whatsapp" href="https://chat.whatsapp.com/CRv3J3K0xRG8iQnTBI4hMa" target="_blank" rel="noopener noreferrer">💬 Join our WhatsApp community</a>
          <a className="social-btn instagram" href="https://instagram.com/improvlore" target="_blank" rel="noopener noreferrer">📸 @improvlore</a>
        </div>
      </div>

      <footer className="events-footer">Data from <code>underline.center</code></footer>
    </main>
  )
}
