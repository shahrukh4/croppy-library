/**
 * A wrapper for cropping images
 * Unminified version for the cropy code
 * Version- 1.0
 * Date- 01/06/19
 * Written by- Shahrukh Anwar
 */
var ImageCrop = (function ImageCrop() {
    /**
     * Return the constructor for library
     * object
     */
    return function MyLibConstructor(obj) {
        var _this = this;
        _privateObject = Object.assign(_privateObject, obj);

        //Adding modal div in body
        document.body.innerHTML += _privateObject.cropModal || _privateObject.getCropModal();

        /**
         * Initialising crop object
         */
        _this.initCrop = function(input){
            _privateObject.input = input;
            var selector = document.getElementById('crop_demo');

            //Checking validations
            if(_this.checkValidations()){
                $image_crop = new Croppie(selector, _privateObject);

                _this.showCropModal();       
            }
        }  //end init crop definiton

        /**
         * Validations for uploaded file satisfy the given filetype conditions
         * @return boolean
         */
        _this.checkValidations = function(){
            var invalid    = 0;
            validTypes   = _privateObject.validTypes.split('|'),
            uploadedFileType = _privateObject.input.files[0].type;

            //Checking if uploaded file is valid
            if(!validTypes.includes(uploadedFileType.replace('image/', ''))){
                alert(`You uploaded an invalid file`);

                ++invalid;
            }

            return invalid ? false : true;
        }  //end validations definiton

        /**
         * Show the crop modal
         */
        _this.showCropModal = function () {
            _this.fileReader(_privateObject.input.files[0], (event) => {
                $image_crop.bind({
                    url: event.target.result
                });
            });

            document.getElementById('cropModal').style.display = 'block';
        };  //end crop modal definiton

        /**
         * Get the source of image after cropping
         * @return string
         */
        _this.getSourceBlob = function () {
            return _privateObject;
        }; //end source blob definiton

        /**
         * Function for reading out files
         * based on FileReader API
         */
        _this.fileReader = function (file, onloadCallback) {
            var reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = onloadCallback
        }; //end file reader definiton

        /**
         * Set up the crop object after cropping
         */
        _this.setCropObject = function(blob){
            _privateObject.cropData = blob;
        };

        /**
         * Get crop object after cropping
         */
        _this.getData = function(){
            return _privateObject.cropData;
        };  

        /**
         * When user clicked on crop
         */
        document.getElementById('crop_image').addEventListener('click', function(){
            var modal = document.getElementById('cropModal');

            $image_crop.result(_privateObject.imageResult)
            .then(function(croppedImage) {
                if(_privateObject.showPreview){
                    switch(_privateObject.imageResult.type){
                        //If base64 given
                        case 'base64' :

                        var i = 0,
                        elem = document.querySelectorAll(`${_privateObject.imagePreview} img`);

                        //Preview image on all elements
                        while(i < elem.length){
                            elem[i].src = croppedImage;

                            ++i;
                        } //end while

                        _privateObject.cropData = croppedImage;                    
                        break;

                        //If html given
                        case 'html' :

                        //If class given for preview
                        if(_privateObject.imagePreview.includes('.')){
                            var i =0,
                            elem = document.getElementsByClassName((`${_privateObject.imagePreview}`).replace('.', ''));

                            //Preview image on all elements
                            while(i < elem.length){
                                elem[i].innerHTML = '',
                                elem[i].appendChild(croppedImage);

                                ++i;
                            } //end while

                            _privateObject.cropData = croppedImage;
                            break;
                        } //end if


                        var elm = document.getElementById((`${_privateObject.imagePreview}`).replace('#', ''));

                        elm.innerHTML = '';
                        elm.appendChild(croppedImage);

                        _privateObject.cropData = croppedImage;
                        break;

                        //If blob given
                        case 'blob' :

                        _this.fileReader(croppedImage, (event) => {
                            var img = new Image();
                            img.onload = function() {
                               context.drawImage(img, 100, 100)
                            }

                            var i = 0,
                            elem = document.querySelectorAll(`${_privateObject.imagePreview} img`);

                            //Close the modal on click
                            while(i < elem.length){
                                elem[i].src = event.target.result;

                                ++i;
                            }
                        }); //end file reader

                        _privateObject.cropData = croppedImage;
                        break;
                    } //end switch
                }//end if

                modal.style.display = 'none';

                //set-up the cropped object
                _this.setCropObject(croppedImage);

                return croppedImage;
            }); //end crop result

            $image_crop.destroy();
        }); //end click

        var i = 0,
        closeModal = document.getElementsByClassName('close');

        /**
         * Close the modal on click
         */
        while(i < closeModal.length){
            closeModal[i].addEventListener('click', function(){
                $image_crop.destroy();

                document.getElementById('cropModal').style.display = 'none';
            });

            ++i;
        } //end while
    }; //end constructor
}()); //end function

/**
 * Initialising default object
 * @type Object
 */
var _privateObject = {
    crop            : true,     
    input           : '',   
    cropModal       : '',
    enableExif      : true,
    showZoomer      : true,
    validTypes      : 'jpg|jpeg|png',
    showPreview     : false,
    modalHeader     : 'Crop Image',
    imagePreview    : '',
    modalButtonText : 'Crop',
    boundary : {
        width  : 250,
        height : 250
    },
    viewport : {
        width  : 200,   
        height : 200,
        type   :'square'
    },
    imageResult : {
        type     : 'base64',     //base64, html, blob, rawCanvas (base64)
        size     : 'viewport',   //original, viewport (viewport)
        format   : 'png',        //'jpeg'|'png'|'webp' (png)
        quality  : 1,            //0, 1 (1)
        circle   : null,         //true, false (false)
    },
    getCropModal : function(){
        return `
            <div id="cropModal" class="popup-wrap crop-popup-wrap">
                <div class="crop-container">
                    <!-- Modal content -->
                    <div class="crop-modal-content">
                        <span class="close">&times;</span>
                        <div class="crop-modal-head">
                            <h2 class="text-gradient">${this.modalHeader}</h2>
                        </div>
                        <div class="crop-modal-wrapper">
                            <div id="crop_demo"></div>                                            
                            <div class="crop-btn-wrap">
                                <button type="button" class="ok-btn" id="crop_image">${this.modalButtonText}</button>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};