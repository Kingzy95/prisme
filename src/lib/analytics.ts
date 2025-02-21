type EventOptions = {
    name: string
    properties?: Record<string, any>
}

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

class Analytics {
    private static instance: Analytics
    private initialized = false

    private constructor() {}

    static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics()
        }
        return Analytics.instance
    }

    init() {
        if (this.initialized) return

        // Google Analytics
        if (process.env.NEXT_PUBLIC_GA_ID) {
            const script = document.createElement("script")
            script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
            script.async = true
            document.head.appendChild(script)

            window.dataLayer = window.dataLayer || []
            window.gtag = function (...args: any[]) {
                window.dataLayer.push(args)
            }
            window.gtag("js", new Date())
            window.gtag("config", process.env.NEXT_PUBLIC_GA_ID)
        }

        this.initialized = true
    }

    trackEvent({ name, properties = {} }: EventOptions) {
        if (typeof window === "undefined") return

        // Google Analytics
        if (window.gtag) {
            window.gtag("event", name, properties)
        }

        // Console log en développement
        if (process.env.NODE_ENV === "development") {
            console.log(`[Analytics] ${name}`, properties)
        }
    }

    trackPageView(url: string) {
        this.trackEvent({
            name: "page_view",
            properties: { page_path: url },
        })
    }
}

export const analytics = Analytics.getInstance()
