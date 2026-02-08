Webpack  Alpinejs Tailwind 
first :
 in package.json , webpack.config.js , postcss.config.js and src directory into the root asp project
 
### Webpack (`webpack.config.js`):

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: "./src/js/index.js",
  

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "wwwroot/dist"),
    clean: true,
    publicPath: "/dist/",
    assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", 
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  
  stats: 'errors-only',
};
```

### Tailwind CSS:
 `src/css/style.css`:
```css
@import "tailwindcss";

@source "../../Pages/**/*.cshtml";
@source "../../Views/**/*.cshtml";

@font-face { ... }
...
```

###  Layout 


```html
<!doctype html>
<html lang="fa" dir="rtl" xmlns:x-transition="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <script>
    if (localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
  />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>
      
  </title>
  <link rel="stylesheet" href="~/dist/style.css" asp-append-version="true" />

  @await RenderSectionAsync("css", required: false)
</head>
<body
  x-data="{ page: 'اینجاااااااااااا', 'loaded': true, 'darkMode': false, 'stickyMenu': false, 'sidebarToggle': false, 'scrollTop': false }"
  x-init="
         darkMode = document.documentElement.classList.contains('dark');
         $watch('darkMode', value => {
            localStorage.setItem('darkMode', value);
            if (value) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
         })
  "
  class="bg-gray-50 dark:bg-gray-900"
>
<!-- ===== Preloader Start ===== -->
@await Html.PartialAsync("Partials/_Preloader")
<!-- ===== Preloader End ===== -->

<!-- ===== Page Wrapper Start ===== -->
<div class="flex h-screen overflow-hidden">
  <!-- ===== Sidebar Start ===== -->
  @await Html.PartialAsync("Partials/_Sidebar")
  <!-- ===== Sidebar End ===== -->

  <!-- ===== Content Area Start ===== -->
  <div class="relative flex flex-col flex-1 overflow-x-hidden custom-scrollbar overflow-y-auto">
    <!-- Small Device Overlay Start -->
    <include src="./partials/overlay.html" />
    <!-- Small Device Overlay End -->

    <!-- ===== Header Start ===== -->
    @await Html.PartialAsync("Partials/_Header")
    <!-- ===== Header End ===== -->

    <!-- ===== Main Content Start ===== -->
    <main>
        @RenderBody()
    </main>


    <!-- ===== Main Content End ===== -->
  </div>
  <!-- ===== Content Area End ===== -->
</div>
<!-- ===== Page Wrapper End ===== -->
<script src="~/dist/bundle.js" asp-append-version="true"></script>
@await RenderSectionAsync("js", required: false)
</body>
</html>

```
### package.json 
```
"scripts": {
  "dev": "webpack --watch --mode development",
  "build": "webpack --mode production"
},
```


###   Build
```xml
pnpm install
pnpm run build
```

### flow for develop
```
terminal 1 :
pnpm run dev

terminal 2 :
dotnet watch run
```
