import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddClientBooking = () => {
  const [booking, setBooking] = useState({
    name: "",
    startDateTime: "",
    startKm: "",
    vendorName: "",
    closeKm: "",
    totalKm: "",
    transportationMode: "Road",
    paidBy: "",
    paymentPaidBy: "",
    taxPaidBy: "",
    invoiceName: "",
    invoiceNumber: "",
    paymentDueDate: "",
    paymentStatus: "",
    comment: "",
    fromClientId: "",
    toClientId: "",
    vehicleId: "",
    employeeId: "",
    bookingPointStationId: "",
    deliveryPointStationId: "",
    deliveredDateTime: "",
    deliveryStatus: "",
    status: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [clients, setClients] = useState([]);
  const [fromClientBranches, setFromClientBranches] = useState([]);
  const [toClientBranches, setToClientBranches] = useState([]);

  useEffect(() => {
    const getAllClients = async () => {
      const clientResponse = await retrieveAllClients();
      if (clientResponse) {
        setClients(clientResponse.clients);
      }
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllEmployee(allUsers.users);
      }
    };

    const getAllVehicles = async () => {
      const vehicleResponse = await retrieveAllVehicles();
      if (vehicleResponse) {
        setVehicles(vehicleResponse.vehicles);
      }
    };

    getAllVehicles();

    getAllUsers();
    getAllClients();
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

  const retrieveAllClients = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080/api/transport/client/fetch/all"
    );
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080/api/user/fetch/employees?role=Driver&status=Active"
    );
    return response.data;
  };

  let navigate = useNavigate();

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "fromClientId") {
      const selectedClient = clients.find(
        (client) => client.id === parseInt(value)
      );
      setFromClientBranches(selectedClient ? selectedClient.branches : []);

      // Update booking with both fromClientId and reset bookingPointStationId in one go
      setBooking((prevBooking) => ({
        ...prevBooking,
        fromClientId: value,
        bookingPointStationId: "", // Reset branch on client change
      }));

      console.log(booking);
    } else if (name === "toClientId") {
      const selectedClient = clients.find(
        (client) => client.id === parseInt(value)
      );
      setToClientBranches(selectedClient ? selectedClient.branches : []);

      // Update booking with both toClientId and reset deliveryPointStationId in one go
      setBooking((prevBooking) => ({
        ...prevBooking,
        toClientId: value,
        deliveryPointStationId: "", // Reset branch on client change
      }));
      console.log(booking);
    } else {
      // For other fields, just update the booking state normally
      setBooking((prevBooking) => ({
        ...prevBooking,
        [name]: value,
      }));
      console.log(booking);
    }
  };

  const handleFileChange = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", booking.name);
    formData.append("startDateTime", convertToEpochTime(booking.startDateTime));
    formData.append("startKm", booking.startKm);
    formData.append("vendorName", booking.vendorName);
    formData.append("closeKm", booking.closeKm);
    formData.append("totalKm", booking.totalKm);
    formData.append("transportationMode", booking.transportationMode);
    formData.append("paidBy", booking.paidBy);
    formData.append("paymentPaidBy", booking.paymentPaidBy);
    formData.append("taxPaidBy", booking.taxPaidBy);
    formData.append("invoiceName", booking.invoiceName);
    formData.append("invoiceNumber", booking.invoiceNumber);
    formData.append("paymentDueDate", booking.paymentDueDate);
    formData.append("paymentStatus", booking.paymentStatus);
    formData.append("comment", booking.comment);
    formData.append("fromClientId", booking.fromClientId);
    formData.append("toClientId", booking.toClientId);
    formData.append("vehicleId", booking.vehicleId);
    formData.append("employeeId", booking.employeeId);
    formData.append("bookingPointStationId", booking.bookingPointStationId);
    formData.append("deliveryPointStationId", booking.deliveryPointStationId);
    formData.append(
      "deliveredDateTime",
      booking.deliveredDateTime === ""
        ? ""
        : convertToEpochTime(booking.deliveredDateTime)
    );
    formData.append("deliveryStatus", booking.deliveryStatus);
    formData.append("status", booking.status);
    formData.append("document", selectedDocument);

    axios
      .post("http://171.228.167.35:8080/api/transport/client/booking/add", formData)
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
            <h5 className="card-title">Thêm Đặt hàng của Khách hàng</h5>
          </div>
          <div className="card-body text-color">
            <form
              className="row g-3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="col-md-3 mb-3">
                <label htmlFor="startKm" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={booking.name}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="startDateTime" className="form-label">
                  <b>Ngày Giờ bắt đầu </b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startDateTime"
                  value={booking.startDateTime}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* From Client */}
              <div className="col-md-3 mb-3">
                <label htmlFor="fromClientId" className="form-label">
                  <b>Người gửi hàng / Người gửi</b>
                </label>
                <select
                  className="form-select"
                  name="fromClientId"
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn người gửi hàng</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Booking Point (Branch) */}
              <div className="col-md-3 mb-3">
                <label htmlFor="bookingPointStationId" className="form-label">
                  <b>Trạm đặt chỗ</b>
                </label>
                <select
                  className="form-select"
                  name="bookingPointStationId"
                  value={booking.bookingPointStationId}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn chi nhánh</option>
                  {fromClientBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.state +
                        "-" +
                        branch.city +
                        "- [" +
                        branch.fullAddress +
                        "]"}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Client */}
              <div className="col-md-3 mb-3">
                <label htmlFor="toClientId" className="form-label">
                  <b>Người nhận hàng</b>
                </label>
                <select
                  className="form-select"
                  name="toClientId"
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn người nhận hàng</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Point (Branch) */}
              <div className="col-md-3 mb-3">
                <label htmlFor="deliveryPointStationId" className="form-label">
                  <b>Trạm giao hàng</b>
                </label>
                <select
                  className="form-select"
                  name="deliveryPointStationId"
                  value={booking.deliveryPointStationId}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn chi nhánh</option>
                  {toClientBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.state +
                        "-" +
                        branch.city +
                        "- [" +
                        branch.fullAddress +
                        "]"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="employeeId" className="form-label">
                  <b>Phương tiện giao thông</b>
                </label>
                <select
                  className="form-select"
                  name="vehicleId"
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn xe</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name + " [" + vehicle.vehicleNumber + "]"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee (Driver) */}
              <div className="col-md-3 mb-3">
                <label htmlFor="employeeId" className="form-label">
                  <b>Tài xế</b>
                </label>
                <select
                  className="form-select"
                  name="employeeId"
                  value={booking.employeeId}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn Tài xế</option>
                  {allEmployee.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Km */}
              <div className="col-md-3 mb-3">
                <label htmlFor="startKm" className="form-label">
                  <b>Start Km</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="startKm"
                  value={booking.startKm}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Close Km */}
              <div className="col-md-3 mb-3">
                <label htmlFor="closeKm" className="form-label">
                  <b>Close Km</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="closeKm"
                  value={booking.closeKm}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Total Km */}
              <div className="col-md-3 mb-3">
                <label htmlFor="totalKm" className="form-label">
                  <b>Tổng Km</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="totalKm"
                  value={booking.totalKm}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Invoice Name */}
              <div className="col-md-3 mb-3">
                <label htmlFor="invoiceName" className="form-label">
                  <b>Tên hóa đơn</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="invoiceName"
                  value={booking.invoiceName}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Invoice Number */}
              <div className="col-md-3 mb-3">
                <label htmlFor="invoiceNumber" className="form-label">
                  <b>Số hóa đơn</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="invoiceNumber"
                  value={booking.invoiceNumber}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Payment Due Date */}
              <div className="col-md-3 mb-3">
                <label htmlFor="paymentDueDate" className="form-label">
                  <b>Ngày đến hạn thanh toán</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="paymentDueDate"
                  value={booking.paymentDueDate}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Vendor Name */}
              <div className="col-md-3 mb-3">
                <label htmlFor="vendorName" className="form-label">
                  <b>Loại nhà cung cấp</b>
                </label>
                <select
                  className="form-select"
                  name="vendorName"
                  value={booking.vendorName}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn loại nhà cung cấp</option>
                  <option value="Self">Bản thân</option>
                  <option value="Third Party">Bên thứ ba</option>
                </select>
              </div>

              {/* Transportation Mode */}
              <div className="col-md-3 mb-3">
                <label htmlFor="transportationMode" className="form-label">
                  <b>Chế độ vận chuyển</b>
                </label>
                <select
                  className="form-select"
                  name="transportationMode"
                  value={booking.transportationMode}
                  onChange={handleInput}
                  required
                >
                  <option value="Road">Đường</option> {/* Showing only Road */}
                </select>
              </div>

              {/* Paid By */}
              <div className="col-md-3 mb-3">
                <label htmlFor="paidBy" className="form-label">
                  <b>Được trả bởi</b>
                </label>
                <select
                  className="form-select"
                  name="paidBy"
                  value={booking.paidBy}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn thanh toán bởi</option>
                  <option value="Consignore">Người gửi hàng</option>
                  <option value="Consignee">Người nhận hàng</option>
                </select>
              </div>

              {/* Tax Paid By */}
              <div className="col-md-3 mb-3">
                <label htmlFor="taxPaidBy" className="form-label">
                  <b>Thuế được trả bởi</b>
                </label>
                <select
                  className="form-select"
                  name="taxPaidBy"
                  value={booking.taxPaidBy}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn Thuế được trả bởi</option>
                  <option value="Consignore">Người gửi hàng</option>
                  <option value="Consignee">Người nhận hàng</option>
                </select>
              </div>

              {/* Payment Paid By */}
              <div className="col-md-3 mb-3">
                <label htmlFor="paymentPaidBy" className="form-label">
                  <b>Thanh toán được thanh toán bởi</b>
                </label>
                <select
                  className="form-select"
                  name="paymentPaidBy"
                  value={booking.paymentPaidBy}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn thanh toán được thanh toán bởi</option>
                  <option value="Consignore">Người gửi hàng</option>
                  <option value="Consignee">Người nhận hàng</option>
                </select>
              </div>

              {/* Payment Status */}
              <div className="col-md-3 mb-3">
                <label htmlFor="paymentStatus" className="form-label">
                  <b>Trạng thái thanh toán</b>
                </label>
                <select
                  className="form-select"
                  name="paymentStatus"
                  value={booking.paymentStatus}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn trạng thái thanh toán</option>
                  <option value="Pending">Chưa giải quyết</option>
                  <option value="Not Paid">Chưa thanh toán</option>
                  <option value="Paid">Trả</option>
                  <option value="Partial Paid">Trả một phần</option>
                  <option value="Done">Xong</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="startDateTime" className="form-label">
                  <b>Ngày giờ giao hàng</b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="deliveredDateTime"
                  value={booking.deliveredDateTime}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="paymentStatus" className="form-label">
                  <b>Tình trạng giao hàng</b>
                </label>
                <select
                  className="form-select"
                  name="deliveryStatus"
                  value={booking.deliveryStatus}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn Trạng thái Giao hàng</option>
                  <option value="Pending">Chưa giải quyết</option>
                  <option value="In Transit">Đang vận chuyển</option>
                  <option value="Delivered">Đã giao hàng</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="paymentStatus" className="form-label">
                  <b>Trạng thái đơn hàng</b>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={booking.status}
                  onChange={handleInput}
                  required
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Open">Mở</option>
                  <option value="Closed">Đóng</option>
                </select>
              </div>

              {/* File Upload */}
              <div className="col-md-3 mb-3">
                <label htmlFor="document" className="form-label">
                  <b>Upload Document</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="document"
                  onChange={handleFileChange}
                  required
                />
              </div>

              {/* Comment */}
              <div className="col-md-12 mb-3">
                <label htmlFor="comment" className="form-label">
                  <b>Bình luận</b>
                </label>
                <textarea
                  className="form-control"
                  name="comment"
                  value={booking.comment}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="col-md-12 text-center">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Gửi
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

export default AddClientBooking;
