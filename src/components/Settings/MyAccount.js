import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import "./style.css";
import Input from "../Register/Input";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import startsWith from "lodash.startswith";
import useAxios from "../Auth/useAxiosHook.interceptor";
import { UserDataContext } from "../UserContext/UserData.context";
import CheckCircleFill from "../../assets/imgs/checkCircleFill.svg";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useScreenWidth } from "../ScreenWidthContext/ScreenWidth.context";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../LanguageContext/LanguageProvider";
import { Controller } from "react-hook-form";

function MyAccount() {
  const [validationSchema, setValidationSchema] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  const { language, changeLanguage } = useLanguage();
  const [direction, setDirection] = useState("ltr");
  const [t, i18n] = useTranslation();

  useEffect(() => {
    if (language === "ar") {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  }, [language]);

  useEffect(() => {
    if (user.userData.profile.type_id == "1") {
      const clubSchema = Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string()
          .required("Email is required")
          .email("wrong email")
          .required("Email is required"),
        // mobile_number: Yup.string().required('Mobile number is required'),
        profile:Yup.object().shape({
          height: Yup.number()
          .typeError("Height must be a valid number")
          .required("Height is required")
          .min(0, "Height must be greater than or equal to 0") // Set your minimum value here
          .max(300, "Height must be less than or equal to 300"), // Set your maximum value here
        wight: Yup.number()
          .typeError("Weight must be a valid number")
          .required("Weight is required")
          .min(0, "Weight must be greater than or equal to 0") // Set your minimum value here
          .max(1000, "Weight must be less than or equal to 1000"),
        })
       
      });
      setValidationSchema(clubSchema);
    } else if (user.userData.profile.type_id == "3") {
      const talentSchema = Yup.object().shape({
        club_name: Yup.string().required("Club Name is required"),
        email: Yup.string()
          .required("Email is required")
          .email("wrong email")
          .required("Email is required"),
        //  mobile_number: Yup.string().required('Mobile number is required'),
        profile:Yup.object().shape({
          year_founded: Yup.number()
          .typeError("Years of Experience must be a valid date")
          .required("Years of Experience is required"),})
    
      });
      setValidationSchema(talentSchema);
    } else if (
      user.userData.profile.type_id == "2" ||
      user.userData.profile.type_id == "4"
    ) {
      const coachSchema = Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string()
          .required("Email is required")
          .email("wrong email")
          .required("Email is required"),
        // mobile_number: Yup.string().required('Mobile number is required'),
        // years_of_experience: Yup.number()
        //   .typeError("Years of Experience must be a valid date")
        //   .required("Years of Experience is required"),
          profile:Yup.object().shape({
            years_of_experience: Yup.number()
            .typeError("Years of Experience must be a valid date")
            .required("Years of Experience is required"),})
      });
      setValidationSchema(coachSchema);
    }
  }, [user.userData.profile.type_name]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    defaultValue,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } =
    useScreenWidth();
  const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);
  const [maxDate, setMaxDate] = useState(calculateMaxDate());
  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState();
  const [accountTypes, setAccountTypes] = useState();
  const [positions, setPositions] = useState();
  const [subPositions, setSubPositions] = useState();
  const [verificationEmail, setVerificationEmail] = useState(false);
  const [profileData, setProfileData] = useState();
  const genderOptions = t("Register.genderOptions", { returnObjects: true });
  const preferredFootOptions = t("Register.preferredFootOptions", {
    returnObjects: true,
  });

  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`user/profile`);
        const responseData=response.data.result;
        setProfileData(response.data.result);
        // reset({
        //   ...responseData,
        //   profile:{
        //     ...responseData.profile,
        //     parent_position:responseData.profile.parent_position.id.toString(),
        //     position:[responseData.profile.position[0].id.toString()],

        //     // position:['7'],
        //     country_id:responseData.profile.country.id.toString(),

        //   }
        // });
    
        
        reset({
          ...responseData,
          club_name:responseData.profile.club_name,
          country_id: responseData.profile.country.id.toString(),
          // parent_position: responseData.profile.parent_position?.id.toString(),
          // position: [responseData.profile.position[1]?.id.toString()],
          profile: responseData.profile.type_id == 1
            ? {
                ...responseData.profile,
                parent_position: responseData.profile.parent_position.id.toString(),
                position: responseData.profile.position[1] ? [responseData.profile.position[1].id.toString()] : [],
                // position:['7'],
                country_id: responseData.profile.country.id.toString(),
              }
              : responseData.profile.type_id == 4
    ? {
        ...responseData.profile,
       year_founded: responseData.profile.year_founded.toString()
      }
    : responseData.profile
        });
        console.log('test',responseData.profile.parent_position)
        
      } catch (error) {
        console.error("aya", "Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    data.talent_type = 1;
    delete data.profile.club_logo;
    // data.position= [data.profile.position[1].id.toString()] 
    
    try {
      const response = await axios.put("user/edit",{...data,...data.profile,talent_type:1});
      // console.log("Form submitted successfully", ...data,...data.profile);
      message.success("Your account data updated successfully");
      {console.log('test44',data.position)}
    } catch (error) {
      console.error("Error submitting form", error);
    }//
    console.log('test2',data);
  };

  function calculateMaxDate() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() - 5);

    const year = maxDate.getFullYear();
    const month = (maxDate.getMonth() + 1).toString().padStart(2, "0");
    const day = maxDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    axios
      .get("https://backend.triplef.group/api/app/get_countries")
      .then((response) => {
        setCountries(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://backend.triplef.group/api/app/get_sports")
      .then((response) => {
        setSports(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching sports data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://backend.triplef.group/api/app/get_sport_positions/1")
      .then((response) => {
        setPositions(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.triplef.group/api/app/get_user_types"
        );
        setAccountTypes(response.data.result);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchData();
  }, []);

  const handleVerifyClick = () => {
    setVerificationEmail(true);
    const watchEmail = watch("email", "");
    axios
      .get("user/auth/send_verify_email", watchEmail)
      .then((response) => {
        console.log("Email sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  useEffect(() => {
    const fetchSubPositions = async () => {
      try {
        const response = await axios.post(
          "https://backend.triplef.group/api/app/get_sport_positions/1",
          {
            parent_id: user.userData.profile.parent_position.id,
            name: "",
          }
        );
        setSubPositions(response.data.result);
      } catch (error) {
        console.error("Error fetching sub-positions:", error);
      }
    };

    fetchSubPositions(); // Call the function to fetch sub-positions when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handlePositionSelect = async (selectedPositionId) => {
    try {
      const response = await axios.post(
        "https://backend.triplef.group/api/app/get_sport_positions/1",
        {
          parent_id: selectedPositionId,
          name: "",
        }
      );
      setSubPositions(response.data.result);
    } catch (error) {
      console.error("Error fetching sub-positions:", error);
    }
  };
  useEffect(() => {}, [countries, sports, accountTypes]);

  const talentFields = (
    <>
      <Form.Group className="mb-3" controlId="heightAndWeight">
        <div className="d-flex">
          <div className="me-2">
            <label htmlFor="height">{t("Register.height")} </label>
            <input
              type="number"
              id="height"
              {...register("profile.height")}
              name="profile.height"
              className="form-control"
              style={{ width: "188px" }}
            />
          </div>
          <div>
            <label htmlFor="weight">{t("Register.weight")} </label>
            <input
              type="number"
              id="weight"
              {...register("profile.wight")}
              name="profile.wight"
              className="form-control"
              style={{ width: "188px" }}
            />
          </div>
        </div>
      </Form.Group>
      <Form.Group controlId="countryy" className="mb-3">
        <Form.Label htmlFor="country">
          {t("Register.residencePlace")}
        </Form.Label>
        <Form.Control
          as="select"
          id="country"
          {...register("profile.country_id")}
          style={{ width: "391px" }}
        >
    
          {countries?.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="countryy" className="">
        <Form.Label className="mb-0 mt-3">
          {t("Register.talent_type")}
        </Form.Label>
        <div
          className={
            isProScreen ? "align-items-center " : "d-flex align-items-center "
          }
        >
          {console.log('errors',errors)}
          <Form.Control
            as="select"
            id="country"
            {...register("profile.talent_type")}
            name="profile.talent_type"
            style={{ width: "391px", marginRight: "1rem" }}
          >
            <option value="1">Football</option>
            {/* {sports?.map(sport => (
                <option key={sport.id} value={sport.id}>
                    {sport.name}
                </option>
            ))} */}
          </Form.Control>
          <div className={isProScreen ? "mt-4" : "mb-4"}>
            <Form.Label>{t("Register.account_type")}</Form.Label>

            <>
              <label key={1} className="custom-radio-btn">
                <span className="label">{watch()?.profile?.type_name}</span>
                <input type="radio" value="1" name="user_type" checked disabled />
                <span className="checkmark"></span>
              </label>
            </>
          </div>
        </div>
      </Form.Group>
      {user.userData.profile.type_id == "1" && (
        <Form.Group controlId="gender" className="me-2">
          <label>{t("Register.position")}</label>
          <div
            className={`d-flex ${
              isProScreen || isSmallScreen ? "flex-wrap" : ""
            }`}
            onChange={(e) => handlePositionSelect(e.target.value)}
          >
            {positions?.map((position, index) => (
              <label
                key={position.id}
                className={`custom-radio-btn me-2 ${
                  isProScreen && index % 2 !== 0 ? "mb-2" : ""
                }`}
              >
                <span className="label">{position.name}</span>
                <input
                  type="radio"
                  id={position.id}
                  value={position.id}
                  {...register("profile.parent_position")}
                  name="profile.parent_position"
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        </Form.Group>
      )}

        {watch()?.profile?.parent_position === "1" &&
  watch().profile?.position != '1' && // Only set to '1' if it's not already set
  setValue("profile.position", ['1'], { shouldValidate: true })} 
{
      watch()?.profile?.parent_position != "1" &&
        user.userData.profile.type_id == "1" && (
          <Form.Group controlId="subPosition" className="mb-3 me-4">
            <div className="form-group">
              <Form.Label htmlFor="subPosition">
                {t("Register.subPosition")}
              </Form.Label>
              <select
                id="subPosition"
                {...register("profile.position", { setValueAs: (value) => [value] })}
                className="form-control"
                style={{ width: isSmallScreen ? "300px" : "391px" }}
            
              >

                {subPositions?.map((subPosition) => (
                  <option key={subPosition.id} value={subPosition.id}>
                    {subPosition.name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        )}

      <div className="mt-3 d-flex  ">
        {/* <Form.Group controlId='subPosition' className='mb-3 me-4'>
    <div className='form-group'>
        <Form.Label htmlFor="subPosition">Sub Position</Form.Label>
        <select 
            id="subPosition" 
            {...register('position')} 
            className='form-control' 
            style={{width:'391px'}} 
            defaultValue={profileData?.profile.parent_position?.id === watch('parent_position') ? profileData?.profile.position.id : ''}
        >
            {profileData?.profile.parent_position.id == watch('parent_position')? 
                <option value={profileData?.profile.position.id}>{profileData?.profile.position.name}</option>:
                <option value=""></option>
            }
          
            {subPositions?.map(subPosition => (
                <option key={subPosition.id} value={subPosition.id}>
                    {subPosition.name}
                </option>
            ))}
        </select>
    </div>
</Form.Group> */}

        <Form.Group controlId="gender" className="me-2 mt-2">
          <label>{t("Register.preferredFoot")}</label>
          <div className="d-flex">
            <label className="custom-radio-btn me-2">
              <span className="label">{preferredFootOptions[0]}</span>
              <input
                type="radio"
                id="right"
                value="right"
                {...register("profile.preferred_foot")}
                name="profile.preferred_foot"
              />
              <span className="checkmark"></span>
            </label>
            <label className="custom-radio-btn  me-2">
              <span className="label">{preferredFootOptions[1]}</span>
              <input
                type="radio"
                id="left"
                value="left"
                {...register("profile.preferred_foot")}
                name="profile.preferred_foot"
              />
              <span className="checkmark"></span>
            </label>
            <label className="custom-radio-btn ">
              <span className="label">{preferredFootOptions[2]}</span>
              <input
                type="radio"
                id="both"
                value="both"
                {...register("profile.preferred_foot")}
                name="profile.preferred_foot"
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </Form.Group>
      </div>
    </>
  );
  const coachFields = (
    <>
    {/* <Form.Group controlId="countryy" className="mb-3">
        <Form.Label htmlFor="country">
          {t("Register.residencePlace")}
        </Form.Label>
        <Form.Control
          as="select"
          id="country"
          {...register("profile.country_id")}
          style={{ width: "391px" }}
        >
    
          {countries?.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </Form.Control> */}
      <Form.Group controlId="country">
        <Form.Label htmlFor="country ">
          {t("Register.residencePlace")}
        </Form.Label>
        <div className="d-flex align-items-center ">
          <Form.Control
            as="select"
            id="country"
            {...register("profile.country_id")}
            style={{ width: "391px" }}
            className="me-3"
          >
            
        
            {countries?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Form.Control>
          <div className="mb-4">
            <div className="">
              <label htmlFor="height">{t("Register.exp_years")} </label>
              <input
                type="number"
                id="height"
                {...register("profile.years_of_experience")}
                name="profile.years_of_experience"
                // defaultValue={profileData?.profile.years_of_experience}
                className="form-control"
                min="0"
              />
            </div>
          </div>
        </div>
      </Form.Group>
      <Form.Control
            as="select"
            id="country"
            {...register("profile.talent_type")}
            name="profile.talent_type"
            style={{ width: "391px", marginRight: "1rem" }}
          >
            <option value="1">Football</option>
            {/* {sports?.map(sport => (
                <option key={sport.id} value={sport.id}>
                    {sport.name}
                </option>
            ))} */}
          </Form.Control>
    </>
  );
  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="edit-data">
        <p className="title-editData"> {t("Register.myAccount")}</p>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            {user.userData.profile.type_id == "3" ? (
              <Input
                register={register}
                errors={errors}
                name="profile.club_name"
                label="Club Name"
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="text"
                inputWidth="289px"
              />
            ) : (
              <div
                className={isSmallScreen || isProScreen ? "mb-3" : " d-flex"}
              >
                <div className={isSmallScreen ? "mb-3" : "flex-fill"}>
                  <Input
                    register={register}
                    errors={errors}
                    name="first_name"
                    label={t("Register.first_name")}
                    placeholder=""
                    className="form-control form-control-sm rounded"
                    validation={{}}
                    type="text"
                    // defaultValue={profileData?.first_name}
                    inputWidth="289px"
                  />
                </div>
                <div className="flex-fill" style={{ marginRight: "18rem" }}>
                  <Input
                    register={register}
                    errors={errors}
                    name="last_name"
                    label={t("Register.last_name")}
                    placeholder=""
                    className="form-control form-control-sm rounded"
                    validation={{}}
                    type="text"
                    defaultValue={profileData?.last_name}
                    inputWidth="289px"
                  />
                </div>
              </div>
            )}

            <Form.Group
              className=""
              controlId="email"
              style={{ position: "relative" }}
            >
              <Input
                register={register}
                errors={errors}
                name="email"
                label={t("Register.email_address")}
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="text"
                inputWidth={
                  isProScreen ? "395px" : isSmallScreen ? "295px" : "595px"
                }
                defaultValue={profileData?.email}
              />
              {profileData?.is_email_verified ? null : verificationEmail ? (
                <p
                  className="sent-verify"
                  style={{
                    position: "absolute",
                    right: "7rem",
                    bottom: isSmallScreen ? "-2rem" : "-1rem",
                    marginTop: isSmallScreen ? "1rem" : "",
                  }}
                >
                  <img src={CheckCircleFill} className="me-1" />
                  {t("Register.SendVerification")}
                </p>
              ) : (
                <p
                  className="need-verify"
                  onClick={handleVerifyClick}
                  style={{
                    position: "absolute",
                    right: "7rem",
                    bottom: "-1rem",
                    marginTop: isSmallScreen ? "1rem" : "",
                  }}
                >
                  {t("Register.verifyEmail")}
                </p>
              )}
            </Form.Group>

            {console.log("mobile", watch())}
            <Form.Group className="mb-3" controlId="phoneAndUsername">
              <div className={isProScreen || isSmallScreen ? "" : "d-flex"}>
                <div className="me-3 mt-2">
                  <label htmlFor="mobile_number">
                    {t("Register.mobileNumber")}
                  </label>

                  <Controller
                    control={control}
                    name="profile.mobile_number"
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        value={value}
                        onChange={onChange}
                        defaultCountry="jo"
                        placeholder="Enter phone number"
                        className={`form-control py-1 rounded-sm custom-phone-input${
                          errors && errors["mobile_number"]
                            ? "border-danger"
                            : ""
                        }`}
                        inputClass={` border-0 form-control-lg py-0 shadow-none custom-phone-input `}
                        buttonClass="border-0"
                        style={{
                          width: isProScreen
                            ? "395px"
                            : isSmallScreen
                            ? "295px"
                            : "395px",
                        }}
                      />
                    )}
                  />

                  {!isValidMobileNumber && (
                    <div className="text-danger">
                      Please enter a valid mobile number.
                    </div>
                  )}
                </div>
                <div
                  className={isProScreen || isSmallScreen ? "" : "flex-fill"}
                >
                  {user.userData.profile.type_id == "3" ? (
                    <Form.Group
                      controlId="birthdate"
                      className="mt-3"
                      style={{
                        marginLeft: "1rem",
                        width: "188px",
                        height: "23px",
                      }}
                    >
                      <label htmlFor="birthdate">
                        {t("Register.year_founded")}
                      </label>
                      <div className="d-flex">
                        {/* <select
                          id="birthdate"
                          {...register("profile.year_founded")}
                          name='profile.year_founded'
                          className="form-control me-2"
                        >
                    
                          {Array.from(
                            { length: 100 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select> */}
                        <input
                type="number"
                id="height"
                {...register("profile.year_founded")}
                name="profile.year_founded"
                // defaultValue={profileData?.profile.years_of_experience}
                className="form-control"
                min="0"
              />
                      </div>
                      
                    </Form.Group>
                  ) : (
                    <Input
                      register={register}
                      errors={errors}
                      name="user_name"
                      label={t("Register.user_name")}
                      placeholder=""
                      className="form-control form-control-sm rounded"
                      validation={{}}
                      type="text"
                      defaultValue={profileData?.user_name}
                      inputWidth={isSmallScreen ? "300px" : "188px"}
                      disabled
                    />
                  )}
                </div>
              </div>
            </Form.Group>

            {user.userData.profile.type_id == "3" ? (
              <Form.Group controlId="country" className="mb-3">
                <Form.Label htmlFor="country">
                  {t("Register.residencePlace")}
                </Form.Label>
                <Form.Control
                  as="select"
                  id="country"
                  {...register("profile.country_id")}
                  style={{ width: "391px" }}
                >
              
                  {countries?.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ) : (
              <div
                className={
                  isProScreen || isSmallScreen ? "mb-3 " : "mb-3 d-flex "
                }
              >
                <Form.Group
                  controlId="gender"
                  className={isProScreen ? "mb-5 " : "me-5"}
                >
                  <label>{t("Register.gender")}</label>
                  <div className={"d-flex"}>
                    <label className="custom-radio-btn me-2">
                      <span className="label">{genderOptions[0]}</span>
                      <input
                        type="radio"
                        id="male"
                        value="male"
                        {...register("profile.gender")}
                        name="profile.gender"
                      
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="custom-radio-btn me-2">
                      <span className="label">{genderOptions[1]}</span>
                      <input
                        type="radio"
                        id="female"
                        value="female"
                        {...register("profile.gender")}
                        name="profile.gender"
                
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="custom-radio-btn">
                      <span className="label" style={{ width: "8rem" }}>
                        {genderOptions[2]}
                      </span>
                      <input
                        type="radio"
                        id="other"
                        value="other"
                        {...register("profile.gender")}
                        name="profile.gender"
                     
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </Form.Group>

                <Form.Group
                  controlId="birthdate"
                  className=""
                  style={{
                    marginLeft:
                      isProScreen || isSmallScreen ? "0rem" : "1.2rem",
                    width: "188px",
                    marginTop: isSmallScreen ? "1.5rem" : "",
                  }}
                >
                  <label htmlFor="birthdate">{t("Register.birthDate")}</label>
                  <div className="d-flex">
                    <input
                      type="date"
                      id="birthdate"
                      {...register("profile.birth_date")}
                      name="profile.birth_date"
                      defaultValue={profileData?.profile.birth_date}
                      max={maxDate}
                      className="form-control me-2"
                    />
                  </div>
                </Form.Group>
              </div>
            )}

            {user.userData.profile.type_id == "1" && talentFields}
            {(user.userData.profile.type_id == "4" ||
              user.userData.profile.type_id == "2") &&
              coachFields}

            <hr
              style={{
                border: "solid 1px #e1e1e1",
                opacity: "0.5",
                marginTop: "3rem",
                marginBottom: "1rem",
              }}
            />
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <Button type="submit" className="save-changes" variant="">
                  {t("Register.saveChanges")}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  }
}
export default MyAccount;
