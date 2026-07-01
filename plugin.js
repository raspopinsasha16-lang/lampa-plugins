/**
 * {
 * "name": "Хуямба",
 * "version": "1.3.0",
 * "description": "Открыть сайт можно прямо внутри этой карточки!",
 * "plugin": "huyamba_plugin"
 * }
 */

(function () {
    'use strict';

    function startHuyamba() {
        if (!window.Lampa || !window.Lampa.Component) return;

        // 1. Регистрируем экран с сайтом
        window.Lampa.Component.add('huyamba_component', function (object) {
            var html;
            this.create = function () {
                html = window.Lampa.Template.get('activity_unset', {});
                var iframe = document.createElement('iframe');
                iframe.src = 'https://ru.huyamba.name';
                iframe.style.width = '100%';
                iframe.style.height = '100vh';
                iframe.style.border = 'none';
                iframe.style.background = '#141414';

                if (html && html.get) {
                    html.get(0).appendChild(iframe);
                } else if (html && html.append) {
                    html.append(iframe);
                }
            };
            this.render = function () { return html; };
            this.destroy = function () { if (html && html.remove) html.remove(); };
        });

        // 2. Ловим открытие карточки нашего плагина
        if (window.Lampa.Listener) {
            window.Lampa.Listener.follow('activity', function (e) {
                // Если открылась карточка плагина Хуямба
                if (e.type === 'open' && e.component === 'plugins' && e.object && e.object.plugin === 'huyamba_plugin') {
                    setTimeout(function () {
                        var body = window.$('.extensions__item-info'); 
                        if (!body.length || body.find('.btn-huyamba-start').length) return;

                        // Создаем кнопку запуска
                        var btn = window.$('<div class="extensions__item-btn btn-huyamba-start selector" style="background:#fff; color:#000; padding:10px 20px; margin-top:15px; text-align:center; border-radius:4px; font-weight:bold; cursor:pointer;">ЗАПУСТИТЬ САЙТ</div>');
                        
                        btn.on('hover:enter', function () {
                            window.Lampa.Activity.push({
                                title: 'Huyamba Name',
                                component: 'huyamba_component',
                                page: 1
                            });
                        });

                        body.append(btn);
                        
                        if (window.Lampa.Controller && window.Lampa.Controller.refresh) {
                            window.Lampa.Controller.refresh();
                        }
                    }, 150);
                }
            });
        }
    }

    var interval = setInterval(function () {
        if (window.Lampa && window.Lampa.Component) {
            clearInterval(interval);
            startHuyamba();
        }
    }, 300);
})();
