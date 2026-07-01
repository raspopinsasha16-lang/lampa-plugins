(function () {
    'use strict';

    // Создаем глобальный объект плагина, который Lampa ищет при загрузке файла
    window.huyamba_plugin = {
        name: 'Huyamba Name',
        version: '1.0.0',
        description: 'Просмотр сайта Huyamba Name внутри Lampa'
    };

    function startPlugin() {
        // Создаем пункт меню
        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Добавляем элемент в меню Lampa
        if (window.Lampa && window.Lampa.Menu) {
            window.Lampa.Menu.add(menuitem);
        }

        // Регистрируем компонент отображения сайта
        if (window.Lampa && window.Lampa.Component) {
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
        }

        // Подключаем клик по меню
        if (window.Lampa && window.Lampa.Listener) {
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
    }

    // Запуск плагина
    if (window.appready) {
        startPlugin();
    } else if (window.Lampa && window.Lampa.Listener) {
        window.Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                startPlugin();
            }
        });
    } else {
        // Резервный таймер, если события Lampa не сработали вовремя
        var interval = setInterval(function () {
            if (window.appready || (window.Lampa && window.Lampa.Menu)) {
                clearInterval(interval);
                startPlugin();
            }
        }, 200);
    }
})();
