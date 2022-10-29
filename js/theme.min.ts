const themes = ['light', 'dark'] as const;
type Theme = typeof themes[number];

const theme = {
  isTheme(value: unknown): value is Theme {
    return typeof value === 'string' && themes.includes(value as Theme);
  },

  getTheme(): Theme {
    const storedTheme = localStorage.getItem('theme');
    const theme = this.isTheme(storedTheme) ? storedTheme : 'light';

    return theme;
  },

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  attachEventListener() {
    document.getElementById('themeSwitcher')!.addEventListener('click', () => {
      const currentTheme = this.getTheme();
      const toggledTheme = currentTheme === 'light' ? 'dark' : 'light';

      this.setTheme(toggledTheme);
    });
  },

  use() {
    const storedTheme = this.getTheme();
    this.setTheme(storedTheme);
  }
}

theme.use();