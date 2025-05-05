// Variáveis globais
/*let studentData = null
let currentSection = "dashboard"

// Função para inicializar a área do aluno quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  checkStudentLoginStatus()

  // Inicializa a navegação entre seções
  initSectionNavigation()

  // Inicializa os formulários
  initProfileForm()
  initRequestForm()
})

// Função para verificar se o usuário está logado como aluno
function checkStudentLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (!currentUser || !currentUser.isStudent) {
    // Redireciona para a página de login se não estiver logado como aluno
    showNotification("Você precisa estar logado como aluno para acessar esta área.")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000)
    return
  }

  // Carrega os dados do aluno
  loadStudentData(currentUser.email)
}

// Função para carregar os dados do aluno
function loadStudentData(email) {
  // Em um sistema real, isso seria uma chamada para o servidor
  // Aqui vamos simular com dados estáticos

  // Verifica se já temos dados do aluno no localStorage
  const storedStudentData = localStorage.getItem("studentData_" + email)

  if (storedStudentData) {
    studentData = JSON.parse(storedStudentData)
  } else {
    // Cria dados simulados para o aluno
    studentData = createMockStudentData(email)

    // Salva no localStorage para uso futuro
    localStorage.setItem("studentData_" + email, JSON.stringify(studentData))
  }

  // Atualiza a interface com os dados do aluno
  updateStudentUI()
}

// Função para criar dados simulados do aluno
function createMockStudentData(email) {
  const firstName = email.split("@")[0]
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return {
    personalInfo: {
      name: capitalizedName + " Silva Santos",
      email: email,
      ra:
        "RA" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      cpf: "123.456.789-00",
      birthDate: "1995-05-15",
      gender: "M",
      phone: "(11) 98765-4321",
      address: {
        cep: "01234-567",
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
      },
    },
    academicInfo: {
      course: "Análise e Desenvolvimento de Sistemas",
      modality: "Presencial",
      period: "Noturno",
      currentSemester: 3,
      totalSemesters: 5,
      startDate: "2023-02-01",
      expectedEndDate: "2025-12-15",
      coordinator: "Prof. Dr. Carlos Mendes",
      campus: "Senac Lapa Scipião",
    },
    subjects: [
      {
        id: "prog-web",
        name: "Programação Web",
        teacher: "Profa. Ana Souza",
        schedule: "Segunda e Quarta, 19h às 22h",
        grades: {
          grade1: 8.5,
          grade2: null,
          finalGrade: null,
        },
        attendance: 92,
        status: "Em andamento",
      },
      {
        id: "banco-dados",
        name: "Banco de Dados",
        teacher: "Prof. Ricardo Almeida",
        schedule: "Terça e Quinta, 19h às 22h",
        grades: {
          grade1: 7.0,
          grade2: null,
          finalGrade: null,
        },
        attendance: 85,
        status: "Em andamento",
      },
      {
        id: "eng-software",
        name: "Engenharia de Software",
        teacher: "Prof. Marcos Oliveira",
        schedule: "Sexta, 19h às 23h",
        grades: {
          grade1: 9.0,
          grade2: null,
          finalGrade: null,
        },
        attendance: 95,
        status: "Em andamento",
      },
      {
        id: "redes",
        name: "Redes de Computadores",
        teacher: "Profa. Juliana Costa",
        schedule: "Sábado, 8h às 12h",
        grades: {
          grade1: 6.5,
          grade2: null,
          finalGrade: null,
        },
        attendance: 78,
        status: "Em andamento",
      },
    ],
    history: [
      {
        semester: "2023.1",
        subjects: [
          {
            name: "Algoritmos e Lógica de Programação",
            teacher: "Prof. Fernando Santos",
            finalGrade: 8.0,
            attendance: 90,
            status: "Aprovado",
          },
          {
            name: "Introdução à Computação",
            teacher: "Profa. Carla Mendes",
            finalGrade: 9.5,
            attendance: 95,
            status: "Aprovado",
          },
          {
            name: "Matemática Aplicada",
            teacher: "Prof. Paulo Ribeiro",
            finalGrade: 7.5,
            attendance: 85,
            status: "Aprovado",
          },
        ],
      },
      {
        semester: "2023.2",
        subjects: [
          {
            name: "Programação Orientada a Objetos",
            teacher: "Prof. Gustavo Lima",
            finalGrade: 8.5,
            attendance: 92,
            status: "Aprovado",
          },
          {
            name: "Estrutura de Dados",
            teacher: "Profa. Mariana Costa",
            finalGrade: 7.0,
            attendance: 88,
            status: "Aprovado",
          },
          {
            name: "Interface Humano-Computador",
            teacher: "Prof. Roberto Alves",
            finalGrade: 9.0,
            attendance: 94,
            status: "Aprovado",
          },
        ],
      },
    ],
    financial: {
      monthlyFee: 850.0,
      dueDay: 10,
      scholarship: "Desconto Ex-Aluno: 10%",
      status: "Em dia",
      payments: [
        {
          reference: "Junho/2024",
          dueDate: "2024-06-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pago",
          paymentDate: "2024-06-08",
        },
        {
          reference: "Julho/2024",
          dueDate: "2024-07-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pendente",
          paymentDate: null,
        },
        {
          reference: "Agosto/2024",
          dueDate: "2024-08-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pendente",
          paymentDate: null,
        },
      ],
    },
    materials: [
      {
        id: "mat-1",
        subject: "Programação Web",
        title: "Apostila de HTML e CSS",
        description: "Material completo sobre HTML5 e CSS3",
        type: "PDF",
        uploadDate: "2024-05-10",
        size: "5.2 MB",
      },
      {
        id: "mat-2",
        subject: "Programação Web",
        title: "Slides - JavaScript Básico",
        description: "Apresentação sobre fundamentos de JavaScript",
        type: "PDF",
        uploadDate: "2024-05-15",
        size: "3.8 MB",
      },
      {
        id: "mat-3",
        subject: "Banco de Dados",
        title: "Apostila SQL",
        description: "Material sobre SQL e modelagem de dados",
        type: "PDF",
        uploadDate: "2024-05-05",
        size: "7.1 MB",
      },
      {
        id: "mat-4",
        subject: "Engenharia de Software",
        title: "Slides - Metodologias Ágeis",
        description: "Apresentação sobre Scrum e Kanban",
        type: "PDF",
        uploadDate: "2024-05-20",
        size: "4.5 MB",
      },
    ],
    activities: [
      {
        id: "act-1",
        subject: "Programação Web",
        title: "Prova P1",
        description: "Avaliação sobre HTML, CSS e JavaScript",
        dueDate: "2024-06-15",
        status: "Pendente",
      },
      {
        id: "act-2",
        subject: "Banco de Dados",
        title: "Trabalho - Modelagem ER",
        description: "Criar um modelo ER para um sistema de e-commerce",
        dueDate: "2024-06-20",
        status: "Pendente",
      },
      {
        id: "act-3",
        subject: "Engenharia de Software",
        title: "Seminário - Métodos Ágeis",
        description: "Apresentação em grupo sobre um método ágil",
        dueDate: "2024-06-25",
        status: "Pendente",
      },
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Semana Acadêmica",
        content:
          "A Semana Acadêmica de Tecnologia acontecerá entre os dias 10 e 14 de julho. Programação completa em breve!",
        date: "2024-05-25",
        author: "Coordenação do Curso",
      },
      {
        id: "ann-2",
        title: "Alteração de Horário",
        content: "As aulas de Programação Web do dia 05/06 serão transferidas para o dia 08/06, no mesmo horário.",
        date: "2024-05-28",
        author: "Profa. Ana Souza",
      },
    ],
    requests: [
      {
        id: "req-1",
        protocol: "2024050001",
        type: "Declaração de Matrícula",
        date: "2024-05-10",
        status: "Concluído",
        description: "Solicitação de declaração de matrícula para estágio",
      },
      {
        id: "req-2",
        protocol: "2024050015",
        type: "Revisão de Nota",
        date: "2024-05-20",
        status: "Em análise",
        description: "Revisão da nota da P1 de Estrutura de Dados do semestre 2023.2",
      },
    ],
    calendar: [
      {
        month: "Junho/2024",
        events: [
          {
            date: "05/06/2024",
            title: "Feriado - Corpus Christi",
            description: "Não haverá aula",
          },
          {
            date: "15/06/2024",
            title: "Prova P1 - Programação Web",
            description: "Conteúdo: HTML, CSS e JavaScript",
          },
          {
            date: "20/06/2024",
            title: "Entrega de Trabalho - Banco de Dados",
            description: "Modelagem ER para sistema de e-commerce",
          },
        ],
      },
      {
        month: "Julho/2024",
        events: [
          {
            date: "10/07/2024 a 14/07/2024",
            title: "Semana Acadêmica de Tecnologia",
            description: "Palestras, workshops e atividades especiais",
          },
          {
            date: "15/07/2024 a 31/07/2024",
            title: "Recesso Escolar",
            description: "Férias de inverno",
          },
        ],
      },
    ],
  }
}
// Atualiza o nome do usuário no menu
document.getElementById("user-name").textContent = studentData.personalInfo.name.split(" ")[0]

// Atualiza informações da sidebar
document.getElementById("sidebar-student-name").textContent = studentData.personalInfo.name
document.getElementById("sidebar-student-course").textContent = studentData.academicInfo.course
document.getElementById("sidebar-student-ra").textContent = "RA: " + studentData.personalInfo.ra

// Carrega os dados da seção atual
loadSectionData(currentSection)


// Função para inicializar a navegação entre seções
function initSectionNavigation() {
  
  // Adiciona eventos de clique para os itens do menu
  const menuItems = document.querySelectorAll(".student-menu li")

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove a classe 'active' de todos os itens
      menuItems.forEach((i) => i.classList.remove("active"))

      // Adiciona a classe 'active' ao item clicado
      this.classList.add("active")

      // Obtém a seção a ser exibida
      const section = this.getAttribute("data-section")

      // Carrega os dados da seção
      loadSectionData(section)
    })
  })

  // Verifica se há uma seção específica na URL
  const urlParams = new URLSearchParams(window.location.search)
  const sectionParam = urlParams.get("section")

  if (sectionParam) {
    // Ativa a seção especificada na URL
    const sectionItem = document.querySelector(`.student-menu li[data-section="${sectionParam}"]`)
    if (sectionItem) {
      sectionItem.click()
    }
  }
}

// Função para carregar os dados de uma seção específica
function loadSectionData(section) {
  // Oculta todas as seções
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((s) => s.classList.remove("active"))

  // Exibe a seção selecionada
  const selectedSection = document.getElementById(section)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }

  // Atualiza a seção atual
  currentSection = section

  // Carrega os dados específicos da seção
  switch (section) {
    case "dashboard":
      loadDashboardData()
      break
    case "academico":
      loadAcademicData()
      break
    case "notas":
      loadGradesData()
      break
    case "materiais":
      loadMaterialsData()
      break
    case "financeiro":
      loadFinancialData()
      break
    case "requerimentos":
      loadRequestsData()
      break
    case "calendario":
      loadCalendarData()
      break
    case "perfil":
      loadProfileData()
      break
  }
}

// Função para carregar os dados do dashboard
function loadDashboardData() {
  // Atualiza o nome do aluno
  document.getElementById("dashboard-student-name").textContent = studentData.personalInfo.name.split(" ")[0]

  // Atualiza os cards do dashboard
  document.getElementById("active-subjects").textContent = studentData.subjects.length

  // Calcula a média geral
  let totalGrade = 0
  let gradeCount = 0

  studentData.subjects.forEach((subject) => {
    if (subject.grades.grade1) {
      totalGrade += subject.grades.grade1
      gradeCount++
    }
    if (subject.grades.grade2) {
      totalGrade += subject.grades.grade2
      gradeCount++
    }
  })

  const averageGrade = gradeCount > 0 ? (totalGrade / gradeCount).toFixed(1) : "N/A"
  document.getElementById("overall-average").textContent = averageGrade

  // Calcula a frequência média
  let totalAttendance = 0

  studentData.subjects.forEach((subject) => {
    totalAttendance += subject.attendance
  })

  const averageAttendance =
    studentData.subjects.length > 0 ? (totalAttendance / studentData.subjects.length).toFixed(0) + "%" : "N/A"
  document.getElementById("overall-attendance").textContent = averageAttendance

  // Atualiza a situação financeira
  document.getElementById("financial-status").textContent = studentData.financial.status

  // Carrega as próximas atividades
  const activitiesContainer = document.getElementById("upcoming-activities")
  activitiesContainer.innerHTML = ""

  if (studentData.activities.length > 0) {
    studentData.activities.forEach((activity) => {
      const activityElement = document.createElement("div")
      activityElement.className = "activity-item"

      // Formata a data
      const dueDate = new Date(activity.dueDate)
      const formattedDate = dueDate.toLocaleDateString("pt-BR")

      activityElement.innerHTML = `
                <div class="activity-date">${formattedDate}</div>
                <div class="activity-info">
                    <h4>${activity.title}</h4>
                    <p>${activity.subject} - ${activity.description}</p>
                </div>
            `

      activitiesContainer.appendChild(activityElement)
    })
  } else {
    activitiesContainer.innerHTML = "<p>Não há atividades próximas.</p>"
  }

  // Carrega os avisos
  const announcementsContainer = document.getElementById("announcements")
  announcementsContainer.innerHTML = ""

  if (studentData.announcements.length > 0) {
    studentData.announcements.forEach((announcement) => {
      const announcementElement = document.createElement("div")
      announcementElement.className = "announcement-item"

      // Formata a data
      const announcementDate = new Date(announcement.date)
      const formattedDate = announcementDate.toLocaleDateString("pt-BR")

      announcementElement.innerHTML = `
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
                <div class="announcement-meta">
                    <span>${announcement.author}</span>
                    <span>${formattedDate}</span>
                </div>
            `

      announcementsContainer.appendChild(announcementElement)
    })
  } else {
    announcementsContainer.innerHTML = "<p>Não há avisos no momento.</p>"
  }
}

// Função para carregar os dados acadêmicos
function loadAcademicData() {
  // Carrega informações do curso
  document.getElementById("course-name").textContent = studentData.academicInfo.course
  document.getElementById("course-modality").textContent = studentData.academicInfo.modality
  document.getElementById("course-period").textContent = studentData.academicInfo.period
  document.getElementById("current-semester").textContent =
    `${studentData.academicInfo.currentSemester}º de ${studentData.academicInfo.totalSemesters}`
  document.getElementById("coordinator").textContent = studentData.academicInfo.coordinator
  document.getElementById("campus").textContent = studentData.academicInfo.campus

  // Carrega disciplinas do semestre atual
  const subjectsContainer = document.getElementById("current-subjects")
  subjectsContainer.innerHTML = ""

  if (studentData.subjects.length > 0) {
    studentData.subjects.forEach((subject) => {
      const subjectElement = document.createElement("div")
      subjectElement.className = "subject-item"

      subjectElement.innerHTML = `
                <div class="subject-info">
                    <h4>${subject.name}</h4>
                    <p>${subject.teacher}</p>
                </div>
                <div class="subject-schedule">${subject.schedule}</div>
            `

      subjectsContainer.appendChild(subjectElement)
    })
  } else {
    subjectsContainer.innerHTML = "<p>Não há disciplinas cadastradas para o semestre atual.</p>"
  }

  // Carrega histórico acadêmico
  const historyContainer = document.getElementById("academic-history")
  historyContainer.innerHTML = ""

  if (studentData.history.length > 0) {
    studentData.history.forEach((semester) => {
      const semesterElement = document.createElement("div")
      semesterElement.className = "semester-group"

      let semesterHTML = `
                <div class="semester-header">
                    <h3>Semestre ${semester.semester}</h3>
                </div>
                <div class="semester-subjects">
            `

      semester.subjects.forEach((subject) => {
        // Define a classe de status
        let statusClass = ""
        if (subject.status === "Aprovado") {
          statusClass = "grade-approved"
        } else if (subject.status === "Reprovado") {
          statusClass = "grade-failed"
        } else {
          statusClass = "grade-ongoing"
        }

        semesterHTML += `
                    <div class="history-subject">
                        <div class="history-subject-info">
                            <h4>${subject.name}</h4>
                            <p>${subject.teacher}</p>
                        </div>
                        <div class="history-subject-grade ${statusClass}">
                            ${subject.finalGrade.toFixed(1)}
                        </div>
                    </div>
                `
      })

      semesterHTML += `</div>`
      semesterElement.innerHTML = semesterHTML

      historyContainer.appendChild(semesterElement)
    })
  } else {
    historyContainer.innerHTML = "<p>Não há histórico acadêmico disponível.</p>"
  }
}

// Função para carregar os dados de notas e frequência
function loadGradesData() {
  // Carrega as notas na tabela
  const gradesTableBody = document.getElementById("grades-table-body")
  gradesTableBody.innerHTML = ""

  if (studentData.subjects.length > 0) {
    studentData.subjects.forEach((subject) => {
      const row = document.createElement("tr")

      // Calcula a média
      let average = null
      if (subject.grades.grade1 !== null && subject.grades.grade2 !== null) {
        average = (subject.grades.grade1 + subject.grades.grade2) / 2
      } else if (subject.grades.grade1 !== null) {
        average = subject.grades.grade1
      }

      // Define a classe de status
      let statusClass = ""
      if (subject.status === "Aprovado") {
        statusClass = "grade-approved"
      } else if (subject.status === "Reprovado") {
        statusClass = "grade-failed"
      } else {
        statusClass = "grade-ongoing"
      }

      row.innerHTML = `
                <td>${subject.name}</td>
                <td>${subject.teacher}</td>
                <td class="grade-value">${subject.grades.grade1 !== null ? subject.grades.grade1.toFixed(1) : "-"}</td>
                <td class="grade-value">${subject.grades.grade2 !== null ? subject.grades.grade2.toFixed(1) : "-"}</td>
                <td class="grade-value">${average !== null ? average.toFixed(1) : "-"}</td>
                <td>${subject.attendance}%</td>
                <td class="${statusClass}">${subject.status}</td>
            `

      gradesTableBody.appendChild(row)
    })
  } else {
    gradesTableBody.innerHTML = `<tr><td colspan="7">Não há disciplinas cadastradas para o semestre atual.</td></tr>`
  }

  // Calcula e exibe a média geral do semestre
  let totalGrade = 0
  let gradeCount = 0

  studentData.subjects.forEach((subject) => {
    if (subject.grades.grade1) {
      totalGrade += subject.grades.grade1
      gradeCount++
    }
    if (subject.grades.grade2) {
      totalGrade += subject.grades.grade2
      gradeCount++
    }
  })

  const averageGrade = gradeCount > 0 ? (totalGrade / gradeCount).toFixed(1) : "N/A"
  document.getElementById("semester-average").textContent = averageGrade

  // Calcula e exibe a frequência média
  let totalAttendance = 0

  studentData.subjects.forEach((subject) => {
    totalAttendance += subject.attendance
  })

  const averageAttendance =
    studentData.subjects.length > 0 ? (totalAttendance / studentData.subjects.length).toFixed(0) + "%" : "N/A"
  document.getElementById("semester-attendance").textContent = averageAttendance

  // Adiciona evento de mudança para o select de semestre
  document.getElementById("semester-select").addEventListener("change", () => {
    // Em um sistema real, isso carregaria as notas do semestre selecionado
    showNotification("Funcionalidade em desenvolvimento: Carregando notas de semestres anteriores.")
  })
}

// Função para carregar os materiais de aula
function loadMaterialsData() {
  // Preenche o select de disciplinas
  const subjectSelect = document.getElementById("material-subject-select")
  subjectSelect.innerHTML = '<option value="all">Todas as Disciplinas</option>'

  // Cria um conjunto de disciplinas únicas
  const uniqueSubjects = new Set()

  studentData.materials.forEach((material) => {
    uniqueSubjects.add(material.subject)
  })

  // Adiciona as opções ao select
  uniqueSubjects.forEach((subject) => {
    const option = document.createElement("option")
    option.value = subject
    option.textContent = subject
    subjectSelect.appendChild(option)
  })

  // Carrega os materiais
  loadFilteredMaterials("all")

  // Adiciona evento de mudança para o select de disciplinas
  subjectSelect.addEventListener("change", function () {
    loadFilteredMaterials(this.value)
  })
}

// Função para carregar materiais filtrados por disciplina
function loadFilteredMaterials(subjectFilter) {
  const materialsContainer = document.getElementById("materials-container")
  materialsContainer.innerHTML = ""

  // Filtra os materiais pela disciplina selecionada
  const filteredMaterials =
    subjectFilter === "all"
      ? studentData.materials
      : studentData.materials.filter((material) => material.subject === subjectFilter)

  if (filteredMaterials.length > 0) {
    filteredMaterials.forEach((material) => {
      const materialElement = document.createElement("div")
      materialElement.className = "material-card"

      // Define o ícone com base no tipo de arquivo
      let icon = "📄"
      if (material.type === "PDF") {
        icon = "📕"
      } else if (material.type === "DOC" || material.type === "DOCX") {
        icon = "📘"
      } else if (material.type === "PPT" || material.type === "PPTX") {
        icon = "📙"
      } else if (material.type === "XLS" || material.type === "XLSX") {
        icon = "📗"
      } else if (material.type === "ZIP" || material.type === "RAR") {
        icon = "📦"
      }

      // Formata a data
      const uploadDate = new Date(material.uploadDate)
      const formattedDate = uploadDate.toLocaleDateString("pt-BR")

      materialElement.innerHTML = `
                <div class="material-icon">${icon}</div>
                <h3>${material.title}</h3>
                <p>${material.description}</p>
                <div class="material-meta">
                    <span>${material.subject}</span>
                    <span>${formattedDate} | ${material.size}</span>
                </div>
                <div class="material-actions">
                    <button class="download-btn" onclick="downloadMaterial('${material.id}')">Download</button>
                    <button class="view-btn" onclick="viewMaterial('${material.id}')">Visualizar</button>
                </div>
            `

      materialsContainer.appendChild(materialElement)
    })
  } else {
    materialsContainer.innerHTML = "<p>Não há materiais disponíveis para esta disciplina.</p>"
  }
}

// Função para simular download de material
function downloadMaterial(materialId) {
  // Em um sistema real, isso iniciaria o download do arquivo
  showNotification("Iniciando download do material...")
}

// Função para simular visualização de material
function viewMaterial(materialId) {
  // Em um sistema real, isso abriria o arquivo para visualização
  showNotification("Abrindo material para visualização...")
}

// Função para carregar os dados financeiros
function loadFinancialData() {
  // Carrega o resumo financeiro
  document.getElementById("monthly-fee").textContent = `R$ ${studentData.financial.monthlyFee.toFixed(2)}`
  document.getElementById("due-date").textContent = `Dia ${studentData.financial.dueDay} de cada mês`
  document.getElementById("scholarship").textContent = studentData.financial.scholarship
  document.getElementById("payment-status").textContent = studentData.financial.status

  // Carrega as mensalidades na tabela
  const financialTableBody = document.getElementById("financial-table-body")
  financialTableBody.innerHTML = ""

  if (studentData.financial.payments.length > 0) {
    studentData.financial.payments.forEach((payment) => {
      const row = document.createElement("tr")

      // Define a classe de status
      let statusClass = ""
      if (payment.status === "Pago") {
        statusClass = "status-paid"
      } else if (payment.status === "Pendente") {
        statusClass = "status-pending"
      } else if (payment.status === "Atrasado") {
        statusClass = "status-late"
      }

      // Formata a data
      const dueDate = new Date(payment.dueDate)
      const formattedDueDate = dueDate.toLocaleDateString("pt-BR")

      // Formata a data de pagamento, se houver
      let formattedPaymentDate = "-"
      if (payment.paymentDate) {
        const paymentDate = new Date(payment.paymentDate)
        formattedPaymentDate = paymentDate.toLocaleDateString("pt-BR")
      }

      // Define as ações disponíveis
      let actions = ""
      if (payment.status === "Pendente") {
        actions = `<button class="pay-btn" onclick="payInvoice('${payment.reference}')">Pagar</button>`
      }
      actions += `<button class="invoice-btn" onclick="viewInvoice('${payment.reference}')">Boleto</button>`

      row.innerHTML = `
                <td>${payment.reference}</td>
                <td>${formattedDueDate}</td>
                <td>R$ ${payment.value.toFixed(2)}</td>
                <td>R$ ${payment.discount.toFixed(2)}</td>
                <td>R$ ${payment.finalValue.toFixed(2)}</td>
                <td class="${statusClass}">${payment.status}</td>
                <td class="payment-actions">${actions}</td>
            `

      financialTableBody.appendChild(row)
    })
  } else {
    financialTableBody.innerHTML = `<tr><td colspan="7">Não há mensalidades cadastradas.</td></tr>`
  }
}

// Função para simular pagamento de mensalidade
function payInvoice(reference) {
  // Em um sistema real, isso redirecionaria para a página de pagamento
  showNotification(`Redirecionando para o pagamento da mensalidade de ${reference}...`)
}

// Função para simular visualização de boleto
function viewInvoice(reference) {
  // Em um sistema real, isso abriria o boleto para visualização/impressão
  showNotification(`Gerando boleto da mensalidade de ${reference}...`)
}

// Função para carregar os dados de requerimentos
function loadRequestsData() {
  // Carrega os requerimentos na tabela
  const requestsTableBody = document.getElementById("requests-table-body")
  requestsTableBody.innerHTML = ""

  if (studentData.requests.length > 0) {
    studentData.requests.forEach((request) => {
      const row = document.createElement("tr")

      // Define a classe de status
      let statusClass = ""
      if (request.status === "Concluído") {
        statusClass = "status-approved"
      } else if (request.status === "Em análise") {
        statusClass = "status-processing"
      } else if (request.status === "Pendente") {
        statusClass = "status-pending"
      } else if (request.status === "Indeferido") {
        statusClass = "status-rejected"
      }

      // Formata a data
      const requestDate = new Date(request.date)
      const formattedDate = requestDate.toLocaleDateString("pt-BR")

      // Define as ações disponíveis
      let actions = `<button class="view-request-btn" onclick="viewRequest('${request.protocol}')">Detalhes</button>`

      if (request.status === "Pendente" || request.status === "Em análise") {
        actions += `<button class="cancel-request-btn" onclick="cancelRequest('${request.protocol}')">Cancelar</button>`
      }

      row.innerHTML = `
                <td>${request.protocol}</td>
                <td>${request.type}</td>
                <td>${formattedDate}</td>
                <td class="${statusClass}">${request.status}</td>
                <td class="request-actions">${actions}</td>
            `

      requestsTableBody.appendChild(row)
    })
  } else {
    requestsTableBody.innerHTML = `<tr><td colspan="5">Não há requerimentos cadastrados.</td></tr>`
  }

  // Preenche o select de disciplinas no formulário de requerimento
  const requestSubjectSelect = document.getElementById("request-subject")
  requestSubjectSelect.innerHTML = '<option value="">Selecione a disciplina</option>'

  studentData.subjects.forEach((subject) => {
    const option = document.createElement("option")
    option.value = subject.id
    option.textContent = subject.name
    requestSubjectSelect.appendChild(option)
  })
}

// Função para mostrar o formulário de novo requerimento
function showNewRequestForm() {
  document.getElementById("new-request-form").style.display = "block"
}

// Função para fechar o formulário de novo requerimento
function closeNewRequestForm() {
  document.getElementById("new-request-form").style.display = "none"
}

// Função para simular visualização de requerimento
function viewRequest(protocol) {
  // Em um sistema real, isso abriria os detalhes do requerimento
  showNotification(`Visualizando detalhes do requerimento ${protocol}...`)
}

// Função para simular cancelamento de requerimento
function cancelRequest(protocol) {
  // Em um sistema real, isso cancelaria o requerimento
  showNotification(`Cancelando requerimento ${protocol}...`)
}

// Função para inicializar o formulário de requerimento
function initRequestForm() {
  const requestForm = document.getElementById("request-form")

  if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtém os dados do formulário
      const requestType = document.getElementById("request-type").value
      const requestSubject = document.getElementById("request-subject").value
      const requestDescription = document.getElementById("request-description").value

      // Valida os dados
      if (!requestType || !requestDescription) {
        showNotification("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // Em um sistema real, isso enviaria os dados para o servidor
      // Aqui vamos simular a criação de um novo requerimento

      // Gera um número de protocolo
      const protocol =
        "2024" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")

      // Cria o novo requerimento
      const newRequest = {
        id: "req-" + (studentData.requests.length + 1),
        protocol: protocol,
        type: document.getElementById("request-type").options[document.getElementById("request-type").selectedIndex]
          .text,
        date: new Date().toISOString().split("T")[0],
        status: "Pendente",
        description: requestDescription,
      }

      // Adiciona o requerimento à lista
      studentData.requests.push(newRequest)

      // Salva os dados atualizados
      localStorage.setItem("studentData_" + studentData.personalInfo.email, JSON.stringify(studentData))

      // Fecha o formulário
      closeNewRequestForm()

      // Recarrega os dados de requerimentos
      loadRequestsData()

      // Mostra notificação de sucesso
      showNotification(`Requerimento enviado com sucesso! Protocolo: ${protocol}`)
    })
  }
}

// Função para carregar os dados do calendário acadêmico
function loadCalendarData() {
  const calendarContainer = document.getElementById("academic-calendar")
  calendarContainer.innerHTML = ""

  if (studentData.calendar.length > 0) {
    const calendarEvents = document.createElement("div")
    calendarEvents.className = "calendar-events"

    studentData.calendar.forEach((month) => {
      const monthElement = document.createElement("div")
      monthElement.className = "calendar-month"

      let monthHTML = `
                <div class="calendar-month-header">
                    <h3>${month.month}</h3>
                </div>
            `

      month.events.forEach((event) => {
        monthHTML += `
                    <div class="calendar-event">
                        <div class="calendar-event-date">${event.date}</div>
                        <div class="calendar-event-info">
                            <h4>${event.title}</h4>
                            <p>${event.description}</p>
                        </div>
                    </div>
                `
      })

      monthElement.innerHTML = monthHTML
      calendarEvents.appendChild(monthElement)
    })

    calendarContainer.appendChild(calendarEvents)
  } else {
    calendarContainer.innerHTML = "<p>Não há eventos no calendário acadêmico.</p>"
  }

  // Adiciona evento de mudança para o select de período
  document.getElementById("calendar-period").addEventListener("change", () => {
    // Em um sistema real, isso carregaria o calendário do período selecionado
    showNotification("Funcionalidade em desenvolvimento: Carregando calendário de outros períodos.")
  })
}

// Função para carregar os dados do perfil
function loadProfileData() {
  // Carrega os dados pessoais
  document.getElementById("profile-student-name").textContent = studentData.personalInfo.name
  document.getElementById("profile-student-ra").textContent = "RA: " + studentData.personalInfo.ra
  document.getElementById("profile-student-course").textContent = studentData.academicInfo.course

  // Preenche o formulário de perfil
  document.getElementById("profile-name").value = studentData.personalInfo.name
  document.getElementById("profile-cpf").value = studentData.personalInfo.cpf
  document.getElementById("profile-birth").value = studentData.personalInfo.birthDate
  document.getElementById("profile-gender").value = studentData.personalInfo.gender
  document.getElementById("profile-email").value = studentData.personalInfo.email
  document.getElementById("profile-phone").value = studentData.personalInfo.phone
  document.getElementById("profile-cep").value = studentData.personalInfo.address.cep
  document.getElementById("profile-address").value = studentData.personalInfo.address.street
  document.getElementById("profile-number").value = studentData.personalInfo.address.number
  document.getElementById("profile-complement").value = studentData.personalInfo.address.complement
  document.getElementById("profile-neighborhood").value = studentData.personalInfo.address.neighborhood
  document.getElementById("profile-city").value = studentData.personalInfo.address.city
  document.getElementById("profile-state").value = studentData.personalInfo.address.state
}

// Função para inicializar o formulário de perfil
function initProfileForm() {
  const profileForm = document.getElementById("profile-form")

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtém os dados do formulário
      const email = document.getElementById("profile-email").value
      const phone = document.getElementById("profile-phone").value
      const cep = document.getElementById("profile-cep").value
      const address = document.getElementById("profile-address").value
      const number = document.getElementById("profile-number").value
      const complement = document.getElementById("profile-complement").value
      const neighborhood = document.getElementById("profile-neighborhood").value
      const city = document.getElementById("profile-city").value
      const state = document.getElementById("profile-state").value

      // Valida os dados
      if (!email || !phone) {
        showNotification("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // Verifica se há alteração de senha
      const currentPassword = document.getElementById("profile-current-password").value
      const newPassword = document.getElementById("profile-new-password").value
      const confirmPassword = document.getElementById("profile-confirm-password").value

      if (currentPassword || newPassword || confirmPassword) {
        // Valida a senha atual (simulação)
        if (currentPassword !== "senha123") {
          showNotification("Senha atual incorreta.")
          return
        }

        // Valida a nova senha
        if (newPassword !== confirmPassword) {
          showNotification("A nova senha e a confirmação não coincidem.")
          return
        }

        // Em um sistema real, isso alteraria a senha do usuário
        showNotification("Senha alterada com sucesso!")
      }

      // Atualiza os dados do aluno
      studentData.personalInfo.email = email
      studentData.personalInfo.phone = phone
      studentData.personalInfo.address.cep = cep
      studentData.personalInfo.address.street = address
      studentData.personalInfo.address.number = number
      studentData.personalInfo.address.complement = complement
      studentData.personalInfo.address.neighborhood = neighborhood
      studentData.personalInfo.address.city = city
      studentData.personalInfo.address.state = state

      // Salva os dados atualizados
      localStorage.setItem("studentData_" + studentData.personalInfo.email, JSON.stringify(studentData))

      // Mostra notificação de sucesso
      showNotification("Dados atualizados com sucesso!")
    })
  }
}

// Função para alternar o menu do usuário
function toggleUserMenu() {
  document.getElementById("user-dropdown").classList.toggle("active")
}

// Função para fazer logout
function logout() {
  // Remove os dados do usuário do localStorage
  localStorage.removeItem("currentUser")

  // Redireciona para a página inicial
  window.location.href = "index.html"
}

// Fechar o menu do usuário quando clicar fora dele
window.addEventListener("click", (event) => {
  if (
    !event.target.matches("#user-menu-button") &&
    !event.target.matches(".user-avatar") &&
    !event.target.matches("#user-name")
  ) {
    const dropdown = document.getElementById("user-dropdown")
    if (dropdown.classList.contains("active")) {
      dropdown.classList.remove("active")
    }
  }
})

// Função para exibir notificações
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  document.body.appendChild(notification)

  // Remove a notificação após alguns segundos
  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

// Função para atualizar a interface do aluno
function updateStudentUI() {
  // Atualiza o nome do usuário no menu
  document.getElementById("user-name").textContent = studentData.personalInfo.name.split(" ")[0]

  // Atualiza informações da sidebar
  document.getElementById("sidebar-student-name").textContent = studentData.personalInfo.name
  document.getElementById("sidebar-student-course").textContent = studentData.academicInfo.course
  document.getElementById("sidebar-student-ra").textContent = "RA: " + studentData.personalInfo.ra

  // Carrega os dados da seção atual
  loadSectionData(currentSection)
}*/

