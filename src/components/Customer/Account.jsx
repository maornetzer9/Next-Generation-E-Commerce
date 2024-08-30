import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REGISTRATION_FORM } from "../../utils/textFieldForms";
import { customerUpdateAction } from "../../actions/userActions";
import Loader from "../../UI/Loader";
import FormModel from "../Form-Model/FormModel";

export default function Account() {
    
  const CUSTOMER_UPDATE_URL = "http://localhost:3000/customers/update";

  const dispatch = useDispatch();
  
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const [form, setForm] = useState({ checked: false });

  // Initialize form state with default values
  useEffect(() => {
    if (user) 
    {
      const { _id, firstName, lastName, username, password,checked } = user; 
      setForm({ _id, firstName, lastName, username, password,  checked });
    }
  }, [user]);

  const handleEditMode = () => setEdit((prevState) => !prevState); 

  
  const handleFormChange = ({ target }) => {
    const { name, type, value, checked } = target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username } = form;

    if ( !firstName || !lastName || !username)
      return alert("One or more of the details are missing");

    // Uncomment and correctly handle the dispatch action
    const response = await dispatch( customerUpdateAction(form, CUSTOMER_UPDATE_URL)) ;
    const { code, message } = response;

    if (code !== 200) return alert(message);

    handleEditMode();
  };

  if (!user) return <Loader />;

  return (
    <FormModel
      edit={edit}
      formTitle="Update Account Information"
      fields={REGISTRATION_FORM}
      defaultValues={user}
      formValues={form}
      showIcon={true}
      editMode={true}
      handleEditMode={handleEditMode}
      handleFormChange={handleFormChange}
      handleSubmit={ (e) => edit ? handleSubmit(e) : alert('You need to be on edit mode')}
      checkboxLabel="Allow others to see my orders"
      checkboxName="checked"
      checkboxChecked={form.checked}
      onCheckboxChange={handleFormChange}
      submitButtonLabel="Save"
      redirectLink="/"
    />
  );
}
