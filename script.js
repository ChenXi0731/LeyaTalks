document.addEventListener('DOMContentLoaded', function() {
    // 初始化元素
    const tabs = document.querySelectorAll('.tab');
    const navItems = document.querySelectorAll('.nav-item');
    const contentAreas = document.querySelectorAll('.content-area');

    // 头部标签切换
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有tab的active状态
            tabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的tab添加active状态
            this.classList.add('active');
            
            // 如果是主页相关标签，显示主页内容
            showPage('home-page');
        });
    });

    // 底部导航切换
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取页面标识
            const pageId = this.getAttribute('data-page');
            
            // 移除所有导航项的active状态
            navItems.forEach(nav => nav.classList.remove('active'));
            // 给当前点击的导航项添加active状态
            this.classList.add('active');
            
            // 显示对应页面
            switch(pageId) {
                case 'home':
                    showPage('home-page');
                    break;
                case 'category':
                    showPage('category-page');
                    break;
                case 'chat':
                    showPage('chat-page');
                    break;
            }
        });
    });

    // 显示指定页面的函数
    function showPage(pageId) {
        // 隐藏所有内容区域
        contentAreas.forEach(area => area.classList.add('hidden'));
        
        // 显示指定的内容区域
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }
        
        // 如果显示的是主页，设置第一个tab为active
        if (pageId === 'home-page') {
            tabs.forEach((tab, index) => {
                if (index === 0) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
    }

    // 聊天输入框和发送按钮
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');

    if (chatInput && sendBtn) {
        // 按回车发送消息
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // 点击发送按钮发送消息
        sendBtn.addEventListener('click', sendMessage);
    }

    // 发送消息的函数
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // 这里可以添加发送消息的逻辑
            console.log('发送消息:', message);
            
            // 清空输入框
            chatInput.value = '';
        }
    }

    // 分类项目点击事件
    const categoryItems = document.querySelectorAll('.category-item:not(.coming-soon)');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            console.log('选择分类:', categoryName);
            // 这里可以添加分类点击的逻辑
        });
    });

    // 阻止即将上线的分类点击
    const comingSoonCategories = document.querySelectorAll('.category-item.coming-soon');
    comingSoonCategories.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('此功能即將上線，敬請期待！');
        });
    });

    // 添加页面滚动效果
    const postList = document.querySelector('.post-list');
    if (postList) {
        // 添加下拉刷新的视觉效果
        let startY = 0;
        postList.addEventListener('touchstart', function(e) {
            startY = e.touches[0].pageY;
        });

        postList.addEventListener('touchmove', function(e) {
            const currentY = e.touches[0].pageY;
            const scrollTop = this.scrollTop;
            
            // 只有当滚动到顶部时才允许下拉刷新的视觉效果
            if (scrollTop <= 0 && currentY > startY) {
                e.preventDefault();
                this.style.transform = `translateY(${(currentY - startY) / 3}px)`;
            }
        });

        postList.addEventListener('touchend', function() {
            // 回弹效果
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'translateY(0)';
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
    }
}); 