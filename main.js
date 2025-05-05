// Variáveis globais
let currentUser = null
let isLoggedIn = false

// Função para inicializar o site quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os dropdowns para dispositivos móveis
  initMobileDropdowns()

  // Inicializa o formulário de busca
  initSearchForm()

  // Inicializa os formulários de login e cadastro
  initLoginForm()
  initRegistrationForm()

  // Verifica se o usuário já está logado (simulação)
  checkLoginStatus()
})

// Função para inicializar dropdowns em dispositivos móveis
function initMobileDropdowns() {
  if (window.innerWidth <= 768) {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault()
        const parent = this.parentElement

        // Fecha todos os outros dropdowns
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          if (dropdown !== parent) {
            dropdown.classList.remove("active")
          }
        })

        // Alterna o estado do dropdown atual
        parent.classList.toggle("active")
      })
    })
  }
}

// Função para inicializar o formulário de busca
function initSearchForm() {
  const searchInput = document.getElementById("search-input")

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        const searchTerm = this.value.trim()

        if (searchTerm) {
          // Simula uma busca
          showNotification(`Buscando por: "${searchTerm}"`)

          // Em um site real, redirecionaria para uma página de resultados
          // window.location.href = `resultados.html?q=${encodeURIComponent(searchTerm)}`;
        }
      }
    })
  }
}

// Função para inicializar o formulário de login
function initLoginForm() {
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simulação de autenticação
      if (email && password) {
        // Em um site real, isso seria uma chamada para o servidor
        simulateLogin(email, password)
      } else {
        showNotification("Por favor, preencha todos os campos.")
      }
    })
  }
}

// Função para inicializar o formulário de cadastro
function initRegistrationForm() {
  const registerForm = document.getElementById("register-form")

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("reg-name").value
      const email = document.getElementById("reg-email").value
      const cpf = document.getElementById("reg-cpf").value
      const phone = document.getElementById("reg-phone").value
      const password = document.getElementById("reg-password").value
      const confirmPassword = document.getElementById("reg-confirm-password").value
      const terms = document.getElementById("terms").checked

      // Validação básica
      if (!name || !email || !cpf || !phone || !password || !confirmPassword) {
        showNotification("Por favor, preencha todos os campos.")
        return
      }

      if (password !== confirmPassword) {
        showNotification("As senhas não coincidem.")
        return
      }

      if (!terms) {
        showNotification("Você precisa aceitar os termos de uso.")
        return
      }

      // Simulação de registro
      simulateRegistration(name, email)
    })
  }
}

// Função para simular login
function simulateLogin(email, password) {
  // Simulação de autenticação bem-sucedida
  setTimeout(() => {
    currentUser = {
      name: email.split("@")[0], // Usa parte do email como nome
      email: email,
      isStudent: true,
    }

    isLoggedIn = true

    // Atualiza a interface
    updateUIAfterLogin()

    // Fecha o modal
    closeLoginModal()

    // Mostra notificação
    showNotification(`Bem-vindo(a), ${currentUser.name}!`)

    // Redireciona para a área do aluno após login
    setTimeout(() => {
      window.location.href = "area-aluno.html"
    }, 1500)
  }, 1000)
}

// Função para simular registro
function simulateRegistration(name, email) {
  // Simulação de registro bem-sucedido
  setTimeout(() => {
    currentUser = {
      name: name,
      email: email,
      isStudent: true,
    }

    isLoggedIn = true

    // Atualiza a interface
    updateUIAfterLogin()

    // Fecha o modal
    closeRegistrationModal()

    // Mostra notificação
    showNotification(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}!`)

    // Redireciona para a área do aluno após cadastro
    setTimeout(() => {
      window.location.href = "area-aluno.html"
    }, 1500)
  }, 1000)
}

// Função para verificar status de login (simulação)
function checkLoginStatus() {
  // Em um site real, isso verificaria cookies/localStorage ou faria uma chamada ao servidor
  const savedUser = localStorage.getItem("currentUser")

  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser)
      isLoggedIn = true
      updateUIAfterLogin()
    } catch (e) {
      console.error("Erro ao recuperar usuário:", e)
      localStorage.removeItem("currentUser")
    }
  }
}

// Modifica a função updateUIAfterLogin para atualizar o botão de login
function updateUIAfterLogin() {
  // Salva o usuário no localStorage (simulação)
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Atualiza o botão de login
  const loginButton = document.querySelector(".nav-links button")
  if (loginButton) {
    loginButton.textContent = `Olá, ${currentUser.name}`
    loginButton.onclick = () => {
      window.location.href = "area-aluno.html"
    }
  }
}

// Modifica a função showUserMenu para redirecionar para a área do aluno
function showUserMenu() {
  // Redireciona para a área do aluno
  window.location.href = "area-aluno.html"
}

// Função para fazer logout
function logout() {
  currentUser = null
  isLoggedIn = false
  localStorage.removeItem("currentUser")

  // Atualiza a interface
  const loginButton = document.querySelector(".nav-links button")
  if (loginButton) {
    loginButton.textContent = "Login / Área Exclusiva"
    loginButton.onclick = openLoginModal
  }

  showNotification("Você saiu da sua conta.")
}

// Modifique a função navigateTo para usar apenas parâmetros em vez de arquivos diferentes
function navigateTo(page, section = null) {
  // Para todas as páginas, incluindo detalhes-curso.html, usamos o mesmo padrão
  if (section) {
    window.location.href = page + "?section=" + section
  } else {
    window.location.href = page
  }
}

// Funções para modais
function openLoginModal() {
  document.getElementById("login-modal").style.display = "block"
}

function closeLoginModal() {
  document.getElementById("login-modal").style.display = "none"
}

function openRegistrationModal() {
  document.getElementById("registration-form").style.display = "block"
}

function closeRegistrationModal() {
  document.getElementById("registration-form").style.display = "none"
}

function showRegistrationForm() {
  closeLoginModal()
  openRegistrationModal()
}

function showLoginForm() {
  closeRegistrationModal()
  openLoginModal()
}

// Função para mostrar notificações
function showNotification(message) {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  notificationMessage.textContent = message
  notification.style.display = "block"

  // Fecha automaticamente após 5 segundos
  setTimeout(() => {
    closeNotification()
  }, 5000)
}

function closeNotification() {
  document.getElementById("notification").style.display = "none"
}

// Fecha modais quando o usuário clica fora deles
window.onclick = (event) => {
  const loginModal = document.getElementById("login-modal")
  const registrationModal = document.getElementById("registration-form")

  if (event.target === loginModal) {
    closeLoginModal()
  }

  if (event.target === registrationModal) {
    closeRegistrationModal()
  }
}
