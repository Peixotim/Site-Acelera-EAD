import type {NextConfig} from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,

    eslint: {
        ignoreDuringBuilds: true, // não trava startup por causa de lint
    },
    typescript: {
        ignoreBuildErrors: true, // não trava startup por causa de types
    },

    webpack: (config, {dev}) => {
        if (dev) {
            // Desabilita source maps em dev -> menos carga no startup
            config.devtool = false
        }
        return config
    },

    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "framer-motion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-toast",
            "@tanstack/react-query",
        ],
    },

    turbopack: {
        // configurações extras do turbopack
        resolveAlias: {
            // Se não quiser usar react-router-dom, pode apontar para um arquivo vazio
            "react-router-dom": "./empty.js",
        },
    },
}

export default nextConfig
