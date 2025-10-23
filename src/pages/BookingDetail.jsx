import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const BookingDetail = () => {


  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showTripChargesModal, setShowTripChargesModal] = useState(false);
  const [showTripPriceModal, setShowTripPriceModal] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [itmeDetail, setItemDetail] = useState({
    itemNameDetails: "",
    itemQuantity: "",
    actualWeight: "",
    grossWeight: "",
    weightType: "",
    rateAsPer: "",
    clientTripId: bookingId,
  });

  const [tripChargesDetail, setTripChargesDetail] = useState({
    additionalCharges: "",
    serviceCharges: "",
    pickupDropCharges: "",
    otherCharges: "",
    gstApplicable: "",
    gstNumber: "",
    cgstRate: "",
    sgstRate: "",
    clientTripId: bookingId,
  });

  const [tripPriceDetail, setTripPriceDetail] = useState({
    rate: "",
    totalAmount: "",
    advanceAmount: "",
    receivedAmount: "",
    dueAmount: "",
    paymentStatus: "",
    clientTripId: bookingId,
  });

  const handleItemInput = (e) => {
    setItemDetail({ ...itmeDetail, [e.target.name]: e.target.value });
  };

  const handleTripChargesInput = (e) => {
    setTripChargesDetail({
      ...tripChargesDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleTripPriceInput = (e) => {
    setTripPriceDetail({
      ...tripPriceDetail,
      [e.target.name]: e.target.value,
    });
  };

  const [allEmployee, setAllEmployee] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleBranchModalClose = () => setShowBranchModal(false);
  const handleBranchModalShow = () => setShowBranchModal(true);

  const handleVehicleModalClose = () => setShowVehicleModal(false);
  const handleVehicleModalShow = () => setShowVehicleModal(true);

  const handleItemModalClose = () => setShowItemModal(false);
  const handleItemModalShow = () => setShowItemModal(true);

  const handleTripChargesModalClose = () => setShowTripChargesModal(false);
  const handleTripChargesModalShow = () => setShowTripChargesModal(true);

  const handleTripPriceModalClose = () => setShowTripPriceModal(false);
  const handleTripPriceModalShow = () => setShowTripPriceModal(true);

  const [selectedDoc, setSelectedDoc] = useState("");

  const [showDocModal, setShowDocModal] = useState(false);
  const handleDocModalClose = () => setShowDocModal(false);
  const handleDocModalShow = () => setShowDocModal(true);

  const showReceiptDocModal = (docFileName) => {
    setSelectedDoc(docFileName);
    handleDocModalShow();
  };

  useEffect(() => {
    const getBookingDetails = async () => {
      const bookingDetails = await retrieveBookingDetails();
      if (bookingDetails) {
        setBooking(bookingDetails.booking);
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
    getBookingDetails();
  }, [bookingId]);

  const retrieveAllVehicles = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080:8080/api/transport/vehicle/fetch/all",
      {
        headers: {
          //   Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );

    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080:8080/api/user/fetch/role-wise?role=Employee"
    );
    return response.data;
  };

  const retrieveBookingDetails = async () => {
    const response = await axios.get(
      `http://171.228.167.35:8080:8080/api/transport/client/booking/fetch?bookingId=${bookingId}`
    );
    return response.data;
  };

  let navigate = useNavigate();

  if (!booking) return <p>Loading...</p>;

  const updateBookingDetails = () => {
    navigate(`/admin/booking/${bookingId}/update`, { state: booking });
  };

  const updateBookingDocument = () => {
    navigate("/admin/booking/document/update", { state: booking });
  };

  const handleEmployeeAddSubmit = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/employee/add?bookingId=" +
        bookingId +
        "&employeeId=" +
        employeeId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const handleVehicleAddSubmit = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/vehicle/add?bookingId=" +
        bookingId +
        "&vehicleId=" +
        vehicleId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const handleItemFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://171.228.167.35:8080:8080/api/transport/client/booking/item/add", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(itmeDetail),
    })
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const handleTripChargesFormSubmit = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/trip/charges/add",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
        body: JSON.stringify(tripChargesDetail),
      }
    )
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const handleTripPriceFormSubmit = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/price/detail/add",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
        body: JSON.stringify(tripPriceDetail),
      }
    )
      .then((result) => {
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const downloadInvoicePDF = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/generate/invoice?bookingId=" +
        bookingId,
      {
        method: "GET",
        headers: {
          Accept: "application/pdf", // This is key to accept PDF
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the PDF.");
        }
        return response.blob(); // Convert response to a Blob (binary data)
      })
      .then((blob) => {
        // Create a link element, set the download attribute, and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf"; // You can set the file name here
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Clean up the DOM after the download
      })
      .catch((error) => {
        console.error("Error downloading the PDF:", error);
      });
  };

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
          <h2>Chi tiết đặt phòng</h2>
        </div>
        <div className="card-body">
          {/* Basic Information */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Thông tin cơ bản</h5>
              <p>
                <strong>Tên chuyến đi:</strong> {booking.name}
              </p>
              <p>
                <strong>Ngày thêm:</strong>{" "}
                {new Date(parseInt(booking.addedDateTime)).toLocaleString()}
              </p>
              <p>
                <strong>Thời gian bắt đầu:</strong>{" "}
                {new Date(parseInt(booking.startDateTime)).toLocaleString()}
              </p>
              <p>
                <strong>Tên nhà cung cấp:</strong> {booking.vendorName}
              </p>
              <p>
                <strong>Start KM:</strong> {booking.startKm}
              </p>
              <p>
                <strong>Close KM:</strong> {booking.closeKm}
              </p>
              <p>
                <strong>Thời gian giao hàng:</strong>{" "}
                {new Date(parseInt(booking.deliveredDateTime)).toLocaleString()}
              </p>
              <p>
                <strong>Tình trạng giao hàng:</strong> {booking.deliveryStatus}
              </p>
              <p>
                <strong>Document:</strong>
                <button
                  className="btn btn-sm bg-color custom-bg ms-2"
                  onClick={handleShow}
                >
                  Xem tài liệu
                </button>
              </p>
            </div>

            {/* Payment and Status Information */}
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Thông tin thanh toán và trạng thái</h5>
              <p>
                <strong>Tổng KM:</strong> {booking.totalKm}
              </p>
              <p>
                <strong>Chế độ vận chuyển:</strong>{" "}
                {booking.transportationMode}
              </p>
              <p>
                <strong>Được trả bởi:</strong> {booking.paidBy}
              </p>
              <p>
                <strong>Thanh toán được thanh toán bởi:</strong> {booking.paymentPaidBy}
              </p>
              <p>
                <strong>Thuế được trả bởi:</strong> {booking.taxPaidBy}
              </p>
              <p>
                <strong>Tên hóa đơn:</strong> {booking.invoiceName}
              </p>
              <p>
                <strong>Số hóa đơn:</strong> {booking.invoiceNumber}
              </p>
              <p>
                <strong>Ngày đến hạn thanh toán:</strong> {booking.paymentDueDate}
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong> {booking.paymentStatus}
              </p>
              <p>
                <strong>Trạng thái:</strong> {booking.status}
              </p>
            </div>
          </div>

          {/* From Client Details */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Từ Khách hàng (Người gửi hàng)</h5>
              <p>
                <strong>Tên:</strong> {booking.fromClient.name}
              </p>
              <p>
                <strong>Số liên lạc:</strong> {booking.fromClient.contactNumber}
              </p>
              <p>
                <strong>GST Số:</strong> {booking.fromClient.gstNumber}
              </p>
            </div>

            {/* To Client Details */}
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Gửi khách hàng (Người nhận hàng)</h5>
              <p>
                <strong>Tên:</strong> {booking.toClient.name}
              </p>
              <p>
                <strong>Số liên lạc:</strong> {booking.toClient.contactNumber}
              </p>
              <p>
                <strong>GST Số:</strong> {booking.toClient.gstNumber}
              </p>
            </div>
          </div>

          {/* Station Details */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Trạm đặt chỗ</h5>
              <p>
                <strong>Thành phố:</strong> {booking.bookingPointStation.city}
              </p>
              <p>
                <strong>Tỉnh/Thành phố:</strong> {booking.bookingPointStation.state}
              </p>
              <p>
                <strong>Địa chỉ:</strong>{" "}
                {booking.bookingPointStation.fullAddress}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Trạm giao hàng</h5>
              <p>
                <strong>Thành phố:</strong> {booking.deliveryPointStation.city}
              </p>
              <p>
                <strong>Tỉnh/Thành phố:</strong> {booking.deliveryPointStation.state}
              </p>
              <p>
                <strong>Địa chỉ:</strong>{" "}
                {booking.deliveryPointStation.fullAddress}
              </p>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Xe được sử dụng để giao hàng</h5>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên xe</th>
                    <th scope="col">Tên công ty</th>
                    <th scope="col">Số đăng ký</th>
                    <th scope="col">Loại truyền</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.companyName}</td>
                      <td>{vehicle.registrationNumber}</td>
                      <td>{vehicle.passingType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Details */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">
                Nhân viên tham gia chuyến đi của khách hàng
              </h5>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email </th>
                    <th scope="col">PAN Số</th>
                    <th scope="col">Role</th>
                    <th scope="col">Số căn cước </th>
                    <th scope="col">Giấy phép </th>
                  </tr>
                </thead>
                <tbody>
                  {booking.employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td>{employee.phoneNo}</td>
                      <td>{employee.emailId}</td>
                      <td>{employee.employee.panNumber}</td>
                      <td>{employee.employee.role}</td>
                      <td>{employee.employee.aadharNumber}</td>
                      <td>{employee.employee.licenseNumber || "N/A"}</td>{" "}
                      {/* Display N/A if no license */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Item Details */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Chi tiết mặt hàng</h5>
              {booking.itemDetails && booking.itemDetails.length > 0 ? (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tên hàng</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Trọng lượng thực tế</th>
                      <th scope="col">Tổng trọng lượng</th>
                      <th scope="col">Loại trọng lượng</th>
                      <th scope="col">Tỷ lệ theo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.itemDetails.map((item) => (
                      <tr key={item.id}>
                        <td>{item.itemNameDetails}</td>
                        <td>{item.itemQuantity}</td>
                        <td>{item.actualWeight}</td>
                        <td>{item.grossWeight}</td>
                        <td>{item.weightType}</td>
                        <td>{item.rateAsPer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có mục nào hiện diện</p>
              )}
            </div>
          </div>

          {/* Charges Details */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Chi tiết phí</h5>
              {booking.chargesDetails ? (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Phí bổ sung</th>
                      <th scope="col">Phí dịch vụ</th>
                      <th scope="col">Phí đón/trả</th>
                      <th scope="col">Các khoản phí khác</th>
                      <th scope="col">Áp dụng GST</th>
                      <th scope="col">GST Số</th>
                      <th scope="col">Tỷ lệ CGST</th>
                      <th scope="col">Tỷ giá SGST</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{booking.chargesDetails.additionalCharges}</td>
                      <td>{booking.chargesDetails.serviceCharges}</td>
                      <td>{booking.chargesDetails.pickupDropCharges}</td>
                      <td>{booking.chargesDetails.otherCharges}</td>
                      <td>{booking.chargesDetails.gstApplicable}</td>
                      <td>{booking.chargesDetails.gstNumber}</td>
                      <td>{booking.chargesDetails.cgstRate}%</td>
                      <td>{booking.chargesDetails.sgstRate}%</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Không có chi tiết phí hiện tại</p>
              )}
            </div>
          </div>

          {/* Price Details */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Chi tiết giá</h5>
              {booking.priceDetails ? (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tỷ lệ</th>
                      <th scope="col">Tổng số tiền</th>
                      <th scope="col">Số tiền ứng trước</th>
                      <th scope="col">Số tiền nhận được</th>
                      <th scope="col">Số tiền đến hạn</th>
                      <th scope="col">Trạng thái thanh toán</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{booking.priceDetails.rate}</td>
                      <td>{booking.priceDetails.totalAmount}</td>
                      <td>{booking.priceDetails.advanceAmount}</td>
                      <td>{booking.priceDetails.receivedAmount}</td>
                      <td>{booking.priceDetails.dueAmount}</td>
                      <td>{booking.priceDetails.paymentStatus}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Không có thông tin chi tiết về giá</p>
              )}
            </div>
          </div>

          {/* Fuel Expenses */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <h5 className="text-primary">Chi phí nhiên liệu</h5>
              {booking.fuelExpenses && booking.fuelExpenses.length > 0 ? (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Thời gian chi phí</th>
                      <th scope="col">Loại nhiên liệu</th>
                      <th scope="col">Tên nhà cung cấp</th>
                      <th scope="col">Km bắt đầu</th>
                      <th scope="col">Km hiện tại</th>
                      <th scope="col">Lít đã đổ đầy</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Phương thức thanh toán</th>
                      <th scope="col">Chi tiết thanh toán</th>
                      <th scope="col">Biên lai</th>
                      <th scope="col">Nhận xét</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.fuelExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>
                          {new Date(expense.expenseTime).toLocaleString()}
                        </td>
                        <td>{expense.fuelType}</td>
                        <td>{expense.vendorName}</td>
                        <td>{expense.startingKm}</td>
                        <td>{expense.currentKm}</td>
                        <td>{expense.filledLitre}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.paymentMode}</td>
                        <td>{expense.paymentDetails}</td>
                        <td>
                          <button
                            onClick={() =>
                              showReceiptDocModal(expense.receiptUpload)
                            }
                            className="btn btn-sm bg-color custom-bg-text ms-2"
                          >
                            Xem biên lai
                          </button>
                        </td>
                        <td>{expense.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có chi phí nhiên liệu cho chuyến đi này</p>
              )}
            </div>
          </div>
          <h5 className="text-primary mt-4">Chi phí khác</h5>
          {booking.otherExpenses && booking.otherExpenses.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Ngày chi phí</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Loại chi phí</th>
                    <th>Vị trí</th>
                    <th>Thành phố</th>
                    <th>Mã bưu chính</th>
                    <th>Tỉnh thành phố</th>
                    <th>Số lượng</th>
                    <th>Phương thức thanh toán</th>
                    <th>Biên lai</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.otherExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.expenseTime}</td>
                      <td>{expense.vendorName}</td>
                      <td>{expense.expenseType}</td>
                      <td>{expense.locationDetails}</td>
                      <td>{expense.city}</td>
                      <td>{expense.pinCode}</td>
                      <td>{expense.state}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.paymentMode}</td>
                      <td>
                        <button
                          onClick={() =>
                            showReceiptDocModal(expense.receiptUpload)
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
            </div>
          ) : (
            <p className="text-muted">
              Các chi phí khác không có trong lần đặt phòng này.
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="card-footer">
          <div className="d-flex justify-content-center mt-3">
            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Add Employee"
              onClick={handleBranchModalShow}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Add Vehicle"
              onClick={handleVehicleModalShow}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Add Item"
              onClick={handleItemModalShow}
            />

            {(!booking.chargesDetails ||
              Object.keys(booking.chargesDetails).length === 0) && (
              <input
                type="button"
                className="btn custom-bg bg-color mb-3 ms-5"
                value="Add Trip Charges"
                onClick={handleTripChargesModalShow}
              />
            )}

            {(!booking.priceDetails ||
              Object.keys(booking.priceDetails).length === 0) && (
              <input
                type="button"
                className="btn custom-bg bg-color mb-3 ms-5"
                value="Add Trip Price"
                onClick={handleTripPriceModalShow}
              />
            )}

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-5"
              value="Update Booking Details"
              onClick={updateBookingDetails}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-4"
              value="Update Booking Document"
              onClick={updateBookingDocument}
            />

            <input
              type="button"
              className="btn custom-bg bg-color mb-3 ms-4"
              value="Download Pdf"
              onClick={(e) => downloadInvoicePDF(e)}
            />
          </div>
        </div>
      </div>

      {/* Modal for Document Preview */}
      <Modal show={showModal} onHide={handleClose} fullscreen>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Tài liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`http://171.228.167.35:8080:8080/api/user/document/${booking.document}/view`}
            width="100%"
            height="100%"
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

      <Modal show={showBranchModal} onHide={handleBranchModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmployeeAddSubmit}>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>
                <b>Người lao động</b>
              </Form.Label>
              <Form.Select
                name="employeeId"
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="">Chọn nhân viên</option>
                {allEmployee.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName +
                      employee.lastName +
                      " [" +
                      employee.employee.role +
                      "]"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button className="btn bg-color custom-bg" type="submit">
              Thêm nhân viên
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showVehicleModal} onHide={handleVehicleModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleVehicleAddSubmit}>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>
                <b>Phương tiện giao thông</b>
              </Form.Label>
              <Form.Select
                name="vehicleId"
                onChange={(e) => setVehicleId(e.target.value)}
              >
                <option value="">Chọn xe</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name + " [" + vehicle.passingType + "]"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button className="btn bg-color custom-bg" type="submit">
              Thêm xe
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVehicleModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showItemModal} onHide={handleItemModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm chi tiết mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleItemFormSubmit}>
            <Form.Group controlId="itemNameDetails">
              <Form.Label>Tên/Chi tiết sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="itemNameDetails"
                value={itmeDetail.itemNameDetails}
                onChange={handleItemInput}
                placeholder="Enter item name or details"
              />
            </Form.Group>

            <Form.Group controlId="itemQuantity" className="mt-3">
              <Form.Label>Số lượng mặt hàng</Form.Label>
              <Form.Control
                type="text"
                name="itemQuantity"
                value={itmeDetail.itemQuantity}
                onChange={handleItemInput}
                placeholder="Enter item quantity"
              />
            </Form.Group>

            <Form.Group controlId="actualWeight" className="mt-3">
              <Form.Label>Trọng lượng thực tế</Form.Label>
              <Form.Control
                type="text"
                name="actualWeight"
                value={itmeDetail.actualWeight}
                onChange={handleItemInput}
                placeholder="Enter actual weight"
              />
            </Form.Group>

            <Form.Group controlId="grossWeight" className="mt-3">
              <Form.Label>Tổng trọng lượng</Form.Label>
              <Form.Control
                type="text"
                name="grossWeight"
                value={itmeDetail.grossWeight}
                onChange={handleItemInput}
                placeholder="Enter gross weight"
              />
            </Form.Group>

            <Form.Group controlId="weightType" className="mt-3">
              <Form.Label>Loại trọng lượng</Form.Label>
              <Form.Control
                as="select"
                name="weightType"
                value={itmeDetail.weightType}
                onChange={handleItemInput}
              >
                <option value="">Chọn loại trọng lượng</option>
                <option value="KG">KG</option>
                <option value="Ton">Tấn</option>
                <option value="Package">Package</option>
                <option value="Gram">Gram</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rateAsPer" className="mt-3">
              <Form.Label>Tỷ lệ theo</Form.Label>
              <Form.Control
                as="select"
                name="rateAsPer"
                value={itmeDetail.rateAsPer}
                onChange={handleItemInput}
              >
                <option value="">Chọn tỷ lệ theo</option>
                <option value="KG">KG</option>
                <option value="Ton">Tấn</option>
                <option value="Package">Package</option>
                <option value="Gram">Gram</option>
              </Form.Control>
            </Form.Group>

            <Button className="btn bg-color custom-bg mt-3" type="submit">
              Thêm mục
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleItemModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTripChargesModal} onHide={handleTripChargesModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm chi tiết phí chuyến đi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTripChargesFormSubmit}>
            <Form.Group controlId="additionalCharges">
              <Form.Label>Phí bổ sung</Form.Label>
              <Form.Control
                type="text"
                name="additionalCharges"
                value={tripChargesDetail.additionalCharges}
                onChange={handleTripChargesInput}
                placeholder="Enter additional charges"
              />
            </Form.Group>

            <Form.Group controlId="serviceCharges" className="mt-3">
              <Form.Label>Phí dịch vụ</Form.Label>
              <Form.Control
                type="text"
                name="serviceCharges"
                value={tripChargesDetail.serviceCharges}
                onChange={handleTripChargesInput}
                placeholder="Enter service charges"
              />
            </Form.Group>

            <Form.Group controlId="pickupDropCharges" className="mt-3">
              <Form.Label>Phí đón/trả</Form.Label>
              <Form.Control
                type="text"
                name="pickupDropCharges"
                value={tripChargesDetail.pickupDropCharges}
                onChange={handleTripChargesInput}
                placeholder="Enter pickup/drop charges"
              />
            </Form.Group>

            <Form.Group controlId="otherCharges" className="mt-3">
              <Form.Label>Các khoản phí khác</Form.Label>
              <Form.Control
                type="text"
                name="otherCharges"
                value={tripChargesDetail.otherCharges}
                onChange={handleTripChargesInput}
                placeholder="Enter other charges"
              />
            </Form.Group>

            <Form.Group controlId="gstApplicable" className="mt-3">
              <Form.Label>Áp dụng GST</Form.Label>
              <Form.Control
                as="select"
                name="gstApplicable"
                value={tripChargesDetail.gstApplicable}
                onChange={handleTripChargesInput}
              >
                <option value="">Chọn GST áp dụng</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>

            {/* Conditionally render GST Number and CGST Rate if GST is applicable */}
            {tripChargesDetail.gstApplicable === "Yes" && (
              <>
                <Form.Group controlId="gstNumber" className="mt-3">
                  <Form.Label>Số GST</Form.Label>
                  <Form.Control
                    type="text"
                    name="gstNumber"
                    value={tripChargesDetail.gstNumber}
                    onChange={handleTripChargesInput}
                    placeholder="Enter GST number"
                  />
                </Form.Group>

                <Form.Group controlId="cgstRate" className="mt-3">
                  <Form.Label>Tỷ lệ CGST</Form.Label>
                  <Form.Control
                    type="text"
                    name="cgstRate"
                    value={tripChargesDetail.cgstRate}
                    onChange={handleTripChargesInput}
                    placeholder="Enter CGST rate"
                  />
                </Form.Group>

                <Form.Group controlId="cgstRate" className="mt-3">
                  <Form.Label>Tỷ giá SGST</Form.Label>
                  <Form.Control
                    type="text"
                    name="sgstRate"
                    value={tripChargesDetail.sgstRate}
                    onChange={handleTripChargesInput}
                    placeholder="Enter SGST rate"
                  />
                </Form.Group>
              </>
            )}

            <Button className="btn bg-color custom-bg mt-3" type="submit">
              Thêm phí chuyến đi
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleTripChargesModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTripPriceModal} onHide={handleTripPriceModalClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Thêm chi tiết giá chuyến đi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTripPriceFormSubmit}>
            <Form.Group controlId="rate">
              <Form.Label>Tỷ lệ</Form.Label>
              <Form.Control
                type="text"
                name="rate"
                value={tripPriceDetail.rate}
                onChange={handleTripPriceInput}
                placeholder="Enter rate"
              />
            </Form.Group>

            <Form.Group controlId="totalAmount" className="mt-3">
              <Form.Label>Tổng số tiền</Form.Label>
              <Form.Control
                type="text"
                name="totalAmount"
                value={tripPriceDetail.totalAmount}
                onChange={handleTripPriceInput}
                placeholder="Enter total amount"
              />
            </Form.Group>

            <Form.Group controlId="advanceAmount" className="mt-3">
              <Form.Label>Số tiền ứng trước</Form.Label>
              <Form.Control
                type="text"
                name="advanceAmount"
                value={tripPriceDetail.advanceAmount}
                onChange={handleTripPriceInput}
                placeholder="Enter advance amount"
              />
            </Form.Group>

            <Form.Group controlId="receivedAmount" className="mt-3">
              <Form.Label>Số tiền nhận được</Form.Label>
              <Form.Control
                type="text"
                name="receivedAmount"
                value={tripPriceDetail.receivedAmount}
                onChange={handleTripPriceInput}
                placeholder="Enter received amount"
              />
            </Form.Group>

            <Form.Group controlId="dueAmount" className="mt-3">
              <Form.Label>Số tiền đến hạn</Form.Label>
              <Form.Control
                type="text"
                name="dueAmount"
                value={tripPriceDetail.dueAmount}
                onChange={handleTripPriceInput}
                placeholder="Enter due amount"
              />
            </Form.Group>

            <Form.Group controlId="paymentStatus" className="mt-3">
              <Form.Label>Trạng thái thanh toán</Form.Label>
              <Form.Control
                as="select"
                name="paymentStatus"
                value={tripPriceDetail.paymentStatus}
                onChange={handleTripPriceInput}
              >
                <option value="">Chọn trạng thái thanh toán</option>
                <option value="Paid">Trả</option>
                <option value="Advance">Nâng cao</option>
                <option value="To be Pay">Được trả tiền</option>
              </Form.Control>
            </Form.Group>

            <Button className="btn bg-color custom-bg mt-3" type="submit">
              Lưu Chi tiết Giá Chuyến đi
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTripPriceModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDocModal} onHide={handleDocModalClose} fullscreen>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Tài liệu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`http://171.228.167.35:8080:8080/api/user/document/${selectedDoc}/view`}
            width="100%"
            height="100%" // Set height to 100% for full coverage
            style={{ border: "none" }}
            title="Document Preview"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDocModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDetail;
