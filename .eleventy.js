export default function(eleventyConfig) {
  // Copy CSS
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  eleventyConfig.addPassthroughCopy("output.json");


  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "layouts"
    }
  };
}
