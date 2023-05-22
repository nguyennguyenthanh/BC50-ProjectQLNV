// GLOBAL
//Gọi lớp đối tượng ra để tạo thành đối tượng bên dưới:
var dsnv = new DSNV();
//Gọi Hàm getLocalStorage() để render table từ localstorage ra UI
getLocalStorage();
//Tạo đối tượng từ lớp đối tượng Validation.js
var validation = new Validation();
// getLocalStorage();
//Hàm dom
function getEle(id) {
  return document.getElementById(id);
}

//HÀM LẤY THÔNG TIN NHÂN VIÊN:
function layThongTinNV(isAdd) {
  // lấy thông tin từ user
  var _taiKhoan = getEle("tknv").value;
  var _tenNV = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCoBan = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  /**
   * VALIDATION
   */
  var isValid = true;
  if (isAdd) {
    //validation Tài Khoản:
    isValid &= validation.kiemTraRong(_taiKhoan, "errorTaiKhoan", "(*)Vui lòng nhập tài khoản") && validation.kiemTraDoDaiKiTu(_taiKhoan, "errorTaiKhoan", "(*)Vui lòng nhập từ 4-6 kí tự", 4, 6) && validation.kiemTraTaiKhoanDaTonTai(_taiKhoan, "errorTaiKhoan", "(*)Tài khoản này đã tồn tại", dsnv.arr);
  }

  //validation Tên NV:
  isValid &= validation.kiemTraRong(_tenNV, "errortenNV", "(*)Vui lòng nhập tên NV") && validation.kiemTraPattern(_tenNV, "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", "errortenNV", "(*)Vui lòng nhập bằng chữ");
  //validation Email:
  isValid &= validation.kiemTraRong(_email, "errorEmail", "(*)Vui lòng nhập Email") && validation.kiemTraPattern(_email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "errorEmail", "(*)Vui lòng nhập đúng cú pháp mail");
  //validation Password:
  isValid &= validation.kiemTraRong(_matKhau, "errorMatKhau", "(*)Vui lòng nhập mật khẩu") && validation.kiemTraPattern(_matKhau, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "errorMatKhau", "(*)Vui lòng nhập mật khẩu gồm kí tự đặc biệt, chữ hoa và số");
  //validation Ngày Làm:
  isValid &= validation.kiemTraRong(_ngayLam, "errorNgayLam", "(*)Vui lòng nhập ngày làm");
  //validation Lương Cơ Bản:
  isValid &= validation.kiemTraRong(_luongCoBan, "errorLuongCoBan", "(*)Vui lòng nhập lương cơ bản") && validation.kiemTraMucLuong(_luongCoBan, "errorLuongCoBan", "(*)Vui lòng nhập mức lương từ 1000000 đến 20000000", 1000000, 20000000);
  //validation Chức Vụ:
  isValid &= validation.kiemTraChucVu("chucvu", "errorChucVu", "(*)Vui lòng chọn chức vụ");
  //validation Số Giờ Làm:
  isValid &= validation.kiemTraRong(_gioLam, "errorGioLam", "(*)Vui lòng nhập số giờ làm") && validation.kiemTraMucLuong(_gioLam, "errorGioLam", "(*)Vui lòng nhập số giờ làm từ 80-200 giờ", 80, 200);

  if (!isValid) return null;
  //Tạo đối tượng nv từ lớp đối tượng NhanVien
  var nv = new NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);
  //Tính lương(từ file NhanVien.js):Muốn xuất thông tin tienLuong ở NhanVien.js thì gọi hàm ở lấy thông tin rồi xuất ra kết quả khi click vào nút thêm và render table ra dòng 58(<td>${nv.tienLuong}</td>)
  nv.tinhLuong();
  nv.xepLoaiNV();
  // khi tách hàm riêng phải trả về giá trị để khi gọi có cái mà xài
  return nv;
}

