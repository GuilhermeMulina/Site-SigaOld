// Função para inicializar o formulário
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o formulário
    setupFormValidation();
    setupFileUploads();
    
    // Adicionar evento de envio do formulário
    document.getElementById('interestForm').addEventListener('submit', handleFormSubmit);
    
    // Verificar estado civil inicial
    toggleRegimeCasamento();
});

// Função para mostrar/esconder o campo de regime de casamento
function toggleRegimeCasamento() {
    const estadoCivil = document.getElementById('estadoCivil').value;
    const regimeCasamentoGroup = document.getElementById('regimeCasamentoGroup');
    const regimeCasamento = document.getElementById('regimeCasamento');
    
    if (estadoCivil === 'casado' || estadoCivil === 'uniao_estavel') {
        regimeCasamentoGroup.style.display = 'block';
        regimeCasamento.setAttribute('required', '');
    } else {
        regimeCasamentoGroup.style.display = 'none';
        regimeCasamento.removeAttribute('required');
    }
}

// Função para configurar os uploads de arquivos
function setupFileUploads() {
    // Configurar cada campo de upload
    setupFileUpload('docIdentidade', 'fileInfoIdentidade', 'uploadBoxIdentidade');
    setupFileUpload('docComprovante', 'fileInfoComprovante', 'uploadBoxComprovante');
    setupFileUpload('docRenda', 'fileInfoRenda', 'uploadBoxRenda');
}

// Função para configurar um campo de upload específico
function setupFileUpload(inputId, infoId, boxId) {
    const input = document.getElementById(inputId);
    const infoElement = document.getElementById(infoId);
    const uploadBox = document.getElementById(boxId);
    
    // Adicionar evento de clique na caixa de upload
    uploadBox.addEventListener('click', () => {
        input.click();
    });
    
    // Adicionar evento de arrastar e soltar
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            // Criar um novo objeto FileList com apenas o primeiro arquivo
            const dt = new DataTransfer();
            dt.items.add(e.dataTransfer.files[0]);
            input.files = dt.files;
        }
        
        // Disparar o evento change para atualizar a interface
        const event = new Event('change');
        input.dispatchEvent(event);
    });
    
    // Adicionar evento de mudança no input
    input.addEventListener('change', () => {
        if (input.files.length > 0) {
            // Mostrar informações de um único arquivo
            const file = input.files[0];
            const fileSize = formatFileSize(file.size);
            infoElement.textContent = `${file.name} (${fileSize})`;
            infoElement.classList.add('success');
            uploadBox.style.borderColor = '#2c5e3f';
        } else {
            // Nenhum arquivo selecionado
            infoElement.textContent = '';
            uploadBox.style.borderColor = '#ccc';
        }
    });
}

// Função para formatar o tamanho do arquivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Função para configurar a validação do formulário
function setupFormValidation() {
    // Adicionar máscaras e validações para campos específicos
    
    // Máscara para CPF
    const cpfInputs = [document.getElementById('cpf'), document.getElementById('cpfConjuge')];
    cpfInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
                }
                
                e.target.value = value;
            });
        }
    });
    
    // Máscara para telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            }
            
            e.target.value = value;
        });
    });
    
    // Máscara para valores monetários
    const moneyInputs = [
        document.getElementById('salario'),
        document.getElementById('valorAluguel')
    ];
    
    moneyInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
                value = (parseInt(value) / 100).toFixed(2);
                e.target.value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            });
        }
    });
}

// Função para lidar com o envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validar o formulário
    const form = document.getElementById('interestForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('invalid');
            isValid = false;
            
            // Mostrar mensagem de erro
            const errorSpan = field.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('required-field')) {
                errorSpan.style.display = 'block';
            }
        } else {
            field.classList.remove('invalid');
            
            // Esconder mensagem de erro
            const errorSpan = field.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('required-field')) {
                errorSpan.style.display = 'none';
            }
        }
    });
    
    if (!isValid) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Aqui você adicionaria o código para enviar os dados para o servidor
    // Por exemplo, usando fetch ou FormData
    
    // Simulação de envio bem-sucedido
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    setTimeout(() => {
        showNotification('Formulário enviado com sucesso! Entraremos em contato em breve.', 'success');
        submitButton.textContent = 'Enviado';
        
        // Opcional: redirecionar para uma página de agradecimento
        // setTimeout(() => {
        //     window.location.href = 'agradecimento.html';
        // }, 2000);
    }, 2000);
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;
    
    // Definir a cor com base no tipo
    if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#2c5e3f';
    } else {
        notification.style.backgroundColor = '#3498db';
    }
    
    // Mostrar a notificação
    notification.style.display = 'block';
    
    // Esconder após 5 segundos
    setTimeout(closeNotification, 5000);
}

// Função para fechar a notificação
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}