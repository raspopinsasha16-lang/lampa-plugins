(function () {
    'use strict';

    function startHuyamba() {
        // Проверяем, что ядро Lampa готово
        if (!window.Lampa || !window.Lampa.Menu) return;

        var menuitem = {
            id: 'huyamba_site',
            title: 'Huyamba Name',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
            name: 'Huyamba Name'
        };

        // Добавляем пункт в левое меню
        window.Lampa.Menu.add(menuitem);

        // Создаем окно с сайтом БЕЗ использования знака "$"
        window.Lampa.Component.add('huyamba_component', function (object) {
            var box;
            
            this.create = function () {
                // Создаем элементы через стандартные методы браузера
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
                // Возвращаем элемент в формате, который ждет Lampa
                return window.Lampa.Reguest ? box : window.$(box);
            };

            this.destroy = function () {
                if (box && box.parentNode) {
                    box.parentNode.removeChild(box);
                }
            };
        });

        // Отслеживаем клик по нашему пункту
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

    // Запускаем проверку через безопасный таймер
    var interval = setInterval(function () {
        if (window.Lampa && window.Lampa.Menu) {
            clearInterval(interval);
            startHuyamba();
        }
    }, 200);
})();