// Variáveis globais
let studentData = null
let currentSection = "dashboard"

// Função para inicializar a área do aluno quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  checkStudentLoginStatus()

  // Inicializa a navegação entre seções
  initSectionNavigation()

  // Inicializa os formulários
  initProfileForm()
  initRequestForm()
})

// Função para verificar se o usuário está logado como aluno
function checkStudentLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (!currentUser || !currentUser.isStudent) {
    // Redireciona para a página de login se não estiver logado como aluno
    showNotification("Você precisa estar logado como aluno para acessar esta área.")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000)
    return
  }

  // Carrega os dados do aluno
  loadStudentData(currentUser.email)
}

// Função para carregar os dados do aluno
function loadStudentData(email) {
  // Em um sistema real, isso seria uma chamada para o servidor
  // Aqui vamos simular com dados estáticos

  // Verifica se já temos dados do aluno no localStorage
  const storedStudentData = localStorage.getItem("studentData_" + email)

  if (storedStudentData) {
    studentData = JSON.parse(storedStudentData)
  } else {
    // Cria dados simulados para o aluno
    studentData = createMockStudentData(email)

    // Salva no localStorage para uso futuro
    localStorage.setItem("studentData_" + email, JSON.stringify(studentData))
  }

  // Atualiza a interface com os dados do aluno
  updateStudentUI()
}

