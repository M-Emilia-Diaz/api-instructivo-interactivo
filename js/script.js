const modalData = {
  axonico: {
    tag: 'Plataforma',
    title: 'Axónico y Web API',
    content: `<p>Axónico es el sitio de carga de prestaciones e historia clínica. La web de API se usa para subir documentación mensual desde Acceso Profesionales.</p><ul><li>Cargar prestaciones dentro del mes de atención.</li><li>Recomendación: cargar el mismo día de atención.</li><li>La historia clínica digital registra la parte legal del tratamiento del paciente.</li><li>La documentación mensual se carga en la plataforma habilitada por API.</li></ul>`
  },
  documentacion: {
    tag: 'Documentación',
    title: 'Qué se presenta según modalidad',
    content: `<p>La documentación cambia según si la atención fue virtual o presencial.</p><ul><li><strong>Virtual:</strong> constancia de atención viertual completa, legible y firmada por el paciente.</li><li><strong>Presencial:</strong> planilla de firmas mensual, con firma y aclaración del paciente, más firma y sello profesional.</li><li>No combinar meses distintos ni integrantes del mismo grupo familiar en una misma planilla.</li><li>La falta de datos puede derivar en débito de la prestación.</li></ul>`
  },
  ausentes: {
    tag: 'Turnos',
    title: 'Ausentes sin aviso o con menos de 48 hs',
    content: `<p>El ausente se maneja como arancel compensatorio solo bajo condiciones específicas.</p><ul><li>Debe estar firmado el consentimiento informado.</li><li>No se computa ausente si el paciente avisó con más de 48 horas.</li><li>El monto del arancel compensatorio se actualiza periodicamente y es notificado vía mail por API.</li><li>No se carga la consulta por Axónico cuando corresponde cobro de arancel compensatorio.</li><li>A los socios de SWISS MEDICAL, OMINT, UNION PERSONAL, HOMINIS y PREMEDIC son a los cuales les corresponde abonar el arancel.</li><li>No aplica para pacientes con certificado de discapacidad, SANTA CRUZ ni OSPE.</li></ul>`
  },
  paciente: {
    tag: 'Alta paciente',
    title: 'Antes de confirmar el turno',
    content: `<p>Antes de dar turno, conviene validar datos del socio y cobertura.</p><ul><li>Solicitar nombre y apellido, DNI, número de afiliado/credencial y obra social/prepaga.</li><li>Verificar modalidad habilitada según institución.</li><li>Consultar copagos vigentes antes de la consulta.</li><li>Revisar si la prestación requiere autorización previa especial.</li></ul>`
  },
  facturacion: {
    tag: 'Facturación',
    title: 'Factura y honorarios',
    content: `<p>La factura debe coincidir con la transferencia y enviarse al correo correcto en tiempo y forma para evitar demoras.</p><ul><li>Razón social: Asistencia Psicoterapéutica Integral S.R.L.</li><li>CUIT: 30-70723840-9.</li><li>Enviar facturas a facturahonorarios@apisaludmental.com.ar.</li><li>El importe debe coincidir con lo acreditado, incluidos los centavos.</li><li>La presentación fuera de fecha afecta directamente la transferencia de honorarios del siguiente período.</li></ul>`
  }
};

