import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';
import path from 'path';

const includeStyles = {
  '.ant-btn-primary:hover,.ant-btn-primary:focus': {
    background: '#40a9ff',
    'border-color': '#40a9ff',
    color: '#fff'
  }
};

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    themePreprocessorPlugin({
      less: {
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: path.resolve('src/theme/default-vars.less'),
            includeStyles
          },
          {
            scopeName: 'theme-green',
            path: path.resolve('src/theme/green-vars.less'),
            includeStyles
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
