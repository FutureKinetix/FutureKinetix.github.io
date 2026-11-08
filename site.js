(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a[data-nav]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var phone = data.get('phone') || '';
      var topic = data.get('topic') || 'Консультация';
      var message = data.get('message') || '';
      var source = window.location.href;
      var body = [
        'Имя: ' + name,
        'Телефон: ' + phone,
        'Тема: ' + topic,
        'Комментарий: ' + message,
        'Страница: ' + source
      ].join('\n');
      var href = 'mailto:futurekinetix@ya.ru?subject=' +
        encodeURIComponent('Заявка с сайта FutureKinetix — ' + topic) +
        '&body=' + encodeURIComponent(body);
      window.location.href = href;

      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Откроется почтовое приложение. Если письмо не сформировалось, напишите на futurekinetix@ya.ru.';
      }
    });
  });
})();
