const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#2ab7ca",
              "@layout-header-background": "white",
              "@menu-dark-bg": "white",
              "@layout-footer-background": "#333333",
              "@text-color": "black",
              "@menu-item-group-title-color": "black",
              "@menu-dark-selected-item-text-color": "black",
              "@layout-body-background": "#fff",
              "@text-color-inverse": "black",
              "@card-padding-base": "12px",
              "@input-hover-border-color": "white",
              "@menu-highlight-color": "#FFD91C",
              "@menu-item-active-bg": "white",
              "@menu-inline-submenu-bg": "white",
              "@tag-default-bg": "white",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
