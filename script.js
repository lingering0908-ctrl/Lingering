// 測驗結果數據 - 預先準備HTML結構以提升性能
const results = {
    A: {
        title: "A. 隨性自然派",
        html: `
            <div class="result-title">A. 隨性自然派</div>
            <div class="result-content">
                <h3>核心特質：真誠至上、討厭偽裝</h3>
                <p><span class="highlight">戀愛優勢：</span>相處零壓力，能讓伴侶做最真實的自己</p>
                <p><span class="highlight">潛在擔憂：</span>有時太過隨性可能被誤解為不夠重視</p>
                <p><span class="highlight">深度剖析：</span>你追求的是靈魂層次的契合，表面形式反而不是重點。在愛情中你像一陣清新的風，不帶壓迫感卻能深深滲入人心。</p>
            </div>
        `
    },
    B: {
        title: "B. 精緻吸引力玩家",
        html: `
            <div class="result-title">B. 精緻吸引力玩家</div>
            <div class="result-content">
                <h3>核心特質：深諳戀愛心理學，注重第一印象</h3>
                <p><span class="highlight">戀愛優勢：</span>擅長創造火花，能快速提升好感度</p>
                <p><span class="highlight">潛在擔憂：</span>可能過度關注表面而忽略深度交流</p>
                <p><span class="highlight">深度剖析：</span>你天生懂得展示魅力的藝術，就像孔雀開屏般自然。在愛情戰場上你是策略家，但別忘了偶爾卸下盔甲，讓對方看見真實的你。</p>
            </div>
        `
    },
    C: {
        title: "C. 創造型戀人",
        html: `
            <div class="result-title">C. 創造型戀人</div>
            <div class="result-content">
                <h3>核心特質：拒絕平凡、追求獨特體驗</h3>
                <p><span class="highlight">戀愛優勢：</span>能讓關係永遠保持新鮮感，充滿驚喜</p>
                <p><span class="highlight">潛在擔憂：</span>可能因過度追求變化而讓對方感到不安</p>
                <p><span class="highlight">深度剖析：</span>你是愛情中的藝術家，用創意重新定義親密關係。你教會伴侶：愛不是固定公式，而是每天重新發現的旅程。</p>
            </div>
        `
    },
    D: {
        title: "D. 安全感守護者",
        html: `
            <div class="result-title">D. 安全感守護者</div>
            <div class="result-content">
                <h3>核心特質：重視穩定與和諧，傾向集體智慧</h3>
                <p><span class="highlight">戀愛優勢：</span>能建立令人安心的關係，善於溝通協調</p>
                <p><span class="highlight">潛在擔憂：</span>可能過度依賴他人意見，忽略自己內心聲音</p>
                <p><span class="highlight">深度剖析：</span>你相信愛是共建的城堡，需要穩固地基。你的力量來自於連結與共識，是關係中不可或缺的錨點。</p>
            </div>
        `
    }
};

// 頁面元素 - 預先緩存以提升性能
let quizPage, resultPage, resultContent, optionButtons;

// 檢測是否為Safari瀏覽器
const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

// 預載入結果頁面內容（Safari優化）
function preloadResults() {
    if (isSafari) {
        // 預先創建所有結果頁面的DOM結構
        Object.keys(results).forEach(answer => {
            const result = results[answer];
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.html;
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 緩存DOM元素
    quizPage = document.getElementById('quiz-page');
    resultPage = document.getElementById('result-page');
    resultContent = document.getElementById('result-content');
    optionButtons = document.querySelectorAll('.option-btn');
    
    // 預先為Safari優化
    if (isSafari) {
        // 啟用硬體加速
        document.body.style.webkitBackfaceVisibility = 'hidden';
        document.body.style.webkitTransform = 'translateZ(0)';
        document.body.style.webkitPerspective = '1000px';
        
        // 預先準備結果頁面樣式
        resultPage.style.willChange = 'opacity, transform';
        resultPage.style.webkitBackfaceVisibility = 'hidden';
        resultPage.style.webkitTransform = 'translateZ(0)';
        
        // 預載入結果內容
        preloadResults();
    }
    
    // 使用事件委託提升性能
    document.addEventListener('click', function(e) {
        if (e.target.closest('.option-btn')) {
            const button = e.target.closest('.option-btn');
            const answer = button.getAttribute('data-answer');
            showResult(answer);
        }
    });
});

// 顯示結果頁面 - 優化版本
function showResult(answer) {
    const result = results[answer];
    
    if (result) {
        // 性能監控（開發環境）
        const startTime = performance.now();
        
        // 立即更新結果內容（使用預先準備的HTML）
        resultContent.innerHTML = result.html;
        
        // 立即切換頁面（Safari優化）
        if (isSafari) {
            // Safari使用更直接的切換方式
            quizPage.classList.remove('active');
            resultPage.classList.add('active');
            resultPage.style.opacity = '1';
            resultPage.style.transform = 'translateY(0)';
            window.scrollTo(0, 0);
            
            // 性能監控
            const endTime = performance.now();
            console.log(`Safari頁面切換時間: ${endTime - startTime}ms`);
        } else {
            // 其他瀏覽器使用動畫
            switchToResultPage();
        }
    }
}

// 切換到結果頁面 - 優化版本
function switchToResultPage() {
    // 使用requestAnimationFrame確保流暢動畫
    requestAnimationFrame(() => {
        // 添加淡出效果
        quizPage.style.opacity = '0';
        quizPage.style.transform = 'translateY(-20px)';
        
        // 減少延遲時間
        setTimeout(() => {
            // 隱藏測驗頁面，顯示結果頁面
            quizPage.classList.remove('active');
            resultPage.classList.add('active');
            
            // 重置測驗頁面樣式
            quizPage.style.opacity = '1';
            quizPage.style.transform = 'translateY(0)';
            
            // 滾動到頂部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 為結果頁面添加淡入效果
            resultPage.style.opacity = '0';
            resultPage.style.transform = 'translateY(20px)';
            
            // 使用requestAnimationFrame確保動畫流暢
            requestAnimationFrame(() => {
                resultPage.style.opacity = '1';
                resultPage.style.transform = 'translateY(0)';
            });
        }, 150); // 減少延遲時間從300ms到150ms
    });
}

// 返回測驗頁面（如果需要）
function backToQuiz() {
    resultPage.classList.remove('active');
    quizPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 防止頁面刷新時的問題
window.addEventListener('beforeunload', function() {
    // 清理可能的動畫狀態
    document.body.style.webkitBackfaceVisibility = '';
    document.body.style.webkitTransform = '';
});

// 處理網頁預覽的載入錯誤
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('error', function() {
            // 如果網頁無法載入，顯示替代內容
            this.style.display = 'none';
            const preview = this.parentElement;
            preview.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #ffb3d9, #ffc0cb); border-radius: 10px; color: #8b2c7a; font-size: 16px; text-align: center; padding: 20px;">
                    <div>
                        <div style="font-size: 40px; margin-bottom: 10px;">🛍️</div>
                        <div>Lingering Accessories</div>
                        <div style="font-size: 14px; margin-top: 5px;">點擊上方按鈕前往官網</div>
                    </div>
                </div>
            `;
        });
    }
});
