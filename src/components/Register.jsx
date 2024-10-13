import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REGISTRATION_FORM } from "../utils/textFieldForms";
import { registerAction } from "../actions/userActions";
import { Box } from "@mui/material";
import FormModel from "./Form-Model/FormModel";
import '../css/register.css';
import { ORIGIN } from "../App";

export default function Register() {
  const REGISTER_URL = `${ORIGIN}/user/register`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ checked: false });

  const handleFormChange = ({ target }) => {
    const { name, type, value, checked } = target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, password } = form;

    if (!firstName || !lastName || !username || !password)
      return alert("Please fill out all the fields");

    const response = await dispatch( registerAction(form, REGISTER_URL) );
    const { code, message } = response;

    if (code !== 200) return alert(message);

    navigate("/");
  };


  return (
    <Box component={'div'} className="register_container">
    <FormModel
      formTitle="Registration"
      fields={REGISTRATION_FORM}
      formValues={form}
      showIcon={false}
      editMode={false}
      handleFormChange={handleFormChange}
      handleSubmit={handleSubmit}
      checkboxLabel="Allow others to see my orders"
      checkboxName="checked"
      checkboxChecked={form.terms}
      onCheckboxChange={handleFormChange}
      submitButtonLabel="Register"
      redirectText="Already Have an Account? "
      redirectLink="/"
      redirectLabel="Login"
    />
    </Box>
  );
}