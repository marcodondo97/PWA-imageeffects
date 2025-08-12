// global variables 
var globalimg;
        var globalwidth;
        var globalheight;
        var input = document.getElementById('inputphoto');
        input.addEventListener('change', handleFiles);
        try { setImageLoadedState(false); } catch (e) {}

        function handleFiles(e) {
            var ctx = document.getElementById('canvasphoto').getContext('2d');
            prova = ctx;
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            var img = new Image;
            img.src = URL.createObjectURL(e.target.files[0]);
            globalimg = img;
            img.onload = function() {
                var tmpwidthimg = img.width;
                var numw = parseFloat(tmpwidthimg);
                var valwidth = numw - (numw * .50); // impastazione width
                var tmpheightimg = img.height;
                var numh = parseFloat(tmpheightimg);
                var valheight = numh - (numh * .50); //impastazione height
                globalwidth = valwidth;
                globalheight = valheight;
                canvasphoto.width = valwidth;
                canvasphoto.height = valheight;
                ctx.drawImage(img, 0, 0, valwidth, valheight);

                // Enable UI when an image is loaded
                try { enableDownloadButtons(true); setImageLoadedState(true); } catch (e) {}
                try {
                    var btnEffects = document.getElementById('actionEffects');
                    if (btnEffects) btnEffects.disabled = false;
                    var empty = document.getElementById('emptyState');
                    if (empty) empty.classList.add('hidden');
                    var resetOverlay = document.getElementById('btnResetOverlay');
                    if (resetOverlay) resetOverlay.disabled = false;
                } catch (e) {}

            }
            // Enable download after an image is loaded
            try { enableDownloadButtons(true); } catch (e) {}




        }
        //blur effect
        function blureffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = 'blur(3px)';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }
        //sepia effect
        function sepiaeffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' sepia(1) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);

        }
        //brightness effect
        function brightnesseffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' brightness(3) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);

        }
        //contrast effect
        function contrasteffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' contrast(2) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);

        }
        //grayscale effect
        function grayscaleeffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' grayscale(2) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }

        // hue rotate effect
        function huerotateeffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' hue-rotate(70deg) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }

        // invert effect
        function inverteffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' invert(75%) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }

        //opacity effect
        function opacityeffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' opacity(60%) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }



        // saturate effect
        function saturateeffect() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' saturate(30%) ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
        }




        // delete filter
        function resetfilter() {

            var ctx = document.getElementById('canvasphoto').getContext('2d');
            ctx.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
            ctx.filter = ' none ';
            ctx.drawImage(globalimg, 0, 0, globalwidth, globalheight);
            // After reset, still allow download because an image is present
            try { enableDownloadButtons(true); } catch (e) {}
            // Also clear active effect highlight and focus
            try { clearActiveEffects(); } catch (e) {}
        }

        //download image
        function download_image() {
            var ctx = document.getElementById('canvasphoto');
            image = ctx.toDataURL("image/png").replace("image/png", "image/octet-stream");
            var link = document.createElement('a');
            var ts = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = "image-" + ts + ".png";
            link.href = image;
            link.click();
        }