// Função para criar dados simulados do aluno
function createMockStudentData(email) {
  const firstName = email.split("@")[0]
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return {
    personalInfo: {
      name: capitalizedName + " Silva Santos",
      email: email,
      ra:
        "RA" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      cpf: "123.456.789-00",
      birthDate: "1995-05-15",
      gender: "M",
      phone: "(11) 98765-4321",
      address: {
        cep: "01234-567",
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
      },
    },
    academicInfo: {
      course: "Análise e Desenvolvimento de Sistemas",
      modality: "Presencial",
      period: "Noturno",
      currentSemester: 3,
      totalSemesters: 5,
      startDate: "2023-02-01",
      expectedEndDate: "2025-12-15",
      coordinator: "Prof. Dr. Carlos Mendes",
      campus: "Senac Lapa Scipião",
    },
    subjects: [
      {
        id: "prog-web",
        name: "Programação Web",
        teacher: "Profa. Ana Souza",
        schedule: "Segunda e Quarta, 19h às 22h",
        grades: {
          grade1: 8.5,
          grade2: null,
          finalGrade: null,
        },
        attendance: 92,
        status: "Em andamento",
      },
      {
        id: "banco-dados",
        name: "Banco de Dados",
        teacher: "Prof. Ricardo Almeida",
        schedule: "Terça e Quinta, 19h às 22h",
        grades: {
          grade1: 7.0,
          grade2: null,
          finalGrade: null,
        },
        attendance: 85,
        status: "Em andamento",
      },
      {
        id: "eng-software",
        name: "Engenharia de Software",
        teacher: "Prof. Marcos Oliveira",
        schedule: "Sexta, 19h às 23h",
        grades: {
          grade1: 9.0,
          grade2: null,
          finalGrade: null,
        },
        attendance: 95,
        status: "Em andamento",
      },
      {
        id: "redes",
        name: "Redes de Computadores",
        teacher: "Profa. Juliana Costa",
        schedule: "Sábado, 8h às 12h",
        grades: {
          grade1: 6.5,
          grade2: null,
          finalGrade: null,
        },
        attendance: 78,
        status: "Em andamento",
      },
    ],
    history: [
      {
        semester: "2023.1",
        subjects: [
          {
            name: "Algoritmos e Lógica de Programação",
            teacher: "Prof. Fernando Santos",
            finalGrade: 8.0,
            attendance: 90,
            status: "Aprovado",
          },
          {
            name: "Introdução à Computação",
            teacher: "Profa. Carla Mendes",
            finalGrade: 9.5,
            attendance: 95,
            status: "Aprovado",
          },
          {
            name: "Matemática Aplicada",
            teacher: "Prof. Paulo Ribeiro",
            finalGrade: 7.5,
            attendance: 85,
            status: "Aprovado",
          },
        ],
      },
      {
        semester: "2023.2",
        subjects: [
          {
            name: "Programação Orientada a Objetos",
            teacher: "Prof. Gustavo Lima",
            finalGrade: 8.5,
            attendance: 92,
            status: "Aprovado",
          },
          {
            name: "Estrutura de Dados",
            teacher: "Profa. Mariana Costa",
            finalGrade: 7.0,
            attendance: 88,
            status: "Aprovado",
          },
          {
            name: "Interface Humano-Computador",
            teacher: "Prof. Roberto Alves",
            finalGrade: 9.0,
            attendance: 94,
            status: "Aprovado",
          },
        ],
      },
    ],
    financial: {
      monthlyFee: 850.0,
      dueDay: 10,
      scholarship: "Desconto Ex-Aluno: 10%",
      status: "Em dia",
      payments: [
        {
          reference: "Junho/2024",
          dueDate: "2024-06-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pago",
          paymentDate: "2024-06-08",
        },
        {
          reference: "Julho/2024",
          dueDate: "2024-07-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pendente",
          paymentDate: null,
        },
        {
          reference: "Agosto/2024",
          dueDate: "2024-08-10",
          value: 850.0,
          discount: 85.0,
          finalValue: 765.0,
          status: "Pendente",
          paymentDate: null,
        },
      ],
    },
    materials: [
      {
        id: "mat-1",
        subject: "Programação Web",
        title: "Apostila de HTML e CSS",
        description: "Material completo sobre HTML5 e CSS3",
        type: "PDF",
        uploadDate: "2024-05-10",
        size: "5.2 MB",
      },
      {
        id: "mat-2",
        subject: "Programação Web",
        title: "Slides - JavaScript Básico",
        description: "Apresentação sobre fundamentos de JavaScript",
        type: "PDF",
        uploadDate: "2024-05-15",
        size: "3.8 MB",
      },
      {
        id: "mat-3",
        subject: "Banco de Dados",
        title: "Apostila SQL",
        description: "Material sobre SQL e modelagem de dados",
        type: "PDF",
        uploadDate: "2024-05-05",
        size: "7.1 MB",
      },
      {
        id: "mat-4",
        subject: "Engenharia de Software",
        title: "Slides - Metodologias Ágeis",
        description: "Apresentação sobre Scrum e Kanban",
        type: "PDF",
        uploadDate: "2024-05-20",
        size: "4.5 MB",
      },
    ],
    activities: [
      {
        id: "act-1",
        subject: "Programação Web",
        title: "Prova P1",
        description: "Avaliação sobre HTML, CSS e JavaScript",
        dueDate: "2024-06-15",
        status: "Pendente",
      },
      {
        id: "act-2",
        subject: "Banco de Dados",
        title: "Trabalho - Modelagem ER",
        description: "Criar um modelo ER para um sistema de e-commerce",
        dueDate: "2024-06-20",
        status: "Pendente",
      },
      {
        id: "act-3",
        subject: "Engenharia de Software",
        title: "Seminário - Métodos Ágeis",
        description: "Apresentação em grupo sobre um método ágil",
        dueDate: "2024-06-25",
        status: "Pendente",
      },
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Semana Acadêmica",
        content:
          "A Semana Acadêmica de Tecnologia acontecerá entre os dias 10 e 14 de julho. Programação completa em breve!",
        date: "2024-05-25",
        author: "Coordenação do Curso",
      },
      {
        id: "ann-2",
        title: "Alteração de Horário",
        content: "As aulas de Programação Web do dia 05/06 serão transferidas para o dia 08/06, no mesmo horário.",
        date: "2024-05-28",
        author: "Profa. Ana Souza",
      },
    ],
    requests: [
      {
        id: "req-1",
        protocol: "2024050001",
        type: "Declaração de Matrícula",
        date: "2024-05-10",
        status: "Concluído",
        description: "Solicitação de declaração de matrícula para estágio",
      },
      {
        id: "req-2",
        protocol: "2024050015",
        type: "Revisão de Nota",
        date: "2024-05-20",
        status: "Em análise",
        description: "Revisão da nota da P1 de Estrutura de Dados do semestre 2023.2",
      },
    ],
    calendar: [
      {
        month: "Junho/2024",
        events: [
          {
            date: "05/06/2024",
            title: "Feriado - Corpus Christi",
            description: "Não haverá aula",
          },
          {
            date: "15/06/2024",
            title: "Prova P1 - Programação Web",
            description: "Conteúdo: HTML, CSS e JavaScript",
          },
          {
            date: "20/06/2024",
            title: "Entrega de Trabalho - Banco de Dados",
            description: "Modelagem ER para sistema de e-commerce",
          },
        ],
      },
      {
        month: "Julho/2024",
        events: [
          {
            date: "10/07/2024 a 14/07/2024",
            title: "Semana Acadêmica de Tecnologia",
            description: "Palestras, workshops e atividades especiais",
          },
          {
            date: "15/07/2024 a 31/07/2024",
            title: "Recesso Escolar",
            description: "Férias de inverno",
          },
        ],
      },
    ],
  }
}

