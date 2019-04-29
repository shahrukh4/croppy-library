/*$(document).ready(function(){
    $image_crop = $('#image_demo').croppie({
        enableExif: true,
        viewport: {
            width:180,
            height:180,
            type:'square'
        },
        boundary:{
            width: 250,
            height: 250
        }
    });
});*/

/*$('.crop_image').click(function(event){
    $image_crop.croppie('result', {
        type: 'canvas',
        size: 'viewport'
    })
    .then(function(response){
        $('#image_preview img').attr('src', response);

        $('.crop-popup-wrap').hide();
        $('#crop-image-modal').removeClass('pop-show');
        $('body').removeClass('fixed');
    });
});*/

function filePreview(input, img, filename) {
    var reader = new FileReader();
    reader.onload = function (event) {
        result = event.target.result;
        arrTarget = result.split(';');
        tipo = arrTarget[0];

        if (tipo != 'data:image/jpeg' && tipo != 'data:image/png' && tipo != 'data:image/jpg') {
            alert('only .jpg, .png and .jpeg image types allowed');
        }

        else{
            $image_crop.croppie('bind', {
                url: event.target.result
            })
            .then(function(){
                console.log('jQuery bind complete');
            });

            $('.crop-popup-wrap').show();
            $('#crop-image-modal').addClass('pop-show');
            $('body').addClass('fixed');
        }
    }

    reader.readAsDataURL(input.files[0]);
    image_src = img;

    var infoArea = document.getElementById( filename );
    var fileName = input.files[0].name;
    infoArea.textContent = fileName;

    $('#myModal').show();
}

$('.close').click(function(){
    $('#myModal').hide();
});


var ImageCrop = (function ImageCrop(obj) {
    var _privateObject = {
        /*crop : true,     
        enableExif: true,
        showPreview : true,
        viewport : {
            width  : 200,
            height : 200,
            type   :'circle'
        },
        boundary : {
            width  : 250,
            height : 250
        },
        imagePreview : '',
        blobSource   : "xggdgdg",*/
        ...obj
    },
    _sharedObject = {},
    $image_crop   = '';

    console.log('private object', _privateObject);

    // Return the constructor
    return function MyLibConstructor(obj) {
        var _this = this; // Cache the `this` keyword

        _this.initCrop = function(){
            //If id of image preview is given
            if(obj.imagePreview.includes('#')){
                let selector = document.getElementById('image_demo');

                $image_crop = new Croppie(selector, {
                    viewport: { width: 200, height: 200 },
                    boundary: { width: 300, height: 300 },
                    showZoomer: false,
                    enableOrientation: true
                });
            }

            //If class of image preview is given
            if(obj.imagePreview.includes('.')){
                $image_crop = obj.imagePreview.croppie(_privateObject);
            }

            _this.showCropModal(obj);       
        }

        _this.showCropModal = function (cropObj) {           
            var reader = new FileReader();
            reader.onload = function (event) {
                result = event.target.result;
                arrTarget = result.split(';');
                tipo = arrTarget[0];

                if (tipo != 'data:image/jpeg' && tipo != 'data:image/png' && tipo != 'data:image/jpg') {
                    alert('only .jpg, .png and .jpeg image types allowed');
                }

                else{
                    $image_crop.bind({
                        url: event.target.result
                    });

                    $('.crop-popup-wrap').show();
                    $('#crop-image-modal').addClass('pop-show');
                    $('body').addClass('fixed');
                }
            }

            reader.readAsDataURL(obj.input.files[0]);

            $('#myModal').show();
        };

        _this.someOtherMethod = function () {
            // Some other functionality
        };

        _this.getSourceBlob = function () {
            return _privateObject;
        };

        _this.object = () => {
            return _privateObject.obj;
        }

        document.getElementById('crop_image').addEventListener('click', function(){
            $image_crop.result('base64')
            .then(function(base64) {
                $('#image_preview img').attr('src', base64);

                $('.crop-popup-wrap').hide();
                $('#crop-image-modal').removeClass('pop-show');
                $('body').removeClass('fixed');
            });
        });
    };
}());