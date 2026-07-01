(function () {
    'use strict';

    // Регистрируем плагин внутри официальной экосистемы Lampa
    Lampa.Plugins.add('huyamba_plugin', function (api) {
        
        function start() {
            var menuitem = {
                id: 'huyamba_site',
                title: 'Huyamba Name',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
                name: 'Huyamba Name'
            };

            // Добавляем пункт меню
            if (Lampa.Menu && Lampa.Menu.add) {
                Lampa.Menu.add(menuitem);
            }

            // Создаем компонент
            Lampa.Component.add('huyamba_component', function (object) {
                var html;
                
                this.create = function () {
                    html = Lampa.Template.get('activity_unset', {});
                    var iframe = document.createElement('iframe');
                    iframe.setAttribute('src', 'https://ru.huyamba.name');
                    iframe.style.width = '100%';
                    iframe.style.height = '100vh';
                    iframe.style.border = 'none';
                    iframe.style.background = '#141414';
                    
                    if (html.append) html.append(iframe);
                    else if (html.get) html.get(0).appendChild(iframe);
                };

                this.render = function () {
                    return html;
                };

                this.destroy = function () {
                    if (html && html.remove) html.remove();
                };
            });

            // Подписываемся на клик
            Lampa.Listener.follow('menu', function (e) {
                if (e.type === 'click' && e.item.id === 'huyamba_site') {
                    Lampa.Activity.push({
                        title: 'Huyamba Name',
                        component: 'huyamba_component',
                        page: 1
                    });
                }
            });
        }

        // Запускаем только тогда, когда Lampa сама скажет, что плагины готовы
        if (window.appready) {
            start();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') start();
            });
        }
    });
})();