// Função para inicializar a navegação entre seções
function initSectionNavigation() {
  // Adiciona eventos de clique para os itens do menu
  const menuItems = document.querySelectorAll(".student-menu li")

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove a classe 'active' de todos os itens
      menuItems.forEach((i) => i.classList.remove("active"))

      // Adiciona a classe 'active' ao item clicado
      this.classList.add("active")

      // Obtém a seção a ser exibida
      const section = this.getAttribute("data-section")

      // Verifica se a seção é o dashboard ou uma seção em construção
      if (section === "dashboard") {
        // Carrega os dados da seção dashboard
        loadSectionData(section)
      } else {
        // Mostra notificação para seções em construção
        showNotification("Estamos construindo essa seção. Em breve estará disponível!")

        // Mantém o dashboard visível
        menuItems[0].classList.add("active")
        this.classList.remove("active")
        loadSectionData("dashboard")
      }
    })
  })

  // Verifica se há uma seção específica na URL
  const urlParams = new URLSearchParams(window.location.search)
  const sectionParam = urlParams.get("section")

  if (sectionParam && sectionParam === "dashboard") {
    // Ativa a seção dashboard se especificada na URL
    const sectionItem = document.querySelector(`.student-menu li[data-section="dashboard"]`)
    if (sectionItem) {
      sectionItem.click()
    }
  } else if (sectionParam) {
    // Para outras seções, mostra a notificação e mantém no dashboard
    showNotification("Estamos construindo essa seção. Em breve estará disponível!")
    const dashboardItem = document.querySelector(`.student-menu li[data-section="dashboard"]`)
    if (dashboardItem) {
      dashboardItem.click()
    }
  }
}

