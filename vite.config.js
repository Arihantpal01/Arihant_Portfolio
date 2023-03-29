export default {
  build: {
    rollupOptions: {
      // Treat these imports as external dependencies
      external: [
        'three',
        'three/examples/jsm/controls/OrbitControls'
      ],
      output: {
        // Provide global variables to use instead of import statements
        globals: {
          three: 'THREE'
        }
      }
    }
  }
}
