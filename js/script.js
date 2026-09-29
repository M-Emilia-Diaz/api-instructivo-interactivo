const modalData = {
  axonico: {
    tag: 'Plataforma',
    title: 'Axónico y Web API',
    content: `<p>Axónico es el sitio de carga de prestaciones e historia clínica. La web de API se usa para subir documentación mensual desde Acceso Profesionales.</p><ul><li>Cargar prestaciones dentro del mes de atención.</li><li>Recomendación: cargar el mismo día de atención.</li><li>La historia clínica digital registra la parte legal del tratamiento del paciente.</li><li>La documentación mensual se carga en la plataforma habilitada por API.</li></ul>`
  },
  documentacion: {
    tag: 'Documentación',
    title: '¿Qué se presenta según modalidad?',
    content: `<p>La documentación cambia según si la atención fue virtual o presencial.</p><ul><li><strong>Virtual:</strong> constancia de atención viertual completa, legible y firmada por el paciente.</li><li><strong>Presencial:</strong> planilla de firmas mensual, con firma y aclaración del paciente, más firma y sello profesional.</li><li>No combinar meses distintos ni integrantes del mismo grupo familiar en una misma planilla.</li><li>La falta de datos puede derivar en débito de la prestación.</li></ul>`
  },
  ausentes: {
    tag: 'Turnos',
    title: 'Ausentes sin aviso o con menos de 48 hs',
    content: `<p>El ausente se maneja como arancel compensatorio solo bajo condiciones específicas.</p><ul><li>Debe estar firmado el consentimiento informado.</li><li>No se computa ausente si el paciente avisó con más de 48 horas de anticipación.</li><li>El monto del arancel compensatorio se actualiza periodicamente y es notificado vía mail por API.</li><li>No se carga la consulta por Axónico cuando corresponde cobro de arancel compensatorio.</li><li>A los socios de SWISS MEDICAL, OMINT, UNION PERSONAL, HOMINIS y PREMEDIC son a los cuales les corresponde abonar el arancel.</li><li>El cobro del arancel compensatorio no aplica para pacientes con certificado de discapacidad, SANTA CRUZ ni OSPE.</li><li>A los pacientes de OSPE, SANTA CRUZ o que cuenten con CUD se les computa una sesión como un consumo normal. Se debe cargar en Axónico y se debe firmar planilla de firmas o constancia de atención.</li></ul>`
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
    text: 'Planes habilitados: CS 1, 2, 3, 2500, 1500 y Mi DOC. No requiere token. <br> <br> <br> <br>',
    detail: ['Solicitar credencial antes de confirmar turno.', 'No tiene límite de sesiones.', 'El ausente se computa mediante el cobro del <strong>arancel compensatorio</strong>, no se carga la sesión ni firma planilla o constancia de asistencia, solo se evoluciona en la <strong>historia clínica</strong> dejando asentada la ausencia.', 'Después de la sesión 30 se registra como POST30 CS/OMINT, abonando el copago correspondiete vigente al momento de la atención.', 'Copagos varian según plan y modalidad de atención, se deben verificar en Axónico una vez realizada la carga de la sesión.', 'No corresponde OMINT Directo salvo autorización específica.', 'Firma planilla o constancia de asistencia.', 'De tratarse de prestaciones regulares las planillas o constancias no deben ser cargadas en la web de Api, pero es requisito que el profesional las tenga a su resguardo.', 'Pago de honorarios a 60 días.']
  },
  {
    name: 'Swiss Medical',
    tag: 'Por validación',
    image: './assets/img/smg-logo.png',
    modes: ['Post Cobertura', 'Token'],
    text: 'Verificar plan en la credencial del socio. Token obligatorio para validar sesiones. El copago varia según plan del paciente <br> <br>',
    detail: ['Solicitar credencial antes de confirmar turno.', 'No tenemos convenio con SIMECO, NUBIAL y OSDIP.', 'El ausente se computa mediante el cobro del <strong>arancel compensatorio</strong>, no se carga la sesión ni firma planilla o constancia de asistencia, solo se evoluciona en la <strong>historia clínica</strong> dejando asentada la ausencia.', 'Verificación de copago en Axónico una vez realizada la carga de la prestación.', 'Una vez consumidas el total de seisones del plan, pasan a atenderse mediante POST SWISS (post cobertura), abonando el copago correspondiete vigente al momento de la atención.', 'Firma planilla o constancia de asistencia.', 'De tratarse de prestaciones regulares las planillas o constancias no deben ser cargadas en la web de Api, pero es requisito que el profesional las tenga a su resguardo.', 'Pago de honorarios a 90 días.']
  },
  {
    name: 'OSPE',
    tag: 'Por validación',
    image: './assets/img/ospe-logo.png',
    modes: ['Ext. de tratamiento', 'Token' ],
    text: 'Autorización previa para algunas delegaciones. Token obligatorio para validar sesiones. El copago varia según plan del paciente. <br> <br>',
    detail: ['Solicitar credencial antes de confirmar turno.', 'Controlar cantidad de sesiones aprobadas en caso de gestión de autorización.', 'La duración del token es de 5 (cinco) minutos desde que se genera.', 'El ausente se computa mediante la carga de prestación, equivalente a un consumo, se firma planilla o constancia de asistencia, y en la evolucion de la <strong>historia clínica</strong> se deja asentado que se trata de una ausencia.', 'No corresponde cobro de <strong>arancel compensatorio</strong> por ausencia.', 'Cargar documentación en la web de API sin excepción, indistintamente la modalidad de atención o tipo de prestación.', 'Una vez consumidas las 30 sesiones anuales, se solicita en API la <strong>extensión de tratamiento</strong>, quedando a criterio de la cobertura otorgarla o no.', 'Pago de honorarios a 60 días.']
  },
  {
    name: 'PREMEDIC',
    tag: 'Por validación',
    image: './assets/img/premedic-logo.png',
    modes: ['Carencias', 'Token'],
    text: 'Con menos de 120 días de antiguedad en la cobertura no pueden recibir atención. Token obligatorio para validar sesiones. El copago varia según plan.',
    detail: ['Solicitar credencial antes de confirmar turno.', 'La duración del token es de 5 (cinco) minutos desde que se genera.', 'El ausente se computa mediante el cobro del <strong>arancel compensatorio</strong>, no se carga la sesión ni firma planilla o constancia de asistencia, solo se evoluciona en la <strong>historia clínica</strong> dejando asentada la ausencia.', 'Cargar documentación en la web de API sin excepción, indistintamente la modalidad de atención o tipo de prestación.', 'Consumido el total de sesiones anuales correspondientes al plan del paciente, este realizara la gestión por la <strong>extensión de tratamiento</strong>, quedando a criterio de la cobertura otorgarla o no.', 'Cuenta con carencias administrativas hasta cumplir los 120 dias de antiguedad de afiliación en los cuales no podra atenderse en <strong>Salud Mental</strong>.', 'Pago de honorarios a 90 días.' ]
  },
  {
    name: 'Santa Cruz',
    tag: 'Por padrón',
    image: './assets/img/santa-cruz-logo.jpg',
    modes: ['Extensión de tratamiento'],
    text: 'Verificación mensual del estado del paciente. Prestaciones sin copagos. Prestaciones especiales requeriran presupuesto y autorización. <br><br><br>',
    detail: ['Solicitar credencial antes de confirmar turno.', 'No requiere de token para la validación de sesiones.', 'El ausente se computa mediante la carga de prestación, equivalente a un consumo, se firma planilla o constancia de asistencia, y en la evolucion de la <strong>historia clínica</strong> se deja asentado que se trata de una ausencia.', 'No corresponde cobro de <strong>arancel compensatorio</strong> por ausencia.', 'Cargar documentación en la web de API sin excepción, indistintamente la modalidad de atención o tipo de prestación.', 'Una vez consumidas las 30 sesiones anuales, el paciente realiza la gestión de autorización de extensión de tratamiento en la cobertura.', 'Pago de honorarios a 60 días.']
  },
  {
    name: 'Hominis',
    tag: 'Por validación',
    image: './assets/img/hominis-logo.jpg',
    modes: ['Tope de sesiones', 'Token'],
    text: 'Token obligatorio para validar sesiones. El copago varia según plan del paciente. Tope de 30 sesiones anuales. Carga de prestaciones diarias. <br><br>',
    detail: ['Solicitar credencial antes de confirmar turno.', 'La duración del token es de 5 (cinco) minutos desde que se genera.', 'El ausente se computa mediante el cobro del <strong>arancel compensatorio</strong>, no se carga la sesión ni firma planilla o constancia de asistencia, solo se evoluciona en la <strong>historia clínica</strong> dejando asentada la ausencia.', 'Cargar documentación en la web de API sin excepción, indistintamente la modalidad de atención o tipo de prestación.', 'Consumido las 30 sesiones anuales pasan a atenderse por API INSTITUCIONAL abonando el copago correspondiente al tipo de prestación que se lleve a cabo.', 'La carga de la prestacion en Axonico debe realilzarse en el día ya que el sistema no admite cargas con fechas diferidas.', 'Pago de honorarios a 60 días.']
  },
  {
    name: 'Union Personal',
    tag: 'Por validación',
    image: './assets/img/up-logo.png',
    modes: ['Tope de sesiones', 'Token'],
    text: 'No habilitada para Discapacidad en psicología. El copago varia según plan del paciente. Algunas prestaciones requieren de autorización previa. Token obligatorio para validar sesiones.',
    detail: ['Solicitar credencial antes de confirmar turno.', 'La duración del token es de 5 (cinco) minutos desde que se genera.', 'El ausente se computa mediante el cobro del <strong>arancel compensatorio</strong>, no se carga la sesión ni firma planilla o constancia de asistencia, solo se evoluciona en la <strong>historia clínica</strong> dejando asentada la ausencia.', 'Firma planilla o constancia de asistencia.', 'De tratarse de prestaciones regulares las planillas o constancias no deben ser cargadas en la web de Api, pero es requisito que el profesional las tenga a su resguardo.', 'Consumido las 30 sesiones anuales pasan a atenderse por API INSTITUCIONAL abonando el copago correspondiente al tipo de prestación que se lleve a cabo.', 'Pago de honorarios a 60 días.']
  },
  {
    name: 'API Institucional',
    tag: 'Particular',
    image: './assets/img/api-salud.jpg',
    modes: ['Circuito interno', 'Con copago'],
    text: 'Cobertura privada de API en casos de prestaciones o prepagas/obras sociales no convenidas. Con copago institucional. <br><br><br>',
    detail: ['Confirmar valores de copagos vigentes según tipo de prestación.', 'Gestionar según circuito interno.', 'Se utiliza cuando el socio no cuenta con cobertura medica, finaliza el total de sesiones cubiertas por plan o cuenta con algún inconveniente administrativo con su cobertura.', 'Las prestaciones se cargan en Axonico bajo la cobertura API INSTITUCIONAL', 'Las planillas o constancias de asistencia no deben ser cargadas en la web de Api, pero es requisito que el profesional las tenga a su resguardo.',]
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
      html: `<ul>
      <li>Cargar la prestación dentro del mes de atención. El tiempo límite para hacerlo es hasta el último día del mes, 23:59 hs. </li><li>Cargar fuera de fecha afecta el consumo mensual del socio y la liquidación de dicha prestación, atrasando el pago de la misma.</li><li>Usar la fecha real de sesión en caso de que el sistema lo admita.</li><li>Registrar evolución de la sesión en la Historia Clínica.</li><li>Evitar acumulaciones grandes de carga: lo recomendado es carga diaria.</li>
      
        <a href="https://api.his.axonico.ar/login"
           target="_blank"
           rel="noopener noreferrer">
          Ingresar a Axónico
        </a>
      
      </ul>`
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
      <li>En caso de las coberturas que no requieran carga de documentación, reguardar la misma, mínimo 2 años por posible auditorias.</li>
      
      <a href="https://apisaludmental.com.ar/profesionales/"
           target="_blank"
           rel="noopener noreferrer">
          Ingresar a Web API
        </a>
        <a href="./assets/img/cuadro-orientativo.jpeg"
           target="_blank"
           rel="noopener noreferrer">
          Cuadro orientativo
        </a>
        
        </ul>`
    }
  ]
};

const copays = [
  {
    name: 'Unión Personal',
    image: './assets/img/copagos-up.jpeg'
  },
  {
    name: 'Omint',
    image: './assets/img/copagos-omint.jpeg'
  },
  {
    name: 'Hominis',
    image: './assets/img/copagos-hominis.jpeg'
  },
  {
    name: 'OSPE',
    image: './assets/img/copagos-ospe.jpeg'
  },
  {
    name: 'Premedic',
    image: './assets/img/copagos-premedic.jpeg'
  },
  {
    name: 'API Institucional',
    image: './assets/img/copagos-API.jpeg'
  },
  {
    name: 'Post Swiss',
    image: './assets/img/copagos-postswiss.jpeg'
  },
  {
    name: 'Post 30 Omint',
    image: './assets/img/copagos-post30omint.jpeg'
  },
  {
    name: 'Ausentes',
    image: './assets/img/copagos-ausentes.jpeg'
  },
];

const copayServices = ['Psicoterapia individual', 'Terapia de pareja', 'Terapia de familia / pareja', 'Psiquiatría', 'Psicodiagnóstico', 'Admisión'];

function copaySvg(coverage) {
  const rows = copayServices.map((service, index) => {
    const y = 190 + index * 76;
    return `<rect x="50" y="${y - 38}" width="700" height="62" rx="18" fill="${index % 2 ? '#f8f2e8' : '#eef7f8'}"/>
      <text x="78" y="${y}" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="700" fill="#173f66">${service}</text>
      <text x="715" y="${y}" text-anchor="end" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="800" fill="#173f66">${coverage.values[index]}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="720" viewBox="0 0 800 720">
    <rect width="800" height="720" rx="34" fill="#ffffff"/>
    <rect x="50" y="42" width="700" height="64" rx="32" fill="#173f66"/>
    <text x="400" y="84" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="31" font-weight="800" fill="white">COPAGOS 2026</text>
    <text x="400" y="142" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="32" font-weight="800" fill="#173f66">${coverage.name}</text>
    ${rows}
    <rect x="50" y="650" width="700" height="44" rx="18" fill="#dceff5"/>
    <text x="400" y="679" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="17" font-weight="700" fill="#173f66">Valores orientativos · verificar importe arrojado por Axónico al cargar la prestación</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderCopay(index = 0) {
  const coverage = copays[index];
  const tabs = document.querySelector('#copayTabs');
  const panel = document.querySelector('#copayPanel');
  if (!tabs || !panel) return;
  tabs.querySelectorAll('.copay-tab').forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  const image = coverage.image || copaySvg(coverage);
  panel.innerHTML = `<div class="copay-copy"><span class="tag">Cuadro orientativo</span><h3>${coverage.name}</h3><p>Consultá los importes por tipo de prestación. Hacé clic en la imagen para verla completa.</p></div><button class="copay-image-button" type="button" data-copay-full="${index}" aria-label="Ampliar cuadro de copagos de ${coverage.name}"><img src="${image}" alt="Cuadro orientativo de copagos de ${coverage.name}"></button>`;
}

function initCopays() {
  const tabs = document.querySelector('#copayTabs');
  if (!tabs) return;
  tabs.innerHTML = copays.map((coverage, index) => `<button class="step copay-tab ${index === 0 ? 'active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-copay="${index}">${coverage.name}</button>`).join('');
  renderCopay();
}

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

const mailsByArea = {

  administrativa: [
    { area: 'Coordinacion de Administración', responsable: 'Griselda Alvarez', mail: 'administracion@apisaludmental.com.ar', subject: 'Coordinacion general del área de administracion' },
    { area: 'Jefa de facturación', responsable: 'Rosana Polli', mail: 'facturacion@apisaludmental.com.ar', subject: 'Consulta por facturación o débito' },
    { area: 'Asist. administrativa / facturación', responsable: 'Gisela García', mail: 'ggarcia@apisaludmental.com.ar', subject: 'Soporte administrativo a profesionales' },
    { area: 'Asist. administrativa / facturación', responsable: 'Emilia Diaz', mail: 'ediaz@apisaludmental.com.ar', subject: 'Soporte administrativo a profesionales' },
    { area: 'Asist. administrativa / facturación', responsable: 'Dalila Canteros', mail: 'DCanteros@apisaludmental.com.ar', subject: 'Soporte administrativo a profesionales' },
    { area: 'Asist. administrativa / facturación', responsable: 'Florencia Spadini', mail: 'fspadini@apisaludmental.com.ar', subject: 'Soporte administrativo a profesionales' },
    { area: 'Facturación de honorarios', responsable: 'Solo recepción de facturas', mail: 'facturahonorarios@apisaludmental.com.ar', subject: 'Recepcion de facturas mensuales por honorarios profesionales' },
    { area: 'Contaduría', responsable: 'Patricio Romero', mail: 'contaduria@apisaludmental.com.ar', subject: 'Gestión contable' },
    { area: 'Contaduría', responsable: 'Carolina Otero', mail: 'admcontable@apisaludmental.com.ar', subject: 'Gestión contable' },
    { area: 'Recepción Administrativa', responsable: 'Cintia Czeczyk', mail: 'api@apisaludmental.com.ar', subject: 'Casilla general de Api' },
  ],

  asistencial: [
    { area: 'Coordinacion asistencial', responsable: 'Soledad Bruno', mail: 'sbruno@apisaludmental.com.ar', subject: 'Coordinación general del área asistencial' },
    { area: 'Supervisión Call Center', responsable: 'Lucia Campillo', mail: 'lcampillo@apisaludmental.com.ar', subject: 'Consultas referidas a turnos' },
    { area: 'Recepcion Sede Barrio Norte', responsable: '-', mail: 'barrionorte@apisaludmental.com.ar', subject: 'Consultorios externos de API' },
    { area: 'Recepcion Sede Caballito', responsable: '-', mail: 'caballito@apisaludmental.com.ar', subject: 'Consultorios externos de API' },
    { area: 'Turnos', responsable: '-', mail: 'turnos@apisaludmental.com.ar', subject: 'Atención telefónica y de WhatsApp para la gestión de turnos' },
  ],

  coordinacion: [
    { area: 'Coordinación Médica', responsable: 'Carla Oliva', mail: 'coliva@apisaludmental.com.ar', subject: 'Coordinacion general del área médica' },
    { area: 'Asesoramiento Legal', responsable: 'Lorna Oliva', mail: 'asistencialegal@apisaludmental.com.ar', subject: 'Consultas sobre certificados, oficios, tratamientos judicializados y asesoramiento legal a profesionales' },
    { area: 'Gestión de internaciones', responsable: 'Veronica Canaves, Milagros Caja Quiroz', mail: ['mquiroz@apisaludmental.com.ar', 'vcanaves@apisaludmental.com.ar'], subject: 'Consultas o situaciones referidas a pacientes internados y gestión de tratamientos domiciliarios.' },
    { area: 'Auditoria Internaciones', responsable: ['Dr. Pablo García San Agustín', 'Lic. Muñoz Micaela'], mail: ['psanagustin@apisaludmental.com.ar', 'micaela.munoz@apisaludmental.com.ar'], subject: 'Auditoria de pacientes internados en clinicas psiquiátricas.' },
    { area: 'Auditoria red y dispositivos especiales', responsable: 'Lic. Romanello Sabrina', mail: ['informes@apisaludmental.com.ar', 'sromanello@apisaludmental.com.ar'], subject: 'Auditoria informes y auditoria prestacional de red de profesionales.' },
    { area: 'Coordinación de Psiquiatría', responsable: 'Dra. Analía Gordillo', mail: 'agordillo@apisaludmental.com.ar', subject: 'Consultas y/o derivación de pacientes externados. Gestión del equipo de psiquiatras' },
    { area: 'Coordinación adultos', responsable: 'Lic. M. Eugenia Vitar', mail: 'mevitar@apisaludmental.com.ar', subject: 'Consultas clínicas referidas la red de profesionales de adultos y admisores y/o procedimientos del área' },
    { area: 'Coordinación infanto Juvenil', responsable: 'Lic. Andrea Gryner', mail: 'Andrea.gryner@apisaludmental.com.ar', subject: 'Consultas clínicas referidas la red de profesionales infanto y admisores y/o procedimientos del área' },
    { area: 'Acompañamientos terapéuticos', responsable: 'Ivanna Di Tullio', mail: ['at@apisaludmental.com.ar', 'iditullio@apisaludmental.com.ar'], subject: 'Consultas referidas a la derivación o proceder sobre el área' },   
    { area: 'Modulos interdisciplinarios', responsable: 'Ivanna Di Tullio', mail: 'modulosinterdisciplinarios@apisaludmental.com.ar', subject: 'Consultas referidas a la derivación o proceder sobre el área' },
    { area: 'Gestion asistencial', responsable: 'Gabriela Caraballo', mail: ['gestion.asistencial@apisaludmental.com.ar', 'gcaraballo@apisaludmental.com.ar'], subject: 'Gestion extensión de tratamientos, aumento de frecuencia y 2da consulta psiquiátrica Gestion autorizaciones, Casos judicializados' },
    { area: 'Dispositivos especiales', responsable: ['Lic. Micaela Muñoz', 'Milagros Quiroz'], mail: ['dispositivosespeciales@apisaludmental.com.ar', 'mquiroz@apisaludmental.com.ar'], subject: 'Consultas vinculadas a dispositivos de atencion especializados (consumo problemático, TCA, Hospital de día) y gestión de autorizaciones' },
    { area: 'Reclamos y contacto pacientes', responsable: 'Catalina Oller', mail: ['reclamos@apisaludmental.com.ar', 'contacto@apisaludmental.com.ar'], subject: 'Gestión de reclamos, gestión contacto paciente' },
    
  ]
};

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
const mailTabs = document.querySelector('#mailTabs');
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

function renderMails(area = 'asistencial') {
  const mails = mailsByArea[area] || [];
  const activeTab = mailTabs.querySelector(`[data-mail-area="${area}"]`);

  mailTabs.querySelectorAll('[role="tab"]').forEach(tab => {
    const isActive = tab === activeTab;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  mailCards.setAttribute('aria-labelledby', activeTab.id);
  mailCards.innerHTML = mails.map(item => {
    const body = 'Hola, equipo API\n\nLes escribo por la siguiente consulta:\n\n\n\nLos datos del paciente son:\n\nNombre y apellido:\n\nDNI:\n\nNúmero de credencial:\n\nCobertura Médica:\n\n\n\nGracias.';
    
    return `<article class="mail-card">
    <h3>${item.area}</h3>
    ${item.responsable
      ? `<p class="mail-responsable">${item.responsable}</p>`
      : ''
    }
    ${(Array.isArray(item.mail) ? item.mail : [item.mail]).map(correo => {
  const href = `mailto:${correo}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(body)}`;
  return `<a href="${href}">${correo}</a>`;
}).join('<br>')}
  </article>`;
  }).join('');
}

mailTabs.addEventListener('click', event => {
  const tab = event.target.closest('[data-mail-area]');
  if (!tab) return;
  renderMails(tab.dataset.mailArea);
});

mailTabs.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...mailTabs.querySelectorAll('[role="tab"]')];
  const currentIndex = tabs.indexOf(document.activeElement);
  let nextIndex = currentIndex;
  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
  if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = tabs.length - 1;
  tabs[nextIndex].focus();
  renderMails(tabs[nextIndex].dataset.mailArea);
});

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
  const copayTab = event.target.closest('.copay-tab');
  const copayFull = event.target.closest('[data-copay-full]');

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
  if (copayTab) renderCopay(Number(copayTab.dataset.copay));
  if (copayFull) {
    const coverage = copays[Number(copayFull.dataset.copayFull)];
    const image = coverage.image || copaySvg(coverage);
    modalData.copayTemp = {
      tag: 'Copagos',
      title: coverage.name,
      content: `<div class="copay-modal-scroll"><button class="copay-modal-zoom" type="button" aria-label="Ampliar imagen" aria-pressed="false"><img class="copay-modal-image" src="${image}" alt="Cuadro de copagos de ${coverage.name}"><span class="copay-zoom-icon" aria-hidden="true">⌕</span></button></div><p class="copay-zoom-help">Tocá la imagen para ampliar o reducir.</p><p class="copay-modal-note">Estos valores podrían sufrir cambios sin notificación previa.</p>`
    };
    openModal('copayTemp');
  }

  const copayZoom = event.target.closest('.copay-modal-zoom');
  if (copayZoom) {
    const isZoomed = copayZoom.classList.toggle('is-zoomed');
    copayZoom.setAttribute('aria-pressed', String(isZoomed));
    copayZoom.setAttribute('aria-label', isZoomed ? 'Reducir imagen' : 'Ampliar imagen');
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
initCopays();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
