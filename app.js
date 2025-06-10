document.addEventListener('DOMContentLoaded', function() {
    // Переключение вкладок
    function switchTab(tabId) {
        // Скрыть текущую активную вкладку
        const currentActiveTab = document.querySelector('.tab-pane.active');
        if (currentActiveTab) {
            currentActiveTab.classList.remove('active');
        }
        
        // Показать новую вкладку
        const newTab = document.getElementById(tabId);
        if (newTab) {
            newTab.classList.add('active');
        }
        
        // Обновить активную кнопку
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
    }
    
    // Обработчики для кнопок вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Модальное окно для добавления категории
    const addBtn = document.querySelector('.add-category-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    if (addBtn && modalOverlay) {
        addBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
    }
    
    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
    
    // Удаление категории
    document.querySelectorAll('.delete-category-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.closest('.category');
            category.style.transform = 'translateX(-100%)';
            category.style.opacity = '0';
            setTimeout(() => {
                category.remove();
            }, 300);
        });
    });
    
    // Имитация новых уведомлений
    setTimeout(() => {
        const notificationBtn = document.querySelector('[data-tab="tab1"]');
        if (notificationBtn) notificationBtn.classList.add('has-notification');
    }, 3000);
    
    // Service Worker для PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('ServiceWorker зарегистрирован');
            }).catch(err => {
                console.log('Ошибка регистрации ServiceWorker: ', err);
            });
        });
    }
});