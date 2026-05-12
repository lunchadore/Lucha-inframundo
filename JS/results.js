// Load and display event results
document.addEventListener('DOMContentLoaded', () => {
    fetch('lucha_inframundo_site_events.json')
        .then(res => res.json())
        .then(data => {
            renderResults(data);
        })
        .catch(err => console.error("Error loading results:", err));
});

function renderResults(events) {
    const container = document.getElementById('results-container');
    container.innerHTML = '';

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        let eventHtml = `
            <div class="col-12 mb-5">
                <div class="event-card">
                    <div class="event-header bg-dark text-white p-4 border-bottom border-gold">
                        <h2 class="fw-black text-uppercase mb-1">${event.event}</h2>
                        <p class="text-gold mb-0">${formattedDate}</p>
                    </div>
                    <div class="event-matches p-4">
        `;

        event.matches.forEach(match => {
            const titleBadge = match.title ? `<span class="badge bg-gold text-dark ms-2">${match.title}</span>` : '';
            const resultClass = match.result === match.competitor1 ? 'winner-1' : 'winner-2';

            eventHtml += `
                <div class="match-result mb-4 pb-4 border-bottom">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="text-uppercase text-muted small">${match.type}</h5>
                        ${titleBadge}
                    </div>
                    <div class="row g-3">
                        <div class="col-md-5">
                            <div class="competitor-card ${match.result === match.competitor1 ? 'winner' : 'loser'}">
                                <h6 class="fw-bold text-uppercase">${match.competitor1}</h6>
                                ${match.result === match.competitor1 ? '<span class="winner-badge">WINNER</span>' : '<span class="loser-badge">LOSER</span>'}
                            </div>
                        </div>
                        <div class="col-md-2 text-center d-flex align-items-center justify-content-center">
                            <span class="text-muted fw-bold">VS</span>
                        </div>
                        <div class="col-md-5">
                            <div class="competitor-card ${match.result === match.competitor2 ? 'winner' : 'loser'}">
                                <h6 class="fw-bold text-uppercase">${match.competitor2}</h6>
                                ${match.result === match.competitor2 ? '<span class="winner-badge">WINNER</span>' : '<span class="loser-badge">LOSER</span>'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        eventHtml += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += eventHtml;
    });
}
