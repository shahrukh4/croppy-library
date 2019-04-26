$(document).ready(function(){
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
});

$('.crop_image').click(function(event){
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
});

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