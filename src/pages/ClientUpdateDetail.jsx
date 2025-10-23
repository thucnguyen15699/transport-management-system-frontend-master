import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ClientUpdateDetail = () => {
  const { clientId } = useParams();
  let navigate = useNavigate();

  const [client, setClient] = useState({
    id: clientId,
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

  // Fetch client data on load
  useEffect(() => {
    const getClient = async () => {
      const fetchClient = await retrieveClient();
      if (fetchClient) {
        const clientData = fetchClient.clients[0];
        setClient(clientData);
        // Set showGstFields based on the fetched GST Applicable value
        setShowGstFields(clientData.gstApplicable === "Yes");
      }
    };
    getClient();
  }, [clientId]);

  // Fetch client data by ID
  const retrieveClient = async () => {
    const response = await axios.get(
      `http://171.228.167.35:8080/api/transport/client/fetch?clientId=${clientId}`
    );
    return response.data;
  };

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });

    // Automatically show/hide GST fields based on GST Applicable value
    if (name === "gstApplicable") {
      setShowGstFields(value === "Yes");
    }
  };

  // Update client information
  const updateClient = (e) => {
    e.preventDefault();

    if (
      !client.name ||
      !client.pinCode ||
      !client.state ||
      !client.contactNumber
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      return;
    }

    // API call to update client details
    fetch("http://171.228.167.35:8080/api/transport/client/detail/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate(`/admin/client/${client.id}/detail`);
          }, 2000); // Redirect after success
        } else {
          toast.error(res.responseMessage || "Update failed.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Server error, please try again later.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
      <div className="card form-card shadow-lg">
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 text-center"
            style={{ borderRadius: "1em", height: "45px" }}
          >
            <h5 className="card-title">Cập nhật máy khách</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3" onSubmit={updateClient}>
              <div className="col-md-3 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Tên</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={client.name}
                  onChange={handleInput}
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
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">
                  <b>Tỉnh thành</b>
                </label>
                <select
                  className="form-control"
                  name="state"
                  value={client.state}
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="gstApplicable" className="form-label">
                  <b>Áp dụng GST</b>
                </label>
                <select
                  className="form-control"
                  name="gstApplicable"
                  value={client.gstApplicable}
                  onChange={handleInput}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Yes">Có</option>
                  <option value="No">Không</option>
                </select>
              </div>

              {/* Conditionally render GST fields based on GST Applicable selection */}
              {showGstFields && (
                <>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="gstNumber" className="form-label">
                      <b>Số GST</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="gstNumber"
                      value={client.gstNumber}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="cgstRate" className="form-label">
                      <b>Tỷ lệ CGST</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="cgstRate"
                      value={client.cgstRate}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="sgstRate" className="form-label">
                      <b>Tỷ lệ  SGST </b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sgstRate"
                      value={client.sgstRate}
                      onChange={handleInput}
                    />
                  </div>
                </>
              )}

              <div className="col-md-3 mb-3">
                <label htmlFor="comments" className="form-label">
                  <b>Comments</b>
                </label>
                <textarea
                  className="form-control"
                  name="comments"
                  rows="2"
                  value={client.comments}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div className="col-12 text-center mb-2">
                <button type="submit" className="btn btn-primary">
                  Cập nhật máy khách
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

export default ClientUpdateDetail;