// Função para carregar os dados de uma seção específica
function loadSectionData(section) {
  // Oculta todas as seções
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((s) => s.classList.remove("active"))

  // Exibe a seção selecionada
  const selectedSection = document.getElementById(section)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }

  // Atualiza a seção atual
  currentSection = section

  // Carrega os dados específicos da seção
  switch (section) {
    case "dashboard":
      loadDashboardData()
      break
    // Outras seções são tratadas pelo evento de clique e mostram notificação
  }
}

// Função para carregar os dados do dashboard
function loadDashboardData() {
  // Atualiza o nome do aluno
  document.getElementById("dashboard-student-name").textContent = studentData.personalInfo.name.split(" ")[0]

  // Atualiza os cards do dashboard
  document.getElementById("active-subjects").textContent = studentData.subjects.length

  // Calcula a média geral
  let totalGrade = 0
  let gradeCount = 0

  studentData.subjects.forEach((subject) => {
    if (subject.grades.grade1) {
      totalGrade += subject.grades.grade1
      gradeCount++
    }
    if (subject.grades.grade2) {
      totalGrade += subject.grades.grade2
      gradeCount++
    }
  })

  const averageGrade = gradeCount > 0 ? (totalGrade / gradeCount).toFixed(1) : "N/A"
  document.getElementById("overall-average").textContent = averageGrade

  // Calcula a frequência média
  let totalAttendance = 0

  studentData.subjects.forEach((subject) => {
    totalAttendance += subject.attendance
  })

  const averageAttendance =
    studentData.subjects.length > 0 ? (totalAttendance / studentData.subjects.length).toFixed(0) + "%" : "N/A"
  document.getElementById("overall-attendance").textContent = averageAttendance

  // Atualiza a situação financeira
  document.getElementById("financial-status").textContent = studentData.financial.status

  // Carrega as próximas atividades
  const activitiesContainer = document.getElementById("upcoming-activities")
  activitiesContainer.innerHTML = ""

  if (studentData.activities.length > 0) {
    studentData.activities.forEach((activity) => {
      const activityElement = document.createElement("div")
      activityElement.className = "activity-item"

      // Formata a data
      const dueDate = new Date(activity.dueDate)
      const formattedDate = dueDate.toLocaleDateString("pt-BR")

      activityElement.innerHTML = `
                <div class="activity-date">${formattedDate}</div>
                <div class="activity-info">
                    <h4>${activity.title}</h4>
                    <p>${activity.subject} - ${activity.description}</p>
                </div>
            `

      activitiesContainer.appendChild(activityElement)
    })
  } else {
    activitiesContainer.innerHTML = "<p>Não há atividades próximas.</p>"
  }

  // Carrega os avisos
  const announcementsContainer = document.getElementById("announcements")
  announcementsContainer.innerHTML = ""

  if (studentData.announcements.length > 0) {
    studentData.announcements.forEach((announcement) => {
      const announcementElement = document.createElement("div")
      announcementElement.className = "announcement-item"

      // Formata a data
      const announcementDate = new Date(announcement.date)
      const formattedDate = announcementDate.toLocaleDateString("pt-BR")

      announcementElement.innerHTML = `
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
                <div class="announcement-meta">
                    <span>${announcement.author}</span>
                    <span>${formattedDate}</span>
                </div>
            `

      announcementsContainer.appendChild(announcementElement)
    })
  } else {
    announcementsContainer.innerHTML = "<p>Não há avisos no momento.</p>"
  }
}

