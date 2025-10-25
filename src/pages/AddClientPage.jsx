import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiconfig";
const AddClientPage = () => {
  const [client, setClient] = useState({
    name: "",
    pinCode: "",
    state: "",
    contactNumber: "",
    contactName: "",
    gstApplicable: "",
    gstNumber: "",
    cgstRate: "",
    sgstRate: "",
    comments: "",
  });

  const [showGstFields, setShowGstFields] = useState(false);

  let navigate = useNavigate();

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });

    // Show or hide GST fields based on the GST applicable dropdown
    if (name === "gstApplicable") {
      setShowGstFields(value === "Yes");
    }
  };

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("pinCode", client.pinCode);
    formData.append("state", client.state);
    formData.append("contactNumber", client.contactNumber);
    formData.append("contactName", client.contactName);
    formData.append("gstApplicable", client.gstApplicable);
    if (showGstFields) {
      formData.append("gstNumber", client.gstNumber);
      formData.append("cgstRate", client.cgstRate);
      formData.append("sgstRate", client.sgstRate);
    }
    formData.append("comments", client.comments);
    formData.append("uploadDocuments", selectedDocument);

    axios
      .post(`${API_BASE_URL}/api/transport/client/add`, formData, {
        headers: {
          // Authorization: "Bearer " + guide_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.responseMessage
            : "It seems server is down",
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  return (
    <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
      <div className="card form-card shadow-lg">
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 text-center"
            style={{
              borderRadius: "1em",
              height: "45px",
            }}
          >
            <h5 className="card-title">Thêm khách hàng</h5>
          </div>
          <div className="card-body text-color">
            <form
              className="row g-3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="col-md-3 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={client.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="pinCode" className="form-label">
                  <b>Pin Code</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pinCode"
                  value={client.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">
                  <b>Tỉnh thành phố</b>
                </label>
                <select
                  className="form-control"
                  name="state"
                  value={client.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn tỉnh thành --</option>
                  <option value="HaNoi">Hà Nội</option>
                  <option value="HoChiMinh">Thành phố Hồ Chí Minh</option>
                  <option value="HaiPhong">Hải Phòng</option>
                  <option value="CanTho">Cần Thơ</option>
                  <option value="DaNang">Đà Nẵng</option>
                  <option value="Hue">Huế</option>
                  <option value="CaoBang">Cao Bằng</option>
                  <option value="DienBien">Điện Biên</option>
                  <option value="HaTinh">Hà Tĩnh</option>
                  <option value="LaiChau">Lai Châu</option>
                  <option value="LangSon">Lạng Sơn</option>
                  <option value="NgheAn">Nghệ An</option>
                  <option value="QuangNinh">Quảng Ninh</option>
                  <option value="ThanhHoa">Thanh Hóa</option>
                  <option value="SonLa">Sơn La</option>
                  <option value="TuyenQuang">Tuyên Quang</option>
                  <option value="LaoCai">Lào Cai</option>
                  <option value="ThaiNguyen">Thái Nguyên</option>
                  <option value="PhuTho">Phú Thọ</option>
                  <option value="BacNinh">Bắc Ninh</option>
                  <option value="HungYen">Hưng Yên</option>
                  <option value="NinhBinh">Ninh Bình</option>
                  <option value="QuangTri">Quảng Trị</option>
                  <option value="QuangNgai">Quảng Ngãi</option>
                  <option value="GiaLai">Gia Lai</option>
                  <option value="KhanhHoa">Khánh Hòa</option>
                  <option value="LamDong">Lâm Đồng</option>
                  <option value="DongNai">Đồng Nai</option>
                  <option value="TayNinh">Tây Ninh</option>
                  <option value="VinhLong">Vĩnh Long</option>
                  <option value="DongThap">Đồng Tháp</option>
                  <option value="CaMau">Cà Mau</option>
                  <option value="AnGiang">An Giang</option>

                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  <b>Số điện thoại liên hệ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  value={client.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="contactName" className="form-label">
                  <b>Tên liên hệ</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactName"
                  value={client.contactName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="gstApplicable" className="form-label">
                  <b>Thuế GST</b>
                </label>
                <select
                  className="form-control"
                  name="gstApplicable"
                  value={client.gstApplicable}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn --</option>
                  <option value="Yes">Có</option>
                  <option value="No">Không</option>
                </select>
              </div>

              {/* Conditionally render GST fields based on GST applicable selection */}
              {showGstFields && (
                <>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="gstNumber" className="form-label">
                      <b>GST Số thuế</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="gstNumber"
                      value={client.gstNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="cgstRate" className="form-label">
                      <b>CGST Rate</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="cgstRate"
                      value={client.cgstRate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="sgstRate" className="form-label">
                      <b>SGST Rate</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sgstRate"
                      value={client.sgstRate}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="col-md-3 mb-3">
                <label htmlFor="comments" className="form-label">
                  <b>Ghi chú</b>
                </label>
                <textarea
                  className="form-control"
                  name="comments"
                  rows="2"
                  value={client.comments}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="uploadDocuments" className="form-label">
                  <b>Upload Documents</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="uploadDocuments"
                  onChange={handleFileChange}
                />
              </div>

              <div className="col-12 text-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Thêm Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddClientPage;
