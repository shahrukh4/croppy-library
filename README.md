# Croppie Library
It is a wrapper around [croppie](https://foliotek.github.io/Croppie/) js library built on top of vanilla javascript. Easy to use and fast to implment. Implement the crop on images and preview them just in 3-5 lines of code. No muss no fuss. We take care of everything neccesary for implementing a basic crop library.
Most of the things are customisable and totally flexible as in the original library written by **foliotek**.

# Steps to use
- Download the source code via HTTPS or clone it to your local and place the `crop.js` and `crop.css` files as per your project hierarchy of public JS and CSS files.
```
<!-- Crop CSS -->
<link rel="stylesheet" href="../src/css/crop.css">

<!-- Crop JS -->
<script src="../src/js/crop.min.js"></script>
```
- Instantiate the object as follows just in three basic line of codes.
```
let crop = new ImageCrop({
    crop : true,                     //Optional (Default: true)
    showPreview: true,               //Optional (Default: false)
    imagePreview : '.image_preview', 
    //Required if want to show crop image preview (This is id/class of div which must contain <img> tag)
});
```
- Now place event listener for the image change (i.e. when user select an image)
```
//On clicking on image select
document.getElementById('YOUR_INPUT_FILE_ID').addEventListener('change', function(){
    crop.initCrop(this);
});
```
- Now place the code for after clicking the crop button
```
//On clicking on crop
document.getElementById('crop_image').addEventListener('click', function(){
    console.log(crop.getData()); //getData() gives the cropped image data
});
```

- Wollaa... the crop for image is now implemented and you can test it now.

# Examples
- We give you three examples along with this library (i.e. index.html, examples/blog.html, examples/album.html)
- Please take the referance from examples to extend the library as per your needs.

# Note
This is not a full fletched library, it is simple to implement and customisable. You can customise as per the examples given by us and even provide your `crop modal` HTML to the `ImageCrop` instance.

Thanks for reading and using the wrapper. I am open for the future contributions for this library. Please contact me if you have any issues.