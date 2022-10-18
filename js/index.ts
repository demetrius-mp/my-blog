const colorThemes = ['light', 'dark'] as const;
type ColorTheme = typeof colorThemes[number];

const colorTheme = {
  get(): ColorTheme {
    const storedTheme = localStorage.getItem('colorTheme');
    const colorTheme = this.isColorTheme(storedTheme) ? storedTheme : 'light';

    return colorTheme;
  },

  set(colorTheme: ColorTheme) {
    localStorage.setItem('colorTheme', colorTheme);
  },

  toggle() {
    const currentTheme = this.get();
    const toggledTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', toggledTheme);
    this.set(toggledTheme);
  },

  isColorTheme(value: unknown): value is ColorTheme {
    return typeof value === 'string' && colorThemes.includes(value as ColorTheme);
  },

  init() {
    const colorTheme = this.get();
    document.documentElement.setAttribute('data-theme', colorTheme);

    document.getElementById('themeSwitcher')!.addEventListener('click', () => {
      this.toggle();
    });
  },
}

colorTheme.init();
