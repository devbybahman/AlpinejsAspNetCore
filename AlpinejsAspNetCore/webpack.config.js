const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // مدیریت حالت تولید یا توسعه
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    // ورودی اصلی جاوااسکریپت (که در آن alpine و استایل‌ها ایمپورت شده‌اند)
    entry: "./src/js/index.js",

    output: {
        // خروجی مستقیماً به پوشه static دات‌نت می‌رود
        path: path.resolve(__dirname, "wwwroot/dist"),
        filename: "bundle.js",
        // تمیز کردن پوشه خروجی قبل از هر بیلد
        clean: true,
        // آدرس‌دهی فایل‌ها در مرورگر (بسیار مهم برای فونت‌ها و تصاویر)
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
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        // تنظیمات در postcss.config.js شما موجود است
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            // توجه: قانون مربوط به .html حذف شد چون در Razor Pages کاربردی ندارد
        ],
    },

    plugins: [
        // فقط استخراج CSS باقی می‌ماند (HtmlWebpackPlugin حذف شد)
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],

    // تنظیمات برای سرعت بیشتر و مانیتور کردن خطاها
    stats: 'errors-only',
    performance: {
        hints: false,
    },

    // برای راحتی در دیباگ
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};