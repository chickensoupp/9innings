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
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'home.html')) {
            item.classList.add('active');
        }
    });
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    
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
});

// 視窗大小改變時調整
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth >= 1200) {
        // 桌面版：移除遮罩層
        overlay.classList.remove('active');
        // 保持側邊欄狀態不變
    } else {
        // 移動版：移除主內容邊距類別
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
            overlay.classList.remove('active');
            if (mainContent) {
                mainContent.classList.remove('sidebar-open');
            }
        }
    }
});