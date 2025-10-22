import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

const EmployeeDetail = () => {
  const { employeeId } = useParams();

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [vehicles, setVehicles] = useState([]);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getAllVehicles = async () => {
      const vehicleResponse = await retrieveAllVehicles();
      if (vehicleResponse) {
        setVehicles(vehicleResponse.vehicles);
      }
    };

    const getAllBookings = async () => {
      const bookings = await retrieveAllBookings();
      if (bookings) {
        setBookings(bookings.bookings);
      }
    };

    getAllVehicles();
    getAllBookings();
  }, []);

  const retrieveAllVehicles = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080/api/transport/vehicle/fetch/all",
      {
        headers: {
          //   Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );

    return response.data;
  };

  const retrieveAllBookings = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080/api/transport/client/booking/fetch/all",
      {
        headers: {
          //   Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );

    return response.data;
  };

  let navigate = useNavigate();

  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const handleSalaryModalClose = () => setShowSalaryModal(false);
  const handleSalaryModalShow = () => setShowSalaryModal(true);

  const [showViewSalaryModal, setShowViewSalaryModal] = useState(false);
  const handleViewSalaryModalClose = () => setShowViewSalaryModal(false);
  const handleViewSalaryModalShow = () => setShowViewSalaryModal(true);

  const [selectedSalaryDoc, setSelectedSalaryDoc] = useState("");

  const [showViewSalaryReceiptModal, setShowViewSalaryReceiptModal] =
    useState(false);
  const handleViewSalaryReceiptModalClose = () =>
    setShowViewSalaryReceiptModal(false);
  const handleViewSalaryReceiptModalShow = () =>
    setShowViewSalaryReceiptModal(true);

  const showSalaryReceiptModal = (salaryReceiptDocFileName) => {
    setSelectedSalaryDoc(salaryReceiptDocFileName);
    handleViewSalaryReceiptModalShow();
  };

  const [salary, setSalary] = useState({
    userId: employeeId,
    vehicleId: 0,
    salaryType: "",
    tripId: 0,
    amount: 0.0,
    paymentMode: "",
    paymentDetails: "",
    remark: "",
  });

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleInput = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", salary.userId);
    formData.append("vehicleId", salary.vehicleId);
    formData.append("salaryType", salary.salaryType);
    formData.append("tripId", salary.tripId);
    formData.append("amount", salary.amount);
    formData.append("paymentMode", salary.paymentMode);
    formData.append("paymentDetails", salary.paymentDetails);
    formData.append("remark", salary.remark);
    formData.append("receiptUpload", selectedDocument);

    axios
      .post("http://171.228.167.35:8080/api/user/employee/salary/add", formData, {
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
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
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

  useEffect(() => {
    const getEmployee = async () => {
      const fetchEmployee = await retrieveEmployee();
      if (fetchEmployee) {
        setUser(fetchEmployee.users[0]);
      }
    };
    getEmployee();
  }, [employeeId]);

  const retrieveEmployee = async () => {
    const response = await axios.get(
      `http://171.228.167.35:8080/api/user/fetch/user-id?userId=${employeeId}`
    );
    return response.data;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  if (!user) return <p>Loading...</p>;

  const updateEmployeeDocument = () => {
    navigate("/admin/employee/document/update", { state: user });
  };

  const updateEmployeeDetails = () => {
    navigate(`/admin/employee/${employeeId}/update/detail`, { state: user });
  };

  const { employee } = user;

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "auto" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>Chi tiết nhân viên</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Thông tin cơ bản</h5>
              <p>
                <strong>Full Name:</strong> {employee.fullName}
              </p>
              <p>
                <strong>Pan Number:</strong> {employee.panNumber}
              </p>
              <p>
                <strong>Số định danh cá nhân:</strong> {employee.aadharNumber}
              </p>
              {employee.role === "Driver" && (
                <>
                  <p>
                    <strong>Số giấy phép lái xe:</strong> {employee.licenseNumber}
                  </p>
                  <p>
                    <strong>Ngày hết hạn giấy phép:</strong>{" "}
                    {employee.licenseExpiryDate}
                  </p>
                </>
              )}
              <p>
                <strong>Role:</strong> {employee.role}
              </p>
              <p>
                <strong>Full Address:</strong> {employee.fullAddress}
              </p>
              <p>
                <strong>City:</strong> {employee.city}
              </p>
              <p>
                <strong>Pin Code:</strong> {employee.pinCode}
              </p>
              <p>
                <strong>Tỉnh/Thành:</strong> {employee.state}
              </p>
              <p>
                <strong>Quốc gia:</strong> {employee.country}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Thông tin công việc và tài khoản</h5>
              <p>
                <strong>Ngày bắt đầu công việc:</strong> {employee.workStartDate}
              </p>
              <p>
                <strong>Ngày kết thúc công việc:</strong> {employee.workEndDate}
              </p>
              <p>
                <strong>Số tài khoản ngân hàng:</strong> {employee.accountNumber}
              </p>
              <p>
                <strong>Mã Ngân hàng:</strong> {employee.ifscNumber}
              </p>
              <p>
                <strong>Trạng thái:</strong> {employee.status}
              </p>
              <p>
                <strong>Comments:</strong> {employee.comments}
              </p>
              <div>
                <strong>Documents:</strong>
                <button
                  className="btn btn-sm bg-color custom-bg ms-2"
                  onClick={handleShowModal}
                >
                  View Document
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer ">
          <div className="d-flex justify-content-center mt-3">
            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Add Salary"
              onClick={handleSalaryModalShow}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="View Salary"
              onClick={handleViewSalaryModalShow}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Update Employee Detail"
              onClick={updateEmployeeDetails}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-4"
              value="Update Employee Document"
              onClick={updateEmployeeDocument}
            />
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} fullscreen>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`http://171.228.167.35:8080/api/user/document/${employee.uploadDocuments}/view`}
            width="100%"
            height="100%" // Set height to 100% for full coverage
            style={{ border: "none" }}
            title="Document Preview"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSalaryModal} onHide={handleSalaryModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm lương</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="vehicleId" className="mb-3">
              <Form.Label>Chọn chuyến đi của nhân viên để tính phụ cấp</Form.Label>
              <Form.Select name="tripId" onChange={handleInput} required>
                <option value="">Select Client Trip</option>
                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.id}>
                    {booking.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="userId" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={salary.amount}
                onChange={handleInput}
                placeholder="Enter Amount"
                required
              />
            </Form.Group>

            {(() => {
              if (user.employee.role === "Driver") {
                return (
                  <>
                    <Form.Group controlId="vehicleId" className="mb-3">
                      <Form.Label>Phương tiện</Form.Label>
                      <Form.Select
                        name="vehicleId"
                        value={salary.vehicleId}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Chọn Phương tiện</option>
                        {vehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                );
              }
            })()}

            {/* Salary Type */}
            <Form.Group controlId="salaryType" className="mb-3">
              <Form.Label>Loại lương</Form.Label>
              <Form.Select name="salaryType" onChange={handleInput} required>
                <option value="">Chọn loại lương</option>
                <option value="Advance">Nâng cao</option>
                <option value="Monthly">Hàng tháng</option>
                <option value="Trip">Mức lương cho mỗi chuyến đi</option>
                <option value="Part Payment">Thanh toán một phần</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="paymentMode" className="mb-3">
              <Form.Label>Phương thức thanh toán</Form.Label>
              <Form.Select name="paymentMode" onChange={handleInput} required>
                <option value="">Chọn chế độ thanh toán</option>
                <option value="Account">Chuyển khoản</option>
                <option value="Cash">Thanh toán Cash</option>
                <option value="Tien mat">Tiền mặt</option>
                <option value="Other">khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="userId" className="mb-3">
              <Form.Label>Chi tiết thanh toán</Form.Label>
              <Form.Control
                type="text"
                name="paymentDetails"
                value={salary.paymentDetails}
                onChange={handleInput}
                placeholder="Enter payment detail..."
                required
              />
            </Form.Group>

            <Form.Group controlId="uploadDocuments" className="mb-3">
              <Form.Label>Upload Documents</Form.Label>
              <Form.Control
                type="file"
                name="uploadDocuments"
                onChange={handleFileChange}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="comment" className="mb-3">
              <Form.Label>
                <b>Nhận xét</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="remark"
                value={salary.remark}
                onChange={handleInput}
                placeholder="Enter your remark"
                required
              />
            </Form.Group>

            <Button className="btn bg-color custom-bg" type="submit">
              Thêm lương
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showViewSalaryModal}
        onHide={handleViewSalaryModalClose}
        fullscreen
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Lương nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user &&
          user.employee &&
          user.employee.employeePaymentSalaries.length > 0 ? (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Loại lương</th>
                  <th>Amount</th>
                  <th>Phương thức thanh toán</th>
                  <th>Chi tiết thanh toán</th>
                  <th>Tên chuyến đi của khách hàng</th>
                  <th>Phương tiện</th>
                  <th>Nhận xét</th>
                  <th>Biên lai</th>
                </tr>
              </thead>
              <tbody>
                {user.employee.employeePaymentSalaries.map((salary, index) => (
                  <tr key={salary.id}>
                    <td>{index + 1}</td>
                    <td>{salary.salaryType}</td>
                    <td>{salary.amount}</td>
                    <td>{salary.paymentMode}</td>
                    <td>{salary.paymentDetails}</td>
                    <td>
                      {salary.clientTripName ? salary.clientTripName : "N/A"}
                    </td>
                    <td>{salary.vehicle ? salary.vehicle.name : "N/A"}</td>
                    <td>{salary.remark}</td>
                    <td>
                      <button
                        onClick={() =>
                          showSalaryReceiptModal(salary.receiptUpload)
                        }
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >
                        Xem biên lai
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không tìm thấy hồ sơ lương.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewSalaryModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showViewSalaryReceiptModal}
        onHide={handleViewSalaryReceiptModalClose}
        fullscreen
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`http://171.228.167.35:8080/api/user/document/${selectedSalaryDoc}/view`}
            width="100%"
            height="100%" // Set height to 100% for full coverage
            style={{ border: "none" }}
            title="Document Preview"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleViewSalaryReceiptModalClose}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeDetail;