const coverages = [
  {
    name: 'OMINT CS',
    tag: 'Por padrón',
    image: './assets/img/omint-logo.png',
    modes: ['Post sesión 30', 'Con copago'],
    text: 'Planes CS 1, 2, 3, 4, 2500, 1500 y Mi DOC. Se carga como CONSOLIDAR en Axónico.',
    detail: ['No tiene límite de sesiones.', 'El ausente se computa mediante arancel compensatorio', 'Después de la sesión 30 se registra como POST30 CS/OMINT.', 'Copagos según plan y modalidad de atención en Axónico.', 'No corresponde OMINT Directo salvo autorización específica.']
  },
  {
    name: 'Swiss Medical',
    tag: 'Por validación',
    image: './assets/img/smg-logo.png',
    modes: ['Post Cobertura', 'Token'],
    text: 'Verificar plan en la credencial del socio. Requiere validar sesiones, copagos y normativa específica.',
    detail: ['Solicitar credencial antes de confirmar.', 'El ausente se computa mediante arancel compensatorio', 'Controlar token o autorización cuando corresponda.', 'No se atienden socios de planes Nubial y Simeco.', 'Pago de honorarios estimado a 90 días.']
  },
  {
    name: 'OSPE',
    tag: 'Por validación',
    image: './assets/img/ospe-logo.png',
    modes: ['Ext. tratamiento', 'Token' ],
    text: 'Algunos planes requieren autorización previa gestionada desde API.',
    detail: ['Controlar cantidad de sesiones autorizadas.', 'Preparar renovación antes de finalizar sesiones.', 'No corresponde cobro de ausente.', 'Verificar modalidad habilitada antes del turno.', 'Cargar documentación en la web de API sin excepción.']
  },
  {
    name: 'PREMEDIC',
    tag: 'Por validación',
    image: './assets/img/premedic-logo.png',
    modes: ['Carencias', 'Token'],
    text: 'Puede corresponder autorización según plan y consumo.',
    detail: ['Pago de honorarios estimado a 90 días.', 'El ausente se computa mediante arancel compensatorio', 'Cuenta con carencias administrativas hasta cumplir los 120 dias de antiguedad de afiliación.', 'Cargar documentación en la web de API sin excepción.', 'Revisar copagos vigentes antes de atender.']
  },
  {
    name: 'Santa Cruz',
    tag: '?',
    image: './assets/img/santa-cruz-logo.jpg',
    modes: ['Según norma'],
    text: 'Verificación mensual del estado del paciente. Prestaciones especiales requeriran presupuesto y autorización.',
    detail: ['No corresponde cobro de ausente.', 'Enviar documentación completa.', 'Verificar requisitos particulares.', 'Confirmar circuito administrativo antes de iniciar.', 'Cargar documentación en la web de API sin excepción.']
  },
  {
    name: 'Hominis',
    tag: 'Por validación',
    image: './assets/img/hominis-logo.jpg',
    modes: ['Tope de sesiones', 'Token'],
    text: 'Cobertura con requisitos propios de documentación y validación. 30 sesiones anuales. Carga de prestaciones diarias.',
    detail: ['El ausente se computa mediante arancel compensatorio', 'El token dura 5 (cinco) minutos', 'Tope de 30 siones anulaes, luego pasa a API INSTITUCIONAL', 'La carga de la prestacion en Axonico debe realilzarse en el día', 'Cargar documentación en la web de API sin excepción.']
  },
  {
    name: 'Union Personal',
    tag: 'Por validación',
    image: './assets/img/up-logo.png',
    modes: ['Tope de sesiones', 'Token'],
    text: 'Cobertura no habilitada para Discapacidad en psicología. Algunas prestaciones requieren de autorización previa.',
    detail: ['Ausente permitido si cumple condiciones.', 'Documentación completa por modalidad.', 'Verificar autorizaciones especiales.', 'Confirmar requisitos antes de la primera sesión.']
  },
  {
    name: 'API Institucional',
    tag: 'Particular',
    image: './assets/img/api-salud.jpg',
    modes: ['Circuito interno', 'Con copago'],
    text: 'Cobertura privada de API en casos de prestaciones o prepagas/obras sociales no convenidas. Con copago institucional.',
    detail: ['Confirmar valores vigentes.', 'Gestionar según circuito interno.', 'Se utiliza cuando el socio no cuenta con cobertura medica.', 'Las prestaciones se cargan en Axonico bajo la cobertura API INSTITUCIONAL']
  }
];


