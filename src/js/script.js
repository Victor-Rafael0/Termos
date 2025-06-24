const checkbox = document.getElementById('aceite');
const submitBtn = document.getElementById('submit-btn');

checkbox.addEventListener('change', function() {
    submitBtn.disabled = !this.checked;
});

const form = document.getElementById('terms-form');
const statusDiv = document.getElementById('form-status');
const dataAceiteInput = document.getElementById('data_aceite');

async function handleSubmit(event) {
    event.preventDefault();

    dataAceiteInput.value = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        statusDiv.style.display = 'block';

        if (response.ok) {
            statusDiv.innerHTML = "Obrigado! Seu aceite foi registrado com sucesso.";
            statusDiv.className = 'status-success';
            form.reset();
            submitBtn.disabled = true;
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                statusDiv.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                statusDiv.innerHTML = "Oops! Houve um problema ao enviar seu aceite. Tente novamente.";
            }
            statusDiv.className = 'status-error';
        }
    } catch (error) {
        statusDiv.style.display = 'block';
        statusDiv.innerHTML = "Oops! Houve um problema de conexão. Tente novamente.";
        statusDiv.className = 'status-error';
    }
}

form.addEventListener("submit", handleSubmit);