"use strict";
const colorThemes = ['light', 'dark'];
const colorTheme = {
    get() {
        const storedTheme = localStorage.getItem('colorTheme');
        const colorTheme = this.isColorTheme(storedTheme) ? storedTheme : 'light';
        return colorTheme;
    },
    set(colorTheme) {
        localStorage.setItem('colorTheme', colorTheme);
    },
    toggle() {
        const currentTheme = this.get();
        const toggledTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', toggledTheme);
        this.set(toggledTheme);
    },
    isColorTheme(value) {
        return typeof value === 'string' && colorThemes.includes(value);
    },
    init() {
        const colorTheme = this.get();
        document.documentElement.setAttribute('data-theme', colorTheme);
        document.getElementById('themeSwitcher').addEventListener('click', () => {
            this.toggle();
        });
    },
};
colorTheme.init();
//# sourceMappingURL=index.js.map