const flows = {
  axonico: [
    {
      title: 'Solicitar datos básicos',
      html: `<ul><li>Antes de confirmar el turno, pedí nombre y apellido, DNI, número de afiliado o credencial, y cobertura.</li></ul>`
      
    },
    {
      title: 'Verificar cobertura, modalidad y autorización',
      html: `<ul><li>Confirmá si la atención debe ser con o sin autorización.</li><li>Verificá copago, en caso de corresponder.</li><li>Si la cobertura  o el plan del paciente exige autorización previa, no brindar la atención hasta tenerla gestionada ya que eso genera inconveniente al momento de la carga de la sesión.</li></ul>`
    },
    {
      title: 'Atender con datos validados',
      html: `<ul><li>Registrar la fecha real de atención.</li><li>Solicitar token al paciente, en caso de corresponder.</li><li>Respetar la modalidad habilitada por la cobertura.</li><li>Guardar la información necesaria para evolucionar y respaldar la prestación.</li><li>Si la modalidad de atención es presencial, se recomienda indicar al paciente firmar al momento del turno.</li></ul>`
    },
    {
      title: 'Cargar sesión en Axónico',
      html: `<ul><li>Cargar la prestación dentro del mes de atención. El tiempo límite para hacerlo es hasta el último día del mes, 23:59 hs.</li><li>Cargar fuera de fecha afecta el consumo mensual del socio y la liquidación de dicha prestación, atrasando el pago de la misma.</li><li>Usar la fecha real de sesión en caso de que el sistema lo admita.</li><li>Registrar evolución de la sesión en la Historia Clínica.</li><li>Evitar acumulaciones grandes de carga: lo recomendado es carga diaria.</li></ul>`
    }
  ],
  documentacion: [
    {
      title: 'Definir modalidad de atención',
      html: `<ul><li>La documentación cambia según la modalidad.</li><li>Todas las coberturas admiten modalidad hibrida, pero para caso existe un formulario especifico que el paciente debe completar y firmar.</li></ul>`
    },
    {
      title: 'Completar el formulario correcto',
      html: `<ul><li><strong>Presencial:</strong> planilla de firmas impresa. Cuenta con el logo de cada cobertura. Es la que el profesional completa en su totalidad y el paciente firma y aclara el mismo día que asiste al turno en el consultorio.</li><li><strong>Virtual:</strong> constancia de atención. Formato PDF que el profesional debe enviarle al paciente para que complete y firme de manera manuscrita. En caso de no contar con los medios para impresión, puede transcribirla en una hoja./li><li>En cualquiera de las dos modalides, usar una planilla o constancia por paciente y por mes.</li><li>Si la moodalidad es hibrida, se usa una planilla para las atenciones presenciales y una constancia para las virtuales.</li></ul>`
    },
    {
      title: 'Controlar datos antes de presentar',
      html: `<ul><li>Revisar que esté completo y legible.</li><li>Validar firma y aclaración del paciente.</li><li>Agregar diagnostico, firma y sello profesional cuando corresponda.</li><li>No mezclar meses ni integrantes del grupo familiar.</li><li>En caso de existir enmienda o tachadura, salvar con firma y sello.</li></ul>`
    },
    {
      title: 'Subir o enviar documentación',
      html: `<ul><li>Subir la documentación mensual en la plataforma indicada por API, en la fecha estipulada para ello que es hasta el día 02 del mes siguiente.</li><li>Carga de documentacíon oblicatoria para HOMINIS, PREMEDIC, OSPE y SANTA CRUZ.</li><li>SWISS MEDICAL, OMINT y UNIÓN PERSONAL cuenta con excepión de carga para atenciones ambulatorias.</li><li>Guardar respaldo ante posibles auditorías.</li><li>Si falta información, puede derivar en débito de la prestación.</li>
      <li>En caso de las coberturas que no requieran carga de documentación, reguardar la misma, mínimo 2 años por posible auditorias.</li></ul>`
    }
  ]
};

function renderFlowStep(flowName, index) {
  const panel = document.querySelector(`#${flowName}StepPanel`);
  const buttons = document.querySelectorAll(`.step[data-flow="${flowName}"]`);
  const selectedStep = flows[flowName][index];
  if (!panel || !selectedStep) return;
  panel.innerHTML = `<h3>${selectedStep.title}</h3>${selectedStep.html}`;
  buttons.forEach(button => {
    button.classList.toggle('active', Number(button.dataset.step) === index);
  });
}

function initFlows() {
  Object.keys(flows).forEach(flowName => renderFlowStep(flowName, 0));
  document.querySelectorAll('.step[data-flow]').forEach(button => {
    button.addEventListener('click', () => {
      renderFlowStep(button.dataset.flow, Number(button.dataset.step));
    });
  });
}

