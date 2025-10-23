import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateClientBooking = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState({
    id: "", // int
    name: "", // String
    startDateTime: "", // String (epoch time from UI)
    paymentDueDate: "", // String (epoch)
    deliveredDateTime: "", // String (epoch time from UI)
    startKm: "", // Start KM
    vendorName: "", // Vendor Name (Self, Third Party)
    closeKm: "", // Close KM
    totalKm: "", // Total KM
    transportationMode: "Road", // Transportation Mode (Road)
    paidBy: "", // Paid By (Bill To) (Consignor, Consignee)
    paymentPaidBy: "", // Payment Paid By (Consignor, Consignee)
    taxPaidBy: "", // Tax Paid By (Consignor, Consignee)
    invoiceName: "", // Invoice Name
    invoiceNumber: "", // Invoice Number
    paymentStatus: "", // Payment Status (Pending, Not Paid, Partial Paid, Done)
    comment: "", // Comment
    deliveryStatus: "", // Delivery Status
    status: "", // Status
  });

  const [existingStartDateTime, setExistingStartDateTime] = useState("");
  const [existingDeliveredDateTime, setExistingDeliveredDateTime] =
    useState("");

  const [selectedStartDateTime, setSelectedStartDateTime] = useState("");
  const [selectedDeliveredDateTime, setSelectedDeliveredDateTime] =
    useState("");

  useEffect(() => {
    const getBooking = async () => {
      const fetchBooking = await retrieveBooking();
      if (fetchBooking) {
        const bookingData = fetchBooking.booking;

        setBooking(bookingData);

        setExistingDeliveredDateTime(bookingData.deliveredDateTime);
        setExistingStartDateTime(bookingData.startDateTime);
      }
    };
    getBooking();
  }, [bookingId]);

  const retrieveBooking = async () => {
    const response = await axios.get(
      `http://171.228.167.35:8080:8080/api/transport/client/booking/fetch?bookingId=${bookingId}`
    );
    return response.data;
  };

  let navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };

  const isNumber = (value) => {
    return typeof value === "number" && !isNaN(value);
  };

  const updateBooking = (e) => {
    e.preventDefault();

    if (!booking.id) {
      toast.error("Booking Id is missing!!!");
      return;
    }

    console.log("Selected Start Date Time: " + selectedStartDateTime);
    console.log("Selected Delivereed Date Time: " + selectedDeliveredDateTime);

    console.log("Existing Start Date Time: " + existingStartDateTime);
    console.log("Existing Delivereed Date Time: " + existingDeliveredDateTime);

    booking.startDateTime =
      selectedStartDateTime !== ""
        ? convertToEpochTime(selectedStartDateTime)
        : existingStartDateTime;

    booking.deliveredDateTime =
      selectedDeliveredDateTime !== ""
        ? convertToEpochTime(selectedDeliveredDateTime)
        : existingDeliveredDateTime;

    fetch("http://171.228.167.35:8080:8080/api/transport/client/booking/details/udpate", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(booking),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate(`/admin/client/booking/${booking.id}/detail`);
            }, 2000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
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
        }, 1000); // Redirect after 3 seconds
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
            <h5 className="card-title">Cập nhật đơn hàng đặt hàng</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3" onSubmit={updateBooking}>
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
                  <b>Thời gian bắt đầu</b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startDateTime"
                  onChange={(e) => setSelectedStartDateTime(e.target.value)}
                  value={selectedStartDateTime}
                />
              </div>

              {/* Start Km */}
              <div className="col-md-3 mb-3">
                <label htmlFor="startKm" className="form-label">
                  <b>Bắt đầu Km</b>
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
                  <b>Đóng Km</b>
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                <label htmlFor="deliveredDateTime" className="form-label">
                  <b>Ngày giờ giao hàng</b>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="deliveredDateTime"
                  onChange={(e) => setSelectedDeliveredDateTime(e.target.value)}
                  value={selectedDeliveredDateTime}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="paymentStatus" className="form-label">
                  <b>Tình trạng giao hàng</b>
                </label>
                <select
                  className="form-select"
                  name="deliveryStatus"
                  onChange={handleInput}
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
                  onChange={handleInput}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Open">Mở</option>
                  <option value="Closed">Đóng</option>
                </select>
              </div>

              {/* Comment */}
              <div className="col-md-9 mb-3">
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
                  Submit
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

export default UpdateClientBooking;
