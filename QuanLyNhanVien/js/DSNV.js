function DSNV(){
    this.arr = [];
    this.themNV = function(sv){
        // gọi đến mảng là this. -> thêm vào mảng(phải đưa tham số vào và khi dùng ở đối tượng tạo ở file main thì truyền vào đối số cho nó)
        this.arr.push(sv);
    }
    //HÀM SỬA NHÂN VIÊN:
    this.suaThongTinNV = function(taiKhoan){
      var index = this.timViTri(taiKhoan);
      if(index !== -1){
        return this.arr[index];
      }
      return null;
    }
    //HÀM XÓA NV:
    //Hàm Tìm Vị Trí:
    this.timViTri = function(taiKhoan){
      var index = -1;
      for(i = 0; i < this.arr.length; i++){
        var nv = this.arr[i];
        if(nv.taiKhoan === taiKhoan){
          index = i;
          break;
        }
      }
      //trả giá trị để gọi hàm chỗ khác khi dùng
      return index;
    }
    //xóa main:
    this.xoaNV = function(taiKhoan){
        /*
        nếu có trong mảng là phải có vị trí index, nếu k thì là ngoài mảng là số âm
        B1: tạo index = -1
        B2: duyệt mảng để lấy các phần tử trong mảng
        B3: lấy đc giá trị nv = arr[i]
        B4: nếu nv.taiKhoan trùng với taiKhoan(là taiKhoan đã duyệt mảng mà trùng với mã mà user nhập vào)
        => true => index = i(tìm đc vị trí trong mảng)
        (do nếu lỡ ngay từ lúc duyệt phần tử đầu tiên đã tìm đc vị trí của phần tử user nhập vào muốn xóa) => break;(để khỏi phải duyệt mấy cái sau)
        */
      var index = this.timViTri(taiKhoan);
      if(index !== -1){
        this.arr.splice(index, 1);
      }
    };
    //HÀM CẬP NHẬT NV
    this.capNhatNV = function(sv){
      var index = this.timViTri(sv.taiKhoan);
      if(index !== -1){
        this.arr[index] = sv;
      }
    };
    
}
//HÀM TÌM KIẾM:syntax bổ sung vào lớp đối tượng(k làm ảnh hưởng các thông tin trc đó)
DSNV.prototype.timKiemNV = function(keyword){
  var mangTimKiem = [];
  for(var i = 0; i < this.arr.length; i++){
      var nv = this.arr[i];
      var keywordToLowerCase = keyword.toLowerCase();      
      var loaiNVToLowerCase = nv.loaiNV.toLowerCase();
      if(loaiNVToLowerCase.indexOf(keywordToLowerCase) !== -1){
        mangTimKiem.push(nv);
      }
  }
  return mangTimKiem;
}