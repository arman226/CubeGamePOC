module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './app',
        extensions: ['.js', '.ios.js', '.android.js', '.native.js'],
        alias: {
          components: './app/components',
          routes: './app/routes',
          screens: './app/screens',
          utils: './app/utils',
        },
      },
    ],
  ],
};
