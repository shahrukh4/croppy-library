var ImageCrop = (function ImageCrop() {
    var _privateObject = {
        input: '',
        crop : true,     
        enableExif: true,
        showPreview : false,
        showZoomer  : true,
        viewport : {
            width  : 200,   
            height : 200,
            type   :'square'
        },
        boundary : {
            width  : 250,
            height : 250
        },
        imageResult  : {
            type    : 'base64',  //base64, html, blob, rawCanvas (base64)
            size    : 'viewport', //original, viewport (viewport)
            format  : 'png',  //'jpeg'|'png'|'webp' (png)
            quality : 1,       //0, 1 (1)
            circle  : null,   //true, false (false)
        },
        imagePreview : '',
        blobSource   : 'xggdgdg',
        validTypes   : 'jpg|jpeg|png',
        cropData     : '',
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

        //Adding modal div in body
        document.body.innerHTML += _privateObject.cropModal;

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
                    alert(`You uploaded an invalid file`);

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
                }
            }

            reader.readAsDataURL(obj.input.files[0]);            
            document.getElementById('myModal').style.display = 'block';
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

            $image_crop.result(_privateObject.imageResult)
            .then(function(croppedImage) {
                //console.log(croppedImage);
                if(_privateObject.showPreview){
                    switch(_privateObject.imageResult.type){
                        //If base64 given
                        case 'base64' :

                        let i = 0,
                        elem = document.querySelectorAll(`${_privateObject.imagePreview} img`);

                        //Preview image on all elements
                        while(i < elem.length){
                            elem[i].src = croppedImage;

                            ++i;
                        }

                        _privateObject.cropData = croppedImage;                    
                        break;

                        //If html given
                        case 'html' :

                        //If class given for preview
                        if(_privateObject.imagePreview.includes('.')){
                            let i =0,
                            elem = document.getElementsByClassName((`${_privateObject.imagePreview}`).replace('.', ''));

                            //Preview image on all elements
                            while(i < elem.length){
                                elem[i].innerHTML = '',
                                elem[i].appendChild(croppedImage);

                                ++i;
                            }

                            _privateObject.cropData = croppedImage;
                            break;
                        }


                        let elm = document.getElementById((`${_privateObject.imagePreview}`).replace('#', ''));

                        elm.innerHTML = '';
                        elm.appendChild(croppedImage);

                        _privateObject.cropData = croppedImage;
                        break;

                        //If blob given
                        case 'blob' :

                        var reader = new FileReader();
                        reader.readAsDataURL(croppedImage)
                        reader.onload = function(e) {
                            var img = new Image();
                            img.onload = function() {
                               context.drawImage(img, 100,100)
                            }

                            let i = 0,
                            elem = document.querySelectorAll(`${_privateObject.imagePreview} img`);

                            //Close the modal on click
                            while(i < elem.length){
                                elem[i].src = e.target.result;

                                ++i;
                            }
                        }

                        _privateObject.cropData = croppedImage;
                        break;
                    } //end switch
                }//end if

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