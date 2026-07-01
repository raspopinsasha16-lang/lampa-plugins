/**
 * {
 * "name": "Хуямба",
 * "version": "1.0.8",
 * "description": "Huyamba Site",
 * "plugin": "huyamba_plugin"
 * }
 */

(function () {
    'use strict';

    function startHuyamba() {
        if (!window.Lampa || !window.Lampa.Menu) return;

        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Добавляем пункт в левое меню Lampa
        window.Lampa.Menu.add(menuitem);

        // Создаем чистый компонент без использования jQuery ($)
        window.Lampa.Component.add('huyamba_component', function (object) {
            var box;
            
            this.create = function () {
                box = document.createElement('div');
                box.style.width = '100%';
                box.style.height = '100vh';
                box.style.background = '#141414';

                var iframe = document.createElement('iframe');
                iframe.src = 'https://ru.huyamba.name';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';

                box.appendChild(iframe);
            };

            this.render = function () {
                // Возвращаем чистый DOM-элемент напрямую
                return box;
            };

            this.destroy = function () {
                if (box && box.parentNode) {
                    box.parentNode.removeChild(box);
                }
            };
        });

        // Слушаем нажатие на пункт меню
        window.Lampa.Listener.follow('menu', function (e) {
            if (e.type === 'click' && e.item.id === 'huyamba_site') {
                window.Lampa.Activity.push({
                    title: 'Huyamba Name',
                    component: 'huyamba_component',
                    page: 1
                });
            }
        });
    }

    // Безопасный запуск после загрузки интерфейса
    if (window.Lampa && window.Lampa.Menu) {
        startHuyamba();
    } else {
        var interval = setInterval(function () {
            if (window.Lampa && window.Lampa.Menu) {
                clearInterval(interval);
                startHuyamba();
            }
        }, 300);
    }
})();
