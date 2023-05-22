//Tạo lớp đối tượng nhân viên
function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.loaiNV = "";

  this.tinhLuong =  function(){
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = Number(this.luongCoBan) * 3 * Number(this.gioLam);
        break;
      case "Trưởng phòng":
        this.tongLuong = Number(this.luongCoBan) * 2 * Number(this.gioLam);
        break;
      case "Nhân viên":
        this.tongLuong = Number(this.luongCoBan) * Number(this.gioLam);
        break;
      default:
        alert("Vui Lòng chọn chức vụ");
        break;
    }
  }
  this.xepLoaiNV = function(){
    if(this.gioLam >= 192){
      this.loaiNV = "Nhân viên xuất xắc";
    } else if(this.gioLam >= 176){
      this.loaiNV = "Nhân viên giỏi";
    } else if(this.gioLam >= 160){
      this.loaiNV = "Nhân viên khá";
    } else if(this.gioLam < 160){
      this.loaiNV = "Nhân viên trung bình";
    }
  }
}