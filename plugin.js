(function () {
    'use strict';

    function startPlugin() {
        // Ждем, пока Lampa полностью загрузится
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                createMenuComponent();
            }
        });
    }

    function createMenuComponent() {
        // 1. Добавляем пункт в левое меню Lampa
        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Встраиваем в список меню
        Lampa.Menu.add(menuitem);

        // 2. Создаем компонент, который будет открываться при клике
        Lampa.Component.add('huyamba_component', function (object) {
            var comp = this;
            var html = $('<div></div>');
            
            // Ссылка на нужный сайт
            var url = 'https://ru.huyamba.name';

            this.create = function () {
                // Создаем iframe на весь экран внутри интерфейса Lampa
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

        // 3. Вешаем событие клика на наш пункт меню
        Lampa.Listener.follow('menu', function (e) {
            if (e.type == 'click' && e.item.id == 'huyamba_site') {
                // Открываем созданный выше компонент
                Lampa.Activity.push({
                    plugin: 'huyamba_plugin',
                    title: 'Huyamba Name',
                    component: 'huyamba_component',
                    page: 1
                });
            }
        });
    }

    // Запуск плагина (проверка на существование ядра Lampa)
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }

})();
