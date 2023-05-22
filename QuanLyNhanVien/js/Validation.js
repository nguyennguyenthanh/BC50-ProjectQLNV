function Validation() {
    //Ktra Rỗng
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
    //Ktra độ dài kí tự
    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            //True
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }
    //Ktra các loại Pattern
    this.kiemTraPattern = function (value, pattern, errorId, mess) {
        if (value.match(pattern)) {
            // true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    //Ktra lương
    this.kiemTraMucLuong = function (value, errorId, mess, min, max) {
        if (value >= min && value <= max) {
            //True
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }
    //Ktra chức vụ
    this.kiemTraChucVu = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            //True
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }
    //Ktra taiKhoan đã tồn tại    
    this.kiemTraTaiKhoanDaTonTai = function (value, errorId, mess, arr) {
        var exist = false;
        for (var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if (nv.taiKhoan === value) {
                exist = true;
                break;
            }
        }
        if (exist) {
            //false
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
         //True
         getEle(errorId).style.display = "none";
         getEle(errorId).innerHTML = "";
         return true;
    }
}
