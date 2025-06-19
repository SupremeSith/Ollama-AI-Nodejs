const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chat = document.getElementById('chat');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  input.value = '';
  showLoader(true);

  try {
    const response = await fetch('http://localhost:3000/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userText }),
    });

    const data = await response.text();
    showLoader(false);
    await appendTypingEffect(data, 'ia');
  } catch (error) {
    showLoader(false);
    appendMessage('Erro ao se comunicar com a IA.', 'ia');
  }
});

function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function appendTypingEffect(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  for (let i = 0; i < text.length; i++) {
    div.textContent += text[i];
    await new Promise((r) => setTimeout(r, 15)); // velocidade de digitação
    chat.scrollTop = chat.scrollHeight;
  }
}

function showLoader(show) {
  loader.classList.toggle('hidden', !show);
}
