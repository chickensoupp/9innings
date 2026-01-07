// 載入側邊欄 HTML
function loadSidebar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            // 將側邊欄 HTML 插入到 body 的最前面
            document.body.insertAdjacentHTML('afterbegin', data);
            // 側邊欄載入完成後,設置活動狀態
            setActiveNavItem();
            // 初始化側邊欄狀態
            initializeSidebar();
        })
        .catch(error => {
            console.error('載入側邊欄失敗:', error);
        });
}

// 側邊選單切換功能
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // 桌面版時也切換主內容的邊距
    if (window.innerWidth >= 1200 && mainContent) {
        mainContent.classList.toggle('sidebar-open');
    }
}

// 根據當前頁面設置活動狀態
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// 初始化側邊欄狀態
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // 桌面版預設不展開側邊選單
    if (window.innerWidth >= 1200) {
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        if (mainContent) {
            mainContent.classList.remove('sidebar-open');
        }
    }
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', function() {
    // 載入側邊欄
    loadSidebar();
});

// 視窗大小改變時調整
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth >= 1200) {
        // 桌面版:移除遮罩層
        if (overlay) {
            overlay.classList.remove('active');
        }
        // 保持側邊欄狀態不變
    } else {
        // 移動版:移除主內容邊距類別
        if (mainContent) {
            mainContent.classList.remove('sidebar-open');
        }
    }
});

// ESC 鍵關閉側邊選單
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (overlay) {
                overlay.classList.remove('active');
            }
            if (mainContent) {
                mainContent.classList.remove('sidebar-open');
            }
        }
    }
});