// Função para inicializar o formulário de perfil
function initProfileForm() {
  const profileForm = document.getElementById("profile-form")

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Mostra notificação de seção em construção
      showNotification("Estamos construindo essa seção. Em breve estará disponível!")
    })
  }
}

// Função para inicializar o formulário de requerimento
function initRequestForm() {
  const requestForm = document.getElementById("request-form")

  if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Mostra notificação de seção em construção
      showNotification("Estamos construindo essa seção. Em breve estará disponível!")
    })
  }
}

// Função para mostrar o formulário de novo requerimento
function showNewRequestForm() {
  // Mostra notificação de seção em construção
  showNotification("Estamos construindo essa seção. Em breve estará disponível!")
}

// Função para fechar o formulário de novo requerimento
function closeNewRequestForm() {
  document.getElementById("new-request-form").style.display = "none"
}

// Função para alternar o menu do usuário
function toggleUserMenu() {
  document.getElementById("user-dropdown").classList.toggle("active")
}

// Função para fazer logout
function logout() {
  // Remove os dados do usuário do localStorage
  localStorage.removeItem("currentUser")

  // Redireciona para a página inicial
  window.location.href = "index.html"
}

// Fechar o menu do usuário quando clicar fora dele
window.addEventListener("click", (event) => {
  if (
    !event.target.matches("#user-menu-button") &&
    !event.target.matches(".user-avatar") &&
    !event.target.matches("#user-name")
  ) {
    const dropdown = document.getElementById("user-dropdown")
    if (dropdown.classList.contains("active")) {
      dropdown.classList.remove("active")
    }
  }
})

// Função para exibir notificações
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  document.body.appendChild(notification)

  // Remove a notificação após alguns segundos
  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

// Função para atualizar a interface do aluno
function updateStudentUI() {
  // Atualiza o nome do usuário no menu
  document.getElementById("user-name").textContent = studentData.personalInfo.name.split(" ")[0]

  // Atualiza informações da sidebar
  document.getElementById("sidebar-student-name").textContent = studentData.personalInfo.name
  document.getElementById("sidebar-student-course").textContent = studentData.academicInfo.course
  document.getElementById("sidebar-student-ra").textContent = "RA: " + studentData.personalInfo.ra

  // Carrega os dados da seção atual
  loadSectionData(currentSection)
}

