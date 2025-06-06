document.getElementById('iaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputText = document.getElementById('inputText').value;
  const chatArea = document.getElementById('chatArea');
  const loadingDiv = document.getElementById('loading');

  if (!inputText.trim()) {
    return;
  }

  // reposta userr
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = inputText;
  chatArea.appendChild(userMessage);

  loadingDiv.style.display = 'block';

  try {
    const res = await fetch('http://localhost:3000/ia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });
    if (!res.ok) {
      throw new Error(`Erro na resposta: ${res.status} ${res.statusText}`);
    }
    const data = await res.text();
    // mensng da ia
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.textContent = data;
    chatArea.appendChild(aiMessage);
  } catch (err) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message error-message';
    errorMessage.textContent = `Erro: ${err.message}`;
    chatArea.appendChild(errorMessage);
  } finally {
    loadingDiv.style.display = 'none';
    document.getElementById('inputText').value = '';
    // scroll até a ultima mennsg
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // -----------------------ajut area d text
  document.getElementById('inputText').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});