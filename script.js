document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    saveBtn.addEventListener('click', savePreferences);
    resetBtn.addEventListener('click', resetPreferences);
    animateBtn.addEventListener('click', triggerAnimation);
    
    // Theme change handler
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Animation change handler
    animationSelect.addEventListener('change', function() {
        // Just update the class, don't trigger yet
        updateAnimationClass(this.value);
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedTheme = localStorage.getItem('userTheme');
        const savedAnimation = localStorage.getItem('userAnimation');
        
        if (savedTheme) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }
        
        if (savedAnimation) {
            animationSelect.value = savedAnimation;
            updateAnimationClass(savedAnimation);
        }
    }
    
    // Function to save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('userTheme', themeSelect.value);
        localStorage.setItem('userAnimation', animationSelect.value);
        
        // Show feedback
        alert('Preferences saved! They will be remembered next time you visit.');
    }
    
    // Function to reset preferences
    function resetPreferences() {
        localStorage.removeItem('userTheme');
        localStorage.removeItem('userAnimation');
        
        // Reset to defaults
        themeSelect.value = 'light';
        animationSelect.value = 'bounce';
        applyTheme('light');
        updateAnimationClass('bounce');
        
        // Show feedback
        alert('Preferences reset to defaults!');
    }
    
    // Function to apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Function to update animation class
    function updateAnimationClass(animation) {
        // Remove all animation classes first
        animatedElement.classList.remove('bounce', 'rotate', 'pulse');
        
        // Add the selected animation class
        animatedElement.classList.add(animation);
        
        // Initially pause the animation
        animatedElement.style.animationPlayState = 'paused';
    }
    
    // Function to trigger animation
    function triggerAnimation() {
        // Reset animation to ensure it plays each time
        animatedElement.style.animation = 'none';
        void animatedElement.offsetWidth; // Trigger reflow
        animatedElement.style.animation = null;
        
        // Play the animation
        animatedElement.style.animationPlayState = 'running';
        
        // After animation completes, pause it again
        const animationDuration = getAnimationDuration();
        setTimeout(() => {
            animatedElement.style.animationPlayState = 'paused';
        }, animationDuration * 1000);
    }
    
    // Helper function to get animation duration
    function getAnimationDuration() {
        const style = window.getComputedStyle(animatedElement);
        const animationName = style.animationName;
        
        if (animationName === 'bounce') return 1;
        if (animationName === 'rotate') return 2;
        if (animationName === 'pulse') return 1.5;
        return 1;
    }
});