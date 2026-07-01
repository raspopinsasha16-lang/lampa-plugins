/**
 * {
 * "name": "Хуямба",
 * "version": "1.1.0",
 * "description": "Huyamba Web Site",
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

        window.Lampa.Menu.add(menuitem);

        window.Lampa.Component.add('huyamba_component', function (object) {
            var comp = this;
            var html;

            this.create = function () {
                // Используем абсолютно безопасный способ создания разметки, совместимый со всеми версиями
                html = window.Lampa.Template.get('activity_unset', {});
                
                var iframe = document.createElement('iframe');
                iframe.src = 'https://ru.huyamba.name';
                iframe.style.width = '100%';
                iframe.style.height = '100vh';
                iframe.style.border = 'none';
                iframe.style.background = '#141414';

                // Напрямую добавляем фрейм внутрь контейнера Lampa
                if (html && html.get) {
                    html.get(0).appendChild(iframe);
                } else if (html && html.append) {
                    html.append(iframe);
                }
            };

            this.render = function () {
                return html;
            };

            this.destroy = function () {
                if (html && html.remove) html.remove();
            };
        });

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
