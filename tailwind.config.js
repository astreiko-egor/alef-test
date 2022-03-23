const plugin = require('tailwindcss/plugin');

const hexToRGBA = (hex, opacity) => {
    return (
        'rgba(' +
        (hex = hex.replace('#', ''))
            .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
            .map(function (l) {
                return parseInt(hex.length % 2 ? l + l : l, 16);
            })
            .concat(isFinite(opacity) ? opacity : 1)
            .join(',') +
        ')'
    );
};

module.exports = {
    variants: {
        textColor: ({ after }) => after(['important']),
    },
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                shadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
                bottomLine: '0px 1px 0px rgba(17, 17, 17, 0.1)',
                topLine: '0px -1px 1px rgba(17, 17, 17, 0.1)',
                error: '0px 4px 4px rgba(255, 196, 196, 0.04), 0px 4px 40px rgba(255, 196, 196, 0.24)',
                notification: '0px 4px 32px rgba(51, 51, 51, 0.08)',
                hover: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 56px rgba(51, 51, 51, 0.16)',
                active: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 24px rgba(51, 51, 51, 0.24)',
                succes: '0px 4px 4px rgba(39, 174, 96, 0.04), 0px 4px 40px rgba(39, 174, 96, 0.24)',
            },
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px',
        },

        container: {
            center: true,
        },
        fontFamily: {
            mon: ['Montserrat', 'sans-serif'],
        },
        fontSize: {
            13: ['0.8125rem', 'normal'],
            14: ['0.875rem', '1.5rem'],
            16: ['1rem', '1.5rem'],
            20: ['1.25rem', '1.75rem'],
            24: ['1.5rem', '2rem'],
            32: ['2rem', '2.5rem'],
            40: ['2.5rem', '3rem'],
            48: ['3rem', '3.5rem'],
            56: ['3.5rem', '4rem'],
        },
        colors: {
            transparent: 'transparent',
            gray: {
                DEFAULT: hexToRGBA('#111111', 0.48),
                m: '#FAFAFA',
                l: '#F1F1F1',
                s: '#D4D4D4',
                k: '#6B6B6B',
            },
            black: '#111111',
            hblack: '#111111',
            white: {
                DEFAULT: '#FFFFFF',
                s: hexToRGBA('#FFFFFF', 0.88),
            },
            primary: {
                DEFAULT: '#01A7FD',
                hover: '#0F79AF',
                disabled: '#CEECFC',
                active: '#59C79F',
            },
            red: {
                DEFAULT: '#DB524E',
                girl: '#F9E3E3',
                boy: '#F2CACA',
                super: '#C7302B',
            },
            green: '#27AE60',
            blue: '#428BF9',
            star: '#FFD912',
        },
    },
    corePlugins: {
        container: false,
    },
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant('important', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(
                        `important${separator}${className}`
                    )}:important`;
                });
            });
        }),
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    width: '100%',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                    '@screen sm': {
                        maxWidth: '540px',
                    },
                    '@screen md': {
                        maxWidth: '720px',
                    },
                    '@screen lg': {
                        maxWidth: '960px',
                    },
                    '@screen xl': {
                        maxWidth: '1140px',
                    },
                    '@screen xxl': {
                        maxWidth: '1320px',
                    },
                },
            });
        },
    ],
};
