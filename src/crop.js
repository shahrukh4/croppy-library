var ImageCrop = (function ImageCrop() {
    var _privateObject = {
        input: '',
        crop : true,     
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
        blobSource   : 'xggdgdg',
        validTypes   : 'jpg|jpeg|png',
        cropModal    : `
            <!-- The Modal -->
            <div id="myModal" class="popup-wrap crop-popup-wrap">
                <form class="signup-form crop-image-modal">
                    <!-- Modal content -->
                    <div class="modal-content sign-body">
                        <span class="close">&times;</span>
                        <div class="sign-head">
                            <h2 class="text-gradient">Crop Image</h2>
                        </div>
                        <div class="sign-body">
                            <div class="signup-wrapper">
                                <div>
                                    <div id="image_demo" style="margin-top:30px"></div>                                            
                                    <div class="crop-btn-wrap">
                                        <button type="button" class="ok-btn confirm-refill crop_image" id="crop_image">Crop</button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `,
    },
    $image_crop   = '';

    // Return the constructor
    return function MyLibConstructor(obj) {
        var _this = this; // Cache the `this` keyword

        _privateObject = Object.assign(_privateObject, obj);

        _this.initCrop = function(){
            let selector = document.getElementById('image_demo');

            //Checking validations
            if(_this.checkValidations()){
                $image_crop = new Croppie(selector, _privateObject);

                _this.showCropModal(obj);       
            }
        }

        /**
         * Validations for uploaded file satisfy the given filetype conditions
         * @return boolean
         */
        _this.checkValidations = function(){
            let invalid    = 0;
            validTypes   = _privateObject.validTypes.split('|'),
            uploadedFileType = _privateObject.input.files[0].type;

            //Checking if uploaded file is valid
            for (var i = 0; i < validTypes.length; i++) {
                if(uploadedFileType !== `image/${validTypes[i]}`){
                    alert(`You uploaded an invalid file type`);

                    ++invalid;
                }
            }

            return invalid ? false : true;
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

        _this.getSourceBlob = function () {
            return _privateObject;
        };

        _this.object = () => {
            return _privateObject.obj;
        }

        _this.getSourceBlob = function (value, index, array) {
            return value;
        };

        //When user clicked on crop
        document.getElementById('crop_image').addEventListener('click', function(){
            let modal = document.getElementById('myModal');

            $image_crop.result('base64')
            .then(function(base64) {
                $(`${_privateObject.imagePreview} img`).attr('src', base64);
                
                modal.style.display = 'none';
            });

            $image_crop.destroy();
        });

        let i = 0,
        closeModal = document.getElementsByClassName('close');

        //Close the modal on click
        while(i < closeModal.length){
            closeModal[i].addEventListener('click', function(){
                $image_crop.destroy();

                document.getElementById('myModal').style.display = 'none';
            });

            ++i;
        }
    };
}());