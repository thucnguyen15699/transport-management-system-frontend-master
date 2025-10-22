import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import data from "../danhmucxaphuong.json";

const UpdateEmployeeDetailPage = () => {
  const location = useLocation();
  const { employeeId } = useParams();

  const [user, setUser] = useState(location.state || null);

  const [employee, setEmployee] = useState({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailId: user.emailId,
    phoneNo: user.phoneNo,
    fullName: user.employee.fullName,
    panNumber: user.employee.panNumber,
    aadharNumber: user.employee.aadharNumber,
    licenseNumber: user.employee.licenseNumber,
    role: user.employee.role,
    fullAddress: user.employee.fullAddress,
    city: user.employee.city,
    pinCode: user.employee.pinCode,
    state: user.employee.state,
    country: user.employee.country,
    licenseExpiryDate: user.employee.licenseExpiryDate,
    workStartDate: user.employee.workStartDate,
    workEndDate: user.employee.workEndDate,
    accountNumber: user.employee.accountNumber,
    ifscNumber: user.employee.ifscNumber,
    status: user.employee.status,
    comments: user.employee.comments,
  });

  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  // const statesCities = {
  //   Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  //   Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  //   Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  //   TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  //   UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  //   Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner"],
  //   WestBengal: ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  //   Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  //   Haryana: ["Gurgaon", "Faridabad", "Panipat", "Rohtak", "Karnal"],
  //   MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  //   Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
  //   Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
  //   AndhraPradesh: [
  //     "Vijayawada",
  //     "Visakhapatnam",
  //     "Guntur",
  //     "Tirupati",
  //     "Kakinada",
  //   ],
  //   Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  //   Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  //   Delhi: ["New Delhi", "Dwarka", "Saket", "Rohini", "Janakpuri"],
  //   Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tinsukia"],
  //   Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba"],
  //   Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  //   Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital"],
  //   HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
  //   JammuAndKashmir: ["Srinagar", "Jammu", "Leh", "Anantnag", "Baramulla"],
  //   Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  //   Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa"],
  //   Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
  //   Manipur: ["Imphal", "Thoubal", "Bishnupur", "Kakching", "Churachandpur"],
  //   ArunachalPradesh: ["Itanagar", "Tawang", "Pasighat", "Ziro", "Roing"],
  //   Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Serchhip"],
  //   Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon"],
  //   Sikkim: ["Gangtok", "Namchi", "Pelling", "Ravangla", "Gyalshing"],
  // };

   const [statesCities, setStatesCities] = useState({});
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  // const states = Object.keys(statesCities);

  // const [selectedState, setSelectedState] = useState("");
  // const [cities, setCities] = useState([]);

  useEffect(() => {
      const mapping = {};
      data.forEach((tinh) => {
        mapping[tinh.tentinhmoi] = tinh.phuongxa.map((px) => px.tenphuongxa);
      });
      setStatesCities(mapping);
      setStates(Object.keys(mapping));
    }, []);
  
    const handleInput = (e) => {
      const { name, value } = e.target;
  
      if (name === "state") {
        setSelectedState(value);
        setCities(statesCities[value] || []);
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          city: "",
          state: value,
        }));
      } else if (name === "city") {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          city: value,
        }));
      } else {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          [name]: value,
        }));
      }
    };

  // const handleInput = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "state") {
  //     setSelectedState(value);
  //     setCities(statesCities[value] || []); // Update cities based on selected state
  //     setEmployee((prevEmployee) => ({
  //       ...prevEmployee,
  //       city: "", // Reset city when state changes
  //       state: value,
  //     }));
  //   } else {
  //     setEmployee((prevEmployee) => ({
  //       ...prevEmployee,
  //       [name]: value,
  //     }));
  //   }
  // };

  const updateEmployee = (e) => {
    e.preventDefault();
    employee.userId = employeeId;
    if (employee === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    if (employee.userId === "") {
      toast.error("Employee Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    fetch("http://171.228.167.35:8080/api/user/employee/detail/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(employee),
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
              navigate(`/admin/employee/${employeeId}/detail`);
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
    <div>
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
              <h5 className="card-title">Cập nhật nhân viên</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-4 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleInput}
                    value={employee.firstName}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleInput}
                    value={employee.lastName}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleInput}
                    value={employee.emailId}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Số điện thoại</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleInput}
                    value={employee.phoneNo}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="fullName" className="form-label">
                    <b>Full Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    onChange={handleInput}
                    value={employee.fullName}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="panNumber" className="form-label">
                    <b>Số Định danh cá nhân</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="panNumber"
                    name="panNumber"
                    onChange={handleInput}
                    value={employee.panNumber}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="aadharNumber" className="form-label">
                    <b>Số căn cước </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="aadharNumber"
                    name="aadharNumber"
                    onChange={handleInput}
                    value={employee.aadharNumber}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="role" className="form-label">
                    <b>Role</b>
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    onChange={handleInput}
                    value={employee.role}
                  >
                    <option value="">Role</option>
                    <option value="Driver">Driver</option>
                    <option value="Helper">Helper</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                </div>

                {/* Conditionally render License Number input field */}
                {employee.role === "Driver" && (
                  <div className="col-md-4 mb-3">
                    <label htmlFor="licenseNumber" className="form-label">
                      <b>Số giấy phép lái xe</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="licenseNumber"
                      name="licenseNumber"
                      onChange={handleInput}
                      value={employee.licenseNumber}
                    />
                  </div>
                )}

                <div className="col-md-4 mb-3">
                  <label htmlFor="fullAddress" className="form-label">
                    <b>Full Address</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullAddress"
                    name="fullAddress"
                    onChange={handleInput}
                    value={employee.fullAddress}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="state" className="form-label">
                    <b>Tỉnh/Thành</b>
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    onChange={handleInput}
                    value={employee.state}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <select
                    className="form-select"
                    id="city"
                    name="city"
                    onChange={handleInput}
                    value={employee.city}
                    disabled={!selectedState}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="pinCode" className="form-label">
                    <b>Pin Code</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pinCode"
                    name="pinCode"
                    onChange={handleInput}
                    value={employee.pinCode}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="country" className="form-label">
                    <b>Quốc gia</b>
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    onChange={handleInput}
                    value={employee.country}
                  >
                    <option value="">Select Country</option>
                    <option value="VietNam">Việt Nam trong tim</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="licenseExpiryDate" className="form-label">
                    <b>Ngày tháng hết hạn căn cước</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="licenseExpiryDate"
                    name="licenseExpiryDate"
                    onChange={handleInput}
                    value={employee.licenseExpiryDate}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="workStartDate" className="form-label">
                    <b>Ngày bắt đầu công việc</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="workStartDate"
                    name="workStartDate"
                    onChange={handleInput}
                    value={employee.workStartDate}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="workEndDate" className="form-label">
                    <b>Ngày kết thúc công việc</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="workEndDate"
                    name="workEndDate"
                    onChange={handleInput}
                    value={employee.workEndDate}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    <b>Số tài khoản Ngân Hàng</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    name="accountNumber"
                    onChange={handleInput}
                    value={employee.accountNumber}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="ifscNumber" className="form-label">
                    <b>Mã Ngân hàng</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ifscNumber"
                    name="ifscNumber"
                    onChange={handleInput}
                    value={employee.ifscNumber}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="comments" className="form-label">
                    <b>Comments</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    onChange={handleInput}
                    value={employee.comments}
                  />
                </div>

                <div className="col-md-12 text-center">
                  <button
                    className="btn bg-color custom-bg-text"
                    onClick={updateEmployee}
                  >
                    Update Nhân Viên
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateEmployeeDetailPage;
