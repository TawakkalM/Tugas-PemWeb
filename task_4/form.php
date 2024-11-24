<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join With Us</title>

    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="./process.php" method="post" enctype="multipart/form-data" onsubmit="return validasiFile()" >
                    <h2>Join With Us!</h2>
                    <div class="inputbox">
                        <input type="text" name="fname" id="fname" required>
                        <label for="fname">First Name*</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" name="lname" id="lname" required>
                        <label for="lname">Last Name*</label>
                    </div>
                    <div class="inputbox">
                        <input type="email" name="email" id="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" name="password" id="password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="inputfile">
                        <input type="file" name="file" id="file" accept=".txt">
                        <label for="file">Upload your document (TXT)</label>
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    </section>

    <script>
        function validasiFile(){
            const ambilFile = document.getElementById("file");
            const file = ambilFile.files[0];

            if(!file){
                alert("You must upload document!");
                return false;
            }
            if(file.size > 1 * 1024 * 1024 ){
                alert("Size of document is too large! Maximum 1MB");
                return false;
            }

            return true;
        }
    </script>
</body>
</html>