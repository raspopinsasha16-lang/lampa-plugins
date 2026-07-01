/**
 * {
 * "name": "Тест Хуямба",
 * "version": "2.0.0",
 * "description": "Проверка плагина",
 * "plugin": "huyamba_plugin"
 * }
 */

(function () {
    'use strict';

    function init() {
        // Просто выводим сообщение на экран в стиле Лампы
        if (window.Lampa && window.Lampa.Noty) {
            window.Lampa.Noty.show('Плагин успешно загружен и работает!');
        } else {
            alert('Плагин работает!');
        }
    }

    // Безопасный запуск
    if (window.appready) {
        init();
    } else if (window.Lampa && window.Lampa.Listener) {
        window.Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    } else {
        setTimeout(init, 1000);
    }
})();