const mails = [
  { area: 'Asistenacia administrativa', mail: 'ggarcia@apisaludmental.com.ar', subject: 'Consulta por procedimiento administrativo' },
  { area: 'Asistenacia administrativa', mail: 'ediaz@apisaludmental.com.ar', subject: 'Consulta por procedimiento administrativo' },
  { area: 'Asistenacia administrativa', mail: 'DCanteros@apisaludmental.com.ar', subject: 'Consulta por procedimiento administrativo' },
  { area: 'Asistenacia administrativa', mail: 'fspadini@apisaludmental.com.ar', subject: 'Consulta por procedimiento administrativo' },
  { area: 'Facturación de honorarios', mail: 'facturahonorarios@apisaludmental.com.ar', subject: 'Envío de factura de honorarios' },
  { area: 'Facturación / débitos', mail: 'facturacion@apisaludmental.com.ar', subject: 'Consulta por facturación o débito' },
  { area: 'Auditoría médica', mail: 'auditoria@apisaludmental.com.ar', subject: 'Consulta a Auditoría Médica' },
  { area: 'Órdenes médicas', mail: 'ordenesmedicas@apisaludmental.com.ar', subject: 'Envío de orden médica' },
  { area: 'Acompañamiento terapéutico', mail: 'at@apisaludmental.com.ar', subject: 'Consulta sobre acompañamiento terapéutico' },
  { area: 'Gestión asistencial', mail: 'gestion.asistencial@apisaludmental.com.ar', subject: 'Consulta de gestión asistencial' },
  { area: 'Reclamos', mail: 'reclamos@apisaludmental.com.ar', subject: 'Reclamo' },
  { area: 'Reasignaciones', mail: 'reasignaciones@apisaludmental.com.ar', subject: 'Solicitud de reasignación' }
];

const modalOverlay = document.querySelector('#modalOverlay');
const modalClose = document.querySelector('#modalClose');
const modalTitle = document.querySelector('#modalTitle');
const modalTag = document.querySelector('#modalTag');
const modalContent = document.querySelector('#modalContent');
const searchInput = document.querySelector('#searchInput');
const cards = document.querySelectorAll('.info-card');
const emptyState = document.querySelector('#emptyState');
const coverageCards = document.querySelector('#coverageCards');
const mailCards = document.querySelector('#mailCards');
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

function openModal(key) {
  const data = modalData[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalTag.textContent = data.tag;
  modalContent.innerHTML = data.content;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function renderCoverages() {
  coverageCards.innerHTML = coverages.map((coverage, index) => `
    <article class="info-card coverage-card reveal" data-keywords="${coverage.name} ${coverage.tag} ${coverage.modes.join(' ')} ${coverage.text}">
      <img src="${coverage.image}" alt="Imagen representativa de ${coverage.name}" />
      <div class="card-body">
        <span class="tag">${coverage.tag}</span>
        <h3>${coverage.name}</h3>
        <div class="coverage-meta">${coverage.modes.map(mode => `<span class="pill">${mode}</span>`).join('')}</div>
        <p>${coverage.text}</p>
        <button class="read-more coverage-detail" data-index="${index}">Leer más</button>
      </div>
    </article>
  `).join('');
}

function renderMails() {
  mailCards.innerHTML = mails.map(item => {
    const body = 'Hola, equipo API:\n\nLes escribo por la siguiente consulta:\n\nGracias.';
    const href = `mailto:${item.mail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(body)}`;
    return `<article class="mail-card reveal"><h3>${item.area}</h3><p> </p><a href="${href}">${item.mail}</a></article>`;
  }).join('');
}

function filterCards() {
  const value = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  cards.forEach(card => {
    const text = `${card.textContent} ${card.dataset.keywords || ''}`.toLowerCase();
    const match = text.includes(value);
    card.classList.toggle('hidden', !match);
    if (match) visibleCount++;
  });
  emptyState.classList.toggle('show', visibleCount === 0);
}

document.addEventListener('click', event => {
  const readMore = event.target.closest('.read-more');
  const detail = event.target.closest('.open-detail');
  const coverageDetail = event.target.closest('.coverage-detail');

  if (readMore) openModal(readMore.dataset.modal);
  if (detail) openModal(detail.dataset.detail);
  if (coverageDetail) {
    const coverage = coverages[coverageDetail.dataset.index];
    modalData.coverageTemp = {
      tag: 'Cobertura',
      title: coverage.name,
      content: `<p>${coverage.text}</p><ul>${coverage.detail.map(item => `<li>${item}</li>`).join('')}</ul>`
    };
    openModal('coverageTemp');
  }
  if (event.target === modalOverlay) closeModal();
});

modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
searchInput.addEventListener('input', filterCards);

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

renderCoverages();
renderMails();
initFlows();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
