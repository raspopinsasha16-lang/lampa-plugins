(function () {
    'use strict';

    function startHuyamba() {
        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Добавляем в левое меню
        Lampa.Menu.add(menuitem);

        // Создаем окно с сайтом
        Lampa.Component.add('huyamba_component', function (object) {
            var html = $('<div></div>');
            this.create = function () {
                var iframe = $('<iframe src="https://ru.huyamba.name" style="width: 100%; height: 100vh; border: none; background: #141414;"></iframe>');
                html.append(iframe);
            };
            this.render = function () { return html; };
            this.destroy = function () { html.remove(); };
        });

        // Отслеживаем клик
        Lampa.Listener.follow('menu', function (e) {
            if (e.type == 'click' && e.item.id == 'huyamba_site') {
                Lampa.Activity.push({
                    title: 'Huyamba Name',
                    component: 'huyamba_component',
                    page: 1
                });
            }
        });
    }

    // Запуск без лишних проверок
    startHuyamba();
})();
