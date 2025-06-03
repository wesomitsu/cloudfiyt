import tinycolor from 'tinycolor2'

// Function to inject custom CSS into a <style> tag
export function injectButtonStyle(cssRule: string) {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(cssRule))
    document.head.appendChild(style)
}

// Inject CSS after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectButtonStyle(`
        button#radix\\:\\:rv6\\:-trigger-issues {
            background-color: red;
            color: white;
            border-radius: 4px;
            padding: 0.5rem 1rem;
        }
    `)
})

// Generate variations of a color
function generateColorVariations(defaultColor: string) {
    const defaultColorObj = tinycolor(defaultColor)

    const darkColor = defaultColorObj.clone().darken(2)
    const baseLight = tinycolor('#ffffff')
    const lightColor = tinycolor
        .mix(baseLight, defaultColorObj.toHex(), 12)
        .toHexString()
    const mediumColor = defaultColorObj.clone().lighten(26)

    return {
        default: defaultColorObj.toHexString(),
        dark: darkColor.toHexString(),
        light: lightColor,
        medium: mediumColor.toHexString(),
    }
}

// Generate selection color
function generateSelectionColor(defaultColor: string) {
    const defaultColorObj = tinycolor(defaultColor)
    const lightColor = defaultColorObj.lighten(8)
    return lightColor.toHexString()
}

// Generate theme object
export function generateTheme({
    primaryColor,
    fullLogoUrl,
    favIconUrl,
    logoIconUrl,
    websiteName,
}: {
    primaryColor: string
    fullLogoUrl: string
    favIconUrl: string
    logoIconUrl: string
    websiteName: string
}) {
    return {
        websiteName,
        colors: {
            avatar: '#515151',
            'blue-link': '#1890ff',
            danger: '#f94949',
            primary: generateColorVariations(primaryColor),
            warn: {
                default: '#f78a3b',
                light: '#fff6e4',
                dark: '#cc8805',
            },
            success: {
                default: '#14ae5c',
                light: '#3cad71',
            },
            selection: generateSelectionColor(primaryColor),
        },
        logos: {
            fullLogoUrl,
            favIconUrl,
            logoIconUrl,
        },
    }
}

// Default theme configuration
export const defaultTheme = generateTheme({
    primaryColor: '#6e41e2',
    websiteName: 'CloudifyTechs',
    fullLogoUrl: 'https://logosbynick.com/wp-content/uploads/2018/03/final-logo-example.png',
    favIconUrl: 'https://cdn.activepieces.com/brand/favicon.ico',
    logoIconUrl: 'https://cdn.activepieces.com/brand/logo.svg',
})