// HÀM RENDER TABLE
//biến data là biến mảng được truyền vào để xuất mảng ra table
function renderTable(data) {
  /*
  // -Tạo dòng (tương đương với nv được thêm)
  // -Trong dòng phải có cột(6 cột)
  // B1: Tạo biến để tích lũy content = "" (tại sau khi tạo dòng và cột B4,5 thì sẽ phải có biến hứng giá trị tạo đc)
  // B2: Do có mảng muốn show mảng đó ra phải duyệt phần tử trong mảng => Duyệt mảng dssv.arr
  // B3: sau duyệt mảng lấy đc nv = dassv.arr[i] (danh sách sinh viên thứ i)
  // B4: Tạo dòng
  // B5: Tạo cột
  // B6: Tích lũy dòng vào biến content
  // B7: Có dòng r => dom tới id của tbody gán cho biến content
//     */
  // B1:
  var content = "";
  // i = 0, lần đầu duyệt qua lấy được dsnv.arr[i]. Do hàm để sử dụng lại, nên truyền vào param là 1 tên tự đặt
  // B2:
  for (var i = 0; i </*dsnv.arr.length*/ data.length; i++) {
    // B3:
    var nv = /*dsnv.arr[i]*/ data[i];
    // B4,5,6:
    content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
                <td>
                   <button class="btn btn-danger mb-2" onclick="editNV('${nv.taiKhoan}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `;
  }
  // B7:
  getEle("tableDanhSach").innerHTML = content;
}
//HÀM SỬA THÔNG TIN NV:
function editNV(taiKhoan) {
  nv = dsnv.suaThongTinNV(taiKhoan);
  if (nv) {
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;

    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;

    //display #btnCapNhat
    getEle("btnCapNhat").style.display = "inline-block";
    //off #btnThemNV
    getEle("btnThemNV").style.display = "none";
  }
}
//HÀM CẬP NHẬT THÔNG TIN NV:
getEle("btnCapNhat").addEventListener("click", function (event) {
  event.preventDefault();
  //gọi lại thông tin mới nhất
  var sv = layThongTinNV(false);
  //làm mới danh sách ở lớp đối tượng và gọi ra đối tượng
  dsnv.capNhatNV(sv);
  //làm mới danh sách ở UI
  renderTable(dsnv.arr);
  //làm mới dánh sách dưới chỗ lưu
  setLocalStorage();
});
//HÀM RESET:
getEle("btnReset").addEventListener("click", function () {
  //on btnThemNV
  getEle("btnThemNV").style.display = "inline-block";
  //display btnCapNhat
  getEle("btnCapNhat").style.display = "none";
  //Clear value reset()
  getEle("formNV").reset();
  //on again taiKhoan
  getEle("tknv").disabled = false;
});
//HÀM XÓA NHÂN VIÊN
//gọi hàm ở sự kiện onlcick
function deleteNV(taiKhoan) {
  //Xóa
  dsnv.xoaNV(taiKhoan);
  //render
  renderTable(dsnv.arr);
  //Cập nhật lại localstorage để nó lưu mới lại ở dưới và push lên UI cái mới nhất(đã xóa)
  setLocalStorage();
}
//HÀM THÊM NHÂN VIÊN
getEle("btnThemNV").addEventListener("click", function (event) {
  event.preventDefault();
  //Dom tới id để lấy thông tin từ ng nhập, nhưng tách ra hàm riêng để lấy thông tin-> tạo biến nv để hứng giá trị
  var nv = layThongTinNV(true);
  //nếu nó có tồn tại(có nhập vào)thì 
  if (nv) {
    //Thêm thông tin khách hàng nhập vào mảng trong đối tượng tạo từ lớp đối tượng DSNV.js
    // dòng cmt dưới là thêm trực tiếp vào mảng
    // dsnv.arr.push(nv);
    dsnv.themNV(nv);
    //log ra mảng danh sách khi nhập liệu
    //reder table ra UI
    renderTable(dsnv.arr);
    //Khi thêm nv vào thì mới lưu nên gọi hàm ở đây
    setLocalStorage();
  }
});
//HÀM TÌM KIẾM NHÂN VIÊN THEO LOẠI NV:
getEle("searchName").addEventListener("keyup", function(){
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(keyword);
  renderTable(mangTimKiem);
});
//HÀM LƯU TRỮ TẠM THỜI Ở BROWERS, và push lên lại danh sách
//Muốn thêm được và xuất ra table mà khi F5 không mất đi thì phải tạo localStorage, chỗ để lưu tạm dữ liệu và trả giá trị mảng lại như lúc đầu
function setLocalStorage() {
  //Do loCalStorage chỉ cho lưu 5MB nên phải chuyển từ dữ liệu danh sách(JSON) => chuỗi(String)
  var dataString = JSON.stringify(dsnv.arr);
  //chỗ cần lưu là mảng ở DSNV.js
  //Syntax setItem(tự đặt tên để lưu trong loCalstorange, danh sách cần)
  localStorage.setItem("DSNV", dataString);
}
//Lưu bên trên r thì chỉ lưu vào local thôi,muốn hiện ra và F5 k mất thì phải lấy ra danh sách hiện lại ở UI
function getLocalStorage() {
  //kiểm tra xem DSNV có tồn tại k
  if (localStorage.getItem("DSNV")) {
    //Do đã chuyển thành chuỗi string bên trên, nên trc khi lấy ra UI để sử dụng thì phải chuyển lại JSON
    var dataString = localStorage.getItem("DSNV");
    //chuyển String -> JSON
    //dataJson chỉ là thấy ở UI, muốn dùng danh sách đó xài tiếp thì phải dùng dsnv.arr để trả lại giá trị của table kiểu JSON khi chưa chuyển đổi
    dsnv.arr = JSON.parse(dataString);
    //render lại table
    renderTable(dsnv.arr);
  }
}
