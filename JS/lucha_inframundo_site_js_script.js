let allWrestlers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetch('roster.json')
        .then(res => res.json())
        .then(data => {
            allWrestlers = data;
            renderRoster(allWrestlers);
        })
        .catch(err => console.error("Error loading roster:", err));
});

function renderRoster(data) {
    const grid = document.getElementById('roster-grid');
    grid.innerHTML = '';

    let html = '';
    data.forEach(w => {
        html += `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 wrestler-card" data-wrestler-id="${w.id}">
                    <div class="card-img-container">
                        <img src="${w.image || 'https://via.placeholder.com/400x600?text=IMAGE+PENDING'}" class="card-img-top" alt="${w.name || 'Unknown'}" onerror="this.src='https://via.placeholder.com/400x600?text=IMAGE+PENDING'">
                        <div class="record-badge">REC: ${w.record || 'N/A'}</div>
                    </div>
                    <div class="card-body p-3">
                        <p class="text-muted small mb-0 font-monospace text-uppercase">${w.style || 'Unknown'}</p>
                        <h5 class="card-title">${w.name || 'Unknown'}</h5>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;

    // Event delegation for showing bio
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.wrestler-card');
        if (card) {
            const wrestlerId = parseInt(card.dataset.wrestlerId);
            showBio(wrestlerId);
        }
    });
}

function filterRoster(brand) {
    if (brand === 'All') {
        renderRoster(allWrestlers);
    } else {
        const filtered = allWrestlers.filter(w => w.brand === brand);
        renderRoster(filtered);
    }
}

window.showBio = (id) => {
    const w = allWrestlers.find(x => x.id === id);
    if (!w) {
        console.error("Wrestler not found:", id);
        return;
    }

    const container = document.getElementById('modal-body-container');
    
    container.innerHTML = `
        <div class="row g-0">
            <div class="col-md-5 bg-light border-end">
                <img src="${w.image || 'https://via.placeholder.com/400x600?text=IMAGE+PENDING'}" class="modal-profile-img" alt="${w.name || 'Unknown'}" onerror="this.src='https://via.placeholder.com/400x600?text=IMAGE+PENDING'">
                <div class="p-4">
                    <h6 class="fw-bold text-danger border-bottom pb-2 mb-3 text-uppercase">Vitals</h6>
                    <ul class="list-unstyled small">
                        <li class="mb-2"><strong>HOMETOWN:</strong> ${w.hometown || 'Unknown'}</li>
                        <li class="mb-2"><strong>HEIGHT/WEIGHT:</strong> ${w.vitals || 'Unknown'}</li>
                        <li class="mb-2"><strong>STYLE:</strong> ${w.style || 'Unknown'}</li>
                        <li class="mb-2"><strong>W-L RECORD:</strong> ${w.record || 'N/A'}</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-7 p-4">
                <h6 class="text-muted text-uppercase small mb-1">${w.brand || 'Unknown'}</h6>
                <h1 class="fw-black text-uppercase mb-2">${w.name || 'Unknown'}</h1>
                <div class="mb-3">
                    <span class="badge bg-gold text-dark py-2 px-3">${w.titles || 'No Current Titles'}</span>
                </div>
                <hr>
                <h6 class="fw-bold text-danger text-uppercase small">Scouting Report</h6>
                <p class="text-muted">${w.bio || 'No bio available'}</p>
                <h6 class="fw-bold text-danger text-uppercase small mt-4">Signature Arsenal</h6>
                <p class="font-monospace small">${w.moves || 'No moves listed'}</p>
            </div>
        </div>
    `;
    
    const myModal = new bootstrap.Modal(document.getElementById('bioModal'));
    myModal.show();
};
