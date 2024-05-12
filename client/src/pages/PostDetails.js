import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook
import cover from "../images/aa.png";
import NavBar from "../components/NavBar";
import Footer from "./User_UI/U_Pages/footer";
import { FaEdit, FaPlus } from "react-icons/fa"; // Importing edit icon
import "../pages/User_UI/Styles/userdetails.css";
import DiscountModal from "../components/DiscountModal/DiscountModal";
import dayjs from "dayjs";
import { validateFormData } from "../helper/FormValidators";
import { PaymentService } from "../Services/Payment.Service";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import AddReservationClient from "../components/AddReservationClient/AddReservationClient";
import EMBLEMS from '../components/images/EMBLEM.png'
import { Margin } from "@mui/icons-material";
import { Grid } from "@mui/material";
function PostDetails() {
  const { id,userID } = useParams(); // Access route parameter 'id' using useParams hook
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [pass, setPass] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
        setLoading(false);
      }
    });
  }, [id]);
  // const userString = localStorage.getItem("user");
  // const user = JSON.parse(userString);
  const CustomerId = userID;

  useEffect(() => {
    getData();
  }, []);

  const [reservation, setReservation] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:5000/api/reservation/ServiceProviderReservations/${id}`)
      .then((res) => {
          setReservation(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });

      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user._id;

      setIsAuthor(userID === userId)
      axios.get(`http://localhost:5000/results/check-pass/${userID}`).then((res) => {
        setPass(res.data.hasPassed);
      }).catch((err) => {
        console.log("Error", err);
        toast.error("Error Fetching Results");
      });
  };

  const handleImageClick = (image) => {
    setEnlargedImage((prevImage) => (prevImage ? null : image));
  };

  const DISCOUNT_INITIAL_FORM = {
    promoCode: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "text",
      error: "",
    },
    discountPercentage: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "number",
      error: "",
    },
    disStartDate: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "date",
      error: "",
    },
    disEndDate: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "date",
      error: "",
    },
  };

  const [open, setOpen] = useState(false);
  const [discountForm, setDiscountForm] = useState(DISCOUNT_INITIAL_FORM);
  const [helperText, setHelperText] = useState(true);

  const handleInputFocus = (property) => {
    setDiscountForm({
      ...discountForm,
      [property]: {
        ...discountForm[property],
        error: null,
      },
    });
  };

  const handleChange = (property, value) => {
    if (property === "disStartDate" || property === "disEndDate") {
      value = dayjs(value).format("YYYY-MM-DD");
      setDiscountForm({
        ...discountForm,
        [property]: {
          ...discountForm[property],
          value: value,
        },
      });
    } else {
      setDiscountForm({
        ...discountForm,
        [property]: {
          ...discountForm[property],
          value: value,
        },
      });
    }
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigate = () => {
    navigate("feedbackUser");
  };
  const HandleAddDiscount = async () => {
    setHelperText(true);
    getData();

    const [validateData, isValid] = await validateFormData(discountForm);
    setDiscountForm(validateData);
    // console.log("validateData", validateData);
    // console.log("validation",isValid);
    if (isValid) {
      // console.log("Valid Data", discountForm);
      const payload = {
        discountPercentage: discountForm.discountPercentage.value,
        disStartDate: discountForm.disStartDate.value,
        disEndDate: discountForm.disEndDate.value,
        promoCode: discountForm.promoCode.value,
      };
      //prathiba
      console.log("reservations",reservation);
      reservation.forEach((item) => {
        console.log("Item", item);
        emailjs.init('2pEzyY_fxV77_-NMK');
        emailjs
          .send("service_portfolio", "template_pkeg4cd", {
            from_name: "Portfolio Team",
            to_name: item.CustomerId.fullName,
            discount: payload.discountPercentage,
            promo_code: payload.promoCode,
            reply_to: item.CustomerId.email,
          })
          .then((res) => {
            console.log("Email Sent Successfully", res);
          })
          .catch((err) => {
            console.log("Error Sending Email", err);
          });
      });
      // console.log("email end");

      PaymentService.UpdateDiscount(id, payload)
        .then((res) => {
          if (res.data.success) {
            toast.success("Discount Added Successfully");
            // console.log("Discount Added Successfully");
            handleClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
          toast.error("Error Adding Discount");
        });
    }
  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div id="about">
            <div className="hero-section" style={{ position: "relative" }}>
              <div className="cover-image" style={{ position: "relative" }}>
                <img
                  src={cover}
                  alt="Cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />

                <div
                  className="text-overlay"
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <h1>Hi, I {post.portfolio_name}</h1>
                  </div>
                  <div>
                    <h3>
                      I am a <h1>{post.category}</h1>
                    </h3>
                  </div>
                  <h5>
                    Email : {post.email} | contact No : {post.contact_no}
                  </h5>
             {pass && <img id="emblem2" src={EMBLEMS} style={{width:"120px"}}></img>}
                  
                </div>
              </div>
              <div
                className="profile-details"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "150px",
                }}
              >
                <div className="profile-image">
                  <img
                    src={post.image?.image}
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  className="addFeedback-button"
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "350px",
                    right: "403px",
                    cursor: "pointer",
                    color: "#fff",
                    zIndex: 999,
                  }}
                  onClick={() => {
                    handleNavigate();
                  }}
                >
                  Add Feedback |{" "}
                  <FaPlus style={{ marginLeft: "0.3rem" }} size={24} />
                </div>
              {isAuthor&&  <div
                  className="addDiscount-button"
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "350px",
                    right: "203px",
                    cursor: "pointer",
                    color: "#fff",
                    zIndex: 999,
                  }}
                  onClick={handleOpen}
                >
                  Add Discount |{" "}
                  <FaPlus style={{ marginLeft: "0.3rem" }} size={24} />
                </div>}
              </div>
              {isAuthor&&   <div
                className="edit-button"
                style={{
                  position: "absolute",
                  top: "350px",
                  right: "20px",
                  cursor: "pointer",
                  color: "#fff",
                  zIndex: 999,
                  display: "flex",
                }}
                onClick={() => {
                  window.location.href = `/editpost/${post._id}`;
                }}
              >
                Edit | <FaEdit style={{ marginLeft: "0.5rem" }} size={24} />{" "}
                {/* Edit button with edit icon */}
              </div>
              }
            </div>
          </div>

          <div className="bioDescription" tyle={{
    display: "flex !important", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5rem"
  }}>
            <h5>Bio</h5>
            <p>{post.bio}</p>
            <h5>Description</h5>
            <p>{post.description}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>

          </Grid>
          </Grid>


          </div>
          <div className="imageContainer">
            <div className="gallery">
              {post.gallery &&
                post.gallery.map((item, index) => (
                  <div
                    key={item._id}
                    className="imageItem"
                    onClick={() => handleImageClick(item)}
                    style={{
                      filter: enlargedImage
                        ? item._id === enlargedImage._id
                          ? "none"
                          : "blur(8px)"
                        : "none",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="uploadedImage"
                    />
                    <div className="imageDetails">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div className="justify-content-right">
            {/* <div
              className="absolute right-7 px-4 py-2 cursor-pointer text-white z-50 bg-gray-500 bg-opacity-50 rounded-lg"
            >
              Reserve
            </div> */}
            <AddReservationClient
              CustomerId={CustomerId}
              ServiceProviderId={id}
            />
          </div>
          {enlargedImage && (
            <div
              className="enlargedImageModal"
              onClick={handleCloseEnlarged}
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                zIndex: "999",
              }}
            >
              <img
                src={enlargedImage.image}
                alt={enlargedImage.title}
                className="enlargedImage"
                style={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
          <DiscountModal
            open={open}
            handleClose={handleClose}
            discountForm={discountForm}
            handleChange={handleChange}
            handleInputFocus={handleInputFocus}
            helperText={helperText}
            HandleAddDiscount={HandleAddDiscount}
          />
        </>
      )}
    </div>
  );
}

export default PostDetails;
