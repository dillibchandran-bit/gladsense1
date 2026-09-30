import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-core';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('src/components/NicheKeywordLab') || id.includes('src/components/NicheExplorer') || id.includes('src/components/KgrCalculator') || id.includes('src/components/AiNicheEvaluator') || id.includes('src/data/nichesData')) {
              return 'suite-niche-lab';
            }
            if (id.includes('src/components/RevenueProfitPlanner') || id.includes('src/components/RevenueCalculator') || id.includes('src/components/BudgetBlueprint')) {
              return 'suite-revenue-planner';
            }
            if (id.includes('src/components/PolicyToolkit') || id.includes('src/components/SingleClickSolutions') || id.includes('src/components/AdSenseAudit') || id.includes('src/components/ContentDevelopmentSop')) {
              return 'suite-policy-toolkit';
            }
            if (id.includes('src/components/BlogHub') || id.includes('src/data/blogPosts')) {
              return 'suite-knowledge-base';
            }
            if (id.includes('src/components/LegalModal') || id.includes('src/components/NicheDetailModal')) {
              return 'suite-modals';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
