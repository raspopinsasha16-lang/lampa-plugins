/**
 * {
 * "name": "Хуямба",
 * "version": "1.0.5",
 * "description": "Huyamba Site",
 * "plugin": "huyamba_plugin"
 * }
 */

(function () {
    'use strict';

    // Флаг, чтобы не добавлять меню несколько раз
    var menuAdded = false;

    function tryInject() {
        // Если уже добавили, или Lampa еще не загрузила свои модули — выходим и ждем следующего тика
        if (menuAdded) return;
        if (!window.Lampa || !window.Lampa.Menu || !window.Lampa.Component || !window.Lampa.Listener) return;

        menuAdded = true;

        // 1. Создаем пункт меню
        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Добавляем в левую панель
        window.Lampa.Menu.add(menuitem);

        // 2. Регистрируем внутренний экран с фреймом сайта
        window.Lampa.Component.add('huyamba_component', function (object) {
            var comp = this;
            var html = $('<div></div>');
            var url = 'https://ru.huyamba.name';

            this.create = function () {
                var iframe = $('<iframe src="' + url + '" style="width: 100%; height: 100vh; border: none; background: #141414;"></iframe>');
                html.append(iframe);
            };

            this.render = function () {
                return html;
            };

            this.destroy = function () {
                html.remove();
            };
        });

        // 3. Отслеживаем нажатие
        window.Lampa.Listener.follow('menu', function (e) {
            if (e.type == 'click' && e.item.id == 'huyamba_site') {
                window.Lampa.Activity.push({
                    plugin: 'huyamba_plugin',
                    title: 'Huyamba Name',
                    component: 'huyamba_component',
                    page: 1
                });
            }
        });
    }

    // Запускаем постоянную проверку каждые 500 миллисекунд, пока меню не создастся
    var injectInterval = setInterval(function() {
        if (menuAdded) {
            clearInterval(injectInterval);
        } else {
            tryInject();
        }
    }, 500);

})();
