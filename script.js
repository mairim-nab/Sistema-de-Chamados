let currentStatus = 'Aberto';
let rating = 0;

const modal = document.getElementById('modal');
const rateModal = document.getElementById('rateModal');
const historyEl = document.getElementById('history');
const messageText = document.getElementById('messageText');
const rateComment = document.getElementById('rateComment');

/* HISTÓRICO */
function addHistory(text) {
  const p = document.createElement('p');
  p.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  historyEl.appendChild(p);
  historyEl.scrollTop = historyEl.scrollHeight;
}

/* STATUS */
document.querySelectorAll('.status-options .dot').forEach((dot) => {
  dot.addEventListener('click', () => {
    const status = dot.dataset.status;
    const color = dot.dataset.color;

    currentStatus = status;
    document
      .querySelectorAll('.dot')
      .forEach((d) => d.classList.remove('active'));
    dot.classList.add('active');

    document.getElementById('statusText').innerHTML =
      `<span class="dot ${color} active"></span> ${status}`;

    addHistory(`Status alterado para "${status}".`);
  });
});

/* MODAL MENSAGEM */
document.getElementById('openMessage').onclick = () =>
  modal.classList.add('show');
document.getElementById('closeModal').onclick = closeModal;

function closeModal() {
  modal.classList.remove('show');
  messageText.value = '';
}

document.getElementById('sendMessage').onclick = () => {
  const msg = messageText.value.trim();
  if (!msg) return;

  if (currentStatus === 'Encerrado') {
    currentStatus = 'Aberto';
    addHistory('Chamado reaberto ao enviar mensagem.');
  }

  addHistory(`Mensagem enviada: "${msg}"`);
  closeModal();
};

/* ENCERRAR */
document.getElementById('closeTicket').onclick = () => {
  if (currentStatus !== 'Encerrado') {
    currentStatus = 'Encerrado';
    addHistory('Chamado encerrado.');
  }
};

/* AVALIAÇÃO */
document.getElementById('rateService').onclick = () => {
  if (currentStatus !== 'Encerrado') {
    addHistory('É necessário encerrar o chamado antes de avaliar.');
    return;
  }
  rateModal.classList.add('show');
};

document.getElementById('closeRate').onclick = closeRate;

function closeRate() {
  rateModal.classList.remove('show');
  rating = 0;
  document
    .querySelectorAll('.stars i')
    .forEach((s) => s.classList.remove('active'));
  rateComment.value = '';
}

document.querySelectorAll('.stars i').forEach((star) => {
  star.onclick = () => {
    rating = star.dataset.value;
    document.querySelectorAll('.stars i').forEach((s) => {
      s.classList.toggle('active', s.dataset.value <= rating);
    });
  };
});

document.getElementById('submitRate').onclick = () => {
  if (rating == 0) return;
  const comment = rateComment.value.trim();

  addHistory(
    `Atendimento avaliado com ${rating} estrela(s)` +
      (comment ? ` — "${comment}"` : ''),
  );
  closeRate();
};

/* ATENDENTE */
document.getElementById('viewAttendant').onclick = () =>
  addHistory('Visualizou informações do atendente.');

document.getElementById('callAttendant').onclick = () =>
  addHistory('Ligação iniciada para o atendente.');

document.getElementById('chatAttendant').onclick = () =>
  modal.classList.add('show');
